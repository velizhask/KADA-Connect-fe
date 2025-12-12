import { useEffect, useState } from "react";
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
  Pencil,
} from "lucide-react";

import { useAuthMeStore } from "@/store/authMeStore";

// Shadcn UI
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import InlineEdit from "@/components/common/edit/InlineEdit";
import InlineSelect from "@/components/common/edit/InlineSelect";

// ============================================================
// MAIN PAGE
// ============================================================

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
        <div className="h-screen flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen pb-20">
        {viewMode === "edit" ? (
          <ProfileEdit
            profile={profile}
            updateProfile={updateProfile}
            uploadPhoto={uploadPhoto}
            uploadCV={uploadCV}
            setViewMode={setViewMode}
          />
        ) : (
          <ProfilePublic profile={profile} setViewMode={setViewMode} />
        )}
      </div>
    </MainLayout>
  );
}

// ============================================================
// EDIT MODE
// ============================================================

const ProfileEdit = ({
  profile,
  updateProfile,
  uploadPhoto,
  setViewMode,
  uploadCV,
}: any) => {
  const industries = (profile.preferredIndustry || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);
  const techStack = (profile.techStack || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <Card className="shadow-none rounded-2xl border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            {/* LEFT */}
            <div className="flex items-center gap-6">
              {/* AVATAR */}
              <div className="relative">
                <Avatar className="w-48 h-48 border shadow-sm">
                  <AvatarImage
                    src={profile.profilePhoto || undefined}
                    alt={profile.fullName}
                  />
                  <AvatarFallback className="bg-gray-100 text-2xl">
                    {profile.fullName
                      ?.split(" ")
                      .map((w: string) => w[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <label className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow border cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => uploadPhoto(e.target.files?.[0])}
                  />
                  <Pencil className="h-4 w-4 text-gray-700" />
                </label>
              </div>

              {/* TEXT BLOCK */}
              <div className="space-y-4 flex-1">
                <div className="text-2xl font-semibold text-gray-900 mb-2">
                  <InlineEdit
                    value={profile.fullName}
                    onSave={(v) => updateProfile({ fullName: v })}
                  />
                </div>

                {/* CONTACT ROWS */}
                <div className="space-y-2">
                  <FieldRow icon={<Phone className="h-4 w-4" />}>
                    <InlineEdit
                      value={profile.phone}
                      placeholder="Add phone"
                      onSave={(v) => updateProfile({ phone: v })}
                    />
                  </FieldRow>

                  <FieldRow icon={<Linkedin className="h-4 w-4" />}>
                    <InlineEdit
                      value={profile.linkedin}
                      placeholder="Add LinkedIn"
                      onSave={(v) => updateProfile({ linkedin: v })}
                    />
                  </FieldRow>

                  <FieldRow icon={<Mail className="h-4 w-4" />}>
                    <span className="text-sm text-gray-700">
                      {profile.email}
                    </span>
                  </FieldRow>

                  <FieldRow icon={<Globe className="h-4 w-4" />}>
                    <InlineEdit
                      value={profile.portfolioLink}
                      placeholder="Add website"
                      onSave={(v) => updateProfile({ portfolioLink: v })}
                    />
                  </FieldRow>
                </div>
              </div>
            </div>

            {/* VIEW MODE TOGGLE */}
            <Button
              variant="outline"
              className="border-purple-600 text-purple-600"
              onClick={() => setViewMode("public")}
            >
              See Public View
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* GRID CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6 ">
          {/* GENERAL */}
          <Card className="border-0 rounded-0 shadow-none gap-2 mb-0">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium ">General</CardTitle>
            </CardHeader>

            <CardContent className="border rounded-lg p-4 space-y-2">
              {/* Batch */}
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  Current Batch
                </p>
                <div className="flex-1 text-right">
                  <InlineSelect
                    value={profile.batch}
                    options={["Batch 1", "Batch 2", "Batch 3", "Batch 4"]}
                    onSave={(v) => updateProfile({ batch: v })}
                  />
                </div>
              </div>

              {/* Program Status */}
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  Program Status
                </p>
                <div className="flex-1 text-right">
                  <InlineSelect
                    value={profile.status}
                    options={["Alumni", "Current Trainee"]}
                    onSave={(v) => updateProfile({ status: v })}
                  />
                </div>
              </div>

              {/* Employment Status */}
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  Employment Status
                </p>
                <div className="flex-1 text-right">
                  <InlineSelect
                    value={profile.employmentStatus}
                    options={["Employed", "Open to work"]}
                    onSave={(v) => updateProfile({ employmentStatus: v })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Capstone */}
          <Card className="border-0 rounded-0 shadow-none gap-2 mb-0">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">Capstone</CardTitle>
            </CardHeader>

            <CardContent className="border rounded-lg p-4 space-y-4 border-dashed">
              Empty
            </CardContent>
          </Card>
          <Card className="border-0 rounded-0 shadow-none gap-2 mb-0">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">Resume</CardTitle>
            </CardHeader>

            <CardContent className="border rounded-lg p-4 space-y-4 border-dashed">
              {!profile.cvUpload && (
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadCV(file);
                  }}
                  className="text-sm"
                />
              )}

              {profile.cvUpload && (
                <div className="border rounded-md p-3 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center gap-3">
                    {/* PDF ICON */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-red-100 text-red-600 font-semibold">
                      PDF
                    </div>

                    {/* FILE INFO */}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">
                        Resume / CV
                      </span>
                      <span className="text-xs text-gray-500">
                        Uploaded file
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-3">
                    <a
                      href={profile.cvUpload}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-600 underline"
                    >
                      View
                    </a>

                    <label className="text-sm text-gray-600 cursor-pointer hover:underline">
                      Replace
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadCV(file);
                        }}
                      />
                    </label>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* INTRODUCTION */}
          <Card className="border-none shadow-none gap-2 mb-0">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">
                Introduction
              </CardTitle>
            </CardHeader>

            <CardContent className="px-0">
              <EditBox className="border-0 bg-none">
                <InlineEdit
                  value={profile.selfIntroduction}
                  multiline
                  placeholder="Write your introduction"
                  onSave={(v) => updateProfile({ selfIntroduction: v })}
                />
              </EditBox>
            </CardContent>
          </Card>

          {/* EDUCATION */}
          <Card className="border-none shadow-none gap-2 mb-0">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">Education</CardTitle>
            </CardHeader>

            <CardContent className="px-0">
              <EditBox>
                <div className="space-y-4">
                  <InlineEdit
                    value={profile.major}
                    placeholder="Major"
                    onSave={(v) => updateProfile({ major: v })}
                  />
                  <InlineEdit
                    value={profile.university}
                    placeholder="University"
                    onSave={(v) => updateProfile({ university: v })}
                  />
                </div>
              </EditBox>
            </CardContent>
          </Card>

          {/* INDUSTRY */}
          <Card className="border-none shadow-none gap-2 mb-0">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">
                Preferred Industry
              </CardTitle>
            </CardHeader>

            <CardContent className="px-0">
              <EditBox>
                <InlineEdit
                  value={profile.preferredIndustry}
                  placeholder="Industry"
                  onSave={(v) => updateProfile({ preferredIndustry: v })}
                />
              </EditBox>

              {industries.length > 0 && (
                <TagList className="mt-4" tags={industries} color="purple" />
              )}
            </CardContent>
          </Card>

          {/* TECH STACK */}
          <Card className=" border-none shadow-none mb-0">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">Tech Stack</CardTitle>
            </CardHeader>

            <CardContent className="px-0">
              <EditBox>
                <InlineEdit
                  value={profile.techStack}
                  placeholder="Tech stack"
                  onSave={(v) => updateProfile({ techStack: v })}
                />
              </EditBox>

              {techStack.length > 0 && (
                <TagList tags={techStack} color="cyan" />
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* PROFILE COMPLETION */}
          <Card className="shadow-none border-none">
            <CardHeader>
              <CardTitle className="text-xl font-medium">
                Profile Completion
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${profile.completionRate}%` }}
                />
              </div>

              <p className="text-sm font-medium">
                {profile.completionRate}% completed
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Complete your profile so more companies can discover you.
              </p>
            </CardContent>
          </Card>

          {/* TESTIMONY */}
          <Card className=" border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-xl font-medium">Testimony</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <Card className="p-4 flex items-center shadow-none">
                <div className="flex gap-5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-6 w-6 text-black" />
                  ))}
                </div>
                <p>Your overall experience with KADA</p>
              </Card>

              <EditBox>
                <InlineEdit
                  value={profile.testimony}
                  multiline
                  placeholder="What you learned, enjoyed, or how it helped you grow personally or professionally during your time with KADA."
                  onSave={(v) => updateProfile({ testimony: v })}
                />
              </EditBox>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PUBLIC VIEW
// ============================================================

const ProfilePublic = ({ profile, setViewMode }: any) => {
  const industries = (profile.preferredIndustry || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);
  const techStack = (profile.techStack || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <Card className="rounded-none border-0 border-b shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            {/* LEFT */}
            <div className="flex gap-6 items-start flex-1">
              <Avatar className="w-32 h-32 border shadow-sm">
                <AvatarImage src={profile.profilePhoto || undefined} />
                <AvatarFallback>
                  {profile.fullName
                    ?.split(" ")
                    .map((w: string) => w[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {profile.fullName}
                </h1>

                <div className="space-y-2 text-sm">
                  {profile.phone && (
                    <InfoLine icon={<Phone />} text={profile.phone} />
                  )}
                  {profile.linkedin && (
                    <InfoLine icon={<Linkedin />} text={profile.linkedin} />
                  )}
                  {profile.email && (
                    <InfoLine icon={<Mail />} text={profile.email} />
                  )}
                  {profile.portfolioLink && (
                    <InfoLine icon={<Globe />} text={profile.portfolioLink} />
                  )}
                </div>
              </div>
            </div>

            <Button variant="outline" onClick={() => setViewMode("edit")}>
              Back to Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* PUBLIC SECTIONS */}
      <div className="p-6 space-y-6">
        {profile.selfIntroduction && (
          <PublicSection title="Introduction">
            <p className="text-gray-700 leading-relaxed">
              {profile.selfIntroduction}
            </p>
          </PublicSection>
        )}

        {(profile.major || profile.university) && (
          <PublicSection title="Education">
            <p className="font-semibold">{profile.major}</p>
            <p className="text-gray-600">{profile.university}</p>
          </PublicSection>
        )}

        {profile.techStack && (
          <PublicSection title="Tech Stack">
            <TagList tags={techStack} color="cyan" />
          </PublicSection>
        )}

        {profile.preferredIndustry && (
          <PublicSection title="Preferred Industry">
            <TagList tags={industries} color="purple" />
          </PublicSection>
        )}

        {profile.testimony && (
          <PublicSection title="Testimony">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="italic">{profile.testimony}</p>
          </PublicSection>
        )}
      </div>
    </div>
  );
};

// ============================================================
// UI COMPONENTS
// ============================================================

const SectionCard = ({ title, children }: any) => (
  <Card className="rounded-lg border shadow-sm">
    <CardHeader className="pb-3">
      <CardTitle className="text-base font-semibold text-gray-900">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const PublicSection = ({ title, children }: any) => (
  <Card className="rounded-lg border shadow-sm">
    <CardContent className="p-4">
      <h2 className="font-semibold mb-2">{title}</h2>
      {children}
    </CardContent>
  </Card>
);

const InfoCard = ({ icon, label, value, onSave }: any) => (
  <div className="bg-white rounded-lg p-4 border">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-xs text-gray-600">{label}</span>
    </div>

    <InlineEdit
      value={value}
      placeholder={`Add ${label}`}
      onSave={(v) => onSave(v)}
    />
  </div>
);

const FieldRow = ({ icon, children }: any) => (
  <div className="flex items-center gap-2 text-sm text-gray-700">
    <span className="text-gray-500">{icon}</span>
    <div className="flex-1">{children}</div>
  </div>
);

const EditBox = ({ children }: any) => (
  <div className="border rounded-lg p-3 mb-4">{children}</div>
);

const TagList = ({ tags, color }: any) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((t: string, i: number) => (
      <Badge
        key={i}
        className={`px-2 py-1 rounded-md ${
          color === "purple"
            ? " bg-purple-50 text-purple-700"
            : " bg-cyan-50 text-cyan-700"
        }`}
      >
        {t}
      </Badge>
    ))}
  </div>
);

const InfoLine = ({ icon, text }: any) => (
  <div className="flex items-center gap-2 text-gray-700">
    <span className="text-gray-500">{icon}</span>
    <span>{text}</span>
  </div>
);
