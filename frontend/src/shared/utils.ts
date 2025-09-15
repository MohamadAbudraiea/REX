import type { ServiceType, StatusType } from "./types";
import { t } from "i18next";

export const getStatusBadgeConfig = (status: StatusType) => {
  const statusConfig = {
    requested: {
      variant: "secondary",
      icon: "Clock4",
      text: t("book.status.requested"),
    },
    pending: {
      variant: "warning",
      icon: "Clock",
      text: t("book.status.pending"),
    },
    finished: {
      variant: "success",
      icon: "CheckCircle",
      text: t("book.status.finished"),
    },
    cancelled: {
      variant: "destructive",
      icon: "X",
      text: t("book.status.canceled"),
    },
  };

  return statusConfig[status];
};

export const getServiceName = (service: ServiceType): string => {
  const serviceNames = {
    wash: t("book.form.options.wash"),
    dryclean: t("book.form.options.dryclean"),
    polish: t("book.form.options.polish"),
    nano: t("book.form.options.nano"),
    graphene: t("book.form.options.graphene"),
  };
  return serviceNames[service];
};

export const formatTime = (timeString: string | null): string => {
  if (!timeString) return "";
  return timeString.substring(0, 5);
};

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString();
};
