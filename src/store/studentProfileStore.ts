import { create } from "zustand";
import axiosInstance from "@/services/axiosInstance";
import { API_PATHS } from "@/services/apiPath";

// ================================
// TYPE DEFINITIONS — MATCH API 100%
// ================================
export interface StudentProfile {
  id: string;

  fullName: string;
  status: string;
  batch: string | null;

  university: string | null;
  major: string | null;

  preferredIndustry: string | null; // single string (not array)
  techStack: string | null; // string like "JS, TS"

  employmentStatus: string | null;
  portfolioLink: string | null;

  selfIntroduction: string | null;
  linkedin: string | null;
  phone: string | number | null;

  profilePhoto: string | null;
  cvUpload: string | null;

  timestamp: string | null;
}

interface StudentProfileState {
  profile: StudentProfile | null;
  loading: boolean;
  error: string | null;

  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<StudentProfile>) => Promise<void>;
  uploadPhoto: (file: File) => Promise<void>;
  uploadCV: (file: File) => Promise<void>;
}

// ================================
// API → FRONTEND MAPPER
// ================================
function mapApiToStudentProfile(raw: any): StudentProfile {
  return {
    id: raw.id,
    fullName: raw.fullName ?? "",
    status: raw.status ?? "",
    batch: raw.batch ?? null,

    university: raw.university ?? null,
    major: raw.major ?? null,

    preferredIndustry: raw.preferredIndustry ?? null,
    techStack: raw.techStack ?? null,

    employmentStatus: raw.employmentStatus ?? null,
    portfolioLink: raw.portfolioLink ?? null,

    selfIntroduction: raw.selfIntroduction ?? null,
    linkedin: raw.linkedin ?? null,
    phone: raw.phone ?? null,

    profilePhoto: raw.profilePhoto ?? null,
    cvUpload: raw.cvUpload ?? null,

    timestamp: raw.timestamp ?? null,
  };
}

// ================================
// FRONTEND → BACKEND PAYLOAD
// Hanya kirim field yang berubah
// ================================
function mapStudentUpdateToPayload(data: Partial<StudentProfile>): any {
  const payload: any = {};

  if (data.fullName !== undefined) payload.fullName = data.fullName;
  if (data.status !== undefined) payload.status = data.status;
  if (data.batch !== undefined) payload.batch = data.batch;

  if (data.university !== undefined) payload.university = data.university;
  if (data.major !== undefined) payload.major = data.major;

  if (data.preferredIndustry !== undefined)
    payload.preferredIndustry = data.preferredIndustry;

  if (data.techStack !== undefined) payload.techStack = data.techStack;

  if (data.employmentStatus !== undefined)
    payload.employmentStatus = data.employmentStatus;

  if (data.portfolioLink !== undefined)
    payload.portfolioLink = data.portfolioLink;

  if (data.selfIntroduction !== undefined)
    payload.selfIntroduction = data.selfIntroduction;

  if (data.linkedin !== undefined) payload.linkedin = data.linkedin;
  if (data.phone !== undefined) payload.phone = data.phone;

  return payload;
}

// ================================
// ZUSTAND STORE
// ================================
export const useStudentProfileStore = create<StudentProfileState>((set, get) => ({
  profile: null,
  loading: false,
  error: null,

  // Fetch user profile
  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });

      const res = await axiosInstance.get(API_PATHS.AUTH_ME.PROFILE);
      const mapped = mapApiToStudentProfile(res.data.data);

      set({ profile: mapped });

    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to fetch profile",
      });
    } finally {
      set({ loading: false });
    }
  },

  // Update profile
  updateProfile: async (data) => {
    try {
      set({ loading: true });

      const payload = mapStudentUpdateToPayload(data);

      const res = await axiosInstance.patch(
        API_PATHS.AUTH_ME.UPDATE_PROFILE,
        payload
      );

      set({ profile: mapApiToStudentProfile(res.data.data) });

    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to update profile",
      });
    } finally {
      set({ loading: false });
    }
  },

  // Upload photo
  uploadPhoto: async (file: File) => {
    try {
      const form = new FormData();
      form.append("photo", file);

      await axiosInstance.post(API_PATHS.AUTH_ME.UPLOAD_PHOTO, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await get().fetchProfile();

    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to upload photo",
      });
    }
  },

  // Upload CV
  uploadCV: async (file: File) => {
    try {
      const form = new FormData();
      form.append("cv", file);

      await axiosInstance.post(API_PATHS.AUTH_ME.UPLOAD_CV, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await get().fetchProfile();

    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to upload CV",
      });
    }
  },
}));
