import type { Ticket } from "@/shared/types";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { useGetRatingForTicket } from "@/hooks/useTicket";

interface FinishedBookingProps {
  ticket: Ticket;
}

export function FinishedBooking({ ticket }: FinishedBookingProps) {
  const { rating, isFetchingRating } = useGetRatingForTicket(ticket.id);
  return (
    <>
      <DialogHeader>
        <DialogTitle>Finished Booking</DialogTitle>
        <DialogDescription>Rating & Feedback</DialogDescription>
      </DialogHeader>
      {isFetchingRating && (
        <div className="flex items-center justify-center py-2">
          <Star className="h-4 w-4 animate-spin mr-2" />
          <span>Loading...</span>
        </div>
      )}
      <div className="space-y-3 py-4">
        {rating ? (
          <div>
            <p className="font-medium flex items-center gap-1">
              Rating:
              {rating.rating_number ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    {rating.rating_number} / 5.0
                  </span>
                  <Star fill="currentColor" className="text-yellow-500" />
                </>
              ) : (
                "No rating"
              )}
            </p>
            <p className="text-sm text-muted-foreground">
              Description:{" "}
              <span className="font-medium">
                {rating.description || "No description"}
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
