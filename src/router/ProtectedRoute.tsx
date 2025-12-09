import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface Props {
  adminOnly?: boolean;
}

export default function ProtectedRoute({ adminOnly = false }: Props) {
  const { accessToken, role, isAuthLoaded } = useAuthStore();

  if (!isAuthLoaded) return <div>Loading...</div>;

  // Belum login → arahkan ke login
  if (!accessToken) return <Navigate to="/login" replace />;

  // Jika khusus admin
  if (adminOnly && role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}
