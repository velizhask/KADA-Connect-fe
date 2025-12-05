import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Globe,
  Linkedin,
  FileText,
  Tag,
  Phone,
  ChevronLeft,
} from "lucide-react";
import KADALOGO from "@/assets/logo/kadalogo.png";
import { companyServices } from "@/services/companyServices";

export default function RegisterCompanyStep2() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    website: "",
    linkedin: "",
    summary: "",
    sectors: [] as string[],
    skills: [] as string[],
    roles: [] as string[],
    phone: "",
    contactInfoVisible: false,
  });

  const update = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isValidUrl = (url: string) => {
    if (!url) return true; // allow empty URL if backend allows
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  const isValid =
    form.companyName &&
    form.summary.length >= 10 &&
    form.sectors.length > 0 &&
    form.skills.length > 0 &&
    form.roles.length > 0 &&
    isValidUrl(form.website) &&
    isValidUrl(form.linkedin);

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);

    try {
      const step1 = JSON.parse(localStorage.getItem("company_step1") || "{}");
      const payload = {
        companyName: form.companyName,
        companySummary: form.summary,

        industry: form.sectors,
        techRoles: form.roles,
        preferredSkillsets: form.skills,

        companyWebsite: form.website,
        linkedin: form.linkedin,

        contactPersonName: step1.name,
        contactEmailAddress: step1.email,
        contactPhoneNumber: form.phone || "", // <-- FIXED
        contactInfoVisible: form.contactInfoVisible,

        emailAddress: step1.email,
        isVisible: true,
      };

      await companyServices.createCompanyProfile(payload);

      localStorage.removeItem("company_step1");
      localStorage.removeItem("company_step2");

      navigate("/register/submitted");
    } catch (err: any) {
      console.log("COMPANY REGISTER ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Company registration failed");
    } finally {
      setLoading(false);
    }
  };

  const [temp, setTemp] = useState({
    sector: "",
    skill: "",
    role: "",
  });

  const add = (key: "sectors" | "skills" | "roles") => {
    const value = temp[key.slice(0, -1) as "sector" | "skill" | "role"];
    if (!value.trim()) return;

    setForm((prev) => ({
      ...prev,
      [key]: [...prev[key], value.trim()],
    }));

    setTemp((prev) => ({ ...prev, [key.slice(0, -1)]: "" }));
  };

  const remove = (key: "sectors" | "skills" | "roles", value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((item) => item !== value),
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-lg p-8 border-0 shadow-none">
        {/* LOGO */}
        <div className="flex items-center justify-center">
          <img src={KADALOGO} width={120} alt="KADA Logo" />
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          Create Company Account
        </h2>
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-primary hover:text-primary-700 text-sm font-medium mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <p className="text-gray-500 text-sm text-left -mt-4">
          Enter your company details
        </p>

        <div className="space-y-4">
          {/* COMPANY NAME */}
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Name"
              className="pl-10 h-12 border-gray-300"
              value={form.companyName}
              onChange={(e) => update("companyName", e.target.value)}
              disabled={loading}
            />
          </div>

          {/* WEBSITE */}
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="https://yourcompany.com"
              className="pl-10 h-12 border-gray-300"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              disabled={loading}
            />
          </div>

          {/* LINKEDIN */}
          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="LinkedIn URL"
              className="pl-10 h-12 border-gray-300"
              value={form.linkedin}
              onChange={(e) => update("linkedin", e.target.value)}
              disabled={loading}
            />
          </div>
          {/* PHONE NUMBER */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <Input
              placeholder="Contact phone number"
              className="pl-10 h-12 border-gray-300"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              disabled={loading}
            />
          </div>

          {/* SHOW CONTACT INFO */}
          <div className="flex items-center gap-3 mt-1">
            <input
              type="checkbox"
              checked={form.contactInfoVisible}
              onChange={(e) => update("contactInfoVisible", e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm text-gray-700">
              Show contact information publicly
            </span>
          </div>

          {/* SUMMARY */}
          <div className="relative">
            <FileText className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
            <textarea
              placeholder="Brief summary of your company (min. 10 characters)"
              className="w-full pl-10 pr-4 py-3 border rounded-xl text-sm min-h-[110px]"
              value={form.summary}
              onChange={(e) => update("summary", e.target.value)}
              disabled={loading}
            />
          </div>

          {/* ===== SECTOR ===== */}
          <div className="space-y-2">
            <label className="font-medium text-sm">Sector</label>

            <div className="relative flex gap-2">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="e.g. Healthcare"
                className="pl-10 h-12"
                value={temp.sector}
                onChange={(e) => setTemp({ ...temp, sector: e.target.value })}
                disabled={loading}
              />
              <Button
                onClick={() => add("sectors")}
                disabled={loading}
                className="h-12 px-6 bg-primary hover:bg-primary/80 text-white"
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.sectors.map((value) => (
                <span
                  key={value}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm cursor-pointer"
                  onClick={() => remove("sectors", value)}
                >
                  {value} ✕
                </span>
              ))}
            </div>
          </div>

          {/* ===== SKILLS ===== */}
          <div className="space-y-2">
            <label className="font-medium text-sm">Preferred Skillsets</label>

            <div className="relative flex gap-2">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="e.g. PyTorch"
                className="pl-10 h-12"
                value={temp.skill}
                onChange={(e) => setTemp({ ...temp, skill: e.target.value })}
                disabled={loading}
              />
              <Button
                onClick={() => add("skills")}
                disabled={loading}
                className="h-12 px-6 bg-primary hover:bg-primary/80 text-white"
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.skills.map((value) => (
                <span
                  key={value}
                  className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm cursor-pointer"
                  onClick={() => remove("skills", value)}
                >
                  {value} ✕
                </span>
              ))}
            </div>
          </div>

          {/* ===== ROLES ===== */}
          <div className="space-y-2">
            <label className="font-medium text-sm">Interested Roles</label>

            <div className="relative flex gap-2">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="e.g. AI Engineer"
                className="pl-10 h-12"
                value={temp.role}
                onChange={(e) => setTemp({ ...temp, role: e.target.value })}
                disabled={loading}
              />
              <Button
                onClick={() => add("roles")}
                disabled={loading}
                className="h-12 px-6 bg-primary hover:bg-primary/80 text-white"
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.roles.map((value) => (
                <span
                  key={value}
                  className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm cursor-pointer"
                  onClick={() => remove("roles", value)}
                >
                  {value} ✕
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          disabled={!isValid || loading}
          onClick={handleSubmit}
          className={`w-full h-12 font-medium transition-all ${
            !isValid || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/80"
          }`}
        >
          Submit
        </Button>
      </Card>
    </div>
  );
}
