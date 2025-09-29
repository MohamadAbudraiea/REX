import type { Ticket, UseCancelTicketHook } from "@/shared/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CancelReasonSelector } from "../CancelReasonSelector";
import { useBookingStore } from "@/stores/useBookingStore";
import type { UseMutateFunction } from "@tanstack/react-query";

interface PendingBookingProps {
  ticket: Ticket;
  useFinishTicketHook: () => {
    finishTicketMutation: UseMutateFunction<
      void,
      Error,
      { id: string },
      unknown
    >;
    isFinishingTicket: boolean;
  };
  role: "admin" | "secretary" | "detailer";
  useCancelTicketHook: () => UseCancelTicketHook;
}

export function PendingBooking({
  ticket,
  role,
  useFinishTicketHook,
  useCancelTicketHook,
}: PendingBookingProps) {
  const { cancelReason, customReason, setCancelDialogOpen, selectedTicket } =
    useBookingStore();

  const { cancelTicketMutation, isCancellingTicket } = useCancelTicketHook();
  const { finishTicketMutation, isFinishingTicket } = useFinishTicketHook();

  const handleFinishOrder = () => {
    finishTicketMutation({ id: ticket.id });
  };

  const handleCancelOrder = () => {
    const reason = cancelReason === "other" ? customReason : cancelReason;
    if (reason && selectedTicket) {
      cancelTicketMutation({
        id: selectedTicket.id,
        reason: reason,
      });
      setCancelDialogOpen(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Pending Booking</DialogTitle>
        <DialogDescription>Finish or cancel this booking.</DialogDescription>
      </DialogHeader>

      <div className="space-y-3 py-4">
        <p className="text-sm text-muted-foreground">
          User: <span className="font-medium">{ticket.user.name}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Phone:{" "}
          <a href={`tel:${ticket.user.phone}`} className="font-medium">
            {ticket.user.phone}
          </a>
        </p>

        <Button
          variant="success"
          className="w-full"
          onClick={handleFinishOrder}
          disabled={isFinishingTicket}
        >
          {isFinishingTicket ? "Finishing..." : "Finish Order"}
        </Button>

        {(role === "admin" || role === "secretary") && (
          <>
            <Separator className="mt-4 bg-muted-foreground" />
            <CancelReasonSelector />
          </>
        )}
      </div>
      {(role === "admin" || role === "secretary") && (
        <Button
          variant="destructive"
          onClick={handleCancelOrder}
          disabled={
            !cancelReason ||
            (cancelReason === "other" && !customReason) ||
            isCancellingTicket
          }
        >
          {isCancellingTicket ? "Canceling..." : "Cancel Order"}
        </Button>
      )}
    </>
  );
}
