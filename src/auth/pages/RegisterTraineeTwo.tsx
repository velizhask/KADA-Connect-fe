import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Building2, FileText, Link as LinkIcon, Phone } from "lucide-react";
import KADALOGO from "@/assets/logo/kadalogo.png";
import { useStudentProfileStore } from "@/store/studentProfileStore";

export default function RegisterTraineeStep2() {
  const navigate = useNavigate();
  const updateProfile = useStudentProfileStore((state) => state.updateProfile);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    university: "",
    major: "",
    preferredIndustry: "",
    techStack: "",
    employmentStatus: "",
    portfolioLink: "",
    selfIntroduction: "",
    linkedin: "",
    phone: "",
  });

  const update = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isValid =
    form.university &&
    form.major &&
    form.preferredIndustry &&
    form.techStack &&
    form.employmentStatus;

  const handleSubmit = async () => {
    if (!isValid || loading) return;

    setLoading(true);

    try {
      // Ambil nama & email dari step 1
      const step1 = JSON.parse(localStorage.getItem("trainee_step1") || "{}");

      // Gabungkan data
      const payload = {
        fullName: step1.fullName,
        linkedin: form.linkedin,
        phone: form.phone,
        university: form.university,
        major: form.major,
        preferredIndustry: form.preferredIndustry,
        techStack: form.techStack,
        employmentStatus: form.employmentStatus,
        portfolioLink: form.portfolioLink,
        selfIntroduction: form.selfIntroduction,
      };

      await updateProfile(payload);

      // Bersihkan
      localStorage.removeItem("trainee_step1");

      navigate("/trainees/profile");
    } catch (err: any) {
      console.log("TRAINEE STEP 2 ERROR:", err);
      alert(err?.response?.data?.message || "Failed to complete trainee registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-lg p-8 border-0 shadow-none">
        
        {/* LOGO */}
        <div className="flex items-center justify-center">
          <img src={KADALOGO} width={120} alt="KADA Logo" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Complete Your Trainee Profile
        </h2>

        <p className="text-gray-500 text-sm text-left -mt-4">
          Enter your academic & professional details
        </p>

        <div className="space-y-4 mt-4">

          {/* UNIVERSITY */}
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
            <Input
              placeholder="University"
              className="pl-10 h-12"
              value={form.university}
              onChange={(e) => update("university", e.target.value)}
            />
          </div>

          {/* MAJOR */}
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
            <Input
              placeholder="Major"
              className="pl-10 h-12"
              value={form.major}
              onChange={(e) => update("major", e.target.value)}
            />
          </div>

          {/* INDUSTRY */}
          <Input
            placeholder="Preferred Industry (e.g. AI, Biomed)"
            value={form.preferredIndustry}
            onChange={(e) => update("preferredIndustry", e.target.value)}
          />

          {/* TECH STACK */}
          <Input
            placeholder="Tech Stack (e.g. JS, TS, Python)"
            value={form.techStack}
            onChange={(e) => update("techStack", e.target.value)}
          />

          {/* EMPLOYMENT STATUS */}
          <Input
            placeholder="Employment Status (e.g. Open to Work)"
            value={form.employmentStatus}
            onChange={(e) => update("employmentStatus", e.target.value)}
          />

          {/* PORTFOLIO */}
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
            <Input
              placeholder="Portfolio URL"
              className="pl-10 h-12"
              value={form.portfolioLink}
              onChange={(e) => update("portfolioLink", e.target.value)}
            />
          </div>

          {/* LINKEDIN */}
          <Input
            placeholder="LinkedIn URL"
            value={form.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
          />

          {/* PHONE */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
            <Input
              placeholder="Phone number"
              className="pl-10 h-12"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>

          {/* SELF INTRODUCTION */}
          <div>
            <FileText className="w-5 h-5 mb-1 text-gray-500" />
            <Textarea
              placeholder="Introduce yourself"
              value={form.selfIntroduction}
              onChange={(e) => update("selfIntroduction", e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          disabled={!isValid || loading}
          onClick={handleSubmit}
          className="w-full h-12 mt-6 font-medium bg-primary text-white hover:bg-primary/80"
        >
          {loading ? "Loading..." : "Complete Registration"}
        </Button>
      </Card>
    </div>
  );
}
