import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    enabled: false, // Disable automatic fetching
    staleTime: Infinity, // Never consider data stale
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
  };
}