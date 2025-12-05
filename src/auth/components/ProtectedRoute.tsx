import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/auth/store/authStore";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const auth = useAuthStore((s) => s.auth);

  // ga ada auth dilempar ke login
  if (!auth?.access_token) {
    return <Navigate to="/login" replace />;
  }

  //  ambil dari supabase metadata 
  const userRole =
  auth?.role ||
  auth?.user?.user_metadata?.role ||
  auth?.user?.app_metadata?.role;
  
  // jika role ga match dibalikin ke "/"
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
