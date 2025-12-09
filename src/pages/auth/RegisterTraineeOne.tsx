import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Loader2,
} from "lucide-react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import TermsModal from "./TermsModal";
import KADALOGO from "@/assets/logo/kadalogo.png";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

export default function RegisterTraineeStep1() {
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [showAgreements, setShowAgreements] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isValid =
    form.fullName &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.password.length >= 8 &&
    agreements.terms &&
    agreements.privacy;

  const handleNext = async () => {
    if (!isValid || loading) return;

    setLoading(true);

    try {
      // REGISTER trainee
      await authService.registerTrainee(
        form.fullName,
        form.email,
        form.password
      );

      // LOGIN trainee
      const res = await authService.login(form.email, form.password);

      // SAVE AUTH TO STORE
      setAuth({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        user: res.user,
        role: res.user.role,
      });

      // SAVE STEP1
      localStorage.setItem(
        "trainee_step1",
        JSON.stringify({ fullName: form.fullName, email: form.email })
      );

      navigate("/register/trainee/details");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create trainee account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {showPrivacyModal && (
        <PrivacyPolicyModal onClose={() => setShowPrivacyModal(false)} />
      )}

      {showTermsModal && (
        <TermsModal onClose={() => setShowTermsModal(false)} />
      )}

      <Card className="w-full max-w-lg p-8 border-0 shadow-none">
        {/* LOGO */}
        <div className="flex items-center justify-center">
          <img src={KADALOGO} width={120} alt="KADA Logo" />
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          Create Trainee Account
        </h2>

        <p className="text-gray-500 text-sm text-left -mt-4">
          Enter your personal details
        </p>

        {/* FORM FIELDS */}
        <div className="space-y-4">
          {/* FULL NAME */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Full Name"
              className="pl-10 h-12 border-gray-300"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              disabled={loading}
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Email"
              type="email"
              className="pl-10 h-12 border-gray-300"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              disabled={loading}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="pl-10 pr-10 h-12 border-gray-300"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
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
        </div>

        {/* AGREEMENTS BLOCK */}
        <div className="w-full bg-gray-50 rounded-xl p-4 space-y-3 cursor-pointer">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowAgreements(!showAgreements)}
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={agreements.terms && agreements.privacy}
                onCheckedChange={(checked) => {
                  const value = Boolean(checked);
                  setAgreements({ terms: value, privacy: value });
                }}
                disabled={loading}
              />
              <span className="font-medium">Agree All</span>
            </label>

            {showAgreements ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </div>

          {showAgreements && (
            <div className="space-y-4 pt-2 mt-5">
              <div className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={agreements.terms}
                  onCheckedChange={() =>
                    setAgreements((prev) => ({ ...prev, terms: !prev.terms }))
                  }
                  disabled={loading}
                />
                <button
                  type="button"
                  className="text-sm text-left"
                  onClick={() => setShowTermsModal(true)}
                  disabled={loading}
                >
                  Terms of Service<span className="text-red-500">*</span>
                </button>
              </div>

              <div className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={agreements.privacy}
                  onCheckedChange={() =>
                    setAgreements((prev) => ({
                      ...prev,
                      privacy: !prev.privacy,
                    }))
                  }
                  disabled={loading}
                />
                <button
                  type="button"
                  className="text-sm text-left"
                  onClick={() => setShowPrivacyModal(true)}
                  disabled={loading}
                >
                  Privacy Policy<span className="text-red-500">*</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          disabled={!isValid || loading}
          onClick={handleNext}
          className={`w-full h-12 font-medium transition-all ${
            !isValid || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/80 active:bg-primary/70"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading...
            </span>
          ) : (
            "Continue"
          )}
        </Button>

        {/* LOGIN LINK */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer font-medium hover:underline underline-offset-2 decoration-blue-600"
          >
            Login
          </button>
        </div>
      </Card>
    </div>
  );
}
