import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import {
  Phone,
  Mail,
  Linkedin,
  Globe,
  Pencil,
  Briefcase,
  GraduationCap,
  Award,
  MoreVertical,
  Upload,
} from "lucide-react";

import { useAuthMeStore } from "@/store/authMeStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import InlineEdit from "@/components/common/edit/InlineEdit";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import TraineePublicProfileView from "@/components/trainees/TraineePublicProfileView";

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
        <LoadingSpinner></LoadingSpinner>
      </MainLayout>
    );
  }

  const isTraineeProfile = (profile: any): profile is { fullName: string } => {
    return "fullName" in profile;
  };

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
        ) : isTraineeProfile(profile) ? (
          <TraineePublicProfileView
            profile={profile}
            showBackToEdit
            onBackToEdit={() => setViewMode("edit")}
          />
        ) : null}
      </div>
    </MainLayout>
  );
}

// EDIT MODE
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

  const [openTech, setOpenTech] = useState(false);
  const [openIndustry, setOpenIndustry] = useState(false);
  const [openResume, setOpenResume] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [form, setForm] = useState({
    techStacks: splitToList(profile.techStack),
    industries: splitToList(profile.preferredIndustry),
  });

  const [openMeta, setOpenMeta] = useState(false);
  const [draft, setDraft] = useState({
    batch: profile.batch,
    status: profile.status,
    employmentStatus: profile.employmentStatus,
  });

  const normalize = (value: string) => value.trim().toLowerCase();

  const autoCapitalize = (value: string) => {
    const acronyms = ["ui", "ux", "api", "ai", "ml", "qa", "cv"];

    return value
      .trim()
      .toLowerCase()
      .split(" ")
      .map((word) => {
        if (acronyms.includes(word)) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  useEffect(() => {
    setDraft({
      batch: profile.batch,
      status: profile.status,
      employmentStatus: profile.employmentStatus,
    });
  }, [profile]);

  const [temp, setTemp] = useState({
    tech: "",
    industry: "",
  });

  const isIndustryDuplicate =
    !!temp.industry &&
    form.industries.some(
      (i) => normalize(i) === normalize(autoCapitalize(temp.industry))
    );

  const isTechDuplicate =
    !!temp.tech &&
    form.techStacks.some(
      (t) => normalize(t) === normalize(autoCapitalize(temp.tech))
    );

  const normalizeUrl = (value: string): string => {
    let url = value.trim();

    if (!url) return "";

    // auto add https://
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    return url;
  };

  const isValidUrl = (value: string): boolean => {
    try {
      const url = new URL(value);
      return Boolean(url.hostname && url.protocol.startsWith("http"));
    } catch {
      return false;
    }
  };

  const isValidLinkedInUrl = (value: string): boolean => {
    try {
      const url = new URL(value);
      return url.hostname.includes("linkedin.com") && url.pathname.length > 1;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <Card className="shadow-none rounded-2xl border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* LEFT */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full">
              {/* AVATAR */}
              <div className="relative">
                <Avatar className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-md overflow-hidden">
            <AvatarImage
              src={profile.profilePhoto || undefined}
              alt={profile.fullName}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="w-full h-full rounded-md bg-gray-100 flex items-center justify-center text-2xl font-medium text-gray-500">
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
              <div className="space-y-3 flex-1 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-semibold text-gray-900 wrap-break-word">
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
                      onSave={(v) => {
                        const normalized = normalizeUrl(v);

                        if (!isValidLinkedInUrl(normalized)) {
                          alert("Please enter a valid LinkedIn profile URL.");
                          return;
                        }

                        updateProfile({ linkedin: normalized });
                      }}
                    />
                  </FieldRow>
                  <FieldRow icon={<Globe className="h-4 w-4" />}>
                    <InlineEdit
                      value={profile.portfolioLink}
                      placeholder="Add website"
                      onSave={(v) => {
                        const normalized = normalizeUrl(v);

                        if (!isValidUrl(normalized)) {
                          alert("Please enter a valid website URL.");
                          return;
                        }

                        updateProfile({ portfolioLink: normalized });
                      }}
                    />
                  </FieldRow>

                  <FieldRow icon={<Mail className="h-4 w-4" />}>
                    <span className="text-sm text-gray-700">
                      {profile.email}
                    </span>
                  </FieldRow>
                </div>
              </div>
            </div>

            {/* VIEW MODE TOGGLE */}
            <Button
              variant="default"
              className="w-full md:w-auto cursor-pointer"
              onClick={() => setViewMode("public")}
            >
              See Public View
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* GRID CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">
          {/* GENERAL */}
          <Card className="border-0 rounded-0 shadow-none gap-2 mb-0">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium ">General</CardTitle>
            </CardHeader>

            <CardContent className="p-0 border rounded-lg">
              <div className="relative">
                {/* EDIT BUTTON */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpenMeta(true)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-gray-900"
                  aria-label="Edit General Info"
                >
                  <Pencil className="w-4 h-4" />
                </Button>

                {/* CONTENT */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr]">
                  {/* LEFT */}
                  <div className="p-5 space-y-4">
                    <GeneralRow
                      icon={<Award className="w-5 h-5" />}
                      label="Program status"
                    />
                    <GeneralRow
                      icon={<GraduationCap className="w-5 h-5" />}
                      label="Batch"
                    />
                    <GeneralRow
                      icon={<Briefcase className="w-5 h-5" />}
                      label="Employment status"
                    />
                  </div>

                  {/* DIVIDER */}
                  <div className="hidden md:block bg-gray-200" />

                  {/* RIGHT */}
                  <div className="p-5 space-y-4 text-gray-500 italic">
                    <ValueRow value={profile.status} />
                    <ValueRow value={profile.batch} />

                    <ValueRow value={profile.employmentStatus} />
                  </div>
                </div>
              </div>

              <Dialog open={openMeta} onOpenChange={setOpenMeta}>
                <DialogContent className="w-[95vw] max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit General Information</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-5">
                    {/* PROGRAM STATUS */}
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-600">
                        Program Status
                      </p>
                      <Select
                        value={draft.status}
                        onValueChange={(v) =>
                          setDraft((d) => ({ ...d, status: v }))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Current Trainee">
                            Current Trainee
                          </SelectItem>
                          <SelectItem value="Alumni">Alumni</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* BATCH */}
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-600">Batch</p>
                      <Select
                        value={draft.batch}
                        onValueChange={(v) =>
                          setDraft((d) => ({ ...d, batch: v }))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select batch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Batch 1">Batch 1</SelectItem>
                          <SelectItem value="Batch 2">Batch 2</SelectItem>
                          <SelectItem value="Batch 3">Batch 3</SelectItem>
                          <SelectItem value="Batch 4">Batch 4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* EMPLOYMENT STATUS */}
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-600">
                        Employment Status
                      </p>
                      <Select
                        value={draft.employmentStatus}
                        onValueChange={(v) =>
                          setDraft((d) => ({ ...d, employmentStatus: v }))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select employment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Employed">Employed</SelectItem>
                          <SelectItem value="Open to work">
                            Open to work
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setOpenMeta(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        updateProfile(draft);
                        setOpenMeta(false);
                      }}
                    >
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Capstone Not Implement Yet*/}
          {/* <Card className="border-0 rounded-0 shadow-none gap-2 mb-0">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">Capstone</CardTitle>
            </CardHeader>

            <CardContent className="border rounded-lg p-4 space-y-4 border-dashed">
              Empty
            </CardContent>
          </Card> */}
          <Card className="border-0 rounded-0 shadow-none gap-2 mb-0">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">Resume</CardTitle>
            </CardHeader>

            <CardContent className="border rounded-lg p-4 space-y-4 border-dashed">
              {/* EMPTY STATE */}
              {!profile.cvUpload && (
                <div className="text-sm text-gray-500">
                  You have not uploaded a resume/CV yet.
                </div>
              )}

              {/* FILE STATE */}
              {profile.cvUpload && (
                <div className="border rounded-md p-3 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-red-100 text-red-600 font-semibold">
                      PDF
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">
                        Resume / CV
                      </span>
                      <span className="text-xs text-gray-500">
                        Uploaded file
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* THREE DOTS */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            window.open(profile.cvUpload, "_blank")
                          }
                        >
                          View
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
              <div className="pt-3">
                <Button
                  variant={profile.cvUpload ? "outline" : "default"}
                  className="w-full"
                  onClick={() => setOpenResume(true)}
                >
                  {profile.cvUpload ? "Upload New" : "Add Resume"}
                </Button>
              </div>
              <Dialog open={openResume} onOpenChange={setOpenResume}>
                <DialogContent className="w-[95vw] max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {profile.cvUpload ? "Upload New Resume" : "Add Resume"}
                    </DialogTitle>
                  </DialogHeader>

                  {/* DROPZONE */}
                  <label
                    htmlFor="resume-upload"
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActive(false);

                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        uploadCV(file);
                        setOpenResume(false);
                      }
                    }}
                    className={`
        flex flex-col items-center justify-center gap-3
        border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
        transition
        ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-gray-400"
        }
      `}
                  >
                    <Upload className="w-8 h-8 text-gray-500" />

                    <div className="text-sm">
                      <p className="font-medium">Drag & drop your PDF here</p>
                      <p className="text-xs text-gray-500">
                        or click to browse
                      </p>
                    </div>

                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          uploadCV(file);
                          setOpenResume(false);
                        }
                      }}
                    />
                  </label>

                  {profile.cvUpload && (
                    <p className="text-xs text-gray-500 mt-3">
                      Uploading a new file will replace the existing resume.
                    </p>
                  )}

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setOpenResume(false)}
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                  <label htmlFor="" className="italic font-10px">
                    Last Degree
                  </label>
                  <InlineEdit
                    value={profile.university}
                    placeholder="University"
                    onSave={(v) => updateProfile({ university: v })}
                  />
                  <label htmlFor="" className="italic font-10px">
                    Major
                  </label>

                  <InlineEdit
                    value={profile.major}
                    placeholder="Major"
                    onSave={(v) => updateProfile({ major: v })}
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
                <div className="flex items-center justify-between gap-4 w-full">
                  {/* LEFT */}
                  <div className="flex-1">
                    {industries.length > 0 && (
                      <TagList
                        className="mt-4"
                        tags={industries}
                        color="primary"
                      />
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpenIndustry(true)}
                    className="shrink-0"
                    aria-label="Edit Tech Stack"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              </EditBox>
            </CardContent>
          </Card>
          <Dialog open={openIndustry} onOpenChange={setOpenIndustry}>
            <DialogContent className="w-[95vw] max-w-sm p-5 sm:p-6">
              <DialogHeader>
                <DialogTitle>Edit Preferred Industry</DialogTitle>
              </DialogHeader>

              {/* FORM */}
              <div>
                <label className="font-medium text-sm">
                  Preferred Industry
                </label>
                {isIndustryDuplicate && (
                  <p className="text-xs text-red-500 mt-1">
                    This preferred industry already exists.
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-2 mt-1 relative">
                  <Input
                    className=" h-12"
                    placeholder="e.g. Information Technology"
                    value={temp.industry}
                    onChange={(e) =>
                      setTemp({ ...temp, industry: e.target.value })
                    }
                  />

                  <Button
                    className="h-12"
                    disabled={!temp.industry || isIndustryDuplicate}
                    onClick={() => {
                      if (!temp.industry) return;

                      const formatted = autoCapitalize(temp.industry);

                      if (isIndustryDuplicate) return;

                      setForm((f) => ({
                        ...f,
                        industries: [...f.industries, formatted],
                      }));

                      setTemp({ ...temp, industry: "" });
                    }}
                  >
                    Add
                  </Button>
                </div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {form.industries.map((v) => (
                    <span
                      key={v}
                      className="inline-flex items-center px-3 py-1.5 rounded-md bg-blue-100 text-primary text-sm"
                    >
                      {v}
                      <button
                        className="ml-2 font-bold"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            industries: f.industries.filter((x) => x !== v),
                          }))
                        }
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpenIndustry(false)}
                >
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    updateProfile({
                      preferredIndustry: form.industries.join(", "),
                    });
                    setOpenIndustry(false);
                  }}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* TECH STACK */}
          <Card className="border-none shadow-none mb-0">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">Tech Skills</CardTitle>
            </CardHeader>

            <CardContent className="px-0">
              <CardContent className="px-0">
                <EditBox>
                  <div className="flex items-center justify-between gap-4 w-full">
                    {/* LEFT */}
                    <div className="flex-1">
                      {techStack.length > 0 && (
                        <TagList tags={techStack} color="cyan" />
                      )}
                    </div>

                    {/* RIGHT */}

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpenTech(true)}
                      className="shrink-0"
                      aria-label="Edit Tech Skills"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </div>
                </EditBox>
              </CardContent>
            </CardContent>
          </Card>
          <Dialog open={openTech} onOpenChange={setOpenTech}>
            <DialogContent className="w-[95vw] max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Tech Skills</DialogTitle>
              </DialogHeader>

              {/* FORM */}
              <div>
                <label className="font-medium text-sm">Tech Skills</label>
                {isTechDuplicate && (
                  <p className="text-xs text-red-500 mt-1">
                    This tech skills already exists.
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-2 mt-1 relative">
                  <Input
                    className="h-12"
                    placeholder="e.g. React"
                    value={temp.tech}
                    onChange={(e) => setTemp({ ...temp, tech: e.target.value })}
                  />

                  <Button
                    className="h-12"
                    disabled={!temp.tech || isTechDuplicate}
                    onClick={() => {
                      if (!temp.tech) return;

                      const formatted = autoCapitalize(temp.tech);

                      const exists = form.techStacks.some(
                        (t) => normalize(t) === normalize(formatted)
                      );

                      if (exists) return;

                      setForm((f) => ({
                        ...f,
                        techStacks: [...f.techStacks, formatted],
                      }));

                      setTemp({ ...temp, tech: "" });
                    }}
                  >
                    Add
                  </Button>
                </div>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.techStacks.map((v) => (
                    <span
                      key={v}
                      className="inline-flex items-center px-3 py-1 rounded-md bg-blue-100 text-primary"
                    >
                      {v}
                      <button
                        className="ml-2 font-bold"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            techStacks: f.techStacks.filter((x) => x !== v),
                          }))
                        }
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenTech(false)}>
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    updateProfile({
                      techStack: form.techStacks.join(", "),
                    });
                    setOpenTech(false);
                  }}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                  className="bg-primary h-2 rounded-full"
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

          {/* TESTIMONY  Not Implement yet */}
          {/* <Card className=" border-none shadow-none">
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
          </Card> */}
        </div>
      </div>
    </div>
  );
};

const FieldRow = ({ icon, children }: any) => (
  <div className="grid grid-cols-[20px_1fr] gap-2 items-center text-sm text-gray-700">
    <span className="text-gray-500">{icon}</span>
    <div className="break-all">{children}</div>
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
        className={`px-2 py-1 rounded-xs ${
          color === "primary"
            ? " bg-primary/5 text-primary"
            : " bg-cyan-50 text-cyan-700"
        }`}
      >
        {t}
      </Badge>
    ))}
  </div>
);

const splitToList = (value?: string): string[] => {
  if (!value) return [];
  return value
    .split(/[,|;/\n]+/)
    .map((v) => v.trim())
    .filter(Boolean);
};

const GeneralRow = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
    <span className="text-gray-900">{icon}</span>
    {label}
  </div>
);

const ValueRow = ({ value }: { value?: string }) => (
  <div className="text-sm">
    {value ? (
      <span className="text-gray-900 not-italic font-medium">{value}</span>
    ) : (
      <span className="italic text-gray-400">Empty</span>
    )}
  </div>
);
