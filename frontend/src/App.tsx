import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "@/layout/Layout";

import HomePage from "@/pages/shared/HomePage";
import SignupPage from "@/pages/shared/SignUpPage";
import LoginPage from "@/pages/shared/LoginPage";

const AboutPage = lazy(() => import("@/pages/shared/AboutPage"));
const ContactPage = lazy(() => import("@/pages/shared/ContactPage"));
const ServicesPage = lazy(() => import("@/pages/shared/ServicesPage"));
const NotFoundPage = lazy(() => import("@/pages/shared/NotFoundPage"));

const WashServicePage = lazy(
  () => import("@/pages/shared/services/WashServicePage")
);
const DryCleanServicePage = lazy(
  () => import("@/pages/shared/services/DryCleanServicePage")
);
const PolishServicePage = lazy(
  () => import("@/pages/shared/services/PolishServicePage")
);
const NanoCeramicServicePage = lazy(
  () => import("@/pages/shared/services/NanoCeramicServicePage")
);

const BookingPage = lazy(() => import("@/pages/user/BookingPage"));
const UserBookingsPage = lazy(() => import("@/pages/user/UserBookingsPage"));
const ForgotPasswordPage = lazy(
  () => import("@/pages/shared/ForgotPasswordPage")
);
const ProfilePage = lazy(() => import("@/pages/shared/ProfilePage"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const SecretaryDashboard = lazy(
  () => import("./pages/secretary/SecretaryDashboard")
);
const DetailerDashboard = lazy(
  () => import("./pages/detailer/DetailerDashboard")
);

import ProtectedUserRoute from "./components/auth/ProtectedUserRoute";
import ProtectedAdminRoute from "./components/auth/ProtectedAdminRoute";
import ProtectedSecretaryRoute from "./components/auth/ProtectedSecretaryRoute";
import ProtectedDetailerRoute from "./components/auth/ProtectedDetailerRoute";

import ScrollToTop from "./components/ui/ScrollToTop";
import { useCheckAuth } from "./hooks/useAuth";
import { Toaster } from "./components/ui/sonner";

function App() {
  const { isAuthenticated } = useCheckAuth();

  return (
    <>
      <ScrollToTop />
      <Layout>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <img
                src="/public/icon-logo.png"
                alt="Loading"
                className="h-32 w-32 transform animate-spin"
              />
            </div>
          }
        >
          <Routes>
            {/* Public + Core */}
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

            {/* Services */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/wash" element={<WashServicePage />} />
            <Route
              path="/services/dryclean"
              element={<DryCleanServicePage />}
            />
            <Route path="/services/polish" element={<PolishServicePage />} />
            <Route
              path="/services/nano-ceramic"
              element={<NanoCeramicServicePage />}
            />

            {/* User */}
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

            {/* Admin */}
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
            <Route
              path="/blink-detailer-dashboard"
              element={
                <ProtectedDetailerRoute>
                  <DetailerDashboard />
                </ProtectedDetailerRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>

      <Toaster position="top-center" />
    </>
  );
}

export default App;
