import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import { Lock, Loader2, Eye, EyeOff, CheckCircle2Icon } from "lucide-react";
import { authService } from "@/services/authService";
import KADALOGO from "@/assets/logo/kadalogo.png";

import { useNavigate } from "react-router-dom";

const parseHashParams = () => {
  const hash = window.location.hash.substring(1);
  return Object.fromEntries(new URLSearchParams(hash));
};

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const params = parseHashParams();

    if (params.type !== "recovery" || !params.access_token) {
      toast.error("Invalid or expired recovery link");
      navigate("/login");
      return;
    }

    setAccessToken(params.access_token);
  }, [navigate]);

  const handleSubmit = async () => {
    if (!password || !confirm) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (!accessToken) return;

    setLoading(true);

    try {
      await authService.resetPassword(accessToken, password);
      toast.success("Password updated successfully");
      setSuccess(true);
    } catch (err: any) {
      toast.error("Failed to reset password", {
        description: err?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Toaster richColors position="top-center" />

        <Card className="w-full max-w-md p-8 text-center shadow-none border-none flex items-center">
          <div className="flex items-center justify-center mb-4">
            <img src={KADALOGO} width={120} alt="KADA Logo" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Completed!</h2>
          <CheckCircle2Icon className="w-20 h-20 text-green-500" />
          <p className="text-gray-600 mb-6">
            Your password has been successfully reset.
            <br />
            You can now log in using your new password.
          </p>

          <Button
            className="w-full h-12 bg-primary text-white"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Toaster richColors position="top-center" />

      <Card className="w-full max-w-md p-8 shadow-none border-none">
        <div className="flex items-center justify-center mb-4">
          <img src={KADALOGO} width={120} alt="KADA Logo" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h2>

        <div className="space-y-4">
          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type={show ? "text" : "password"}
              placeholder="New password"
              className="pl-10 pr-10 h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {show ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            {/* CONFIRM */}
            <Input
              type={show ? "text" : "password"}
              placeholder="Confirm password"
              className="pl-10 pr-10 h-12"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {show ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-12 bg-primary text-white"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                Updating...
              </span>
            ) : (
              "Update Password"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;
