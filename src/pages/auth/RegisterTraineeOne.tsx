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
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react";

import PrivacyPolicyModal from "./PrivacyPolicyModal";
import TermsModal from "./TermsModal";
import KADALOGO from "@/assets/logo/kadalogo.png";

import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

export default function RegisterTraineeStep1() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const [showAgreements, setShowAgreements] = useState(true);
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

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const emailIsValid = isValidEmail(form.email);

  const isValid =
    form.fullName &&
    emailIsValid &&
    form.password.length >= 8 &&
    agreements.terms &&
    agreements.privacy;

  const handleNext = async () => {
    if (!isValid || loading) return;

    setLoading(true);
    try {
      // REGISTER student
      await authService.registerTrainee(
        form.fullName,
        form.email,
        form.password
      );

      // AUTO LOGIN student
      const res = await authService.login(form.email, form.password);

      // SAVE AUTH
      setAuth({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        user: res.user,
        role: res.role,
      });

      // SAVE STEP 1
      localStorage.setItem(
        "trainee_step1",
        JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        })
      );

      navigate("/register/trainee/details");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to create Trainee account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
{showTermsModal && (
  <TermsModal
    onClose={() => setShowTermsModal(false)}
    onAgree={() =>
      setAgreements((prev) => ({ ...prev, terms: true }))
    }
  />
)}

{showPrivacyModal && (
  <PrivacyPolicyModal
    onClose={() => setShowPrivacyModal(false)}
    onAgree={() =>
      setAgreements((prev) => ({ ...prev, privacy: true }))
    }
  />
)}


      <Card className="w-full max-w-lg p-8 border-0 shadow-none">
        {/* LOGO */}
        <div className="flex items-center justify-center">
          <img src={KADALOGO} width={120} alt="KADA Logo" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Create Trainee Account
        </h2>
        <p className="text-gray-500 text-sm text-left -mt-4">
          Enter your personal details
        </p>

        {/* FORM */}
        <div className="space-y-4">
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
              className="pl-10 pr-10 h-12 border-gray-300"
              value={form.email}
              onChange={(e) => {
                update("email", e.target.value);
                if (!isEmailTouched) setIsEmailTouched(true);
              }}
              disabled={loading}
            />

            {isEmailTouched &&
              form.email.length > 0 &&
              (emailIsValid ? (
                <CheckCircle2Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
              ) : (
                <XCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
              ))}
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
        <div className="w-full bg-gray-50 rounded-xl p-4 space-y-3">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowAgreements(!showAgreements)}
          >
            <label
              className="flex items-center gap-3 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                checked={agreements.terms && agreements.privacy}
                onCheckedChange={(checked) => {
                  const v = Boolean(checked);

                  setAgreements({ terms: v, privacy: v });

                  if (v) {
                    setShowAgreements(false);
                  } else {
                    // Jika uncheck → buka lagi
                    setShowAgreements(true);
                  }
                }}
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer"
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
                    setAgreements((prev) => {
                      const updated = { ...prev, terms: !prev.terms };

                      // Jika kedua agreement sudah true → collapse
                      if (updated.terms && updated.privacy) {
                        setShowAgreements(false);
                      } else {
                        setShowAgreements(true);
                      }

                      return updated;
                    })
                  }
                  disabled={loading}
                  className="cursor-pointer"
                />
                <button
                  type="button"
                  className="text-sm text-black underline cursor-pointer"
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
                    setAgreements((prev) => {
                      const updated = { ...prev, privacy: !prev.privacy };

                      if (updated.terms && updated.privacy) {
                        setShowAgreements(false);
                      } else {
                        setShowAgreements(true);
                      }

                      return updated;
                    })
                  }
                  disabled={loading}
                  className="cursor-pointer"
                />
                <button
                  type="button"
                  className="text-sm text-black underline cursor-pointer"
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
          className={`w-full h-12 font-medium ${
            !isValid || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/80 cursor-pointer"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>

        {/* LOGIN LINK */}
        <div className=" text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer  hover:underline font-medium"
          >
            Login
          </button>
        </div>
      </Card>
    </div>
  );
}
