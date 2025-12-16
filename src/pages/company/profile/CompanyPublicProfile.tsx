// ============================================================
// PublicCompanyProfile.tsx
// Public View for Company Profile (Read-Only)
// ============================================================

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { companyServices } from "@/services/companyServices";
import MainLayout from "@/layouts/MainLayout";

import { Card } from "@/components/ui/card";
import { Mail, Globe, User2 } from "lucide-react";

/* ===============================
 * TYPES (MATCH BACKEND RESPONSE)
 * =============================== */
interface CompanyPublicProfile {
  id: string;

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

/* ===============================
 * HELPERS
 * =============================== */
const splitToList = (value?: string | null): string[] => {
  if (!value) return [];
  return value
    .split(/[,|;/\n]+/)
    .map((v) => v.trim())
    .filter(Boolean);
};

/* ===============================
 * PAGE
 * =============================== */
export default function PublicCompanyProfile() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<CompanyPublicProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const res = await companyServices.getCompanyById(id);
        setProfile(res.data.data);
      } catch (err) {
        console.error("Failed to load company profile:", err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Company not found.
      </div>
    );
  }

  /* ===============================
   * PARSE DATA
   * =============================== */
  const industries = splitToList(profile.industry);
  const techRoles = splitToList(profile.techRoles);
  const skillsets = splitToList(profile.preferredSkillsets);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* ================= HEADER ================= */}
        <Card className="rounded-2xl border border-gray-200 shadow-none">
          <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
  {/* LOGO WRAPPER */}
  <div className="w-64 h-40 flex items-center justify-center shrink-0">
    {profile.logo ? (
      <img
        src={profile.logo}
        alt={profile.companyName}
        className="max-w-full max-h-full object-contain rounded-2xl"
      />
    ) : (
      <span className="text-3xl font-bold text-gray-500">
        {profile.companyName?.substring(0, 6)}
      </span>
    )}
  </div>

  {/* INFO */}
  <div className="flex-1">
    <h1 className="text-3xl font-semibold text-gray-900 mb-3">
      {profile.companyName}
    </h1>

    {/* LINKS */}
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mb-4">
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

        </Card>

{/* ================= CONTACT INFORMATION ================= */}
{profile.contactInfoVisible && (
  <Section title="Contact Information">
    <Card className="rounded-2xl border border-gray-200 shadow-none">
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


        {/* ================= SUMMARY ================= */}
        {profile.companySummary && (
          <Section title="Company Summary">
            <Card className="rounded-2xl border border-gray-200 shadow-none">
              <div className="p-6 text-gray-700 leading-relaxed">
                {profile.companySummary}
              </div>
            </Card>
          </Section>
        )}

        {/* ================= INDUSTRY ================= */}
        <Section title="Industry">
          <TagList items={industries} color="purple" />
        </Section>

        {/* ================= TECH ROLES ================= */}
        <Section title="Interested Roles">
          <TagList items={techRoles} color="blue" />
        </Section>

        {/* ================= SKILLSETS ================= */}
        <Section title="Preferred Skillsets">
          <TagList items={skillsets} color="cyan" />
        </Section>
      </div>
    </MainLayout>
  );
}

/* ===============================
 * REUSABLE UI
 * =============================== */

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
      <div className="text-sm font-medium text-gray-500">
        {label}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-800">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
};
