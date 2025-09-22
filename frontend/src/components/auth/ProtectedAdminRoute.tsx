import { Navigate } from "react-router-dom";
import { useCheckAuth } from "@/hooks/useAuth";
import type { JSX } from "react";

function ProtectedAdminRoute({ children }: { children: JSX.Element }) {
  const { isAdmin, isCheckingAuth } = useCheckAuth();

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (!isAdmin) return <Navigate to="*" replace />;

  return children;
}

export default ProtectedAdminRoute;
