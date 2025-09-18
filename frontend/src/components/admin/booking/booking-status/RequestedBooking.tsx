import { useEffect, useState } from "react";
import type { Ticket, ScheduleItem } from "@/shared/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CancelReasonSelector } from "../CancelReasonSelector";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon, Clock, AlertCircle } from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBookingStore } from "@/stores/useBookingStore";
import { useGetDetailerScheduleByDate } from "@/hooks/useAdmin";
import { Badge } from "@/components/ui/badge";
import { useAcceptTicket, useCancelTicket } from "@/hooks/useTicket";

interface RequestedBookingProps {
  ticket: Ticket;
  detailers?: { id: string; name: string }[];
}

export function RequestedBooking({
  ticket,
  detailers = [],
}: RequestedBookingProps) {
  const {
    cancelReason,
    customReason,
    selectedDate,
    setSelectedDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    selectedDetailerId,
    setSelectedDetailerId,
    setDetailerSchedule,
    setIsGettingDetailerSchedule,
    resetCancelState,
    setCancelDialogOpen,
  } = useBookingStore();

  const [price, setPrice] = useState(ticket.price);
  const [location, setLocation] = useState(ticket.location || "");

  const { acceptTicketMutation, isAcceptingTicket } = useAcceptTicket();
  const { cancelTicketMutation, isCancellingTicket } = useCancelTicket();

  const detailerIdString = selectedDetailerId || undefined;
  const { schedule, isGettingDetailerSchedule } = useGetDetailerScheduleByDate(
    detailerIdString,
    selectedDate
  );

  useEffect(() => {
    setDetailerSchedule(schedule || []);
  }, [schedule, setDetailerSchedule]);

  useEffect(() => {
    setIsGettingDetailerSchedule(isGettingDetailerSchedule);
  }, [isGettingDetailerSchedule, setIsGettingDetailerSchedule]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const hasTimeConflict = () => {
    if (
      !startTime ||
      !endTime ||
      !selectedDate ||
      !schedule ||
      schedule.length === 0
    ) {
      return false;
    }

    const selectedStart = new Date(
      `${selectedDate.toDateString()} ${startTime}`
    );
    const selectedEnd = new Date(`${selectedDate.toDateString()} ${endTime}`);

    return schedule.some((busySlot: ScheduleItem) => {
      const busyStart = parseISO(busySlot.start);
      const busyEnd = parseISO(busySlot.end);

      return (
        (selectedStart >= busyStart && selectedStart < busyEnd) ||
        (selectedEnd > busyStart && selectedEnd <= busyEnd) ||
        (selectedStart <= busyStart && selectedEnd >= busyEnd)
      );
    });
  };

  const handleAcceptBooking = () => {
    if (!selectedDetailerId || !selectedDate || !startTime || !endTime) {
      return;
    }

    acceptTicketMutation({
      id: ticket.id,
      detailer_id: selectedDetailerId,
      date: selectedDate.toISOString().split("T")[0],
      start_time: startTime,
      end_time: endTime,
      price: price,
      location: location,
    });
  };

  const handleCancelBooking = () => {
    const reason = cancelReason === "other" ? customReason : cancelReason;
    if (reason) {
      cancelTicketMutation({
        id: ticket.id,
        reason: reason,
      });
      setCancelDialogOpen(false);
      resetCancelState();
    }
  };

  const timeConflict = hasTimeConflict();

  return (
    <>
      <DialogHeader>
        <DialogTitle>Requested Booking</DialogTitle>
        <DialogDescription>
          Review details and assign a detailer or cancel.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        {/* User Info */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            User: <span className="font-medium">{ticket.user.name}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Phone:{" "}
            <a href={`tel:${ticket.user.phone}`} className="font-medium">
              {ticket.user.phone}
            </a>
          </p>
        </div>

        {/* Detailer select */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Assign Detailer</label>
          <Select
            value={selectedDetailerId || ""}
            onValueChange={(value) => setSelectedDetailerId(value || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a detailer" />
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

        {/* Schedule Display */}
        {selectedDetailerId && selectedDate && (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Detailer's Schedule for {format(selectedDate, "PPP")}
            </label>
            <div className="border rounded-md p-3 bg-muted/20">
              {isGettingDetailerSchedule ? (
                <p className="text-sm text-muted-foreground">
                  Loading schedule...
                </p>
              ) : !schedule || schedule.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No bookings scheduled
                </p>
              ) : (
                <div className="space-y-2">
                  {schedule.map((slot: ScheduleItem) => (
                    <div
                      key={slot.ticket_id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="font-medium">{slot.interval}</span>
                      <Badge variant="outline">Booking #{slot.ticket_id}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {location && (
            <Button
              onClick={() =>
                window.open(
                  `https://maps.google.com/?q=${encodeURIComponent(location)}`,
                  "_blank"
                )
              }
              className="w-full bg-primary text-white hover:bg-primary/90 transition-colors duration-300 rounded-md mt-2"
              size="sm"
            >
              Open in Google Maps
            </Button>
          )}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Price</label>
          <Input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
          />
        </div>

        {/* Date + Time pickers */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Date & Time</label>

          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </PopoverContent>
          </Popover>

          {/* Time Pickers */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium">Start Time</label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className={timeConflict ? "border-destructive" : ""}
                  disabled={!selectedDate}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium">End Time</label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className={timeConflict ? "border-destructive" : ""}
                  min={startTime}
                  disabled={!startTime}
                />
              </div>
            </div>
          </div>

          {/* Time Conflict Warning */}
          {timeConflict && (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>
                This time conflicts with the detailer's existing schedule!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Button */}
      <DialogFooter className="flex flex-col gap-2">
        <Button
          variant="success"
          className="w-full"
          onClick={handleAcceptBooking}
          disabled={
            timeConflict ||
            !selectedDetailerId ||
            !selectedDate ||
            !startTime ||
            !endTime ||
            isAcceptingTicket
          }
        >
          {isAcceptingTicket ? "Accepting..." : "Confirm Booking"}
        </Button>
      </DialogFooter>

      {/* Cancel Section */}
      <Separator className="my-4" />
      <div className="space-y-3">
        <CancelReasonSelector />
        <Button
          variant="destructive"
          onClick={handleCancelBooking}
          disabled={
            !cancelReason ||
            (cancelReason === "other" && !customReason) ||
            isCancellingTicket
          }
          className="w-full"
        >
          {isCancellingTicket ? "Canceling..." : "Cancel Booking"}
        </Button>
      </div>
    </>
  );
}
