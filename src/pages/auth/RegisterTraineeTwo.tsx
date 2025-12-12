// src/pages/register/RegisterTraineeStep2.tsx

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

import {
  GraduationCap,
  Building2,
  Briefcase,
  Code,
  FileText,
} from "lucide-react";

import KADALOGO from "@/assets/logo/kadalogo.png";
import { studentServices } from "@/services/studentServices";
import { useAuthStore } from "@/store/authStore";

export default function RegisterTraineeStep2() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ======================================================
  // FORM STATE
  // ======================================================
  const [form, setForm] = useState({
    university: "",
    major: "",
    preferredIndustries: [] as string[],
    techStacks: [] as string[],
    employmentStatus: "",
    status: "",
    selfIntroduction: "",
  });

  const update = (k: string, v: any) =>
    setForm((p) => ({ ...p, [k]: v }));

  // ======================================================
  // TEMP INPUT (ADD–ADD)
  // ======================================================
  const [temp, setTemp] = useState({
    industry: "",
    tech: "",
  });

  const add = (key: "preferredIndustries" | "techStacks") => {
    const mapKey = key === "preferredIndustries" ? "industry" : "tech";
    const value = temp[mapKey].trim();
    if (!value) return;

    setForm((prev) => ({
      ...prev,
      [key]: [...prev[key], value],
    }));

    setTemp((prev) => ({ ...prev, [mapKey]: "" }));
  };

  const remove = (key: "preferredIndustries" | "techStacks", v: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((i) => i !== v),
    }));
  };

  // ======================================================
  // VALIDATION
  // ======================================================
  const isValid =
    form.university &&
    form.major &&
    form.preferredIndustries.length &&
    form.techStacks.length &&
    form.employmentStatus &&
    form.status;

  // ======================================================
  // SUBMIT
  // ======================================================
  const handleSubmit = async () => {
    if (!isValid || loading) return;
    setLoading(true);

    try {
      const { user, accessToken, refreshToken, role, setAuth } =
        useAuthStore.getState();

      const payload = {
        fullName: user?.user_metadata?.fullName || "",
        university: form.university,
        major: form.major,
        status: form.status,
        employmentStatus: form.employmentStatus,

        // ⬇️ ARRAY → STRING (BACKEND SAFE)
        preferredIndustry: form.preferredIndustries.join(", "),
        techStack: form.techStacks.join(", "),

        selfIntroduction: form.selfIntroduction,
      };

      const res = await studentServices.createStudent(payload);
      const createdStudent = res.data?.data;

      if (createdStudent) {
        setAuth({
          accessToken,
          refreshToken,
          user,
          role,
          profile: createdStudent,
        });
      }

      localStorage.removeItem("trainee_step1");
      navigate("/trainees/me");
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          "Failed to complete trainee registration"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // RENDER
  // ======================================================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-lg p-8 border-0 shadow-none">
        {/* LOGO */}
        <div className="flex justify-center">
          <img src={KADALOGO} width={120} />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Create Trainee Account
        </h2>
        <p className="text-gray-500 text-sm -mt-4 text-center">
          Complete your profile details
        </p>

        <div className="space-y-4 mt-6">
          {/* UNIVERSITY */}
          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 h-12"
              placeholder="University "
              value={form.university}
              onChange={(e) => update("university", e.target.value)}
            />
          </div>

          {/* MAJOR */}
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 h-12"
              placeholder="Major"
              value={form.major}
              onChange={(e) => update("major", e.target.value)}
            />
          </div>



          {/* STATUS */}
          <select
            className="w-full h-12 px-3 border border-gray-300 rounded-md bg-white"
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
          >
            <option value="">Select Status </option>
            <option value="Current Trainee">Current Trainee</option>
            <option value="Alumni">Alumni</option>
          </select>

          {/* EMPLOYMENT STATUS */}
          <select
            className="w-full h-12 px-3 border border-gray-300 rounded-md bg-white"
            value={form.employmentStatus}
            onChange={(e) => update("employmentStatus", e.target.value)}
          >
            <option value="">Employment Status </option>
            <option value="Open to work">Open to work</option>
            <option value="Employed">Employed</option>
          </select>

          {/* SELF INTRO */}
          <div className="relative">
            <FileText className="absolute left-3 top-4 text-gray-400" />
            <Textarea
              className="pl-10 min-h-[100px]"
              placeholder="Introduce yourself"
              value={form.selfIntroduction}
              onChange={(e) =>
                update("selfIntroduction", e.target.value)
              }
            />
          </div>

                    {/* PREFERRED INDUSTRY */}
          <div>
            <label className="font-medium text-sm">Preferred Industry </label>
            <div className="flex gap-2 mt-1 relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 h-12"
                placeholder="e.g. FinTech"
                value={temp.industry}
                onChange={(e) =>
                  setTemp({ ...temp, industry: e.target.value })
                }
              />
              <Button onClick={() => add("preferredIndustries")} className="h-12">
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {form.preferredIndustries.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center px-3 py-1 rounded-md bg-blue-100 text-blue-700"
                >
                  {v}
                  <button
                    className="ml-2 text-blue-500 hover:text-blue-700 font-bold"
                    onClick={() => remove("preferredIndustries", v)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* TECH STACK */}
          <div>
            <label className="font-medium text-sm">Tech Stack </label>
            <div className="flex gap-2 mt-1 relative">
              <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 h-12"
                placeholder="e.g. React"
                value={temp.tech}
                onChange={(e) =>
                  setTemp({ ...temp, tech: e.target.value })
                }
              />
              <Button onClick={() => add("techStacks")} className="h-12">
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {form.techStacks.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center px-3 py-1 rounded-md bg-blue-100 text-blue-700"
                >
                  {v}
                  <button
                    className="ml-2 text-blue-500 hover:text-blue-700 font-bold"
                    onClick={() => remove("techStacks", v)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>


        <Button
          className="w-full h-12 mt-6"
          disabled={!isValid || loading}
          onClick={handleSubmit}
        >
          {loading ? "Submitting..." : "Complete Registration"}
        </Button>
      </Card>
    </div>
  );
}
