import type { Ticket } from "@/shared/types";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";

interface FinishedBookingProps {
  ticket: Ticket;
}

export function FinishedBooking({ ticket }: FinishedBookingProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Finished Booking</DialogTitle>
        <DialogDescription>Rating & Feedback</DialogDescription>
      </DialogHeader>
      <div className="space-y-3 py-4">
        {ticket.rating ? (
          <div>
            <p className="font-medium flex items-center gap-1">
              Rating:
              <span className="text-sm text-muted-foreground">
                {ticket.rating.rating_number} / 5.0
              </span>
              <Star fill="currentColor" className="text-yellow-500" />
            </p>
            <p className="text-sm text-muted-foreground">
              Description:{" "}
              <span className="font-medium">
                {ticket.rating.description || "No description"}
              </span>
            </p>
          </div>
        ) : (
          <p>No rating available.</p>
        )}
      </div>
    </>
  );
}
