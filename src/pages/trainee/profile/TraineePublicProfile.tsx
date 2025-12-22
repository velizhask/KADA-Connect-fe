import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { studentServices } from "@/services/studentServices";

import TraineePublicProfileView from "@/components/trainees/TraineePublicProfileView";
import type {
  TraineePublicProfile,
} from "@/components/trainees/TraineePublicProfileView";

export default function PublicTraineeProfile() {
  const { id } = useParams<{ id: string }>();

  const [profile, setProfile] = useState<TraineePublicProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const res = await studentServices.getStudentById(id);
        setProfile(res.data.data);
      } catch (err) {
        console.error("Failed to load trainee profile:", err);
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
        <div className="h-screen flex items-center justify-center text-lg">
          Loading...
        </div>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <div className="h-screen flex items-center justify-center text-lg">
          Trainee not found.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <TraineePublicProfileView profile={profile} />
    </MainLayout>
  );
}
