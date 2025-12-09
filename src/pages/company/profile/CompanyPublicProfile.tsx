// ============================================================
// PublicCompanyProfile.tsx
// Public View for Company Profile (Read-Only)
// ============================================================

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/services/axiosInstance";

import { Card } from "@/components/ui/card";
import {
  Phone,
  Mail,
  Linkedin,
  Globe,
  Building2,
} from "lucide-react";

// ===============================
// API RESPONSE TYPE
// ===============================
interface CompanyPublicProfile {
  id: string;
  name: string;
  logo?: string | null;
  website?: string | null;
  linkedin?: string | null;

  contactInfo?: {
    name?: string | null;
    phone?: string | null;
    email?: string | null;
  };

  summary?: string | null;

  sectors?: string[];
  preferredSkills?: string[];
  interestedRoles?: string[];

  contactVisibility?: {
    enabled: boolean;
  };
}

// ===============================
// MAIN PAGE COMPONENT
// ===============================
export default function PublicCompanyProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<CompanyPublicProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch public company profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axiosInstance.get(`/company/${id}`);
        setProfile(res.data.data);
      } catch (err) {
        console.error("Failed to load company profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );

  if (!profile)
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Company not found.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* HEADER CARD */}
      <Card className="rounded-2xl shadow-sm border border-gray-200">
        <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-6">

          {/* LOGO */}
          <div className="w-64 h-40 rounded-3xl shadow-lg bg-linear-to-br from-purple-600 to-purple-700 text-white flex items-center justify-center text-4xl font-bold shrink-0">
            {profile.logo ? (
              <img
                src={profile.logo}
                alt="Company Logo"
                className="w-full h-full object-cover rounded-3xl"
              />
            ) : (
              <span>{profile.name?.substring(0, 6) || "Company"}</span>
            )}
          </div>

          {/* INFO */}
          <div className="flex-1">
            {/* NAME */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              {profile.name}
            </h1>

            {/* CONTACTS */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mb-4">
              {profile.website && (
                <IconButton
                  icon={<Globe className="h-4 w-4" />}
                  onClick={() => window.open(profile.website!, "_blank")}
                />
              )}
              {profile.linkedin && (
                <IconButton
                  icon={<Linkedin className="h-4 w-4" />}
                  onClick={() => window.open(profile.linkedin!, "_blank")}
                />
              )}
            </div>

            {/* CONTACT PERSON - VISIBLE ONLY IF ALLOWED  */}
            {profile.contactVisibility?.enabled && (
              <div className="space-y-2 mt-4 text-sm text-gray-700">
                {profile.contactInfo?.name && (
                  <InlineInfo
                    icon={<Building2 className="h-4 w-4" />}
                    text={`Contact Person: ${profile.contactInfo.name}`}
                  />
                )}

                {profile.contactInfo?.phone && (
                  <InlineInfo
                    icon={<Phone className="h-4 w-4" />}
                    text={profile.contactInfo.phone}
                  />
                )}

                {profile.contactInfo?.email && (
                  <InlineInfo
                    icon={<Mail className="h-4 w-4" />}
                    text={profile.contactInfo.email}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* SUMMARY */}
      {profile.summary && (
        <Section title="Company Summary">
          <Card className="rounded-2xl shadow-sm border-gray-200">
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed">
                {profile.summary}
              </p>
            </div>
          </Card>
        </Section>
      )}

      {/* SECTORS */}
      <Section title="Industry Sectors">
        <TagList items={profile.sectors || []} color="purple" />
      </Section>

      {/* PREFERRED SKILLS */}
      <Section title="Preferred Skillsets">
        <TagList items={profile.preferredSkills || []} color="cyan" />
      </Section>

      {/* INTERESTED ROLES */}
      <Section title="Interested Roles">
        <TagList items={profile.interestedRoles || []} color="blue" />
      </Section>
    </div>
  );
}

/* ============================================================
 * REUSABLE COMPONENTS
 * ============================================================ */

const Section = ({ title, children }: any) => (
  <div className="space-y-3">
    <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
    {children}
  </div>
);

const InlineInfo = ({ icon, text }: any) => (
  <div className="flex items-center gap-2 text-gray-700">
    {icon}
    <span>{text}</span>
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

const TagList = ({ items, color }: { items: string[]; color: string }) => {
  if (!items || items.length === 0)
    return <p className="text-gray-500">Not provided</p>;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className={`px-4 py-2 bg-${color}-100 text-${color}-700 rounded-lg text-sm font-medium`}
        >
          {item}
        </span>
      ))}
    </div>
  );
};
