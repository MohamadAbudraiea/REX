import { Navigate } from "react-router-dom";
import { useCheckAuth } from "@/hooks/useAuth";
import type { JSX } from "react";

function ProtectedUserRoute({ children }: { children: JSX.Element }) {
  const { isUser, isCheckingAuth } = useCheckAuth();

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src="/icon-logo.png"
          alt="Loading"
          className="h-32 w-32 transform animate-spin"
        />
      </div>
    );
  }
  if (!isUser) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedUserRoute;
