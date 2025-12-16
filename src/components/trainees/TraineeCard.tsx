import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCircle, ExternalLink } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { getStatusBadgeClass } from "@/utils/trainees/statusBadgeHelper";
import { useNavigate } from "react-router-dom";

/* =========================
 * TYPES
 * ========================= */
interface Trainee {
  id: string;
  fullName: string;
  status: string;

  employmentStatus?: string;
  batch?: string;

  university?: string;
  major?: string;
  preferredIndustry?: string;
  techStack?: string;
  cvUpload?: string;

  profilePhoto?: string;
  portfolioLink?: string;
}

/* =========================
 * HELPERS
 * ========================= */
const parseSmartList = (value?: string, limit = 2) => {
  if (!value) return { show: [], more: 0 };

  const items = value
    .split(/[,|]/)
    .map((v) => v.trim())
    .filter(Boolean);

  const sorted = [...items].sort(
    (a, b) => a.split(/\s+/).length - b.split(/\s+/).length
  );

  return {
    show: sorted.slice(0, limit),
    more: Math.max(items.length - limit, 0),
  };
};

/* =========================
 * COMPONENT
 * ========================= */
const TraineeCard: React.FC<{ trainee: Trainee }> = ({ trainee }) => {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const role = useAuthStore((s) => s.role);
  const isStudent = role === "student";
  const canDownloadCV = role !== "student";

  useEffect(() => {
    setIsError(false);
  }, [trainee.id, trainee.profilePhoto]);

  const tech = parseSmartList(trainee.techStack);
  const industry = parseSmartList(trainee.preferredIndustry);

  return (
    <Card
      role={!isStudent ? "button" : undefined}
      tabIndex={!isStudent ? 0 : -1}
      onClick={() => !isStudent && navigate(`/trainees/${trainee.id}`)}
      className={`p-5 rounded-2xl border-gray-50 bg-white transition ${
        !isStudent ? "cursor-pointer hover:shadow-sm" : ""
      }`}
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        {/* PHOTO */}
        <div className="h-30 w-30 sm:h-24 sm:w-24 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center shrink-0">
          {trainee.profilePhoto && !isError ? (
            <img
              src={trainee.profilePhoto}
              onError={() => setIsError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserCircle className="w-8 h-8 text-gray-300" />
          )}
        </div>

        {/* INFO */}
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h3 className="font-semibold truncate">{trainee.fullName}</h3>

          {/* BADGES */}
          <div className="mt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
            <Badge
              variant="outline"
              className={`text-xs ${getStatusBadgeClass(trainee.status)}`}
            >
              {trainee.status}
            </Badge>

            {trainee.employmentStatus && (
              <Badge variant="secondary" className="text-xs">
                {trainee.employmentStatus}
              </Badge>
            )}

            {trainee.batch && (
              <Badge variant="outline" className="text-xs">
                {trainee.batch}
              </Badge>
            )}
          </div>

          {/* EDUCATION */}
          {!isStudent && (
            <>
              {/* MOBILE */}
              <div className="mt-2 sm:hidden space-y-0.5 text-sm text-gray-600">
                {trainee.university && <p>{trainee.university}</p>}
                {trainee.major && <p>{trainee.major}</p>}
              </div>

              {/* DESKTOP */}
              <p className="hidden sm:block mt-1 text-sm text-gray-600 truncate">
                {trainee.university || "-"}
                {trainee.major && ` · ${trainee.major}`}
              </p>
            </>
          )}
        </div>

        {/* DESKTOP ACTIONS */}
        {!isStudent && (
          <div className="hidden sm:flex gap-2">
            {canDownloadCV && trainee.cvUpload && (
              <Button size="sm" asChild onClick={(e) => e.stopPropagation()}>
                <a href={trainee.cvUpload} target="_blank">
                  Download CV
                </a>
              </Button>
            )}

            {trainee.portfolioLink && (
              <Button size="sm" variant="outline" asChild>
                <a href={trainee.portfolioLink} target="_blank">
                  Portfolio <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            )}
          </div>
        )}
      </div>

      {/* ================= SKILLS & INDUSTRY ================= */}
      {!isStudent && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tech.show.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Tech Skills</p>
              <div className="flex flex-wrap gap-2">
                {tech.show.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
                {tech.more > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    +{tech.more} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {industry.show.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Preferred Industry
              </p>
              <div className="flex flex-wrap gap-2">
                {industry.show.map((i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {i}
                  </Badge>
                ))}
                {industry.more > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    +{industry.more} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= MOBILE ACTIONS ================= */}
      {!isStudent && (
        <div className="mt-4 flex flex-col gap-2 sm:hidden">
          {canDownloadCV && trainee.cvUpload && (
            <Button size="sm" className="shadow-none" asChild>
              <a href={trainee.cvUpload} target="_blank">
                Download CV
              </a>
            </Button>
          )}

          {trainee.portfolioLink && (
            <Button size="sm" variant="outline" className="shadow-none" asChild>
              <a href={trainee.portfolioLink} target="_blank">
                Portfolio <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default TraineeCard;
