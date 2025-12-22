import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Phone, Mail, Globe, Pencil, Building2, User } from "lucide-react";
import { useCompanyProfileStore } from "@/store/companyProfileStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import InlineEdit from "@/components/common/edit/InlineEdit";
import { Switch } from "@/components/ui/switch";
import CompanyPublicProfileView from "@/components/company/CompanyPublicProfileView";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
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
        <LoadingSpinner text="Loading Profile..." />
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
          <CompanyPublicProfileView profile={profile} />
        )}
      </div>
    </MainLayout>
  );
}

const ProfileEdit = ({
  profile,
  updateProfile,
  uploadLogo,
  setViewMode,
}: any) => {
  const [openContact, setOpenContact] = useState(false);

  const [contactDraft, setContactDraft] = useState({
    contactPerson: profile.contactPerson,
    contactPhone: profile.contactPhone,
    contactEmail: profile.contactEmail,
  });

  const normalize = (v: string) => v.trim().toLowerCase();

  const autoCapitalize = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  const [openIndustry, setOpenIndustry] = useState(false);
  const [openTech, setOpenTech] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);

  const [form, setForm] = useState({
    industries: splitToList(profile.industry),
    techRoles: splitToList(profile.techRoles),
    skillsets: splitToList(profile.preferredSkillsets),
  });

  const [temp, setTemp] = useState({
    industry: "",
    tech: "",
    skill: "",
  });

  const isIndustryDuplicate =
    !!temp.industry &&
    form.industries.some(
      (i) => normalize(i) === normalize(autoCapitalize(temp.industry))
    );

  const isTechDuplicate =
    temp.tech &&
    form.techRoles.some(
      (t) => normalize(t) === normalize(autoCapitalize(temp.tech))
    );

  const isSkillDuplicate =
    temp.skill &&
    form.skillsets.some(
      (s) => normalize(s) === normalize(autoCapitalize(temp.skill))
    );
  useEffect(() => {
    setContactDraft({
      contactPerson: profile.contactPerson,
      contactPhone: profile.contactPhone,
      contactEmail: profile.contactEmail,
    });
  }, [profile]);

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

            <CardContent className="border rounded-lg p-4 relative">
              {/* EDIT BUTTON */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenContact(true)}
                className="absolute top-3 right-3"
              >
                <Pencil className="w-4 h-4" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-y-3 text-sm">
                <span className="text-gray-600">
                  {" "}
                  <User /> Contact Person
                </span>
                <div>{profile.contactPerson || <i>Empty</i>}</div>

                <span className="text-gray-600">
                  {" "}
                  <Phone /> Phone
                </span>
                <div>{profile.contactPhone || <i>Empty</i>}</div>

                <span className="text-gray-600">
                  {" "}
                  <Mail /> Email
                </span>
                <div>{profile.contactEmail || <i>Empty</i>}</div>
              </div>
            </CardContent>
          </Card>
          <Dialog open={openContact} onOpenChange={setOpenContact}>
            <DialogContent className="w-[95vw] max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Contact Information</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <Input
                  placeholder="Contact person"
                  value={contactDraft.contactPerson ?? ""}
                  onChange={(e) =>
                    setContactDraft({
                      ...contactDraft,
                      contactPerson: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Phone"
                  value={contactDraft.contactPhone ?? ""}
                  onChange={(e) =>
                    setContactDraft({
                      ...contactDraft,
                      contactPhone: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Email"
                  value={contactDraft.contactEmail ?? ""}
                  onChange={(e) =>
                    setContactDraft({
                      ...contactDraft,
                      contactEmail: e.target.value,
                    })
                  }
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenContact(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    updateProfile(contactDraft);
                    setOpenContact(false);
                  }}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
              <EditBox>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    {form.industries.length > 0 ? (
                      <TagList tags={form.industries} color="primary" />
                    ) : (
                      <i className="text-gray-400">Empty</i>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpenIndustry(true)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              </EditBox>
            </CardContent>
          </Card>
          <Dialog open={openIndustry} onOpenChange={setOpenIndustry}>
            <DialogContent className="w-[95vw] max-w-sm">
              <DialogHeader>
                <DialogTitle>Edit Industry</DialogTitle>
              </DialogHeader>

              {isIndustryDuplicate && (
                <p className="text-xs text-red-500">
                  This industry already exists.
                </p>
              )}

              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Information Technology"
                  value={temp.industry}
                  onChange={(e) =>
                    setTemp({ ...temp, industry: e.target.value })
                  }
                />

                <Button
                  disabled={!temp.industry || Boolean(isIndustryDuplicate)}
                  onClick={() => {
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

              <div className="flex flex-wrap gap-2 mt-4">
                {form.industries.map((v) => (
                  <Badge key={v} className="flex items-center gap-1">
                    {v}
                    <button
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          industries: f.industries.filter((x) => x !== v),
                        }))
                      }
                    >
                      ✕
                    </button>
                  </Badge>
                ))}
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
                    updateProfile({ industry: form.industries.join(", ") });
                    setOpenIndustry(false);
                  }}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* TECH ROLES */}
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">Tech Roles</CardTitle>
            </CardHeader>

            <CardContent className="px-0">
              <EditBox>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    {form.techRoles.length ? (
                      <TagList tags={form.techRoles} color="primary" />
                    ) : (
                      <i className="text-gray-400">Empty</i>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpenTech(true)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              </EditBox>
            </CardContent>
          </Card>
          <Dialog open={openTech} onOpenChange={setOpenTech}>
            <DialogContent className="w-[95vw] max-w-sm">
              <DialogHeader>
                <DialogTitle>Edit Tech Roles</DialogTitle>
              </DialogHeader>

              {isTechDuplicate && (
                <p className="text-xs text-red-500">
                  This role already exists.
                </p>
              )}

              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Frontend Engineer"
                  value={temp.tech}
                  onChange={(e) => setTemp({ ...temp, tech: e.target.value })}
                />
                <Button
                  disabled={!temp.tech || Boolean(isTechDuplicate)}
                  onClick={() => {
                    const formatted = autoCapitalize(temp.tech);

                    if (isTechDuplicate) return;

                    setForm((f) => ({
                      ...f,
                      techRoles: [...f.techRoles, formatted],
                    }));

                    setTemp({ ...temp, tech: "" });
                  }}
                >
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {form.techRoles.map((v) => (
                  <Badge key={v}>
                    {v}
                    <button
                      className="ml-2"
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          techRoles: f.techRoles.filter((x) => x !== v),
                        }))
                      }
                    >
                      ✕
                    </button>
                  </Badge>
                ))}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenTech(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    updateProfile({ techRoles: form.techRoles.join(", ") });
                    setOpenTech(false);
                  }}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* SKILLSETS */}
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-xl font-medium">
                Preferred Skillsets
              </CardTitle>
            </CardHeader>

            <CardContent className="px-0">
              <EditBox>
                <div className="flex justify-between items-start gap-4">
                  {/* LEFT */}
                  <div className="flex-1">
                    {form.skillsets.length > 0 ? (
                      <TagList tags={form.skillsets} color="cyan" />
                    ) : (
                      <i className="text-gray-400">Empty</i>
                    )}
                  </div>

                  {/* RIGHT */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpenSkills(true)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              </EditBox>
            </CardContent>
          </Card>

          <Dialog open={openSkills} onOpenChange={setOpenSkills}>
            <DialogContent className="w-[95vw] max-w-sm">
              <DialogHeader>
                <DialogTitle>Edit Preferred Skillsets</DialogTitle>
              </DialogHeader>

              {/* ERROR */}
              {isSkillDuplicate && (
                <p className="text-xs text-red-500">
                  This skill already exists.
                </p>
              )}

              {/* INPUT */}
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. React"
                  value={temp.skill}
                  onChange={(e) => setTemp({ ...temp, skill: e.target.value })}
                />

                <Button
                  disabled={!temp.skill || Boolean(isSkillDuplicate)}
                  onClick={() => {
                    const formatted = autoCapitalize(temp.skill);

                    if (isSkillDuplicate) return;

                    setForm((f) => ({
                      ...f,
                      skillsets: [...f.skillsets, formatted],
                    }));

                    setTemp({ ...temp, skill: "" });
                  }}
                >
                  Add
                </Button>
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mt-4">
                {form.skillsets.map((v) => (
                  <Badge key={v} className="flex items-center gap-1">
                    {v}
                    <button
                      className="ml-1"
                      onClick={() =>
                        setForm((f) => ({
                          ...f,
                          skillsets: f.skillsets.filter((x) => x !== v),
                        }))
                      }
                    >
                      ✕
                    </button>
                  </Badge>
                ))}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenSkills(false)}>
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    updateProfile({
                      preferredSkillsets: form.skillsets.join(", "),
                    });
                    setOpenSkills(false);
                  }}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
const FieldRow = ({ icon, children }: any) => (
  <div className="grid grid-cols-[20px_1fr] gap-2 items-center text-sm text-gray-700">
    <span className="text-gray-500">{icon}</span>
    <div className="break-all">{children}</div>
  </div>
);

const EditBox = ({ children }: any) => (
  <div className="border rounded-lg  p-3 mb-4">{children}</div>
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
