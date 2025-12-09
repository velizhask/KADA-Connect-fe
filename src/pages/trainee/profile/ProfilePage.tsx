import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStudentProfileStore } from "@/store/studentProfileStore";
import EditableField from "@/components/common/edit/EditTableField";
import { Pencil, Upload, Phone, Mail, Linkedin, FileText } from "lucide-react";

// ================================
// MAIN PROFILE PAGE
// ================================
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

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* VIEW MODE TOGGLE */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-2 border">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={viewMode === "edit" ? "default" : "outline"}
            onClick={() => setViewMode("edit")}
          >
            Edit Mode
          </Button>
          <Button
            size="sm"
            variant={viewMode === "public" ? "default" : "outline"}
            onClick={() => setViewMode("public")}
          >
            Public View
          </Button>
        </div>
      </div>

      {viewMode === "edit" ? (
        <ProfileEdit
          profile={profile}
          updateProfile={updateProfile}
          uploadCV={uploadCV}
          uploadPhoto={uploadPhoto}
        />
      ) : (
        <ProfilePublic profile={profile} />
      )}
    </div>
  );
}

// =====================================================================
// EDIT MODE PAGE
// =====================================================================
const ProfileEdit = ({
  profile,
  updateProfile,
  uploadPhoto,
  uploadCV,
}: {
  profile: any;
  updateProfile: any;
  uploadPhoto: any;
  uploadCV: any;
}) => {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) uploadPhoto(e.target.files[0]);
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) uploadCV(e.target.files[0]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">

      {/* HEADER CARD */}
      <Card className="p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-6">
          {/* PHOTO */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
              <img
                src={profile.profilePhoto || "/default-avatar.png"}
                alt={profile.fullName}
                className="w-full h-full object-cover"
              />
            </div>

            <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow cursor-pointer">
              <Pencil className="h-4 w-4 text-gray-600" />
              <input type="file" className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>

          {/* INFO */}
          <div className="flex-1">
            <EditableField
              label="Full Name"
              fieldKey="fullName"
              value={profile.fullName}
              onSave={updateProfile}
            />

            <EditableField
              label="Status"
              fieldKey="status"
              value={profile.status}
              onSave={updateProfile}
            />

            <EditableField
              label="Phone"
              fieldKey="phone"
              value={profile.phone}
              onSave={updateProfile}
            />

            <EditableField
              label="Email"
              fieldKey="email"
              value={profile.email}
              onSave={updateProfile}
            />

            <EditableField
              label="LinkedIn"
              fieldKey="linkedin"
              value={profile.linkedin}
              onSave={updateProfile}
            />
          </div>
        </div>
      </Card>

      {/* EDUCATION SECTION */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Education</h2>

        <EditableField
          label="University"
          fieldKey="university"
          value={profile.university}
          onSave={updateProfile}
        />

        <EditableField
          label="Major"
          fieldKey="major"
          value={profile.major}
          onSave={updateProfile}
        />

        <EditableField
          label="Batch"
          fieldKey="batch"
          value={profile.batch}
          onSave={updateProfile}
        />
      </Card>

      {/* CAREER SECTION */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Career</h2>

        <EditableField
          label="Preferred Industry"
          fieldKey="preferredIndustry"
          value={profile.preferredIndustry}
          onSave={updateProfile}
        />

        <EditableField
          label="Tech Stack"
          fieldKey="techStack"
          value={profile.techStack}
          onSave={updateProfile}
        />

        <EditableField
          label="Employment Status"
          fieldKey="employmentStatus"
          value={profile.employmentStatus}
          onSave={updateProfile}
        />

        <EditableField
          label="Portfolio Link"
          fieldKey="portfolioLink"
          value={profile.portfolioLink}
          onSave={updateProfile}
        />
      </Card>

      {/* SELF INTRODUCTION */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Self Introduction</h2>

        <EditableField
          label="Introduction"
          fieldKey="selfIntroduction"
          value={profile.selfIntroduction}
          type="textarea"
          onSave={updateProfile}
        />
      </Card>

      {/* RESUME */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Resume</h2>

        {profile.cvUpload ? (
          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
            <FileText className="h-5 w-5 text-gray-500" />
            <a
              href={profile.cvUpload}
              target="_blank"
              className="text-blue-600 underline text-sm"
            >
              View CV
            </a>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No CV uploaded.</p>
        )}

        <label className="mt-4 inline-block">
          <input type="file" className="hidden" onChange={handleCVUpload} />
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" /> Upload New CV
          </Button>
        </label>
      </Card>
    </div>
  );
};

// =====================================================================
// PUBLIC VIEW PAGE
// =====================================================================
const ProfilePublic = ({ profile }: { profile: any }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6 text-center">
        <img
          src={profile.profilePhoto}
          className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
        />

        <h1 className="text-3xl font-semibold">{profile.fullName}</h1>

        <p className="text-gray-500">{profile.email}</p>

        <p className="mt-4 text-gray-700">
          {profile.selfIntroduction || "No introduction yet."}
        </p>
      </Card>
    </div>
  );
};
