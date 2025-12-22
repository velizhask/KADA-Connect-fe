import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function MeGuardRoute({
  allowedRole,
  redirectTo,
}: {
  allowedRole: "admin" | "student" | "company";
  redirectTo: string;
}) {
  const { user, role } = useAuthStore();

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // role not passthrough
  if (role !== allowedRole) {
    return <Navigate to={redirectTo} replace />;
  }

  // role passthrough
  return <Outlet />;
}
