import { useEffect, useState } from "react";
import { studentServices } from "@/services/studentServices";
import { companyServices } from "@/services/companyServices";

/* ======================================================
   🧹 UTILITY: CLEAN STRING LIST (STRING OR OBJECT)
====================================================== */
const cleanStringList = (data: any[]): string[] => {
  return data
    .map((item) => {
      // CASE 1: API returns string[]
      if (typeof item === "string") {
        return item.trim();
      }

      // CASE 2: API returns { name: string }
      if (typeof item?.name === "string") {
        return item.name.trim();
      }

      return null;
    })
    .filter(
      (value): value is string =>
        typeof value === "string" && value.length > 0
    )
    // REMOVE DUPLICATES (IMPORTANT FOR YOUR DATA)
    .filter((value, index, self) => self.indexOf(value) === index);
};

/* ======================================================
   🎣 HOOK
====================================================== */
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
          studentServices.getPreferredIndustries(),
          companyServices.getIndustries(),
          companyServices.getTechRoles(),
          studentServices.getSkills(),
          studentServices.getUniversities(),
          studentServices.getMajors(),
        ]);

        setPreferredIndustries(
          cleanStringList(preferredIndRes?.data?.data || [])
        );

        setIndustries(
          cleanStringList(indRes?.data?.data || [])
        );

        setTechRoles(
          cleanStringList(techRes?.data?.data || [])
        );

        setSkills(
          cleanStringList(skillsRes?.data?.data || [])
        );

        setUniversities(
          cleanStringList(univRes?.data?.data || [])
        );

        setMajors(
          cleanStringList(majorsRes?.data?.data || [])
        );
      } catch (error) {
        console.error("❌ Failed to fetch lookup filters:", error);
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
