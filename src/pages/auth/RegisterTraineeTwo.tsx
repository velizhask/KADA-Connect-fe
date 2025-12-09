// src/pages/register/RegisterTraineeStep2.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Building2, FileText } from "lucide-react";
import KADALOGO from "@/assets/logo/kadalogo.png";
import { studentServices } from "@/services/studentServices";
import { useAuthStore } from "@/store/authStore";

type TraineeForm = {
  university: string;
  major: string;
  preferredIndustry: string;
  techStack: string;
  employmentStatus: string;
  status: string;
  selfIntroduction: string;
};

export default function RegisterTraineeStep2() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<TraineeForm>({
    university: "",
    major: "",
    preferredIndustry: "",
    techStack: "",
    employmentStatus: "",
    status: "",
    selfIntroduction: "",
  });

  const update = (key: keyof TraineeForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const requiredKeys: (keyof TraineeForm)[] = [
    "university",
    "major",
    "preferredIndustry",
    "techStack",
    "employmentStatus",
    "status",
  ];

  const isValid = requiredKeys.every((k) => form[k].trim() !== "");
  const handleSubmit = async () => {
    if (!isValid || loading) return;

    setLoading(true);
    try {
      const { user, accessToken, refreshToken, role, setAuth } =
        useAuthStore.getState();

      const payload = {
        fullName: user?.user_metadata?.fullName || "",
        status: form.status,
        employmentStatus: form.employmentStatus,
        university: form.university,
        major: form.major,
        preferredIndustry: form.preferredIndustry,
        techStack: form.techStack,
        selfIntroduction: form.selfIntroduction,
      };

      const res = await studentServices.createStudent(payload);
      const createdStudent = res.data?.data;

      if (createdStudent) {
        // 🔥 samakan bentuknya dengan hasil login
        setAuth({
          accessToken,
          refreshToken,
          user,
          role, // "student"
          profile: createdStudent,
        });
      }

      localStorage.removeItem("trainee_step1");

      // 🔥 langsung arahkan ke profile trainee
      navigate("/trainees/profile");
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          "Failed to complete trainee registration"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-lg p-8 border-0 shadow-none">
        <div className="flex items-center justify-center mb-4">
          <img src={KADALOGO} width={120} alt="KADA Logo" />
        </div>

        <h2 className="text-2xl font-semibold text-center">
          Create Trainee Account
        </h2>
        <p className="text-gray-500 text-sm text-center -mt-1">
          Create your profile
        </p>

        <div className="space-y-4 mt-6">
          {/* UNIVERSITY */}
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 text-gray-400" />
            <Input
              placeholder="University *"
              value={form.university}
              onChange={(e) => update("university", e.target.value)}
              className="h-12 pl-10"
            />
          </div>

          {/* MAJOR */}
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 text-gray-400" />
            <Input
              placeholder="Major *"
              value={form.major}
              onChange={(e) => update("major", e.target.value)}
              className="h-12 pl-10"
            />
          </div>

          {/* PREFERRED INDUSTRY */}
          <Input
            placeholder="Preferred Industry *"
            value={form.preferredIndustry}
            onChange={(e) => update("preferredIndustry", e.target.value)}
            className="h-12"
          />

          {/* TECH STACK */}
          <Input
            placeholder="Tech Stack *"
            value={form.techStack}
            onChange={(e) => update("techStack", e.target.value)}
            className="h-12"
          />

          {/* STATUS */}
          <select
            className="w-full h-12 px-3 border border-gray-300 rounded-md bg-white"
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Current Trainee">Current Trainee</option>
            <option value="Alumni">Alumni</option>
          </select>

          {/* EMPLOYMENT STATUS */}
          <select
            className="w-full h-12 px-3 border border-gray-300 rounded-md bg-white"
            value={form.employmentStatus}
            onChange={(e) => update("employmentStatus", e.target.value)}
          >
            <option value="">Employment Status *</option>
            <option value="Open to work">Open to work</option>
            <option value="Looking for internship">
              Looking for internship
            </option>
            <option value="Employed">Employed</option>
          </select>

          {/* SELF INTRO */}
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
