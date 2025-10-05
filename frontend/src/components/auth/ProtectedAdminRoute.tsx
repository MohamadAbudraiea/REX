import { Navigate } from "react-router-dom";
import { useCheckAuth } from "@/hooks/useAuth";
import type { JSX } from "react";

function ProtectedAdminRoute({ children }: { children: JSX.Element }) {
  const { isAdmin, isCheckingAuth } = useCheckAuth();

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src="/public/icon-logo.png"
          alt="Loading"
          className="h-32 w-32 transform animate-spin"
        />
      </div>
    );
  }
  if (!isAdmin) return <Navigate to="*" replace />;

  return children;
}

export default ProtectedAdminRoute;
