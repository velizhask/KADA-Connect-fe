import { useEffect, useState } from "react";
import { lookupServices } from "@/services/lookupServices";

export const useLookupFilters = () => {
  const [industries, setIndustries] = useState<string[]>([]);
  const [techRoles, setTechRoles] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [universities, setUniversities] = useState<string[]>([]);
  const [majors, setMajors] = useState<string[]>([]);

  useEffect(() => {
    const fetchLookups = async () => {
      try {
        const [indRes, techRes, techSkillsRes, univRes, majorsRes] = await Promise.all([
          lookupServices.getPreferredIndustries(),
          lookupServices.getTechRoles(),
          lookupServices.getPopularTechSkills(),
          lookupServices.getUniversities(),
          lookupServices.getMajors(),
        ]);

        setIndustries(indRes.data?.data || []);
        setTechRoles(techRes.data?.data || []);
        setSkills(techSkillsRes.data?.data?.map((s: any) => s.name) || []);
        setUniversities(univRes.data?.data || []);
        setMajors(majorsRes.data?.data || []);
      } catch (err) {
        console.error("Lookup fetch error:", err);
      }
    };

    fetchLookups();
  }, []);

  return {
    industries,
    techRoles,
    skills,
    universities,
    majors,
  };
};
