import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function ProfileSetupRoute() {
  const { user, profile, role } = useAuthStore();

  if (!user) return <Navigate to="/login" replace />;

  // Jika profile SUDAH ada
  if (profile !== null) {
    if (role === "student") return <Navigate to="/trainees/me" replace />;
    if (role === "company") return <Navigate to="/companies/me" replace />;
    return <Navigate to="/" replace />;
  }

  // Jika belum ada profile → boleh lanjut
  return <Outlet />;
}
