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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Briefcase, MapPin, Phone, DollarSign, Star, Users } from "lucide-react";

// Form schema for frontend form handling
const workerFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profession: z.string().min(1, "Profession is required"),
  location: z.string().min(1, "Location is required"),
  hourlyRate: z.string().min(1, "Hourly rate is required"),
  description: z.string().optional(),
  skills: z.string().optional(),
  phoneNumber: z.string().optional(),
  isAvailable: z.boolean().default(true),
});

type WorkerFormData = z.infer<typeof workerFormSchema>;

interface WorkerProfile {
  id: number;
  name: string;
  profession: string;
  location: string;
  hourlyRate: string;
  rating: string;
  description: string | null;
  skills: string[] | null;
  isAvailable: boolean | null;
  phoneNumber: string | null;
}

export default function WorkerDashboard() {
  const { user, isLoading: authLoading, logoutMutation, error } = useAuth();
  const { toast } = useToast();

  const { data: workerProfile, isLoading: profileLoading } = useQuery<WorkerProfile>({
    queryKey: ["/api/workers/profile"],
    retry: false,
  });

  const form = useForm({
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
        skills: Array.isArray(workerProfile.skills) ? workerProfile.skills.join(", ") : "",
        phoneNumber: workerProfile.phoneNumber || "",
        isAvailable: workerProfile.isAvailable ?? true,
      });
    }
  }, [workerProfile, form]);

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/workers", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Worker profile created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/workers/profile"] });
      queryClient.invalidateQueries({ queryKey: ["/api/workers"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create worker profile",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest(`/api/workers/${workerProfile?.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Worker profile updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/workers/profile"] });
      queryClient.invalidateQueries({ queryKey: ["/api/workers"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update worker profile",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: WorkerFormData) => {
    // Transform form data to match backend schema
    const transformedData = {
      ...data,
      skills: data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
    };
    
    if (workerProfile) {
      updateMutation.mutate(transformedData);
    } else {
      createMutation.mutate(transformedData);
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
      window.location.href = "/worker-login";
    }
  }, [user, authLoading, error]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const userEmail = user && typeof user === 'object' ? (user as any)?.email : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-blue-200/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Worker Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your professional profile</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {userEmail && (
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Welcome back!</div>
                  <div className="text-xs text-gray-600">{userEmail}</div>
                </div>
              )}
              <Button onClick={handleLogout} variant="outline" className="hover:bg-red-50 hover:border-red-200">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Status Card */}
        {workerProfile && (
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{workerProfile.name}</h2>
                    <p className="text-gray-600">{workerProfile.profession}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <MapPin className="w-3 h-3 mr-1" />
                        {workerProfile.location}
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        <DollarSign className="w-3 h-3 mr-1" />
                        ${workerProfile.hourlyRate}/hr
                      </Badge>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                        <Star className="w-3 h-3 mr-1" />
                        {workerProfile.rating}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    workerProfile.isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      workerProfile.isAvailable ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    {workerProfile.isAvailable ? 'Available' : 'Unavailable'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Form */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">
              {workerProfile ? "Update Your Profile" : "Create Your Worker Profile"}
            </CardTitle>
            <p className="text-blue-100">
              {workerProfile 
                ? "Keep your information current to attract more customers" 
                : "Complete your profile to start connecting with local customers"
              }
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">Full Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your full name" 
                              className="h-12 border-gray-300 focus:border-blue-500" 
                              {...field} 
                            />
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
                          <FormLabel className="text-gray-700 font-medium">Profession *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Plumber, Electrician, Carpenter" 
                              className="h-12 border-gray-300 focus:border-blue-500" 
                              {...field} 
                            />
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
                          <FormLabel className="text-gray-700 font-medium">Location *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="City, Area, or Region" 
                              className="h-12 border-gray-300 focus:border-blue-500" 
                              {...field} 
                            />
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
                          <FormLabel className="text-gray-700 font-medium">Hourly Rate (USD) *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 25" 
                              type="number" 
                              className="h-12 border-gray-300 focus:border-blue-500" 
                              {...field} 
                            />
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
                          <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your contact number" 
                              type="tel" 
                              className="h-12 border-gray-300 focus:border-blue-500" 
                              {...field} 
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isAvailable"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-2">
                          <FormLabel className="text-gray-700 font-medium">Availability Status</FormLabel>
                          <div className="flex items-center space-x-3">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <span className="text-sm text-gray-600">
                              {field.value ? 'Available for work' : 'Currently unavailable'}
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Skills and Description */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Skills & Description
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Skills</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Plumbing, Electrical work, Installation (comma-separated)" 
                            className="h-12 border-gray-300 focus:border-blue-500" 
                            {...field} 
                          />
                        </FormControl>
                        <p className="text-sm text-gray-500">Separate multiple skills with commas</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell customers about your experience, specialties, and what makes you unique..." 
                            className="min-h-[120px] border-gray-300 focus:border-blue-500" 
                            {...field} 
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => window.location.href = '/'}
                    className="px-8"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {(createMutation.isPending || updateMutation.isPending) 
                      ? "Saving..." 
                      : workerProfile 
                        ? "Update Profile" 
                        : "Create Profile"
                    }
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}