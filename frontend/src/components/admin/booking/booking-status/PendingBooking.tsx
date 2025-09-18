import type { Ticket } from "@/shared/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CancelReasonSelector } from "../CancelReasonSelector";
import { useBookingStore } from "@/stores/useBookingStore";

interface PendingBookingProps {
  ticket: Ticket;
}

export function PendingBooking({ ticket }: PendingBookingProps) {
  const { cancelReason, customReason, handleCancelClick } = useBookingStore();

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

        <Button variant="success" className="w-full">
          Finish Order
        </Button>

        <Separator className="mt-4 bg-muted-foreground" />

        <CancelReasonSelector />
      </div>

      <Button
        variant="destructive"
        onClick={() => handleCancelClick(ticket)}
        disabled={!cancelReason || (cancelReason === "other" && !customReason)}
      >
        Cancel Order
      </Button>
    </>
  );
}
