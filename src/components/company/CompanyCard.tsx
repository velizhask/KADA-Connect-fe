import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, ExternalLink, Mail, Phone, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

/* =========================
 * TYPES
 * ========================= */
interface Company {
  id: number;
  companyName: string;
  companySummary: string;
  industry: string;
  website?: string;
  logo?: string;
  techRoles?: string;
  preferredSkillsets?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactInfoVisible?: boolean;
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

const truncateText = (text?: string, maxLength = 120) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
};

/* =========================
 * COMPONENT
 * ========================= */
const CompanyCard: React.FC<{ company: Company }> = ({ company }) => {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const role = useAuthStore((s) => s.role);
  const isCompany = role === "company";
  const canViewDetails = role !== "company";

  useEffect(() => {
    setIsError(false);
  }, [company.id, company.logo]);

  const techRoles = parseSmartList(company.techRoles);
  const skills = parseSmartList(company.preferredSkillsets);

  const handleWebsiteClick = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (!url || !url.trim() || url === "-" || url.toLowerCase() === "n/a") {
      toast.warning("This company doesn't have a valid website link.");
      return;
    }
    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) finalUrl = `https://${finalUrl}`;
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  const handleContactClick = (
    e: React.MouseEvent,
    type: "email" | "phone",
    value?: string
  ) => {
    e.stopPropagation();
    if (!value) return;

    if (type === "email") {
      window.open(`mailto:${value}`, "_blank");
    } else {
      let phone = value.trim();
      phone = phone.replace(/[^0-9+]/g, "");
      if (!phone.startsWith("+")) {
        if (phone.startsWith("0")) phone = "+62" + phone.slice(1);
        else if (phone.startsWith("62")) phone = "+" + phone;
        else phone = "+62" + phone;
      }
      const waNumber = phone.replace("+", "");
      window.open(`https://wa.me/${waNumber}`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card
      role={canViewDetails ? "button" : undefined}
      tabIndex={canViewDetails ? 0 : -1}
      onClick={() => canViewDetails && navigate(`/companies/${company.id}`)}
      className={`p-5 rounded-2xl border-gray-50 bg-white transition ${
        canViewDetails ? "cursor-pointer hover:shadow-sm" : ""
      }`}
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        {/* LOGO */}
        <div className="w-34 h-34 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
          {company.logo && !isError ? (
            <img
              src={company.logo}
              onError={() => setIsError(true)}
              alt={company.companyName}
              className="max-w-[80%] max-h-[80%] object-contain"
            />
          ) : (
            <Building2 className="w-20 h-20 text-gray-300" />
          )}
        </div>

        {/* INFO */}
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h3 className="font-semibold truncate">{company.companyName}</h3>

          {/* BADGES */}
          <div className="mt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
            {company.industry &&
              company.industry
                .split(",")
                .map((i) => i.trim())
                .filter(Boolean)
                .slice(0, 2)
                .map((ind) => (
                  <Badge
                    key={ind}
                    variant="outline"
                    className="text-xs border-primary-200 text-primary-700 bg-primary-50"
                  >
                    {ind}
                  </Badge>
                ))}
          </div>

          {/* SUMMARY */}
          {!isCompany && company.companySummary && (
            <>
              {/* MOBILE */}
              <div className="mt-2 sm:hidden text-sm text-gray-600">
                <p className="line-clamp-2">
                  {truncateText(company.companySummary, 100)}
                </p>
              </div>

              {/* DESKTOP */}
              <p className="hidden sm:block mt-1 text-sm text-gray-600 line-clamp-2">
                {truncateText(company.companySummary, 140)}
              </p>
            </>
          )}
        </div>

        {/* DESKTOP ACTIONS */}
        {!isCompany && (
          <div className="hidden sm:flex gap-2">
            {company.website && (
              <Button
                size="sm"
                onClick={(e) => handleWebsiteClick(e, company.website)}
              >
                Visit Website
              </Button>
            )}

            {company.contactInfoVisible && company.contactEmail && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) =>
                  handleContactClick(e, "email", company.contactEmail)
                }
              >
                <Mail className="w-3 h-3 mr-1" />
                Email
              </Button>
            )}
          </div>
        )}
      </div>

      {/* ================= TECH ROLES & SKILLS ================= */}
      {!isCompany && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {techRoles.show.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Interested Tech Roles
              </p>
              <div className="flex flex-wrap gap-2">
                {techRoles.show.map((role) => (
                  <Badge key={role} variant="secondary" className="text-xs">
                    {role}
                  </Badge>
                ))}
                {techRoles.more > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    +{techRoles.more} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {skills.show.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Preferred Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.show.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="text-xs border-gray-200 text-gray-600 bg-gray-50"
                  >
                    {skill}
                  </Badge>
                ))}
                {skills.more > 0 && (
                  <Badge
                    variant="outline"
                    className="text-xs border-gray-200 text-gray-600 bg-gray-50"
                  >
                    +{skills.more} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= CONTACT INFO (DESKTOP) ================= */}
      {!isCompany && company.contactInfoVisible && (
        <div className="hidden sm:block mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-2">
            Contact Information
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {company.contactPerson && (
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4 text-gray-500" />
                <span>{company.contactPerson}</span>
              </div>
            )}

            {company.contactEmail && (
              <button
                onClick={(e) =>
                  handleContactClick(e, "email", company.contactEmail)
                }
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Mail className="w-4 h-4" />
                <span className="truncate max-w-[200px]">
                  {company.contactEmail}
                </span>
              </button>
            )}

            {company.contactPhone && (
              <button
                onClick={(e) =>
                  handleContactClick(e, "phone", company.contactPhone)
                }
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <Phone className="w-4 h-4" />
                <span>{company.contactPhone}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= MOBILE ACTIONS ================= */}
      {!isCompany && (
        <div className="mt-4 flex flex-col gap-2 sm:hidden">
          {company.website && (
            <Button
              size="sm"
              className="shadow-none"
              onClick={(e) => handleWebsiteClick(e, company.website)}
            >
              Visit Website <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          )}

          {/* CONTACT INFO (MOBILE) */}
          {company.contactInfoVisible && (
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <p className="text-xs font-medium text-gray-500">
                Contact Information
              </p>

              {company.contactPerson && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>{company.contactPerson}</span>
                </div>
              )}

              {company.contactEmail && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full shadow-none justify-start"
                  onClick={(e) =>
                    handleContactClick(e, "email", company.contactEmail)
                  }
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{company.contactEmail}</span>
                </Button>
              )}

              {company.contactPhone && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full shadow-none justify-start"
                  onClick={(e) =>
                    handleContactClick(e, "phone", company.contactPhone)
                  }
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {company.contactPhone}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default CompanyCard;
