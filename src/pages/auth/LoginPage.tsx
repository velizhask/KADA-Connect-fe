import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast, Toaster } from "sonner";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react";
import KADALOGO from "@/assets/logo/kadalogo.png";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const emailIsValid = isValidEmail(email);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!emailIsValid) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const res = await authService.login(email, password);

      setAuth({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        user: res.user,
        role: res.role,
        profile: res.profile,
      });

      if (res.role === "student") {
        if (!res.profile) {
          navigate("/register/trainee/details");
        } else {
          navigate("/companies");
        }
        return;
      }

      if (res.role === "company") {
        if (!res.profile) {
          navigate("/register/company/details");
        } else {
          navigate("/trainees");
        }
        return;
      }

      if (res.role === "admin") {
        navigate("/admin/users");
        return;
      }

      navigate("/");
    } catch (err: any) {
      toast.error("Login failed", {
        description: err?.response?.data?.message,
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
        {/* LOGO */}
        <div className="flex items-center justify-center">
          <img src={KADALOGO} width={120} alt="KADA Logo" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <div className="space-y-4">
          {/* email field */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <Input
              placeholder="Email"
              type="email"
              className="pl-10 pr-10 h-12 border-gray-300"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!isEmailTouched) setIsEmailTouched(true);
              }}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />

            {isEmailTouched &&
              email.length > 0 &&
              (emailIsValid ? (
                <CheckCircle2Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
              ) : (
                <XCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
              ))}
          </div>

          {/* password field */}
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
              {showPassword ? <EyeOff /> : <Eye />}
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

          {/* login button */}
          <Button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full h-12 font-medium transition-all ${
              loading
                ? "bg-gray-400 cursor-progress"
                : "bg-primary hover:bg-primary/80 cursor-pointer"
            } text-white`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </div>

        {/* Register link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have an account yet? </span>
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline font-medium  cursor-pointer"
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
