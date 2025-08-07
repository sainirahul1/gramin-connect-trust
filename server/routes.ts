import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertWorkerSchema } from "@shared/schema";

// Middleware to check if user is authenticated
const requireAuth = (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);

  // Worker routes
  app.get('/api/workers', async (req, res) => {
    try {
      const workers = await storage.getAllWorkers();
      res.json(workers);
    } catch (error) {
      console.error("Error fetching workers:", error);
      res.status(500).json({ message: "Failed to fetch workers" });
    }
  });

  app.get('/api/workers/profile', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const worker = await storage.getWorkerByUserId(userId);
      res.json(worker);
    } catch (error) {
      console.error("Error fetching worker profile:", error);
      res.status(500).json({ message: "Failed to fetch worker profile" });
    }
  });

  app.post('/api/workers', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const workerData = insertWorkerSchema.parse({
        ...req.body,
        userId,
      });
      const worker = await storage.createWorker(workerData);
      res.json(worker);
    } catch (error) {
      console.error("Error creating worker:", error);
      res.status(500).json({ message: "Failed to create worker profile" });
    }
  });

  app.put('/api/workers/:id', requireAuth, async (req: any, res) => {
    try {
      const workerId = parseInt(req.params.id);
      const userId = req.user.id;
      
      // Verify the worker belongs to the authenticated user
      const existingWorker = await storage.getWorkerById(workerId);
      if (!existingWorker || existingWorker.userId !== userId.toString()) {
        return res.status(403).json({ message: "Access denied" });
      }

      const workerData = insertWorkerSchema.partial().parse(req.body);
      const worker = await storage.updateWorker(workerId, workerData);
      res.json(worker);
    } catch (error) {
      console.error("Error updating worker:", error);
      res.status(500).json({ message: "Failed to update worker profile" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
