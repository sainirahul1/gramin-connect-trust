import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { queryClient } from "@/lib/queryClient";
import Index from "./pages/Index";
import WorkerDashboard from "./pages/WorkerDashboard";
import AuthPage from "./pages/AuthPage";
import WorkerAuth from "./pages/WorkerAuth";
import NotFound from "./pages/NotFound";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div>
      <Toaster />
      <Sonner />
      <Router>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/worker-login" component={WorkerAuth} />
          <Route path="/dashboard" component={WorkerDashboard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  </QueryClientProvider>
);

export default App;
