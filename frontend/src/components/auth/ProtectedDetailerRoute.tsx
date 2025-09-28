import { Navigate } from "react-router-dom";
import { useCheckAuth } from "@/hooks/useAuth";
import type { JSX } from "react";

function ProtectedDetailerRoute({ children }: { children: JSX.Element }) {
  const { isDetailer, isCheckingAuth } = useCheckAuth();

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (!isDetailer) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedDetailerRoute;
