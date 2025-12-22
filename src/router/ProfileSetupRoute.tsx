import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function ProfileSetupRoute() {
  const { user, profile, role } = useAuthStore();

  if (!user) return <Navigate to="/login" replace />;

  // if profile exists, redirect to respective "me" page
  if (profile !== null) {
    if (role === "student") return <Navigate to="/trainees/me" replace />;
    if (role === "company") return <Navigate to="/companies/me" replace />;
    return <Navigate to="/" replace />;
  }

  // if no profile, allow to proceed to setup
  return <Outlet />;
}
