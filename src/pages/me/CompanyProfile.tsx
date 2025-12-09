// ============================================================
// CompanyProfile.tsx
// ============================================================

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Phone, Mail, Globe, User, Linkedin } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useCompanyProfileStore } from "@/store/companyProfileStore";
import EditTableField from "@/components/common/edit/EdittableField";

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CompanyProfile() {
  const [viewMode, setViewMode] = useState<"edit" | "public">("edit");
  const { profile, fetchProfile, updateProfile, uploadLogo } =
    useCompanyProfileStore();

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <div className="p-8">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* TOGGLE VIEW MODE */}
      <div className="fixed top-6 right-6 z-50 bg-white rounded-lg shadow-md p-1 border border-gray-200">
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={viewMode === "edit" ? "default" : "ghost"}
            onClick={() => setViewMode("edit")}
          >
            Edit Mode
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

      {viewMode === "edit" ? (
        <CompanyEdit
          profile={profile}
          updateProfile={updateProfile}
          uploadLogo={uploadLogo}
        />
      ) : (
        <CompanyPublic profile={profile} />
      )}
    </div>
  );
}

// ============================================================
// EDIT VIEW
// ============================================================

function CompanyEdit({ profile, updateProfile, uploadLogo }: any) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* HEADER */}
      <Card className="mb-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* LOGO */}
            <div className="relative shrink-0">
              <div className="w-64 h-40 bg-linear-to-br from-purple-600 to-purple-700 rounded-3xl text-white flex items-center justify-center text-4xl font-bold shadow-lg">
                {profile.logo ? (
                  <img
                    src={profile.logo}
                    alt="Logo"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                ) : (
                  <span>{profile.name?.substring(0, 6) || "Company"}</span>
                )}
              </div>

              <label className="absolute bottom-3 right-3 bg-white p-2.5 rounded-full shadow-md cursor-pointer border border-gray-200 hover:bg-gray-50">
                <Pencil className="h-4 w-4 text-gray-600" />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadLogo(file);
                  }}
                />
              </label>
            </div>

            {/* INFO */}
            <div className="flex-1 space-y-4">
              <EditTableField
                label=""
                fieldKey="name"
                value={profile.name || "Company Name"}
                onSave={updateProfile}
              />

              <div className="space-y-2">
                <ContactRowCompact
                  icon={<Linkedin className="h-4 w-4" />}
                  value={profile.linkedin || ""}
                  fieldKey="linkedin"
                  onSave={updateProfile}
                />
                <ContactRowCompact
                  icon={<Globe className="h-4 w-4" />}
                  value={profile.website || "https://"}
                  fieldKey="website"
                  onSave={updateProfile}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* CONTACT INFORMATION */}
          <SectionCard title="Contact Information">
            <div className="space-y-4">
              <InfoRowWithIcon
                icon={<User className="h-5 w-5" />}
                label="Contact Person"
                value={profile.contactInfo?.name || ""}
                fieldKey="contactInfo.name"
                onSave={(data: any) =>
                  updateProfile({
                    contactInfo: {
                      ...profile.contactInfo,
                      name: data["contactInfo.name"],
                    },
                  })
                }
              />

              <InfoRowWithIcon
                icon={<Phone className="h-5 w-5" />}
                label="Phone Number"
                value={profile.contactInfo?.phone || ""}
                fieldKey="contactInfo.phone"
                onSave={(data: any) =>
                  updateProfile({
                    contactInfo: {
                      ...profile.contactInfo,
                      phone: data["contactInfo.phone"],
                    },
                  })
                }
              />

              <InfoRowWithIcon
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={profile.contactInfo?.email || ""}
                fieldKey="contactInfo.email"
                onSave={(data: any) =>
                  updateProfile({
                    contactInfo: {
                      ...profile.contactInfo,
                      email: data["contactInfo.email"],
                    },
                  })
                }
              />
            </div>
          </SectionCard>

          {/* SUMMARY */}
          <SectionCard title="Summary">
            <EditTableField
              type="textarea"
              fieldKey="summary"
              value={profile.summary || ""}
              onSave={updateProfile}
            />
          </SectionCard>

          {/* SECTOR */}
          <SectionCard title="Sector">
            <EditTableField
              fieldKey="sectors"
              value={profile.sectors.join(", ")}
              onSave={async (data: any) => {
                const arr = data.sectors
                  ?.split(",")
                  .map((s: string) => s.trim())
                  .filter(Boolean);
                await updateProfile({ sectors: arr });
              }}
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {profile.sectors.map((item: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* SKILLSETS */}
          <SectionCard title="Preferred Skillsets">
            <EditTableField
              fieldKey="preferredSkills"
              value={profile.preferredSkills.join(", ")}
              onSave={async (data: any) => {
                const arr = data.preferredSkills
                  ?.split(",")
                  .map((s: string) => s.trim())
                  .filter(Boolean);
                await updateProfile({ preferredSkills: arr });
              }}
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {profile.preferredSkills.map((item: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-lg text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </SectionCard>

          {/* INTERESTED ROLES */}
          <SectionCard title="Interested Roles">
            <EditTableField
              fieldKey="interestedRoles"
              value={profile.interestedRoles.join(", ")}
              onSave={async (data: any) => {
                const arr = data.interestedRoles
                  ?.split(",")
                  .map((s: string) => s.trim())
                  .filter(Boolean);
                await updateProfile({ interestedRoles: arr });
              }}
            />

            <div className="flex flex-wrap gap-2 mt-3">
              {profile.interestedRoles.map((item: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-cyan-100 text-cyan-700 rounded-lg text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* COMPLETION */}
          <SectionCard title="Profile Completion">
            <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${profile.completionRate}%` }}
              />
            </div>
            <p className="text-gray-700 font-medium text-sm">
              {profile.completionRate}% complete
            </p>
          </SectionCard>

          {/* SETTINGS */}
          <SectionCard title="Settings">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 text-sm">
                Show Contact Information
              </span>
              <Switch
                checked={profile.contactVisibility?.enabled}
                onCheckedChange={(checked) =>
                  updateProfile({
                    contactVisibility: {
                      ...profile.contactVisibility,
                      enabled: checked,
                    },
                  })
                }
              />
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PUBLIC VIEW
// ============================================================

function CompanyPublic({ profile }: any) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      {/* HEADER */}
      <Card className="rounded-2xl shadow-sm border border-gray-200">
        <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-64 h-40 bg-linear-to-br from-purple-600 to-purple-700 rounded-3xl text-white flex items-center justify-center text-4xl font-bold shadow-lg shrink-0">
            {profile.logo ? (
              <img
                src={profile.logo}
                alt="Logo"
                className="w-full h-full object-cover rounded-3xl"
              />
            ) : (
              <span>{profile.name?.substring(0, 6) || "Company"}</span>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">
              {profile.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  <Linkedin className="h-5 w-5 text-gray-700" />
                </a>
              )}
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  <Globe className="h-5 w-5 text-gray-700" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* CONTACT INFO */}
      <SectionCard title="Contact Information">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PublicInfoItem
            icon={<User className="h-5 w-5" />}
            label="Contact Person"
            value={profile.contactInfo?.name || "-"}
          />
          <PublicInfoItem
            icon={<Phone className="h-5 w-5" />}
            label="Phone Number"
            value={profile.contactInfo?.phone || "-"}
          />
          <PublicInfoItem
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            value={profile.contactInfo?.email || "-"}
          />
        </div>
      </SectionCard>

      {/* SUMMARY */}
      <SectionCard title="Summary">
        <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
      </SectionCard>

      {/* SECTOR */}
      <SectionCard title="Sector">
        <div className="flex flex-wrap gap-2">
          {profile.sectors.map((item: string, i: number) => (
            <span
              key={i}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </SectionCard>

      {/* SKILLS */}
      <SectionCard title="Preferred Skillsets">
        <div className="flex flex-wrap gap-2">
          {profile.preferredSkills.map((item: string, i: number) => (
            <span
              key={i}
              className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </SectionCard>

      {/* ROLES */}
      <SectionCard title="Interested Roles">
        <div className="flex flex-wrap gap-2">
          {profile.interestedRoles.map((item: string, i: number) => (
            <span
              key={i}
              className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

// ============================================================
// SHARED COMPONENTS
// ============================================================

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
    <div className="flex-1">
      <EditTableField
        label=""
        fieldKey={fieldKey}
        value={value}
        onSave={onSave}
      />
    </div>
  </div>
);

const InfoRowWithIcon = ({ icon, label, value, fieldKey, onSave }: any) => (
  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
    <div className="flex items-center gap-3">
      <span className="text-gray-500">{icon}</span>
      <span className="text-sm text-gray-600">{label}</span>
    </div>

    <EditTableField
      fieldKey={fieldKey}
      value={value}
      label=""
      onSave={onSave}
    />
  </div>
);

const PublicInfoItem = ({ icon, label, value }: any) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-gray-500">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <p className="text-gray-900 text-sm">{value}</p>
  </div>
);
