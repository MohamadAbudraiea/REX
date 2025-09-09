import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import HomeLayout from "@/layout/homeLayout";
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

function App() {
  return (
    <>
      <HomeLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
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
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/my-booking" element={<UserBookingsPage />} />
        </Routes>
      </HomeLayout>

      <Toaster position="top-center" />
    </>
  );
}

export default App;
