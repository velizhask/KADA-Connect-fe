import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/services/axiosInstance";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  Linkedin,
  Globe,
} from "lucide-react";

// ===============================
// API RESPONSE TYPE
// ===============================
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
  capstoneProject: string | null;
  projectLink?: string | null;
  testimony?: string | null;
}

// ===============================
// MAIN PAGE COMPONENT
// ===============================
export default function PublicTraineeProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<TraineePublicProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch public profile
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axiosInstance.get(`/student/${id}`);
        setProfile(res.data.data);
      } catch (err) {
        console.error("Failed to load public profile:", err);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
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
        Trainee not found.
      </div>
    );

  const industries =
    profile.preferredIndustry?.split(",").map((x) => x.trim()) || [];

  const techStack =
    profile.techStack?.split(",").map((x) => x.trim()) || [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

      {/* HEADER CARD */}
      <Card className="rounded-2xl shadow-sm border border-gray-200">
        <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          
          <img
            src={profile.profilePhoto || "/default-avatar.png"}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
            alt="Profile"
          />

          <div className="flex-1">

            {/* NAME */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              {profile.fullName}
            </h1>

            {/* BADGES */}
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.batch && (
                <BadgePurple text={profile.batch} />
              )}
              {profile.status && (
                <BadgeBlue text={profile.status} />
              )}
              {profile.employmentStatus && (
                <BadgeGreen text={profile.employmentStatus} />
              )}
            </div>

            {/* CONTACTS */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mb-4">
              {profile.phone && (
                <InlineInfo icon={<Phone />} text={profile.phone} />
              )}
              {profile.linkedin && (
                <IconButton
                  icon={<Linkedin className="h-4 w-4" />}
                  onClick={() => window.open(profile.linkedin!, "_blank")}
                />
              )}
              {profile.email && (
                <IconButton
                  icon={<Mail className="h-4 w-4" />}
                  onClick={() => (window.location.href = `mailto:${profile.email}`)}
                />
              )}
              {profile.portfolioLink && (
                <IconButton
                  icon={<Globe className="h-4 w-4" />}
                  onClick={() => window.open(profile.portfolioLink!, "_blank")}
                />
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3">
              {profile.cvUpload && (
                <Button
                  className="bg-purple-600 text-white px-6 rounded-lg"
                  onClick={() => window.open(profile.cvUpload!, "_blank")}
                >
                  Download CV
                </Button>
              )}

              {profile.portfolioLink && (
                <Button
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 rounded-lg"
                  onClick={() => window.open(profile.portfolioLink!, "_blank")}
                >
                  View Portfolio
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* CAPSTONE PROJECT */}
      {profile.capstoneProject && (
        <Section title="Capstone Project">
          <Card className="rounded-2xl shadow-sm border-gray-200 overflow-hidden">
            <div className="relative h-48 bg-linear-to-br from-gray-800 to-gray-900">
              <div className="absolute inset-0 bg-black/40"></div>

              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">{profile.capstoneProject}</h3>
              </div>

              {profile.projectLink && (
                <button
                  onClick={() => window.open(profile.projectLink!, "_blank")}
                  className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-lg"
                >
                  <Globe className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          </Card>
        </Section>
      )}

      {/* INTRODUCTION */}
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

      {/* INDUSTRIES */}
      <Section title="Preferred Industry">
        <TagList items={industries} color="purple" />
      </Section>

      {/* TECH STACK */}
      <Section title="Tech Stack">
        <TagList items={techStack} color="cyan" />
      </Section>

      {/* TESTIMONY */}
      {profile.testimony && (
        <Section title="Testimony">
          <Card className="rounded-2xl shadow-sm border-gray-200">
            <div className="p-6">
              <p className="text-gray-700">{profile.testimony}</p>
            </div>
          </Card>
        </Section>
      )}
    </div>
  );
}

/* =======================================================
 * REUSABLE UI COMPONENTS
 * ======================================================= */

const Section = ({ title, children }: any) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
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

const BadgePurple = ({ text }: any) => (
  <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md">
    {text}
  </span>
);

const BadgeBlue = ({ text }: any) => (
  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
    {text}
  </span>
);

const BadgeGreen = ({ text }: any) => (
  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md">
    {text}
  </span>
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
      <p className="text-gray-500">Not provided</p>
    )}
  </div>
);
