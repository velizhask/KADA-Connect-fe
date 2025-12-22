import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const ROLES = ["admin", "company", "student"] as const;
type Role = (typeof ROLES)[number];

interface Props {
  adminOnly?: boolean;
  requireAuth?: boolean;
  allowedRoles?: Role[];
}

function isValidRole(role: string): role is Role {
  return ROLES.includes(role as Role);
}

export default function ProtectedRoute({
  adminOnly = false,
  requireAuth = true,
  allowedRoles,
}: Props) {
  const { accessToken, role, isAuthLoaded } = useAuthStore();

  if (!isAuthLoaded) {
    return <div>Loading...</div>;
  }

  // Public route
  if (!requireAuth) {
    return <Outlet />;
  }

  // Must login
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Role must exist & valid
  if (!role || !isValidRole(role)) {
    return <Navigate to="/login" replace />;
  }

  // Admin only
  if (adminOnly && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Role-based restriction
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
