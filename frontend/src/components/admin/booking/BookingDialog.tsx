import type { Ticket } from "@/shared/types";
import { RequestedBooking } from "./booking-status/RequestedBooking";
import { PendingBooking } from "./booking-status/PendingBooking";
import { FinishedBooking } from "./booking-status/FinishedBooking";
import { CanceledBooking } from "./booking-status/CanceledBooking";

export function BookingDialog({
  ticket,
  detailers = [],
}: {
  ticket: Ticket;
  detailers?: { id: string; name: string }[];
}) {
  switch (ticket.status) {
    case "requested":
      return <RequestedBooking ticket={ticket} detailers={detailers} />;
    case "pending":
      return <PendingBooking ticket={ticket} />;
    case "finished":
      return <FinishedBooking ticket={ticket} />;
    case "canceled":
      return <CanceledBooking ticket={ticket} />;
    default:
      return null;
  }
}
