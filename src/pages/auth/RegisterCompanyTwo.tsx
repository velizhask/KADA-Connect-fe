// ==========================================
// RegisterCompanyStep2.tsx — FINAL CLEAN VERSION
// ==========================================

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Building2, Globe, Linkedin, FileText, Tag, Phone } from "lucide-react";

import KADALOGO from "@/assets/logo/kadalogo.png";
import { companyServices } from "@/services/companyServices";
import { useAuthMeStore } from "@/store/authMeStore";

export default function RegisterCompanyStep2() {
  const navigate = useNavigate();
  const fetchProfile = useAuthMeStore((s) => s.fetchProfile);

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

  const update = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const isValidUrl = (u: string) => {
    if (!u) return true;
    try {
      new URL(u);
      return true;
    } catch {
      return false;
    }
  };

  const isValid =
    form.companyName &&
    form.summary.length >= 10 &&
    form.sectors.length &&
    form.skills.length &&
    form.roles.length &&
    isValidUrl(form.website) &&
    isValidUrl(form.linkedin);

  const [temp, setTemp] = useState({
    sector: "",
    skill: "",
    role: "",
  });

  const add = (key: "sectors" | "skills" | "roles") => {
    const mapKey = key.slice(0, -1) as "sector" | "skill" | "role";
    const value = temp[mapKey].trim();
    if (!value) return;

    setForm((prev) => ({ ...prev, [key]: [...prev[key], value] }));
    setTemp((prev) => ({ ...prev, [mapKey]: "" }));
  };

  const remove = (key: "sectors" | "skills" | "roles", v: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((i) => i !== v),
    }));
  };

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

        contactPersonName: step1.fullName,
        contactEmailAddress: step1.email,
        contactPhoneNumber: form.phone,
        contactInfoVisible: form.contactInfoVisible,

        emailAddress: step1.email,
        isVisible: true,
      };

      await companyServices.createCompanyProfile(payload);

      await fetchProfile();

      localStorage.removeItem("company_step1");
      localStorage.removeItem("company_step2");

      navigate("/companies/me");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Company registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-lg p-8 border-0 shadow-none">
        <div className="flex justify-center">
          <img src={KADALOGO} width={120} />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Create Company Account
        </h2>
        <p className="text-gray-500 text-sm -mt-4 ">
          Enter your company details
        </p>

        <div className="space-y-4">
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 h-12"
              placeholder="Company Name"
              value={form.companyName}
              onChange={(e) => update("companyName", e.target.value)}
            />
          </div>

          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 h-12"
              placeholder="Website URL (https://company.com)"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </div>

          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 h-12"
              placeholder="LinkedIn URL (https://linkedin.com/in/company)"
              value={form.linkedin}
              onChange={(e) => update("linkedin", e.target.value)}
            />
          </div>

          <div className="relative">
            <FileText className="absolute left-3 top-4 text-gray-400" />
            <textarea
              className="w-full pl-10 pr-4 py-3 border rounded-md"
              placeholder="Summary (min. 10 chars)"
              value={form.summary}
              onChange={(e) => update("summary", e.target.value)}
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 h-12"
              placeholder="Contact Phone"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.contactInfoVisible}
              onChange={(e) => update("contactInfoVisible", e.target.checked)}
            />
            <span className="text-sm">Show contact information publicly</span>
          </div>

          {/* SECTORS */}
          <div>
            <label className="font-medium text-sm">Sector</label>
            <div className="flex gap-2 mt-1 relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 h-12"
                placeholder="e.g., AI"
                value={temp.sector}
                onChange={(e) => setTemp({ ...temp, sector: e.target.value })}
              />
              <Button onClick={() => add("sectors")} className="h-12">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.sectors.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center px-3 py-1 rounded-md bg-blue-100 text-blue-700"
                >
                  {v}
                  <button
                    className="ml-2 text-blue-500 hover:text-blue-700 font-bold"
                    onClick={() => remove("sectors", v)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* SKILLS */}
          <div>
            <label className="font-medium text-sm">Preferred Skillsets</label>
            <div className="flex gap-2 mt-1 relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 h-12"
                placeholder="e.g., PyTorch"
                value={temp.skill}
                onChange={(e) => setTemp({ ...temp, skill: e.target.value })}
              />
              <Button onClick={() => add("skills")} className="h-12">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.skills.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center px-3 py-1 rounded-md bg-blue-100 text-blue-700"
                >
                  {v}
                  <button
                    className="ml-2 text-blue-500 hover:text-blue-700 font-bold"
                    onClick={() => remove("skills", v)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* ROLES */}
          <div>
            <label className="font-medium text-sm">Interested Roles</label>
            <div className="flex gap-2 mt-1 relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 h-12"
                placeholder="e.g., AI Engineer"
                value={temp.role}
                onChange={(e) => setTemp({ ...temp, role: e.target.value })}
              />
              <Button onClick={() => add("roles")} className="h-12">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.roles.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center px-3 py-1 rounded-md bg-blue-100 text-blue-700"
                >
                  {v}
                  <button
                    className="ml-2 text-blue-500 hover:text-blue-700 font-bold"
                    onClick={() => remove("roles", v)}
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
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Card>
    </div>
  );
}
