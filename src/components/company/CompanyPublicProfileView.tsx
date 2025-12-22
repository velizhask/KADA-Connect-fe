import { Card } from "@/components/ui/card";
import { Mail, Globe, User2 } from "lucide-react";
import { Button } from "../ui/button";

export interface CompanyPublicProfile {
  id?: string;
  companyName: string;
  companySummary?: string | null;
  industry?: string | null;
  website?: string | null;
  logo?: string | null;
  techRoles?: string | null;
  preferredSkillsets?: string | null;
  contactPerson?: string | null;
  contactEmail?: string | null;
  contactInfoVisible?: boolean;
}

interface Props {
  profile: CompanyPublicProfile;
  showBackToEdit?: boolean;
  onBackToEdit?: () => void;
}

const splitToList = (value?: string | null): string[] =>
  value
    ? value
        .split(/[,|;/\n]+/)
        .map((v) => v.trim())
        .filter(Boolean)
    : [];

export default function CompanyPublicProfileView({
  profile,
  showBackToEdit = false,
  onBackToEdit,
}: Props) {
  const industries = splitToList(profile.industry);
  const techRoles = splitToList(profile.techRoles);
  const skillsets = splitToList(profile.preferredSkillsets);

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <Card className="rounded-2xl border border-gray-200 shadow-none">
        <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* LEFT CONTENT */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 flex-1">
            {/* LOGO */}
            <div className="w-56 sm:w-64 h-36 sm:h-40 flex items-center justify-center shrink-0">
              {profile.logo ? (
                <img
                  src={profile.logo}
                  alt={profile.companyName}
                  className="max-w-full max-h-full object-contain rounded-xl"
                />
              ) : (
                <span className="text-3xl font-bold text-gray-500">
                  {profile.companyName?.substring(0, 6)}
                </span>
              )}
            </div>

            {/* INFO */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
                {profile.companyName}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-700">
                {profile.website && (
                  <IconButton
                    icon={<Globe className="h-4 w-4" />}
                    onClick={() => window.open(profile.website!, "_blank")}
                  />
                )}
                {profile.contactEmail && profile.contactInfoVisible && (
                  <IconButton
                    icon={<Mail className="h-4 w-4" />}
                    onClick={() =>
                      (window.location.href = `mailto:${profile.contactEmail}`)
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT ACTION */}
          {showBackToEdit && (
            <Button
              variant="default"
              className="bg-primary text-white w-full lg:w-auto cursor-pointer"
              onClick={onBackToEdit}
            >
              Back to Edit
            </Button>
          )}
        </div>
      </Card>

      {profile.contactInfoVisible && (
        <Section title="Contact Information">
          <Card className="rounded-2xl border shadow-none">
            <div className="p-6 space-y-4">
              <LabelRow
                label="Contact Person"
                value={profile.contactPerson}
                icon={<User2 className="h-4 w-4 text-gray-400" />}
              />
              <LabelRow
                label="Email"
                value={profile.contactEmail}
                icon={<Mail className="h-4 w-4 text-gray-400" />}
              />
            </div>
          </Card>
        </Section>
      )}

      {profile.companySummary && (
        <Section title="Company Summary">
          <Card className="rounded-2xl border shadow-none">
            <div className="p-6 text-gray-700 leading-relaxed">
              {profile.companySummary}
            </div>
          </Card>
        </Section>
      )}

      <Section title="Industry">
        <TagList items={industries} color="purple" />
      </Section>

      <Section title="Interested Roles">
        <TagList items={techRoles} color="blue" />
      </Section>

      <Section title="Preferred Skillsets">
        <TagList items={skillsets} color="cyan" />
      </Section>
    </div>
  );
}

const Section = ({ title, children }: any) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
    {children}
  </div>
);

const IconButton = ({ icon, onClick }: any) => (
  <button
    onClick={onClick}
    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
  >
    {icon}
  </button>
);

const TAG_COLOR: Record<string, string> = {
  purple: "bg-purple-100 text-purple-700",
  cyan: "bg-cyan-100 text-cyan-700",
  blue: "bg-blue-100 text-blue-700",
};

const TagList = ({
  items,
  color,
}: {
  items: string[];
  color: "purple" | "cyan" | "blue";
}) => {
  if (!items.length) return <p className="text-gray-500">Not provided</p>;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${TAG_COLOR[color]}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
};
const LabelRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  if (!value) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4">
      <div className="text-sm font-medium text-gray-500">{label}</div>
      <div className="flex items-center gap-2 text-sm text-gray-800">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
};
