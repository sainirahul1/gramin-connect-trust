import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWorkerSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const workerFormSchema = insertWorkerSchema.extend({
  skills: z.string().transform((val) => val.split(',').map(s => s.trim()).filter(Boolean)),
});

type WorkerFormData = z.infer<typeof workerFormSchema>;

export default function WorkerDashboard() {
  const { user, isLoading: authLoading, logoutMutation, error } = useAuth();
  const { toast } = useToast();

  const { data: workerProfile, isLoading: profileLoading } = useQuery({
    queryKey: ["/api/workers/profile"],
    retry: false,
  });

  const form = useForm<WorkerFormData>({
    resolver: zodResolver(workerFormSchema),
    defaultValues: {
      name: "",
      profession: "",
      location: "",
      hourlyRate: "",
      description: "",
      skills: "",
      phoneNumber: "",
      isAvailable: true,
    },
  });

  useEffect(() => {
    if (workerProfile) {
      form.reset({
        name: workerProfile.name || "",
        profession: workerProfile.profession || "",
        location: workerProfile.location || "",
        hourlyRate: workerProfile.hourlyRate || "",
        description: workerProfile.description || "",
        skills: workerProfile.skills?.join(", ") || "",
        phoneNumber: workerProfile.phoneNumber || "",
        isAvailable: workerProfile.isAvailable ?? true,
      });
    }
  }, [workerProfile, form]);

  const createMutation = useMutation({
    mutationFn: async (data: WorkerFormData) => {
      return apiRequest("/api/workers", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Worker profile created successfully!",
      });
      // Invalidate both the profile and the workers list
      queryClient.invalidateQueries({ queryKey: ["/api/workers/profile"] });
      queryClient.invalidateQueries({ queryKey: ["/api/workers"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create worker profile",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: WorkerFormData) => {
      return apiRequest(`/api/workers/${workerProfile.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Worker profile updated successfully!",
      });
      // Invalidate both the profile and the workers list
      queryClient.invalidateQueries({ queryKey: ["/api/workers/profile"] });
      queryClient.invalidateQueries({ queryKey: ["/api/workers"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update worker profile",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: WorkerFormData) => {
    if (workerProfile) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        window.location.href = "/";
      },
    });
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user && !error) {
      window.location.href = "/auth";
    }
  }, [user, authLoading, error]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Worker Dashboard</h1>
          <div className="flex items-center gap-4">
            {user?.email && (
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
            )}
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {workerProfile ? "Update Your Profile" : "Create Your Worker Profile"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profession</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Plumber, Electrician, Cleaner" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hourlyRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hourly Rate</FormLabel>
                        <FormControl>
                          <Input placeholder="$25/hour" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills (comma-separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="Plumbing, Repairs, Installation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell potential customers about your experience and services..." 
                          className="min-h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : workerProfile
                    ? "Update Profile"
                    : "Create Profile"
                  }
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}