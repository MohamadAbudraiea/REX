import HomeNavbar from "@/components/layout/homeNavbar";
import Footer from "@/components/layout/footer";
import { useCheckAuth } from "@/hooks/useAuth";
import UserNavbar from "@/components/layout/userNavbar";
import StaffNavbar from "@/components/layout/StaffNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useCheckAuth();

  const isUser = user?.role === "user";
  const isStaff =
    user?.role === "admin" ||
    user?.role === "secretary" ||
    user?.role === "detailer";
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Navbar */}
      {isStaff && <StaffNavbar role={user?.role} />}
      {isUser && <UserNavbar />}
      {!isStaff && !isUser && <HomeNavbar />}

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
