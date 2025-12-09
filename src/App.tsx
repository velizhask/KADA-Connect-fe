import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";

import HomePage from "@/pages/home/HomePage";
import CompanyPage from "@/pages/company/CompanyPage";
import TraineePage from "@/pages/trainee/TraineePage";
import TraineeProfilePage from "@/pages/trainee/profile/ProfilePage";
import CompanyProfile from "@/pages/company/profile/ProfilePage";
import UserManagement from "@/pages/admin/UserManagement";

import ProjectShowcase from "@/pages/home/ProjectPage";
import KADAJourneyPage from "@/pages/home/GalleryPage";
import SuccessStoryPage from "@/pages/home/story/StoryPage";
import SuccessStoryDetail from "@/pages/home/story/StoryDetailPage";
import KadaTermsOfService from "@/pages/home/TermOfServicePage";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterTraineePage from "@/pages/auth/RegisterTraineeOne";
import RegisterTraineeStep2 from "@/pages/auth/RegisterTraineeTwo";
import RegisterCompanyStep1 from "@/pages/auth/RegisterCompanyOne";
import RegisterCompanyStep2 from "@/pages/auth/RegisterCompanyTwo";
import ChooseAccountPage from "@/pages/auth/ChooseAccountPage";
import RegistrationSubmitted from "@/pages/auth/RegistrationSubmitted";

import NotFoundPage from "@/pages/errors/NotFoundPage";
import ProtectedRoute from "@/router/ProtectedRoute";
import { ScrollTop } from "@/components/common/ScrollTop";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

function App() {
  const loadAuth = useAuthStore((s) => s.loadFromStorage);
  const isAuthLoaded = useAuthStore((s) => s.isAuthLoaded);

  useEffect(() => {
    loadAuth();
  }, []);

  if (!isAuthLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ScrollTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<ChooseAccountPage />} />
        <Route path="/register/trainee" element={<RegisterTraineePage />} />
        <Route
          path="/register/trainee/details"
          element={<RegisterTraineeStep2 />}
        />
        <Route path="/register/company" element={<RegisterCompanyStep1 />} />
        <Route
          path="/register/company/details"
          element={<RegisterCompanyStep2 />}
        />
        <Route path="/register/submitted" element={<RegistrationSubmitted />} />

        <Route path="/terms-of-service" element={<KadaTermsOfService />} />
        <Route path="/project" element={<ProjectShowcase />} />
        <Route path="/gallery" element={<KADAJourneyPage />} />
        <Route path="/story" element={<SuccessStoryPage />} />
        <Route path="/story/detail" element={<SuccessStoryDetail />} />

        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>

        {/* Semua user authenticated boleh akses trainees */}
        <Route element={<ProtectedRoute />}>
          <Route path="/trainees" element={<TraineePage />} />
          <Route path="/trainees/profile" element={<TraineeProfilePage />} />
        </Route>

        {/* Semua user authenticated boleh akses companies */}
        <Route element={<ProtectedRoute />}>
          <Route path="/companies" element={<CompanyPage />} />
          <Route path="/companies/profile" element={<CompanyProfile />} />
        </Route>

        {/* NOT FOUND */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
