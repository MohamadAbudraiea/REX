import type { Ticket } from "@/shared/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CancelReasonSelector } from "./CancelReasonSelector";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon, Clock, Star } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BookingDialog({
  ticket,
  cancelReason,
  setCancelReason,
  customReason,
  setCustomReason,
  selectedDate,
  setSelectedDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  handleCancelClick,
  detailers = [],
}: {
  ticket: Ticket;
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
  handleCancelClick: (ticket: Ticket) => void;
  detailers?: { id: string; name: string }[];
}) {
  switch (ticket.status) {
    case "requested":
      return (
        <>
          <DialogHeader>
            <DialogTitle>Requested Booking</DialogTitle>
            <DialogDescription>
              Review details and assign a detailer or cancel.
            </DialogDescription>
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

            {/* Detailer select  */}
            <div className="space-y-1">
              <Select defaultValue={ticket.detailer_id || ""}>
                <SelectTrigger className="w-full">
                  <DialogTitle className="text-sm font-medium">
                    Assign Detailer
                  </DialogTitle>
                  <SelectValue placeholder="Assign Detailer" />
                </SelectTrigger>

                <SelectContent>
                  {detailers.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* ---------- End detailer select ---------- */}

            {/* Location */}
            <div className="flex flex-col gap-3">
              <label className="font-medium">Location</label>
              <Input
                className={`${ticket.location && "cursor-pointer"}`}
                placeholder="Location"
                defaultValue={ticket.location ? ticket.location : ""}
              />
              <Button
                onClick={() => {
                  if (ticket.location) {
                    window.open(`${ticket.location}`, "_blank");
                  }
                }}
              >
                Open in Google Maps
              </Button>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-3">
              <label className="font-medium">Price</label>
              <Input
                placeholder="Price"
                defaultValue={ticket.price ? ticket.price : ""}
              />
            </div>

            {/* Date + Time pickers */}
            <div className="flex flex-col gap-3">
              <label className="font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  defaultValue={ticket.date ? ticket.date : ""}
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>

              <label className="font-medium">Time</label>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 w-1/2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 w-1/2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Button in Footer (keeps original layout) */}
          <DialogFooter className="flex flex-col gap-2">
            <Button variant="success" className="w-full">
              Confirm Booking
            </Button>
          </DialogFooter>

          {/* Separator + Cancel Section (keeps original layout) */}
          <Separator className="my-4" />
          <div className="space-y-3">
            <CancelReasonSelector
              cancelReason={cancelReason}
              setCancelReason={setCancelReason}
              customReason={customReason}
              setCustomReason={setCustomReason}
            />
            <Button
              variant="destructive"
              onClick={() => handleCancelClick(ticket)}
              disabled={
                !cancelReason || (cancelReason === "other" && !customReason)
              }
              className="w-full"
            >
              Cancel Booking
            </Button>
          </div>
        </>
      );

    case "pending":
      return (
        <>
          <DialogHeader>
            <DialogTitle>Pending Booking</DialogTitle>
            <DialogDescription>
              Finish or cancel this booking.
            </DialogDescription>
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

            <CancelReasonSelector
              cancelReason={cancelReason}
              setCancelReason={setCancelReason}
              customReason={customReason}
              setCustomReason={setCustomReason}
            />
          </div>

          <Button
            variant="destructive"
            onClick={() => handleCancelClick(ticket)}
            disabled={
              !cancelReason || (cancelReason === "other" && !customReason)
            }
          >
            Cancel Order
          </Button>
        </>
      );

    case "finished":
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

    case "canceled":
      return (
        <>
          <DialogHeader>
            <DialogTitle>Cancelled Booking</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            User: <span className="font-medium">{ticket.user.name}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Phone:{" "}
            <a href={`tel:${ticket.user.phone}`} className="font-medium">
              {ticket.user.phone}
            </a>
          </p>
          <p className="font-medium">
            Reason: {ticket.cancel_reason || "Other"}
          </p>
        </>
      );

    default:
      return null;
  }
}
