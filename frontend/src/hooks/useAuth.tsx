import { checkAuth, login, logout, signUp } from "@/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: signUpMutation, isPending } = useMutation({
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

  return { signUpMutation, isPending };
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: loginMutation, isPending } = useMutation({
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

  return { loginMutation, isPending };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logoutMutation, isPending } = useMutation({
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

  return { logoutMutation, isPending };
};

export const useCheckAuth = () => {
  const { data, isPending } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    isAuthenticated: data?.status === "success",
    isPending,
    user: data?.data,
  };
};
