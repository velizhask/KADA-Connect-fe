// ==========================================
// authMeStore.ts — FINAL VERSION
// ==========================================

import { create } from "zustand";
import { authMeService } from "@/services/authMeServices";

/* ======================================================
   1) STUDENT PROFILE TYPE
====================================================== */
export type StudentProfile = {
  id: string;
  fullName: string;
  email: string | null;
  phone: string | number | null;

  university: string | null;
  major: string | null;

  batch: string | null;
  status: string | null;
  employmentStatus: string | null;

  preferredIndustry: string | null;
  techStack: string | null;

  selfIntroduction: string | null;
  capstoneProject?: string | null;

  linkedin: string | null;
  portfolioLink: string | null;

  profilePhoto: string | null;
  cvUpload: string | null;

  completionRate: number;
  timestamp?: string;
};

/* ======================================================
   2) COMPANY PROFILE TYPE
====================================================== */
export type CompanyProfile = {
  id: string;

  companyName: string | null;
  companySummary: string | null;

  industry: string | null;
  techRoles: string | null;
  preferredSkillsets: string | null;

  website: string | null;
  logo: string | null;

  contactPerson: string | null;
  contactEmail: string | null;
  contactPhone: string | null;

  contactInfoVisible: boolean;

  completionRate: number;
  timestamp?: string;
};

export type Profile = StudentProfile | CompanyProfile;

/* ======================================================
   3) NORMALIZER — STUDENT
====================================================== */
function normalizeStudent(raw: any): StudentProfile {
  return {
    id: raw.id,
    fullName: raw.fullName ?? raw.full_name ?? "",
    email: raw.email ?? raw.email_address ?? null,
    phone: raw.phone ?? raw.phone_number ?? null,

    university: raw.university ?? raw.university_institution ?? null,
    major: raw.major ?? raw.program_major ?? null,

    batch: raw.batch ?? null,
    status: raw.status ?? null,
    employmentStatus: raw.employmentStatus ?? raw.employment_status ?? null,

    preferredIndustry: raw.preferredIndustry ?? raw.preferred_industry ?? null,
    techStack: raw.techStack ?? raw.tech_stack_skills ?? null,

    selfIntroduction: raw.selfIntroduction ?? raw.self_introduction ?? null,
    capstoneProject: raw.capstoneProject ?? raw.capstone_project ?? null,

    linkedin: raw.linkedin ?? null,
    portfolioLink: raw.portfolioLink ?? raw.portfolio_link ?? null,

    profilePhoto: raw.profilePhoto ?? raw.profile_photo ?? null,
    cvUpload: raw.cvUpload ?? raw.cv_upload ?? null,

    completionRate: raw.completionRate ?? 0,
    timestamp: raw.timestamp ?? null,
  };
}

/* ======================================================
   4) NORMALIZER — COMPANY
====================================================== */
function normalizeCompany(raw: any): CompanyProfile {
  return {
    id: raw.id,
    companyName: raw.companyName ?? raw.company_name ?? null,
    companySummary: raw.companySummary ?? raw.company_summary_description ?? null,

    industry: raw.industry ?? raw.industry_sector ?? null,
    techRoles: raw.techRoles ?? raw.tech_roles_interest ?? null,
    preferredSkillsets:
      raw.preferredSkillsets ?? raw.preferred_skillsets ?? null,

    website: raw.website ?? raw.company_website_link ?? null,
    logo: raw.logo ?? raw.company_logo ?? null,

    contactPerson: raw.contactPerson ?? raw.contact_person_name ?? null,
    contactEmail: raw.contactEmail ?? raw.contact_email ?? null,
    contactPhone: raw.contactPhone ?? raw.contact_phone_number ?? null,
    contactInfoVisible: raw.contactInfoVisible ?? raw.contact_info_visible ?? true,

    completionRate: raw.completionRate ?? 0,
    timestamp: raw.timestamp ?? null,
  };
}

/* ======================================================
   5) PROFILE AUTO-DETECTOR (ROBUST)
====================================================== */
function unwrapResponse(raw: any) {
  // Handles: { success, data }, { data }, { ...profile }
  if (raw?.data && typeof raw.data === "object") return raw.data;
  return raw;
}

function normalizeProfile(raw: any): Profile {
  raw = unwrapResponse(raw);
  if (!raw) return raw;

  const isStudent =
    "university" in raw ||
    "university_institution" in raw ||
    "major" in raw ||
    "program_major" in raw;

  const isCompany =
    "companyName" in raw ||
    "company_name" in raw ||
    "companySummary" in raw ||
    "company_summary_description" in raw;

  if (isStudent) return normalizeStudent(raw);
  if (isCompany) return normalizeCompany(raw);

  console.warn("Unknown profile type:", raw);
  return raw;
}

/* ======================================================
   6) STORE FINAL
====================================================== */

interface AuthMeState {
  loading: boolean;
  profile: Profile | null;

  fetchProfile: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;

  uploadCV: (file: File) => Promise<void>;
  uploadPhoto: (file: File) => Promise<void>;
  uploadLogo: (file: File) => Promise<void>;
}

export const useAuthMeStore = create<AuthMeState>((set) => ({
  loading: false,
  profile: null,

  /* -------------------------
     FETCH PROFILE
  -------------------------- */
  fetchProfile: async () => {
    set({ loading: true });

    try {
      const res = await authMeService.getProfile();
      const normalized = normalizeProfile(res.data ?? res);

      set({
        profile: normalized,
        loading: false,
      });
    } catch (err) {
      console.error("Fetch profile failed:", err);
      set({ loading: false });
    }
  },

  /* -------------------------
     UPDATE PROFILE
  -------------------------- */
  updateProfile: async (data: any) => {
    try {
      await authMeService.updateProfile(data);

      // Refresh profile
      const res = await authMeService.getProfile();
      set({ profile: normalizeProfile(res.data ?? res) });
    } catch (err) {
      console.error("Update profile failed:", err);
    }
  },

  /* -------------------------
     UPLOAD CV
  -------------------------- */
  uploadCV: async (file: File) => {
    const form = new FormData();
    form.append("cv", file);

    await authMeService.uploadCV(form);

    const res = await authMeService.getProfile();
    set({ profile: normalizeProfile(res.data ?? res) });
  },

  /* -------------------------
     UPLOAD PHOTO
  -------------------------- */
  uploadPhoto: async (file: File) => {
    const form = new FormData();
    form.append("photo", file);

    await authMeService.uploadPhoto(form);

    const res = await authMeService.getProfile();
    set({ profile: normalizeProfile(res.data ?? res) });
  },

  /* -------------------------
     UPLOAD LOGO
  -------------------------- */
  uploadLogo: async (file: File) => {
    const form = new FormData();
    form.append("logo", file);

    await authMeService.uploadLogo(form);

    const res = await authMeService.getProfile();
    set({ profile: normalizeProfile(res.data ?? res) });
  },
}));
