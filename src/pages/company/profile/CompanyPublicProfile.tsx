import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { companyServices } from "@/services/companyServices";
import MainLayout from "@/layouts/MainLayout";


import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import CompanyPublicProfileView from "@/components/company/CompanyPublicProfileView";

interface CompanyPublicProfile {
  id: string;

  companyName: string ;
  companySummary?: string | null;
  industry?: string | null;

  website?: string | null;
  logo?: string | null;

  techRoles?: string | null;
  preferredSkillsets?: string | null;

  contactPerson?: string | null;
  contactEmail?: string | null;
  contactInfoVisible?: boolean;
}


export default function PublicCompanyProfile() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<CompanyPublicProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const res = await companyServices.getCompanyById(id);
        setProfile(res.data.data);
      } catch (err) {
        console.error("Failed to load company profile:", err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <LoadingSpinner />
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Company not found.
      </div>
    );
  }


  return (
    <MainLayout>
      <CompanyPublicProfileView profile={profile} />
    </MainLayout>
  );
}

