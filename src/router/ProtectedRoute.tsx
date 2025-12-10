import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface Props {
  adminOnly?: boolean;
  requireAuth?: boolean; // default: true
}

export default function ProtectedRoute({
  adminOnly = false,
  requireAuth = true,
}: Props) {
  const { accessToken, role, isAuthLoaded } = useAuthStore();

  if (!isAuthLoaded) return <div>Loading...</div>;

  // Jika route ini tidak membutuhkan login (public)
  if (!requireAuth) return <Outlet />;

  // Jika membutuhkan login → cek token
  if (!accessToken) return <Navigate to="/login" replace />;

  // Jika admin only
  if (adminOnly && role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}
