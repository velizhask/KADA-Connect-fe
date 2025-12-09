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

export default function RegisterCompanyStep1() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const [showAgreements, setShowAgreements] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });

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
      // REGISTER company
      await authService.registerCompany(
        form.fullName,
        form.email,
        form.password
      );

      // AUTO LOGIN company
      const res = await authService.login(form.email, form.password);

      // SAVE AUTH
      setAuth({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        user: res.user,
        role: res.role, // gunakan role metadata
      });

      // SAVE STEP 1
      localStorage.setItem(
        "company_step1",
        JSON.stringify({
          fullName: form.fullName,
          email: form.email,
        })
      );

      navigate("/register/company/details");
    } catch (err: any) {
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
        <div className="flex items-center justify-center">
          <img src={KADALOGO} width={120} alt="KADA Logo" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Create Company Account
        </h2>
        <p className="text-gray-500 text-sm text-left -mt-4">
          Enter your personal details
        </p>

        {/* FORM */}
        <div className="space-y-4 mt-4">
          {/* FULL NAME */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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

        {/* AGREEMENTS */}
        <div className="w-full bg-gray-50 rounded-xl p-4 mt-6 space-y-3">
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

            {showAgreements ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </div>

          {showAgreements && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={agreements.terms}
                  onCheckedChange={() =>
                    setAgreements((p) => ({ ...p, terms: !p.terms }))
                  }
                  disabled={loading}
                />
                <button
                  type="button"
                  className="text-sm text-blue-600 underline"
                  onClick={() => setShowTermsModal(true)}
                  disabled={loading}
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
                  disabled={loading}
                />
                <button
                  type="button"
                  className="text-sm text-blue-600 underline"
                  onClick={() => setShowPrivacyModal(true)}
                  disabled={loading}
                >
                  Privacy Policy *
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          disabled={!isValid || loading}
          onClick={handleNext}
          className={`w-full h-12 mt-4 font-medium ${
            !isValid || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/80"
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
            className="text-blue-600 underline hover:underline-offset-2 font-medium"
          >
            Login
          </button>
        </div>
      </Card>
    </div>
  );
}
