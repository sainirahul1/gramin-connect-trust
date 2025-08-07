import {
  users,
  workers,
  type User,
  type UpsertUser,
  type Worker,
  type InsertWorker,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Worker operations
  createWorker(worker: InsertWorker): Promise<Worker>;
  getWorkerByUserId(userId: string): Promise<Worker | undefined>;
  updateWorker(id: number, worker: Partial<InsertWorker>): Promise<Worker>;
  getAllWorkers(): Promise<Worker[]>;
  getWorkerById(id: number): Promise<Worker | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Worker operations
  async createWorker(worker: InsertWorker): Promise<Worker> {
    const [newWorker] = await db
      .insert(workers)
      .values(worker)
      .returning();
    return newWorker;
  }

  async getWorkerByUserId(userId: string): Promise<Worker | undefined> {
    const [worker] = await db
      .select()
      .from(workers)
      .where(eq(workers.userId, userId));
    return worker;
  }

  async updateWorker(id: number, worker: Partial<InsertWorker>): Promise<Worker> {
    const [updatedWorker] = await db
      .update(workers)
      .set({
        ...worker,
        updatedAt: new Date(),
      })
      .where(eq(workers.id, id))
      .returning();
    return updatedWorker;
  }

  async getAllWorkers(): Promise<Worker[]> {
    return await db.select().from(workers).where(eq(workers.isAvailable, true));
  }

  async getWorkerById(id: number): Promise<Worker | undefined> {
    const [worker] = await db
      .select()
      .from(workers)
      .where(eq(workers.id, id));
    return worker;
  }
}

export const storage = new DatabaseStorage();
