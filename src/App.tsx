import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Auth from "@/auth/pages/AuthPage";
import "@/App.css";
import CompanyPage from "@/pages/company/CompanyPage";
import HomePage from "@/pages/home/HomePage";
import TraineePage from "@/pages/trainee/TraineePage";
import { ScrollTop } from "@/components/common/ScrollTop";
import NotFoundPage from "@/pages/errors/NotFoundPage";
import KadaTermsOfService from "@/pages/home/TermOfServicePage";
// import BetaBadge from "@/components/ui/BetaBadge";
import TraineeProfilePage from "@/pages/trainee/profile/ProfilePage";
import CompanyProfile from "@/pages/company/profile/ProfilePage";
import ProjectShowcase from "@/pages/home/ProjectPage";
import KADAJourneyPage from "@/pages/home/GalleryPage";
import SuccessStoryPage from "@/pages/home/story/StoryPage";
import SuccessStoryDetail from "@/pages/home/story/StoryDetailPage";
import LoginPage from "@/auth/pages/LoginPage";
import RegisterTraineePage from "@/auth/pages/RegisterTraineeOne";
import ChooseAccountPage from "@/auth/pages/ChooseAccountPage";
import RegisterCompanyStep1 from "@/auth/pages/RegisterCompanyOne";
import RegisterCompanyStep2 from "@/auth/pages/RegisterCompanyTwo";
import RegistrationSubmitted from "@/auth/pages/RegistrationSubmitted";
import UserManagement from "@/pages/admin/UserManagement";
import { useEffect } from "react";
import { useAuthStore } from "@/auth/store/authStore";
import ProtectedRoute from "@/auth/components/ProtectedRoute";
import RegisterTraineeStep2 from "./auth/pages/RegisterTraineeTwo";

function App() {
  const loadAuthFromStorage = useAuthStore((s) => s.loadAuthFromStorage);
  const isAuthLoaded = useAuthStore((s) => s.isAuthLoaded);

  useEffect(() => {
    loadAuthFromStorage();
  }, []);

  if (!isAuthLoaded) {
    return <div className="w-full h-screen flex items-center justify-center">
      Loading...
    </div>;
  }
  return (
    <BrowserRouter>
      <ScrollTop />
      {/* <BetaBadge /> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<ChooseAccountPage />} />
        <Route path="/register/trainee" element={<RegisterTraineePage />} />
        <Route path="/register/company" element={<RegisterCompanyStep1 />} />
        <Route
          path="/register/company/details"
          element={<RegisterCompanyStep2 />}
        />
        <Route
          path="/register/trainee/details"
          element={<RegisterTraineeStep2 />}
        />
        <Route path="/register/submitted" element={<RegistrationSubmitted />} />

        <Route path="/" element={<HomePage />} />
       <Route
  path="/admin/users"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <UserManagement />
    </ProtectedRoute>
  }
/>
        <Route path="/companies" element={<CompanyPage />} />
        <Route path="/companies/profile" element={<CompanyProfile />} />
        <Route path="/trainees" element={<TraineePage />} />
        <Route path="/trainees/profile" element={<TraineeProfilePage />} />
        <Route path="/terms-of-service" element={<KadaTermsOfService />} />
        <Route path="/project" element={<ProjectShowcase />} />
        <Route path="/gallery" element={<KADAJourneyPage />} />
        <Route path="/story" element={<SuccessStoryPage />} />
        <Route path="/story/detail" element={<SuccessStoryDetail />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
