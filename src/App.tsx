import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";

import HomePage from "@/pages/home/HomePage";
import CompanyPage from "@/pages/company/CompanyPage";
import TraineePage from "@/pages/trainee/TraineePage";

import TraineeProfilePage from "@/pages/me/TraineeProfile";
import TraineePublicProfile from "@/pages/trainee/profile/TraineePublicProfile";

import CompanyProfilePage from "@/pages/me/CompanyProfile";
import CompanyPublicProfile from "@/pages/company/profile/CompanyPublicProfile";

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

import NotFoundPage from "@/pages/errors/NotFoundPage";
import ProtectedRoute from "@/router/ProtectedRoute";
import { ScrollTop } from "@/components/common/ScrollTop";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import ProfileSetupRoute from "@/router/ProfileSetupRoute";

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
        {/* PUBLIC ROUTES (NO LOGIN REQUIRED)                     */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Public trainee profile */}
        <Route path="/trainees/:id" element={<TraineePublicProfile />} />

        {/* Public company profile */}
        <Route path="/companies/:id" element={<CompanyPublicProfile />} />

        {/* Registration */}
        <Route path="/register" element={<ChooseAccountPage />} />

        <Route path="/register/trainee" element={<RegisterTraineePage />} />

        <Route element={<ProfileSetupRoute />}>
          <Route
            path="/register/trainee/details"
            element={<RegisterTraineeStep2 />}
          />
        </Route>

        <Route path="/register/company" element={<RegisterCompanyStep1 />} />

        <Route element={<ProfileSetupRoute />}>
          <Route
            path="/register/company/details"
            element={<RegisterCompanyStep2 />}
          />
        </Route>


        {/* Public information */}
        <Route path="/terms-of-service" element={<KadaTermsOfService />} />
        <Route path="/project" element={<ProjectShowcase />} />
        <Route path="/gallery" element={<KADAJourneyPage />} />
        <Route path="/story" element={<SuccessStoryPage />} />
        <Route path="/story/detail" element={<SuccessStoryDetail />} />

        {/* ADMIN ROUTES                                          */}
        <Route element={<ProtectedRoute adminOnly requireAuth />}>
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>

        {/* AUTHENTICATED USER ROUTES                             */}
        <Route element={<ProtectedRoute requireAuth />}>
          <Route path="/trainees" element={<TraineePage />} />
          <Route path="/trainees/me" element={<TraineeProfilePage />} />

          <Route path="/companies" element={<CompanyPage />} />
          <Route path="/companies/me" element={<CompanyProfilePage />} />
        </Route>

        {/* 404 PAGE                                              */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
