import { useEffect, useState } from "react";
import { lookupServices } from "@/services/lookupServices";

export const useLookupFilters = () => {
  const [industries, setIndustries] = useState<string[]>([]);
  const [preferredIndustries, setPreferredIndustries] = useState<string[]>([]);
  const [techRoles, setTechRoles] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [universities, setUniversities] = useState<string[]>([]);
  const [majors, setMajors] = useState<string[]>([]);

  useEffect(() => {
    const fetchLookups = async () => {
      try {
        const [
          preferredIndRes,
          indRes,
          techRes,
          skillsRes,
          univRes,
          majorsRes,
        ] = await Promise.all([
          lookupServices.getPopularPreferredIndustries(),
          lookupServices.getPopularIndustries(),
          lookupServices.getPopularTechRoles(),
          lookupServices.getPopularTechSkills(),
          lookupServices.getPopularUniversities(),
          lookupServices.getPopularMajors(),
        ]);

        setPreferredIndustries(
          preferredIndRes.data?.data?.map((i: any) => i.name) || []
        );

        setIndustries(indRes.data?.data?.map((i: any) => i.name) || []);

        setTechRoles(techRes.data?.data?.map((r: any) => r.name) || []);

        setSkills(skillsRes.data?.data?.map((s: any) => s.name) || []);

        setUniversities(univRes.data?.data?.map((u: any) => u.name) || []);

        setMajors(majorsRes.data?.data?.map((m: any) => m.name) || []);
      } catch (err) {
        console.error("Lookup fetch error:", err);
      }
    };

    fetchLookups();
  }, []);

  return {
    preferredIndustries,
    industries,
    techRoles,
    skills,
    universities,
    majors,
  };
};
