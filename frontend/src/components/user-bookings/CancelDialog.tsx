import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserCancelTicket } from "@/hooks/useUser";

interface CancelDialogProps {
  ticket_id: string;
}

export default function CancelDialog({ ticket_id }: CancelDialogProps) {
  const { cancelTicketMutation, isCancellingTicket } = useUserCancelTicket();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const handleCancel = () => {
    cancelTicketMutation({ id: ticket_id, reason: cancelReason });
    setIsOpen(false);
    setCancelReason("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <X className="w-4 h-4 mr-1" />
          {t("book.cancel.button")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("book.cancel.title")}</DialogTitle>
          <DialogDescription>{t("book.cancel.description")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="cancelReason">{t("book.cancel.reason")}</Label>
            <Textarea
              id="cancelReason"
              placeholder={t("book.cancel.reason_placeholder")}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t("book.cancel.no")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={!cancelReason || isCancellingTicket}
          >
            {isCancellingTicket
              ? t("book.cancel.cancelling")
              : t("book.cancel.yes")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
