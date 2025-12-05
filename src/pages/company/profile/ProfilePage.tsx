import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Phone, Mail, Globe, User, Building2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useCompanyProfileStore } from "@/store/companyProfileStore";

export default function CompanyProfilePages() {
  const [viewMode, setViewMode] = useState<"edit" | "public">("edit");

  const {
    profile,
    fetchProfile,
    updateProfile,
    uploadLogo,
    loading,
  } = useCompanyProfileStore();

  // Load data saat halaman dibuka
  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return <div className="p-8">Loading profile...</div>;
  }

  return (
    <div>
      {/* Toggle */}
      <div className="fixed top-4 right-4 bg-white shadow-lg border rounded-lg p-2">
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
        <CompanyEdit profile={profile} updateProfile={updateProfile} uploadLogo={uploadLogo} />
      ) : (
        <CompanyPublic profile={profile} />
      )}
    </div>
  );
}

/* ==========================
   EDIT VIEW
========================== */
function CompanyEdit({ profile, updateProfile, uploadLogo }: any) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Logo */}
      <Card className="mb-6 p-8">
        <div className="flex gap-6">
          <div className="relative">
            <div className="w-48 h-32 bg-purple-600 rounded-2xl text-white flex items-center justify-center text-2xl font-bold">
              {profile.name?.substring(0, 2).toUpperCase()}
            </div>

            <label className="absolute bottom-2 right-2 cursor-pointer">
              <Pencil className="h-5 w-5 bg-white p-1 rounded-full shadow" />
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

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{profile.name}</h1>

            <p className="mt-2 text-sm text-indigo-600">{profile.website}</p>
          </div>
        </div>
      </Card>

      {/* Contact Info */}
      <Card className="p-6 mb-6">
        <h3 className="font-semibold mb-4">Contact Information</h3>

        <Detail label="Contact Name" value={profile.contactInfo.name} icon={<User />} />

        <Detail label="Phone Number" value={profile.contactInfo.phone} icon={<Phone />} />

        <Detail label="Email" value={profile.contactInfo.email} icon={<Mail />} />
      </Card>

      {/* Visibility */}
      <Card className="p-6 mb-6">
        <h3 className="font-semibold mb-4">Contact Visibility</h3>

        <Toggle
          label="Show Phone Number"
          checked={profile.contactVisibility.phoneNumber}
          onChange={(v: string) =>
            updateProfile({
              contactVisibility: { ...profile.contactVisibility, phoneNumber: v },
            })
          }
        />

        <Toggle
          label="Show Email"
          checked={profile.contactVisibility.email}
          onChange={(v: string) =>
            updateProfile({
              contactVisibility: { ...profile.contactVisibility, email: v },
            })
          }
        />
      </Card>

      {/* Summary */}
      <Card className="p-6 mb-6">
        <h3 className="font-semibold mb-4">Summary</h3>
        <textarea
          className="w-full p-3 border rounded"
          rows={3}
          value={profile.summary || ""}
          onChange={(e) => updateProfile({ summary: e.target.value })}
        />
      </Card>
    </div>
  );
}

/* ==========================
   PUBLIC VIEW
========================== */
function CompanyPublic({ profile }: any) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-8 mb-6">
        <h1 className="text-3xl font-bold">{profile.name}</h1>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="font-semibold mb-4">Contact</h3>
        <Detail label="Name" value={profile.contactInfo.name} icon={<User />} />
        <Detail label="Phone" value={profile.contactInfo.phone} icon={<Phone />} />
        <Detail label="Email" value={profile.contactInfo.email} icon={<Mail />} />
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Summary</h3>
        <p>{profile.summary}</p>
      </Card>
    </div>
  );
}

/* ==========================
   SMALL COMPONENTS
========================== */
function Detail({ label, value, icon }: any) {
  return (
    <div className="flex items-center gap-3 mb-3 text-sm">
      {icon}
      <span className="font-medium">{label}:</span>
      <span>{value || "-"}</span>
    </div>
  );
}

function Toggle({ label, checked, onChange }: any) {
  return (
    <div className="flex items-center justify-between mt-2 mb-2">
      <span>{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
