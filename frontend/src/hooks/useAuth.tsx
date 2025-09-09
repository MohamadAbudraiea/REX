import { login, logout, signUp } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const useSignUp = () => {
  const { t } = useTranslation();
  const { mutate: signUpMutation, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signUp,
    onSuccess: () => {
      toast.success(t("signup.success"));
    },
    onError: () => {
      toast.error(t("signup.error"));
    },
  });

  return { signUpMutation, isPending };
};

export const useLogin = () => {
  const { t } = useTranslation();
  const { mutate: loginMutation, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      toast.success(t("login.success"));
    },
    onError: () => {
      toast.error(t("login.error"));
    },
  });

  return { loginMutation, isPending };
};

export const useLogout = () => {
  const { mutate: logoutMutation, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully, see you soon.");
    },
    onError: () => {
      toast.error("Failed to logout, please try again.");
    },
  });
  return { logoutMutation, isPending };
};
