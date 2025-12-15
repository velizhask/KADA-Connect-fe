import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";

import { Phone, Mail, Globe, Pencil, Building2, User } from "lucide-react";

import { useCompanyProfileStore } from "@/store/companyProfileStore";

// Shadcn UI
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import InlineEdit from "@/components/common/edit/InlineEdit";
import { Switch } from "@/components/ui/switch";
export default function CompanyProfile() {
  const { profile, loading, fetchProfile, updateProfile, uploadLogo } =
    useCompanyProfileStore();

  const [viewMode, setViewMode] = useState<"edit" | "public">("edit");

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading || !profile) {
    return (
      <MainLayout>
        <div className="h-screen flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
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
            uploadLogo={uploadLogo}
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
  uploadLogo,
  setViewMode,
}: any) => {
  const industries = (profile.industry || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const skillsets = (profile.preferredSkillsets || "")
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
              {/* LOGO */}
              <div className="relative max-w-[260px]">
  {profile.logo ? (
    <img
      src={profile.logo}
      alt={profile.companyName || "Company logo"}
      className="
        max-h-60
        object-contain
      "
    />
  ) : (
    <div className="h-32 w-48 flex items-center justify-center bg-gray-100 rounded-md">
      <Building2 className="w-10 h-10 text-gray-400" />
    </div>
  )}

  {/* UPLOAD BUTTON */}
  <label className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow border cursor-pointer hover:bg-gray-50">
    <input
      type="file"
      className="hidden"
      accept="image/*"
      onChange={(e) => uploadLogo(e.target.files?.[0])}
    />
    <Pencil className="h-4 w-4 text-gray-700" />
  </label>
</div>


              {/* TEXT */}
              <div className="space-y-4 flex-1">
                <div className="text-2xl font-semibold text-gray-900">
                  <InlineEdit
                    value={profile.companyName}
                    onSave={(v) => updateProfile({ companyName: v })}
                  />
                </div>

                {/* CONTACT */}
                <div className="space-y-2">
                  <FieldRow icon={<Globe className="h-4 w-4" />}>
                    <InlineEdit
                      value={profile.website}
                      placeholder="Add website"
                      onSave={(v) => updateProfile({ website: v })}
                    />
                  </FieldRow>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="border-primary text-primary"
              onClick={() => setViewMode("public")}
            >
              See Public View
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">
                Contact Information
              </CardTitle>
            </CardHeader>

            <CardContent className="border rounded-lg p-4">
              <div className="grid grid-cols-[160px_1fr] gap-y-4 gap-x-6 text-sm">
                {/* NAME */}
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span>Name</span>
                </div>
                <InlineEdit
                  value={profile.contactPerson}
                  placeholder="Contact person"
                  onSave={(v) => updateProfile({ contactPerson: v })}
                />

                {/* PHONE */}
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>Phone</span>
                </div>
                <InlineEdit
                  value={profile.contactPhone}
                  placeholder="Add phone"
                  onSave={(v) => updateProfile({ contactPhone: v })}
                />

                {/* EMAIL */}
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </div>
                <InlineEdit
                  value={profile.contactEmail}
                  placeholder="Add email"
                  onSave={(v) => updateProfile({ contactEmail: v })}
                />
              </div>
            </CardContent>
          </Card>

          {/* SUMMARY */}
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">Summary</CardTitle>
            </CardHeader>
            <CardContent className="border rounded-lg p-4">
              <InlineEdit
                value={profile.companySummary}
                multiline
                placeholder="Company summary"
                onSave={(v) => updateProfile({ companySummary: v })}
              />
            </CardContent>
          </Card>

          {/* INDUSTRY */}
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">Industry</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <InlineEdit
                value={profile.industry}
                placeholder="Industry"
                onSave={(v) => updateProfile({ industry: v })}
              />
              {industries.length > 0 && (
                <TagList tags={industries} color="primary" />
              )}
            </CardContent>
          </Card>

          {/* SKILLSETS */}
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">
                Preferred Skillsets
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <InlineEdit
                value={profile.preferredSkillsets}
                placeholder="Skills"
                onSave={(v) =>
                  updateProfile({
                    preferredSkillsets: v,
                  })
                }
              />
              {skillsets.length > 0 && (
                <TagList tags={skillsets} color="cyan" />
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <Card className="shadow-none border-none">
            <CardHeader>
              <CardTitle className="text-xl font-medium">
                Profile Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${profile.completionRate ?? 0}%`,
                  }}
                />
              </div>
              <p className="text-sm font-medium">
                {profile.completionRate ?? 0}% completed
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-none border-none">
            <CardHeader>
              <CardTitle className="text-xl font-medium">Settings</CardTitle>
            </CardHeader>

            <CardContent className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  Contact Visibility
                </p>
                <p className="text-xs text-gray-500">
                  Show contact information to public
                </p>
              </div>

              <Switch
                checked={profile.contactInfoVisible}
                onCheckedChange={(checked) =>
                  updateProfile({ contactInfoVisible: checked })
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ProfilePublic = ({ profile, setViewMode }: any) => {
  const industries = (profile.industry || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const skillsets = (profile.preferredSkillsets || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl border border-gray-200 shadow-none">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Avatar className="w-48 h-48 border shadow-sm">
              <AvatarImage src={profile.logo || undefined} />
              <AvatarFallback>
                <Building2 />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <h1 className="text-3xl font-semibold">{profile.companyName}</h1>

              <div className="flex flex-wrap gap-2">
                {industries.map((i: string) => (
                  <Badge key={i}>{i}</Badge>
                ))}
              </div>
            </div>

            <Button variant="outline" onClick={() => setViewMode("edit")}>
              Back to Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>{profile.companySummary}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferred Skillsets</CardTitle>
        </CardHeader>
        <CardContent>
          <TagList tags={skillsets} color="cyan" />
        </CardContent>
      </Card>
    </div>
  );
};

// ============================================================
// SHARED
// ============================================================

const FieldRow = ({ icon, children }: any) => (
  <div className="flex items-center gap-2 text-sm text-gray-700">
    <span className="text-gray-500">{icon}</span>
    <div className="flex-1">{children}</div>
  </div>
);

const TagList = ({ tags, color }: any) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((t: string, i: number) => (
      <Badge
        key={i}
        className={
          color === "primary"
            ? "bg-primary/5 text-primary"
            : "bg-cyan-50 text-cyan-700"
        }
      >
        {t}
      </Badge>
    ))}
  </div>
);
