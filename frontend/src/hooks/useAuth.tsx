import { checkAuth, login, logout, signUp } from "@/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: signUpMutation, isPending: isSigningUp } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success(t("signup.success"));
      navigate("/login");
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.error(t("signup.error"));
    },
  });

  return { signUpMutation, isSigningUp };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: loginMutation, isPending: isLoggingin } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success(t("login.success"));
      navigate("/");
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.error(t("login.error"));
    },
  });

  return { loginMutation, isLoggingin };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logoutMutation, isPending: isLoggingOut } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["auth"], { status: "error", data: null });
      queryClient.removeQueries({ queryKey: ["auth"] });

      toast.success("Logged out successfully, see you soon.");
      navigate("/login");
    },
    onError: () => {
      toast.error("Failed to logout, please try again.");
    },
  });

  return { logoutMutation, isLoggingOut };
};

export const useCheckAuth = () => {
  const { data, isPending: isCheckingAuth } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const isAdmin = data?.data?.role === "admin";
  const isSecretary = data?.data?.role === "secretary";
  const isDetailer = data?.data?.role === "detailer";
  const isUser = data?.data?.role === "user";

  return {
    isAuthenticated: data?.status === "success",
    isCheckingAuth,
    isAdmin,
    isSecretary,
    isDetailer,
    isUser,
    user: data?.data,
  };
};
