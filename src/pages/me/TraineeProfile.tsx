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

export default function TraineeProfile() {
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
      {/* Mode Toggle Button */}
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
 * EDIT MODE
 * ---------------------------------------------------- */

const ProfileEdit = ({ profile, updateProfile, uploadPhoto, uploadCV }: any) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* HEADER CARD */}
      <Card className="mb-6 rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-white p-8">
          <div className="flex flex-col md:flex-row items-start gap-8">

            {/* PHOTO */}
            <div className="relative shrink-0">
              <img
                src={profile.profilePhoto || "/default-avatar.png"}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
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

            {/* NAME & CONTACT */}
            <div className="flex-1 space-y-4">
              <EditTableField
                label=""
                fieldKey="fullName"
                value={profile.fullName}
                onSave={updateProfile}
              />

              <div className="space-y-2">
                <ContactRowCompact
                  icon={<Phone className="h-4 w-4" />}
                  value={profile.phone || "Empty"}
                  fieldKey="phone"
                  onSave={updateProfile}
                />
                <ContactRowCompact
                  icon={<Linkedin className="h-4 w-4" />}
                  value={profile.linkedin || ""}
                  fieldKey="linkedin"
                  onSave={updateProfile}
                />
                <ContactRowCompact
                  icon={<Mail className="h-4 w-4" />}
                  value={profile.email || ""}
                  fieldKey="email"
                  onSave={updateProfile}
                />
                <ContactRowCompact
                  icon={<Globe className="h-4 w-4" />}
                  value={profile.portfolioLink || ""}
                  fieldKey="portfolioLink"
                  onSave={updateProfile}
                />
              </div>
            </div>

            {/* LINK TO PUBLIC VIEW */}
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-lg self-start">
              See Public View
            </Button>
          </div>
        </div>
      </Card>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* GENERAL */}
          <SectionCard title="General">
            <div className="space-y-4">
              <InfoRowWithIcon
                icon={<GraduationCap className="h-5 w-5" />}
                label="Current batch"
                value={profile.batch}
                fieldKey="batch"
                onSave={updateProfile}
              />
              <InfoRowWithIcon
                icon={<Briefcase className="h-5 w-5" />}
                label="Program status"
                value={profile.status}
                fieldKey="status"
                onSave={updateProfile}
              />
              <InfoRowWithIcon
                icon={<Calendar className="h-5 w-5" />}
                label="Employment status"
                value={profile.employmentStatus}
                fieldKey="employmentStatus"
                onSave={updateProfile}
              />
            </div>
          </SectionCard>

          {/* CAPSTONE */}
          <SectionCard title="Capstone Project">
            <EditTableField
              type="textarea"
              fieldKey="capstoneProject"
              value={profile.capstoneProject || "Empty"}
              onSave={updateProfile}
            />

            <Button variant="outline" className="mt-3 text-purple-600 border-purple-300">
              Add Project
            </Button>
          </SectionCard>

          {/* CV */}
          <SectionCard title="Resume">
            <div className="text-gray-500 text-sm mb-3">
              {profile.cvUpload ? (
                <a href={profile.cvUpload} target="_blank" className="text-blue-600 underline">
                  View CV
                </a>
              ) : (
                "Empty"
              )}
            </div>

            <input
              type="file"
              id="cvInput"
              className="hidden"
              onChange={(e) => uploadCV(e.target.files?.[0])}
            />

            <Button
              variant="outline"
              className="text-purple-600 border-purple-300"
              onClick={() => document.getElementById("cvInput")?.click()}
            >
              Upload New
            </Button>
          </SectionCard>

          {/* INTRO */}
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
              label="Major"
              fieldKey="major"
              value={profile.major}
              onSave={updateProfile}
            />
            <EditTableField
              label="University"
              fieldKey="university"
              value={profile.university}
              onSave={updateProfile}
            />
          </SectionCard>

          {/* INDUSTRY */}
          <SectionCard title="Preferred Industry">
            <EditTableField
              fieldKey="preferredIndustry"
              value={profile.preferredIndustry || ""}
              onSave={updateProfile}
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {profile.preferredIndustry?.split(",").map((x: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">
                  {x.trim()}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* TECH STACK */}
          <SectionCard title="Tech Stack">
            <EditTableField
              fieldKey="techStack"
              value={profile.techStack || ""}
              onSave={updateProfile}
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {profile.techStack?.split(",").map((x: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-md text-sm">
                  {x.trim()}
                </span>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          
          {/* COMPLETION BAR */}
          <SectionCard title="Profile Completion">
            <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${profile.completionRate ?? 0}%` }}
              ></div>
            </div>

            <p className="text-sm font-medium text-gray-700">
              {profile.completionRate}% complete
            </p>
            <p className="text-gray-500 text-sm">
              Complete your profile so more companies can discover you.
            </p>
          </SectionCard>

          {/* TESTIMONY */}
          <SectionCard title="Testimony">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((x) => (
                <Star key={x} className="h-5 w-5 text-gray-300 fill-gray-300" />
              ))}
            </div>

            <EditTableField
              type="textarea"
              fieldKey="testimony"
              value={profile.testimony || ""}
              onSave={updateProfile}
            />
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
 * PUBLIC MODE
 * ---------------------------------------------------- */

const ProfilePublic = ({ profile }: any) => {
  const industries = profile.preferredIndustry?.split(",") || [];
  const techStack = profile.techStack?.split(",") || [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">

      {/* HEADER */}
      <Card className="rounded-2xl shadow-sm border border-gray-200">
        <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-6">

          <img
            src={profile.profilePhoto || "/default-avatar.png"}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
          />

          <div className="flex-1">

            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              {profile.fullName}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {profile.batch && <TagPurple text={profile.batch} />}
              {profile.status && <TagBlue text={profile.status} />}
              {profile.employmentStatus && <TagGreen text={profile.employmentStatus} />}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mb-4">
              {profile.phone && <InlineIcon icon={<Phone />} text={profile.phone} />}
              {profile.linkedin && <LinkIcon icon={<Linkedin />} url={profile.linkedin} />}
              {profile.email && <EmailIcon email={profile.email} />}
              {profile.portfolioLink && <LinkIcon icon={<Globe />} url={profile.portfolioLink} />}
            </div>

            <div className="flex gap-3">
              {profile.cvUpload && (
                <Button
                  className="bg-purple-600 text-white"
                  onClick={() => window.open(profile.cvUpload, "_blank")}
                >
                  Download CV
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* CAPSTONE */}
      {profile.capstoneProject && (
        <Section title="Capstone Project">
          <Card className="rounded-2xl shadow-sm border-gray-200 overflow-hidden">
            <div className="relative h-48 bg-linear-to-br from-gray-800 to-gray-900">
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">{profile.capstoneProject}</h3>
              </div>
            </div>
          </Card>
        </Section>
      )}

      {/* INTRO */}
      <Section title="Introduction">
        <Card className="rounded-2xl shadow-sm border-gray-200">
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed">
              {profile.selfIntroduction || "No introduction provided."}
            </p>
          </div>
        </Card>
      </Section>

      {/* EDUCATION */}
      <Section title="Education">
        <Card className="rounded-2xl shadow-sm border-gray-200">
          <div className="p-6">
            <p className="text-gray-600 text-sm">{profile.university}</p>
            <p className="text-gray-900 font-medium">{profile.major}</p>
          </div>
        </Card>
      </Section>

      {/* INDUSTRY */}
      <Section title="Preferred Industry">
        <TagList items={industries} color="purple" />
      </Section>

      {/* TECH STACK */}
      <Section title="Tech Stack">
        <TagList items={techStack} color="cyan" />
      </Section>

      {/* TESTIMONY */}
      <Section title="Testimony">
        <Card className="rounded-2xl shadow-sm border-gray-200">
          <div className="p-6">
            <p className="text-gray-700">{profile.testimony || "No testimony provided yet."}</p>
          </div>
        </Card>
      </Section>
    </div>
  );
};

/* ----------------------------------------------------
 * HELPER UI COMPONENTS
 * ---------------------------------------------------- */

const SectionCard = ({ title, children }: any) => (
  <Card className="rounded-xl shadow-sm border border-gray-200">
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  </Card>
);

const ContactRowCompact = ({ icon, value, fieldKey, onSave }: any) => (
  <div className="flex items-center gap-3 text-sm">
    <span className="text-gray-500">{icon}</span>
    <EditTableField fieldKey={fieldKey} value={value} onSave={onSave} />
  </div>
);

const InfoRowWithIcon = ({ icon, label, value, fieldKey, onSave }: any) => (
  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
    <div className="flex items-center gap-3">
      <span className="text-gray-500">{icon}</span>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <EditTableField fieldKey={fieldKey} value={value} onSave={onSave} />
  </div>
);

/* PUBLIC VIEW HELPERS */

const Section = ({ title, children }: any) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
    {children}
  </div>
);

const TagPurple = ({ text }: any) => (
  <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md">{text}</span>
);

const TagBlue = ({ text }: any) => (
  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">{text}</span>
);

const TagGreen = ({ text }: any) => (
  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md">{text}</span>
);

const InlineIcon = ({ icon, text }: any) => (
  <span className="flex items-center gap-2">
    {icon}
    {text}
  </span>
);

const LinkIcon = ({ icon, url }: any) => (
  <button onClick={() => window.open(url, "_blank")} className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded">
    {icon}
  </button>
);

const EmailIcon = ({ email }: any) => (
  <button onClick={() => (window.location.href = `mailto:${email}`)} className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded">
    <Mail className="h-4 w-4 text-gray-600" />
  </button>
);

const TagList = ({ items, color }: any) => (
  <div className="flex flex-wrap gap-2">
    {items.length > 0 ? (
      items.map((item: string, i: number) => (
        <span
          key={i}
          className={`px-4 py-2 bg-${color}-100 text-${color}-700 rounded-lg text-sm font-medium`}
        >
          {item}
        </span>
      ))
    ) : (
      <p className="text-gray-500">No data available.</p>
    )}
  </div>
);
