// ===============================================
//  TraineeProfile.tsx — FINAL REFACTORED VERSION
// ===============================================

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";

import {
  Phone,
  Mail,
  Linkedin,
  Globe,
  Star,
  GraduationCap,
  Briefcase,
  Calendar,
} from "lucide-react";

import EditTableField from "@/components/common/edit/EdittableField";
import { useAuthMeStore } from "@/store/authMeStore";

// ===============================================
//  MAIN PAGE
// ===============================================

export default function TraineeProfile() {
  const {
    profile,
    loading,
    fetchProfile,
    updateProfile,
    uploadPhoto,
    uploadCV,
  } = useAuthMeStore();

  const [viewMode, setViewMode] = useState<"edit" | "public">("edit");

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading || !profile) {
    return (
      <MainLayout>
        <div className="h-screen flex items-center justify-center text-xl">
          Loading profile...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pb-20">

        {/* TOGGLE MODE */}
        <div className="fixed top-6 right-6 z-40 bg-white rounded-lg shadow-md p-1 border border-gray-200">
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={viewMode === "edit" ? "default" : "ghost"}
              onClick={() => setViewMode("edit")}
            >
              Edit
            </Button>

            <Button
              size="sm"
              variant={viewMode === "public" ? "default" : "ghost"}
              onClick={() => setViewMode("public")}
            >
              Public View
            </Button>
          </div>
        </div>

        {/* CONTENT */}
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
    </MainLayout>
  );
}

// ===============================================
//  EDIT MODE COMPONENT
// ===============================================

const ProfileEdit = ({ profile, updateProfile, uploadPhoto, uploadCV }: any) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* HEADER */}
      <Card className="rounded-2xl shadow-sm border border-gray-200 mb-6 p-8 flex gap-8">

        {/* PHOTO */}
        <div className="relative">
          <img
            src={profile.profilePhoto || "/default-avatar.png"}
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-200"
          />
          <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full border shadow cursor-pointer hover:bg-gray-100">
            <input
              type="file"
              className="hidden"
              onChange={(e) => uploadPhoto(e.target.files?.[0])}
            />
            ✎
          </label>
        </div>

        {/* BASIC INFO */}
        <div className="flex-1 space-y-3">
          <EditTableField
            fieldKey="fullName"
            value={profile.fullName}
            onSave={updateProfile}
          />

          <ContactEditable
            icon={<Phone className="h-4 w-4" />}
            value={profile.phone}
            fieldKey="phone"
            onSave={updateProfile}
          />
          <ContactEditable
            icon={<Mail className="h-4 w-4" />}
            value={profile.email}
            fieldKey="email"
            onSave={updateProfile}
          />
          <ContactEditable
            icon={<Linkedin className="h-4 w-4" />}
            value={profile.linkedin}
            fieldKey="linkedin"
            onSave={updateProfile}
          />
          <ContactEditable
            icon={<Globe className="h-4 w-4" />}
            value={profile.portfolioLink}
            fieldKey="portfolioLink"
            onSave={updateProfile}
          />
        </div>
      </Card>

      {/* GENERAL, TECH, EDUCATION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* MAIN LEFT */}
        <div className="lg:col-span-2 space-y-6">

          <SectionCard title="General Information">
            <EditFieldRow
              icon={<GraduationCap />}
              label="Batch"
              field="batch"
              value={profile.batch}
              onSave={updateProfile}
            />
            <EditFieldRow
              icon={<Briefcase />}
              label="Program Status"
              field="status"
              value={profile.status}
              onSave={updateProfile}
            />
            <EditFieldRow
              icon={<Calendar />}
              label="Employment Status"
              field="employmentStatus"
              value={profile.employmentStatus}
              onSave={updateProfile}
            />
          </SectionCard>

          {/* CAPSTONE */}
          <SectionCard title="Capstone Project">
            <EditTableField
              type="textarea"
              fieldKey="capstoneProject"
              value={profile.capstoneProject}
              onSave={updateProfile}
            />
          </SectionCard>

          {/* INTRODUCTION */}
          <SectionCard title="Introduction">
            <EditTableField
              type="textarea"
              fieldKey="selfIntroduction"
              value={profile.selfIntroduction}
              onSave={updateProfile}
            />
          </SectionCard>

          {/* EDUCATION */}
          <SectionCard title="Education">
            <EditTableField
              label="University"
              fieldKey="university"
              value={profile.university}
              onSave={updateProfile}
            />
            <EditTableField
              label="Major"
              fieldKey="major"
              value={profile.major}
              onSave={updateProfile}
            />
          </SectionCard>

          {/* TECH STACK */}
          <SectionCard title="Tech Stack">
            <EditTableField
              fieldKey="techStack"
              value={profile.techStack}
              onSave={updateProfile}
            />
          </SectionCard>

          {/* INDUSTRY */}
          <SectionCard title="Preferred Industry">
            <EditTableField
              fieldKey="preferredIndustry"
              value={profile.preferredIndustry}
              onSave={updateProfile}
            />
          </SectionCard>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* PROFILE COMPLETION */}
          <SectionCard title="Profile Completion">
            <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${profile.completionRate || 0}%` }}
              />
            </div>
            <p className="text-sm text-gray-700 font-medium">
              {profile.completionRate}% completed
            </p>
          </SectionCard>

          {/* CV UPLOAD */}
          <SectionCard title="Resume (CV)">
            {profile.cvUpload ? (
              <a
                href={profile.cvUpload}
                target="_blank"
                className="text-blue-600 underline text-sm"
              >
                View Current CV
              </a>
            ) : (
              <p className="text-sm text-gray-500">No CV uploaded.</p>
            )}

            <input
              type="file"
              id="cvInput"
              className="hidden"
              onChange={(e) => uploadCV(e.target.files?.[0])}
            />

            <Button
              variant="outline"
              className="mt-3"
              onClick={() => document.getElementById("cvInput")?.click()}
            >
              Upload CV
            </Button>
          </SectionCard>

          {/* TESTIMONY */}
          <SectionCard title="Testimony">
            <div className="flex gap-1 text-gray-300 mb-3">
              {[1, 2, 3, 4, 5].map((x) => (
                <Star key={x} className="h-5 w-5 fill-gray-300" />
              ))}
            </div>

            <EditTableField
              type="textarea"
              fieldKey="testimony"
              value={profile.testimony}
              onSave={updateProfile}
            />
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

// ===============================================
//  PUBLIC VIEW COMPONENT
// ===============================================

const ProfilePublic = ({ profile }: any) => {
  const industries = profile.preferredIndustry?.split(",") || [];
  const techStack = profile.techStack?.split(",") || [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">

      {/* HEADER */}
      <Card className="rounded-2xl shadow-sm border p-8 flex flex-col md:flex-row gap-6">

        <img
          src={profile.profilePhoto || "/default-avatar.png"}
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-semibold">{profile.fullName}</h1>

          <div className="flex flex-wrap items-center gap-3 text-sm mt-3 text-gray-700">
            {profile.phone && <Inline icon={<Phone />} text={profile.phone} />}
            {profile.email && <Inline icon={<Mail />} text={profile.email} />}
            {profile.linkedin && <LinkIcon icon={<Linkedin />} url={profile.linkedin} />}
            {profile.portfolioLink && <LinkIcon icon={<Globe />} url={profile.portfolioLink} />}
          </div>

          {/* CV */}
          {profile.cvUpload && (
            <Button
              className="mt-4 bg-purple-600 text-white"
              onClick={() => window.open(profile.cvUpload, "_blank")}
            >
              Download CV
            </Button>
          )}
        </div>
      </Card>

      {/* INTRO */}
      <Section title="Introduction">
        <p className="text-gray-700">{profile.selfIntroduction || "No introduction provided."}</p>
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        <p className="text-gray-600">{profile.university}</p>
        <p className="font-medium">{profile.major}</p>
      </Section>

      {/* INDUSTRY */}
      <Section title="Preferred Industry">
        <TagList items={industries} />
      </Section>

      {/* TECH STACK */}
      <Section title="Tech Stack">
        <TagList items={techStack} />
      </Section>

      {/* TESTIMONY */}
      <Section title="Testimony">
        <p className="text-gray-700">{profile.testimony || "No testimony provided."}</p>
      </Section>
    </div>
  );
};

// ===============================================
//  UI COMPONENTS
// ===============================================

const SectionCard = ({ title, children }: any) => (
  <Card className="rounded-xl border p-6 shadow-sm">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </Card>
);

const ContactEditable = ({ icon, value, fieldKey, onSave }: any) => (
  <div className="flex items-center gap-3 text-sm">
    {icon}
    <EditTableField fieldKey={fieldKey} value={value} onSave={onSave} />
  </div>
);

const EditFieldRow = ({ icon, label, value, field, onSave }: any) => (
  <div className="flex justify-between items-center p-3 bg-white border rounded-lg">
    <div className="flex items-center gap-3 text-sm text-gray-600">{icon} {label}</div>
    <EditTableField fieldKey={field} value={value} onSave={onSave} />
  </div>
);

const Section = ({ title, children }: any) => (
  <div>
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    {children}
  </div>
);

const Inline = ({ icon, text }: any) => (
  <span className="flex items-center gap-2">{icon}{text}</span>
);

const TagList = ({ items }: any) => (
  <div className="flex gap-2 flex-wrap">
    {items.length ? (
      items.map((t: string, i: number) => (
        <span key={i} className="px-3 py-1 bg-gray-100 rounded-md text-sm">{t}</span>
      ))
    ) : (
      <p className="text-gray-500 text-sm">No data.</p>
    )}
  </div>
);

const LinkIcon = ({ icon, url }: any) => (
  <button
    onClick={() => window.open(url, "_blank")}
    className="p-2 bg-gray-100 hover:bg-gray-200 rounded"
  >
    {icon}
  </button>
);
