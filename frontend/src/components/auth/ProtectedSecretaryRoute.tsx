import { Navigate } from "react-router-dom";
import { useCheckAuth } from "@/hooks/useAuth";
import type { JSX } from "react";

function ProtectedSecretaryRoute({ children }: { children: JSX.Element }) {
  const { isSecretary, isCheckingAuth } = useCheckAuth();

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
  if (!isSecretary) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedSecretaryRoute;
