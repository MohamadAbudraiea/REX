import { Badge } from "@/components/ui/badge";
import { Clock, X, CheckCircle, Clock4 } from "lucide-react";
import type { StatusType } from "@/shared/types";
import { getStatusBadgeConfig } from "@/shared/utils";

interface StatusBadgeProps {
  status: StatusType;
}

const iconComponents = {
  Clock,
  X,
  CheckCircle,
  Clock4,
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = getStatusBadgeConfig(status);
  const IconComponent =
    iconComponents[config.icon as keyof typeof iconComponents];

  return (
    <Badge
      variant={
        config.variant as
          | "secondary"
          | "default"
          | "destructive"
          | "outline"
          | null
          | undefined
      }
      className="flex items-center gap-1"
    >
      <IconComponent className="w-3 h-3" />
      {config.text}
    </Badge>
  );
}
