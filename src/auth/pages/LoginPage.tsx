import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast, Toaster } from "sonner";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import KADALOGO from "@/assets/logo/kadalogo.png";
import { useNavigate } from "react-router-dom";
import { authService } from "@/auth/services/authService";
import { useAuthStore } from "@/auth/store/authStore";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setAuth } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // ================================
      // 🔥 Backend Login
      // ================================
      const res = await authService.login(email, password);

      // res berisi:
      // { access_token, refresh_token, user, profile }

      setAuth({
        token: res.access_token,
        refresh_token: res.refresh_token,
        user: res.user,
        role: res.user.user_metadata?.role,
        profile: res.profile,
      });

      toast.success("Login successful");

      // ================================
      // 🎯 Redirect Based on Role
      // ================================
      const role = res.user.user_metadata?.role;

      if (role === "company") navigate("/trainees");
      else navigate("/companies");

    } catch (err: any) {
      toast.error("Login failed", {
        description: err?.response?.data?.message || "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Toaster richColors position="top-center" />

      <Card className="w-full max-w-lg p-8 border-0 shadow-none">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <img src={KADALOGO} width={120} alt="KADA Logo" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <div className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Email"
              type="email"
              className="pl-10 h-12 border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="pl-10 pr-10 h-12 border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-left">
            <button
              type="button"
              onClick={() => toast.info("Password reset feature coming soon")}
              className="text-sm text-blue-600 hover:underline cursor-pointer"
              disabled={loading}
            >
              Forgot your password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full h-12 font-medium transition-all cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary/80 active:bg-primary/70"
            } text-white`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2 cursor-progress">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </div>

        {/* Register link */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Don't have an account yet? </span>
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline font-medium cursor-pointer"
            disabled={loading}
          >
            Create account
          </button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
