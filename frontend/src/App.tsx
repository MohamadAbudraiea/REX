import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Layout from "@/layout/Layout";
import SignupPage from "@/pages/SignUpPage";
import LoginPage from "@/pages/LoginPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import ServicesPage from "@/pages/ServicesPage";

import WashServicePage from "@/pages/services/WashServicePage";
import DryCleanServicePage from "@/pages/services/DryCleanServicePage";
import PolishServicePage from "@/pages/services/PolishServicePage";
import NanoCeramicServicePage from "@/pages/services/NanoCeramicServicePage";
import BookingPage from "@/pages/user/BookingPage";
import UserBookingsPage from "@/pages/user/UserBookingsPage";
import { Toaster } from "./components/ui/sonner";
import ProtectedUserRoute from "./components/auth/ProtectedUserRoute";
import { useCheckAuth } from "./hooks/useAuth";
import ScrollToTop from "./components/ui/ScrollToTop";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedAdminRoute from "./components/auth/ProtectedAdminRoute";
import SecretaryDashboard from "./pages/secretary/SecretaryDashboard";
import ProtectedSecretaryRoute from "./components/auth/ProtectedSecretaryRoute";

function App() {
  const { isAuthenticated } = useCheckAuth();

  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <SignupPage />
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
            }
          />

          <Route
            path="/forgot-password"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <ForgotPasswordPage />
              )
            }
          />

          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/wash" element={<WashServicePage />} />
          <Route path="/services/dryclean" element={<DryCleanServicePage />} />
          <Route path="/services/polish" element={<PolishServicePage />} />
          <Route
            path="/services/nano-ceramic"
            element={<NanoCeramicServicePage />}
          />
          <Route
            path="/booking"
            element={
              <ProtectedUserRoute>
                <BookingPage />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedUserRoute>
                <UserBookingsPage />
              </ProtectedUserRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedUserRoute>
                <ProfilePage />
              </ProtectedUserRoute>
            }
          />

          <Route
            path="/blink-admin-dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/blink-secretary-dashboard"
            element={
              <ProtectedSecretaryRoute>
                <SecretaryDashboard />
              </ProtectedSecretaryRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>

      <Toaster position="top-center" />
    </>
  );
}

export default App;
