import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Loader2,
} from "lucide-react";

import { authService } from "@/auth/services/authService";
import { useAuthStore } from "@/auth/store/authStore";

import PrivacyPolicyModal from "./PrivacyPolicyModal";
import TermsModal from "./TermsModal";
import KADALOGO from "@/assets/logo/kadalogo.png";

export default function RegisterCompanyStep1() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showAgreements, setShowAgreements] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isEmailValid = /\S+@\S+\.\S+/.test(form.email);

  const update = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isValid =
    form.name &&
    isEmailValid &&
    form.password.length >= 8 &&
    agreements.terms &&
    agreements.privacy;

  const handleNext = async () => {
    if (!isValid || loading) return;

    setLoading(true);

    try {
      // REGISTER
      await authService.registerCompany(form.name, form.email, form.password);

      // THEN AUTO LOGIN
      const loginRes = await authService.login(form.email, form.password);

      // SAVE AUTH SESSION
      setAuth({
        access_token: loginRes.access_token,
        refresh_token: loginRes.refresh_token,
        user: loginRes.user,
        role: loginRes.user.user_metadata?.role,
        profile: loginRes.profile,
      });

      // SAVE STEP 1 FORM (optional)
      localStorage.setItem("company_step1", JSON.stringify(form));

      // GO TO STEP 2
      navigate("/register/company/details");
    } catch (err: any) {
      console.error("REGISTER COMPANY ERROR:", err);
      alert(err?.response?.data?.message || "Failed to create company account");
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
        <div className="flex items-center justify-center mb-1">
          <img src={KADALOGO} width={120} alt="KADA Logo" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Create Company Account
        </h2>

        <p className="text-gray-500 text-sm text-center -mt-2">
          Enter your personal details
        </p>

        {/* FORM INPUTS */}
        <div className="space-y-4 mt-6">
          {/* FULL NAME */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Full Name"
              className="pl-10 h-12"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              disabled={loading}
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <Input
              placeholder="Email"
              type="email"
              className={`pl-10 pr-10 h-12 ${
                form.email.length > 0 && !isEmailValid
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              disabled={loading}
            />

            {/* CHECK ICON */}
            {form.email.length > 0 && isEmailValid && (
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="pl-10 pr-10 h-12"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              disabled={loading}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* AGREEMENTS */}
        <div className="w-full bg-gray-50 rounded-xl p-4 space-y-3 mt-5">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowAgreements(!showAgreements)}
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={agreements.terms && agreements.privacy}
                onCheckedChange={(checked) => {
                  const v = Boolean(checked);
                  setAgreements({ terms: v, privacy: v });
                }}
              />
              <span className="font-medium">Agree All</span>
            </label>

            {showAgreements ? <ChevronUp /> : <ChevronDown />}
          </div>

          {showAgreements && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={agreements.terms}
                  onCheckedChange={() =>
                    setAgreements((p) => ({ ...p, terms: !p.terms }))
                  }
                />
                <button
                  onClick={() => setShowTermsModal(true)}
                  className="text-sm text-blue-600 underline"
                >
                  Terms of Service *
                </button>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  checked={agreements.privacy}
                  onCheckedChange={() =>
                    setAgreements((p) => ({ ...p, privacy: !p.privacy }))
                  }
                />
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-sm text-blue-600 underline"
                >
                  Privacy Policy *
                </button>
              </div>
            </div>
          )}
        </div>

        {/* NEXT BUTTON */}
        <Button
          disabled={!isValid || loading}
          onClick={handleNext}
          className={`w-full h-12 mt-0 cursor-pointer ${
            !isValid || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/80"
          }`}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Continue"}
        </Button>

        {/* LOGIN LINK */}
        <div className="mt-0 text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 decoration-blue-600 underline-offset-2 hover:underline font-medium cursor-pointer"
          >
            Login
          </button>
        </div>
      </Card>
    </div>
  );
}
