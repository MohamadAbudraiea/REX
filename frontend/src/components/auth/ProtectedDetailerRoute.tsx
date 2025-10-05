import { Navigate } from "react-router-dom";
import { useCheckAuth } from "@/hooks/useAuth";
import type { JSX } from "react";

function ProtectedDetailerRoute({ children }: { children: JSX.Element }) {
  const { isDetailer, isCheckingAuth } = useCheckAuth();

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
  if (!isDetailer) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedDetailerRoute;
