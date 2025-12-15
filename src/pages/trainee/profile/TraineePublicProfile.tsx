import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { studentServices } from "@/services/studentServices";
import MainLayout from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Linkedin, Globe } from "lucide-react";

/* ===============================
 * TYPES
 * =============================== */
interface TraineePublicProfile {
  id: string;
  fullName: string;
  batch: string | null;
  status: string | null;
  employmentStatus: string | null;
  university: string | null;
  major: string | null;
  preferredIndustry: string | null;
  techStack: string | null;
  portfolioLink: string | null;
  linkedin: string | null;
  cvUpload: string | null;
  profilePhoto: string | null;
  selfIntroduction: string | null;
  phone: string | number | null;
  email: string | null;
  testimony?: string | null;
}

/* ===============================
 * HELPERS
 * =============================== */
const splitToList = (value?: string): string[] => {
  if (!value) return [];
  return value
    .split(/[,|;/\n]+/)
    .map(v => v.trim())
    .filter(Boolean);
};

const TAG_COLOR = {
  purple: "bg-purple-100 text-purple-700",
  cyan: "bg-cyan-100 text-cyan-700",
};

/* ===============================
 * PAGE
 * =============================== */
export default function PublicTraineeProfile() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<TraineePublicProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const res = await studentServices.getStudentById(id);
        setProfile(res.data.data);
      } catch (err) {
        console.error("Failed to load trainee profile:", err);
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
        Trainee not found.
      </div>
    );
  }

const industries = splitToList(profile.preferredIndustry ?? undefined);
const techStack = splitToList(profile.techStack ?? undefined);

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* ================= HEADER ================= */}
        <Card className="rounded-2xl border border-gray-200 shadow-none">
          <div className="p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <img
              src={profile.profilePhoto || "/default-avatar.png"}
              alt={profile.fullName}
              className="w-32 h-32 rounded-full object-cover border"
            />

            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-gray-900 mb-3">
                {profile.fullName}
              </h1>

              {/* BADGES */}
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.batch && <Badge color="purple">{profile.batch}</Badge>}
                {profile.status && <Badge color="cyan">{profile.status}</Badge>}
                {profile.employmentStatus && (
                  <Badge color="green">{profile.employmentStatus}</Badge>
                )}
              </div>

              {/* CONTACT */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
                {profile.phone && (
                  <InlineInfo icon={<Phone />} text={profile.phone} />
                )}
                {profile.email && (
                  <IconButton
                    icon={<Mail size={16} />}
                    onClick={() =>
                      (window.location.href = `mailto:${profile.email}`)
                    }
                  />
                )}
                {profile.linkedin && (
                  <IconButton
                    icon={<Linkedin size={16} />}
                    onClick={() => window.open(profile.linkedin!, "_blank")}
                  />
                )}
                {profile.portfolioLink && (
                  <IconButton
                    icon={<Globe size={16} />}
                    onClick={() =>
                      window.open(profile.portfolioLink!, "_blank")
                    }
                  />
                )}
              </div>

              {/* ACTION */}
              <div className="flex gap-3">
                {profile.cvUpload && (
                  <Button
                    className="bg-purple-600 text-white"
                    onClick={() => window.open(profile.cvUpload!, "_blank")}
                  >
                    Download CV
                  </Button>
                )}
                {profile.portfolioLink && (
                  <Button
                    variant="outline"
                    className="border-purple-600 text-purple-600"
                    onClick={() =>
                      window.open(profile.portfolioLink!, "_blank")
                    }
                  >
                    View Portfolio
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* ================= INTRO ================= */}
        <Section title="Introduction">
          <Card className="rounded-2xl border border-gray-200 shadow-none">
            <div className="p-6 text-gray-700 leading-relaxed">
              {profile.selfIntroduction || "No introduction provided."}
            </div>
          </Card>
        </Section>

        {/* ================= EDUCATION ================= */}
        <Section title="Education">
          <Card className="rounded-2xl border border-gray-200 shadow-none">
            <div className="p-6">
              <p className="text-gray-600 text-sm">{profile.university}</p>
              <p className="text-gray-900 font-medium">{profile.major}</p>
            </div>
          </Card>
        </Section>

        {/* ================= INDUSTRY ================= */}
        <Section title="Preferred Industry">
          <TagList items={industries} color="purple" />
        </Section>

        {/* ================= TECH STACK ================= */}
        <Section title="Tech Stack">
          <TagList items={techStack} color="cyan" />
        </Section>

        {/* ================= TESTIMONY ================= */}
        {profile.testimony && (
          <Section title="Testimony">
            <Card className="rounded-2xl border border-gray-200 shadow-none">
              <div className="p-6 text-gray-700">
                {profile.testimony}
              </div>
            </Card>
          </Section>
        )}
      </div>
    </MainLayout>
  );
}

/* ===============================
 * REUSABLE UI
 * =============================== */

const Section = ({ title, children }: any) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
      {title}
    </h2>
    {children}
  </div>
);

const InlineInfo = ({ icon, text }: any) => (
  <span className="flex items-center gap-2">
    {icon}
    {text}
  </span>
);

const IconButton = ({ icon, onClick }: any) => (
  <button
    onClick={onClick}
    className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded"
  >
    {icon}
  </button>
);

const Badge = ({
  children,
  color,
}: {
  children: string;
  color: "purple" | "cyan" | "green";
}) => {
  const map: any = {
    purple: "bg-purple-100 text-purple-700",
    cyan: "bg-cyan-100 text-cyan-700",
    green: "bg-green-100 text-green-700",
  };
  return (
    <span className={`px-3 py-1 text-sm rounded-md ${map[color]}`}>
      {children}
    </span>
  );
};

const TagList = ({
  items,
  color,
}: {
  items: string[];
  color: "purple" | "cyan";
}) => (
  <div className="flex flex-wrap gap-2">
    {items.length ? (
      items.map((item, i) => (
        <span
          key={i}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${TAG_COLOR[color]}`}
        >
          {item}
        </span>
      ))
    ) : (
      <p className="text-gray-500">Not provided</p>
    )}
  </div>
);
