import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Linkedin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export type TraineePublicProfile = {
  id?: string;
  fullName: string;
  batch?: string | null;
  status?: string | null;
  employmentStatus?: string | null;
  university?: string | null;
  major?: string | null;
  preferredIndustry?: string | null;
  techStack?: string | null;
  portfolioLink?: string | null;
  linkedin?: string | null;
  cvUpload?: string | null;
  profilePhoto?: string | null;
  selfIntroduction?: string | null;
  phone?: string | number | null;
  email?: string | null;
  testimony?: string | null;
};

type BadgeColor = "purple" | "cyan" | "green";
type TagColor = "purple" | "cyan";

interface Props {
  profile: TraineePublicProfile;
  showBackToEdit?: boolean;
  onBackToEdit?: () => void;
}

const splitToList = (value?: string | null): string[] => {
  if (!value) return [];
  return value
    .split(/[,|;/\n]+/)
    .map((v) => v.trim())
    .filter(Boolean);
};

export default function TraineePublicProfileView({
  profile,
  showBackToEdit = false,
  onBackToEdit,
}: Props) {
  const industries = splitToList(profile.preferredIndustry);
  const techStack = splitToList(profile.techStack);

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <Card className="rounded-2xl border border-gray-200 shadow-none">
        <div className="p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Avatar className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-md overflow-hidden">
            <AvatarImage
              src={profile.profilePhoto || undefined}
              alt={profile.fullName}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="w-full h-full rounded-md bg-gray-100 flex items-center justify-center text-2xl font-medium text-gray-500">
              {profile.fullName
                ?.split(" ")
                .map((w: string) => w[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              {profile.fullName}
            </h1>

            {/* BADGES */}
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.batch && <Badge color="purple">{profile.batch}</Badge>}
              {profile.status && <Badge color="cyan">{profile.status}</Badge>}
            </div>

            {/* CONTACT */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
              {profile.phone && (
                <InlineInfo icon={<Phone size={16} />} text={profile.phone} />
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
            </div>

            {/* ACTION */}
            <div className="flex gap-3">
              {profile.cvUpload && (
                <Button
                  className="cursor-pointer"
                  onClick={() => window.open(profile.cvUpload!, "_blank")}
                >
                  Download CV
                </Button>
              )}
              {profile.portfolioLink && (
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => window.open(profile.portfolioLink!, "_blank")}
                >
                  View Portfolio
                </Button>
              )}
            </div>
          </div>

          {showBackToEdit && (
            <Button
              variant="default"
              className="cursor-pointer"
              onClick={onBackToEdit}
            >
              Back to Edit
            </Button>
          )}
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
            <p className="text-gray-600 text-medium">
              {profile.university || "—"}
            </p>
            <p className="text-gray-900 font-medium">{profile.major || "—"}</p>
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
            <div className="p-6 text-gray-700">{profile.testimony}</div>
          </Card>
        </Section>
      )}
    </div>
  );
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
    {children}
  </div>
);

const InlineInfo = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string | number;
}) => (
  <span className="flex items-center gap-2">
    {icon}
    {text}
  </span>
);

const IconButton = ({
  icon,
  onClick,
}: {
  icon: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
  >
    {icon}
  </button>
);

const BADGE_COLOR_MAP: Record<BadgeColor, string> = {
  purple: "bg-purple-100 text-purple-700",
  cyan: "bg-cyan-100 text-cyan-700",
  green: "bg-green-100 text-green-700",
};

const Badge = ({
  children,
  color,
}: {
  children: string;
  color: BadgeColor;
}) => (
  <span className={`px-3 py-1 text-sm rounded-md ${BADGE_COLOR_MAP[color]}`}>
    {children}
  </span>
);

const TAG_COLOR_MAP: Record<TagColor, string> = {
  purple: "bg-purple-100 text-purple-700",
  cyan: "bg-cyan-100 text-cyan-700",
};

const TagList = ({ items, color }: { items: string[]; color: TagColor }) => (
  <div className="flex flex-wrap gap-2">
    {items.length ? (
      items.map((item, i) => (
        <span
          key={i}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${TAG_COLOR_MAP[color]}`}
        >
          {item}
        </span>
      ))
    ) : (
      <p className="text-gray-500">Not provided</p>
    )}
  </div>
);
