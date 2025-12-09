import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStudentProfileStore } from "@/store/studentProfileStore";
import EditTableField from "@/components/common/edit/EdittableField";
import {
  Pencil,
  Phone,
  Mail,
  Linkedin,
  Globe,
  GraduationCap,
  Briefcase,
  Calendar,
  Star,
} from "lucide-react";

export default function TraineeProfilePage() {
  const {
    profile,
    loading,
    fetchProfile,
    updateProfile,
    uploadPhoto,
    uploadCV,
  } = useStudentProfileStore();

  const [viewMode, setViewMode] = useState<"edit" | "public">("edit");

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading || !profile)
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Floating Mode Toggle */}
      <div className="fixed top-6 right-6 z-50 bg-white rounded-lg shadow-md p-1 border border-gray-200">
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={viewMode === "edit" ? "default" : "ghost"}
            onClick={() => setViewMode("edit")}
            className="rounded-md"
          >
            Edit Mode
          </Button>
          <Button
            size="sm"
            variant={viewMode === "public" ? "default" : "ghost"}
            onClick={() => setViewMode("public")}
            className="rounded-md"
          >
            Public View
          </Button>
        </div>
      </div>

      {viewMode === "edit" ? (
        <ProfileEdit
          profile={profile}
          updateProfile={updateProfile}
          uploadPhoto={uploadPhoto}
          uploadCV={uploadCV}
        />
      ) : (
        <ProfilePublic profile={profile} />
      )}
    </div>
  );
}

/* ----------------------------------------------------
 * EDIT MODE (PRIVATE VIEW) — Matches Figma Layout
 * ---------------------------------------------------- */

const ProfileEdit = ({
  profile,
  updateProfile,
  uploadPhoto,
  uploadCV,
}: any) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* BIG HEADER CARD */}
      <Card className="mb-6 rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-white p-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Profile Photo */}
            <div className="relative flex-shrink-0">
              <img
                src={profile.profilePhoto || "/default-avatar.png"}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                alt="Profile"
              />
              <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer border border-gray-200 hover:bg-gray-50">
                <Pencil className="h-4 w-4 text-gray-600" />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => uploadPhoto(e.target.files?.[0])}
                />
              </label>
            </div>

            {/* Name & Contact */}
            <div className="flex-1 space-y-4">
              <EditTableField
                label=""
                fieldKey="fullName"
                value={profile.fullName || "Your Name"}
                onSave={updateProfile}
              />

              {/* Contact List - Compact styling */}
              <div className="space-y-2">
                <ContactRowCompact
                  icon={<Phone className="h-4 w-4" />}
                  value={profile.phone || "Empty"}
                  fieldKey="phone"
                  onSave={updateProfile}
                />
                <ContactRowCompact
                  icon={<Linkedin className="h-4 w-4" />}
                  value={
                    profile.linkedin || "https://linkedin.com/in/johndoe123"
                  }
                  fieldKey="linkedin"
                  onSave={updateProfile}
                />
                <ContactRowCompact
                  icon={<Mail className="h-4 w-4" />}
                  value={profile.email || "johndoe123@example.com"}
                  fieldKey="email"
                  onSave={updateProfile}
                />
                <ContactRowCompact
                  icon={<Globe className="h-4 w-4" />}
                  value={profile.portfolioLink || "portfolio-johndoe.com"}
                  fieldKey="portfolioLink"
                  onSave={updateProfile}
                />
              </div>
            </div>

            {/* PUBLIC VIEW BUTTON */}
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-lg self-start">
              See Public View
            </Button>
          </div>
        </div>
      </Card>

      {/* 2 COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT (Main Profile Content) - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* GENERAL */}
          <SectionCard title="General">
            <div className="space-y-4">
              <InfoRowWithIcon
                icon={<GraduationCap className="h-5 w-5" />}
                label="Current batch"
                value={profile.batch || "Empty"}
                fieldKey="batch"
                onSave={updateProfile}
              />
              <InfoRowWithIcon
                icon={<Briefcase className="h-5 w-5" />}
                label="Program status"
                value={profile.status || "Empty"}
                fieldKey="status"
                onSave={updateProfile}
              />
              <InfoRowWithIcon
                icon={<Calendar className="h-5 w-5" />}
                label="Employment status"
                value={profile.employmentStatus || "Empty"}
                fieldKey="employmentStatus"
                onSave={updateProfile}
              />
            </div>
          </SectionCard>

          {/* CAPSTONE */}
          <SectionCard title="Capstone Project">
            <EditTableField
              label=""
              fieldKey="capstoneProject"
              value={profile.capstoneProject || "Empty"}
              onSave={updateProfile}
              type="textarea"
            />
            <Button
              variant="outline"
              className="text-purple-600 border-purple-300 hover:bg-purple-50 mt-3"
            >
              Add Project
            </Button>
          </SectionCard>

          {/* RESUME */}
          <SectionCard title="Resume">
            <div className="text-gray-500 text-sm mb-3">
              {profile.cvUpload ? (
                <a
                  href={profile.cvUpload}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View CV
                </a>
              ) : (
                "Empty"
              )}
            </div>
            <input
              type="file"
              className="hidden"
              id="cvInput"
              onChange={(e) => uploadCV(e.target.files?.[0])}
            />
            <Button
              variant="outline"
              className="text-purple-600 border-purple-300 hover:bg-purple-50"
              onClick={() => document.getElementById("cvInput")?.click()}
            >
              Upload New
            </Button>
          </SectionCard>

          {/* INTRODUCTION */}
          <SectionCard title="Introduction">
            <EditTableField
              type="textarea"
              label=""
              fieldKey="selfIntroduction"
              value={
                profile.selfIntroduction ||
                "Skilled in business management, data analysis, and network monitoring, with a strong track record in team leadership and project coordination. Experienced as a laboratory administrator, mentor, committee member, and division coordinator."
              }
              onSave={updateProfile}
            />
          </SectionCard>

          {/* EDUCATION */}
          <SectionCard title="Education">
            <div className="space-y-3">
              <EditTableField
                label="Major"
                fieldKey="major"
                value={profile.major || "Bachelor of Quantum Mechanics"}
                onSave={updateProfile}
              />
              <EditTableField
                label="University"
                fieldKey="university"
                value={profile.university || "University of"}
                onSave={updateProfile}
              />
            </div>
          </SectionCard>

          {/* PREFERRED INDUSTRY */}
          <SectionCard title="Preferred Industry">
            <EditTableField
              label=""
              fieldKey="preferredIndustry"
              value={profile.preferredIndustry || "Education, Finance, Marine"}
              onSave={updateProfile}
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {(
                profile.preferredIndustry?.split(",") || [
                  "Education",
                  "Finance",
                  "Marine",
                ]
              ).map((industry: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm"
                >
                  {industry.trim()}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* TECH STACK */}
          <SectionCard title="Tech Stack">
            <EditTableField
              label=""
              fieldKey="techStack"
              value={profile.techStack || "React, TensorFlow"}
              onSave={updateProfile}
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {(profile.techStack?.split(",") || ["React", "TensorFlow"]).map(
                (tech: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-md text-sm"
                  >
                    {tech.trim()}
                  </span>
                )
              )}
            </div>
          </SectionCard>
        </div>

        {/* RIGHT SIDEBAR - 1 column */}
        <div className="space-y-6">
          {/* PROFILE COMPLETION */}
          <SectionCard title="Profile Completion">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${profile.completionRate ?? 0}%`,
                }}
              ></div>
            </div>

            {/* Percentage Text (optional but recommended like Figma UX) */}
            <p className="text-sm font-medium text-gray-700 mb-2">
              {profile.completionRate
                ? `${profile.completionRate}% complete`
                : "0% complete"}
            </p>

            {/* Helper Text */}
            <p className="text-gray-500 text-sm leading-relaxed">
              Complete your profile so more companies can discover you.
            </p>
          </SectionCard>

          {/* TESTIMONY */}
          <SectionCard title="Testimony">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-5 w-5 text-gray-300 fill-gray-300"
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Your Overall experience with KADA
            </p>

            <EditTableField
              type="textarea"
              label=""
              fieldKey="testimony"
              value={profile.testimony || "Empty"}
              onSave={updateProfile}
            />
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

const ProfilePublic = ({ profile }: any) => {
  const industries =
    profile.preferredIndustry?.split(",").map((x: string) => x.trim()) || [];

  const techStack =
    profile.techStack?.split(",").map((x: string) => x.trim()) || [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">
      {/* ============ HEADER CARD ============ */}
      <Card className="rounded-2xl shadow-sm border border-gray-200">
        <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          
          {/* PHOTO */}
          <img
            src={profile.profilePhoto || "/default-avatar.png"}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
            alt="Profile"
          />

          {/* MAIN INFO */}
          <div className="flex-1">

            {/* NAME */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              {profile.fullName}
            </h1>

            {/* BADGE GROUP */}
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.batch && (
                <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md">
                  {profile.batch}
                </span>
              )}

              {profile.status && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
                  {profile.status}
                </span>
              )}

              {profile.employmentStatus && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md">
                  {profile.employmentStatus}
                </span>
              )}
            </div>

            {/* CONTACT INFO */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mb-4">

              {profile.phone && (
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {profile.phone}
                </span>
              )}

              {profile.linkedin && (
                <button
                  onClick={() => window.open(profile.linkedin, "_blank")}
                  className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded"
                >
                  <Linkedin className="h-4 w-4 text-gray-600" />
                </button>
              )}

              {profile.email && (
                <button
                  onClick={() => (window.location.href = `mailto:${profile.email}`)}
                  className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded"
                >
                  <Mail className="h-4 w-4 text-gray-600" />
                </button>
              )}

              {profile.portfolioLink && (
                <button
                  onClick={() => window.open(profile.portfolioLink, "_blank")}
                  className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded"
                >
                  <Globe className="h-4 w-4 text-gray-600" />
                </button>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              {profile.cvUpload && (
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-lg"
                  onClick={() => window.open(profile.cvUpload, "_blank")}
                >
                  Download CV
                </Button>
              )}

              {profile.portfolioLink && (
                <Button
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 rounded-lg"
                  onClick={() => window.open(profile.portfolioLink, "_blank")}
                >
                  View Portfolio
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* ============ CAPSTONE PROJECT ============ */}
      {profile.capstoneProject && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Capstone Project
          </h2>

          <Card className="rounded-2xl shadow-sm border-gray-200 overflow-hidden">
            <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Black overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Project Title */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{profile.capstoneProject}</h3>
              </div>

              {/* Optional: project link if exists */}
              {profile.projectLink && (
                <button
                  onClick={() => window.open(profile.projectLink, "_blank")}
                  className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-lg"
                >
                  <Globe className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* ============ INTRODUCTION ============ */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
        <Card className="rounded-2xl shadow-sm border-gray-200">
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed">
              {profile.selfIntroduction || "No introduction provided."}
            </p>
          </div>
        </Card>
      </div>

      {/* ============ EDUCATION ============ */}
      {(profile.university || profile.major) && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Education</h2>
          <Card className="rounded-2xl shadow-sm border-gray-200">
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-1">
                {profile.university || "No university provided"}
              </p>
              <p className="text-gray-900 font-medium">
                {profile.major || "No major provided"}
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* ============ PREFERRED INDUSTRY ============ */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Preferred Industry</h2>
        <div className="flex flex-wrap gap-2">
          {industries.length > 0 ? (
            industries.map((industry: string, i: number) => (
              <span
                key={i}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium"
              >
                {industry}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No preferred industries listed.</p>
          )}
        </div>
      </div>

      {/* ============ TECH STACK ============ */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {techStack.length > 0 ? (
            techStack.map((tech: string, i: number) => (
              <span
                key={i}
                className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg text-sm font-medium"
              >
                {tech}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No tech stack provided.</p>
          )}
        </div>
      </div>

      {/* ============ TESTIMONY ============ */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Testimony</h2>
        <Card className="rounded-2xl shadow-sm border-gray-200">
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed">
              {profile.testimony || "No testimony provided yet."}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};


/* ----------------------------------------------------
 * HELPER COMPONENTS
 * ---------------------------------------------------- */

const SectionCard = ({ title, children }: any) => {
  return (
    <Card className="rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
        {children}
      </div>
    </Card>
  );
};

const ContactRowCompact = ({ icon, value, fieldKey, onSave }: any) => {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-gray-500">{icon}</span>
      <EditTableField
        label=""
        fieldKey={fieldKey}
        value={value}
        onSave={onSave}
      />
    </div>
  );
};

const InfoRowWithIcon = ({ icon, label, value, fieldKey, onSave }: any) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        <span className="text-gray-500">{icon}</span>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <div className="flex items-center gap-2 flex-1 justify-end">
        <EditTableField
          label=""
          fieldKey={fieldKey}
          value={value}
          onSave={onSave}
        />
      </div>
    </div>
  );
};
