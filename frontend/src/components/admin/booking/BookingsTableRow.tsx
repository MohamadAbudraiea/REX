import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import type { Ticket } from "@/shared/types";
import { BookingDialog } from "./BookingDialog";

const statusColors: Record<
  Ticket["status"],
  "success" | "warning" | "destructive" | "default"
> = {
  finished: "success",
  pending: "default",
  requested: "warning",
  canceled: "destructive",
};

export function BookingsTableRow(props: {
  ticket: Ticket;
  onDialogOpen: (t: Ticket) => void;
  cancelReason: string;
  setCancelReason: (val: string) => void;
  customReason: string;
  setCustomReason: (val: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (val: Date | undefined) => void;
  startTime: string;
  setStartTime: (val: string) => void;
  endTime: string;
  setEndTime: (val: string) => void;
  handleCancelClick: (t: Ticket) => void;
  detailers?: { id: string; name: string }[];
}) {
  const { ticket, onDialogOpen, ...rest } = props;

  return (
    <TableRow>
      <TableCell>{ticket.user.name}</TableCell>
      <TableCell>{ticket.service}</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="xs"
              variant={statusColors[ticket.status]}
              onClick={() => onDialogOpen(ticket)}
            >
              {ticket.status}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md max-h-screen overflow-y-auto">
            <BookingDialog ticket={ticket} {...rest} />
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell>
        <a href={`tel:${ticket.user.phone}`}>{ticket.user.phone}</a>
      </TableCell>
      <TableCell>{ticket.price || "-"}</TableCell>
      <TableCell>{ticket.date}</TableCell>
      <TableCell>{ticket.secretary?.name || "-"}</TableCell>
      <TableCell>{ticket.detailer?.name || "-"}</TableCell>
    </TableRow>
  );
}
