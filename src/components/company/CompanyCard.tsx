import React, { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  ExternalLink,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = React.memo(
  ({ company }) => {
    const [isError, setIsError] = useState(false);

    const handleWebsiteClick = useCallback((url?: string) => {
      if (!url || !url.trim() || url === "-" || url.toLowerCase() === "n/a") {
        toast.warning("This company doesn't have a valid website link.");
        return;
      }
      let finalUrl = url.trim();
      if (!/^https?:\/\//i.test(finalUrl)) finalUrl = `https://${finalUrl}`;
      window.open(finalUrl, "_blank", "noopener,noreferrer");
    }, []);

    return (
      <Card className="group flex flex-col justify-between border-0 hover:shadow-lg transition-all duration-300 rounded-xl bg-white shadow-sm h-full">
        <div className="p-4 sm:p-5 flex flex-col h-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left sm:gap-4 gap-3 mb-3 sm:mb-4">
            {company.logo && !isError ? (
              <img
                src={company.logo}
                alt={company.companyName}
                onError={() => setIsError(true)}
                loading="lazy"
                className="w-24 h-24 sm:w-16 sm:h-16 rounded-xl object-contain transition-all duration-500 ease-out group-hover:scale-105 opacity-0"
                onLoad={(e) => (e.currentTarget.style.opacity = "1")}
              />
            ) : (
              <div className="w-20 h-20 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-50 rounded-xl">
                <Building2 className="w-10 h-10 text-gray-300" />
              </div>
            )}

            <div className="flex-1 mt-3 sm:mt-0">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
                {company.companyName}
              </h3>
              {company.industry && (
                <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-1.5">
                  {company.industry
                    .split(",")
                    .map((ind) => ind.trim())
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
              )}
            </div>
          </div>

          {/* Summary */}
          {company.companySummary && (
            <div className="mb-3 sm:mb-4 pb-3 border-b border-gray-100">
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                {company.companySummary}
              </p>
            </div>
          )}

          {/* Tech Roles */}
          {company.techRoles && (
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-500 mb-1.5">
                Interested Tech Roles
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {company.techRoles
                  .split(",")
                  .map((r) => r.trim())
                  .filter(Boolean)
                  .slice(0, 4)
                  .map((role) => (
                    <Badge key={role} variant="secondary" className="text-xs">
                      {role}
                    </Badge>
                  ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {company.preferredSkillsets && (
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-500 mb-1.5">
                Preferred Skills
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {company.preferredSkillsets
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .slice(0, 5)
                  .map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="text-xs border-gray-200 text-gray-600 bg-gray-50"
                    >
                      {skill}
                    </Badge>
                  ))}
              </div>
            </div>
          )}

          {/* Contact Info */}
          {company.contactInfoVisible && (
            <div className="mt-3 pt-3 border-t border-gray-100 space-y-2 text-sm text-gray-700 mb-5">
              <p className="text-xs font-medium text-gray-500">
                Contact Information
              </p>

              {company.contactPerson && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-800">
                    {company.contactPerson}
                  </span>
                </div>
              )}

              {company.contactEmail && (
                <p
                  className="flex items-center gap-2 text-primary hover:underline cursor-pointer break-all"
                  onClick={() =>
                    window.open(`mailto:${company.contactEmail}`, "_blank")
                  }
                >
                  <Mail className="w-4 h-4 text-primary" />
                  {company.contactEmail}
                </p>
              )}

              {company.contactPhone && (
                <p
                  className="flex items-center gap-2 text-primary hover:underline cursor-pointer"
                  onClick={() => {
                    let phone = company.contactPhone?.trim() ?? "";
                    if (!phone) return;
                    phone = phone.replace(/[^0-9+]/g, "");
                    if (!phone.startsWith("+")) {
                      if (phone.startsWith("0")) phone = "+62" + phone.slice(1);
                      else if (phone.startsWith("62")) phone = "+" + phone;
                      else phone = "+62" + phone;
                    }
                    const waNumber = phone.replace("+", "");
                    window.open(
                      `https://wa.me/${waNumber}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  <Phone className="w-4 h-4 text-primary" />
                  {company.contactPhone}
                </p>
              )}
            </div>
          )}

          {/* Footer Button */}
          <div className="mt-auto">
            <Button
              variant="default"
              onClick={() => handleWebsiteClick(company.website)}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white h-9 text-xs sm:text-sm font-medium cursor-pointer"
            >
              Visit Website
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }
);
