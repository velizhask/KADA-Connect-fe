import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import { Mail, Loader2, CheckCircle2Icon } from "lucide-react";
import KADALOGO from "@/assets/logo/kadalogo.png";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = (value: string) =>
    /\S+@\S+\.\S+/.test(value);

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      await authService.forgotPassword(email);
      setSent(true);

      toast.success("Password reset email sent", {
        description:
          "Please check your inbox (and spam folder).",
      });
    } catch (err: any) {
      toast.error("Failed to send reset email", {
        description: err?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Toaster richColors position="top-center" />

      <Card className="w-full max-w-lg p-8 border-0 shadow-none">
        {/* LOGO */}
        <div className="flex items-center justify-center mb-4">
          <img src={KADALOGO} width={120} alt="KADA Logo" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email and we’ll send you a password reset link.
        </p>

        {!sent ? (
          <div className="space-y-4">
            {/* EMAIL */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Email address"
                type="email"
                className="pl-10 h-12 border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>

            {/* SUBMIT */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-12 bg-primary text-white cursor-pointer hover:bg-primary/80"
            >
              {loading ? (
                <span className="flex items-center gap-2 ">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle2Icon className="w-12 h-12 text-green-500" />
            <p className="text-gray-700">
              We’ve sent a password reset link to:
            </p>
            <p className="font-medium">{email}</p>
            <Button
              variant="outline"
             className="w-full h-12 bg-primary text-white cursor-pointer hover:bg-primary/80"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
          </div>
        )}

        {/* BACK TO LOGIN */}
        {!sent && (
          <div className="mt-6 text-center text-sm">
            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer text-blue-600 hover:underline"
              disabled={loading}
            >
              Back to login
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
