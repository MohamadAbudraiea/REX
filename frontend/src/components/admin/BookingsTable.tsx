import type { Ticket } from "@/shared/types";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Star, CalendarIcon, Clock } from "lucide-react";
import { Separator } from "../ui/separator";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const statusColors: Record<
  "finished" | "pending" | "requested" | "canceled",
  "success" | "warning" | "destructive" | "default"
> = {
  finished: "success",
  pending: "default",
  requested: "warning",
  canceled: "destructive",
};

const CancelReasonSelector = ({
  cancelReason,
  setCancelReason,
  customReason,
  setCustomReason,
}: {
  cancelReason: string;
  setCancelReason: (val: string) => void;
  customReason: string;
  setCustomReason: (val: string) => void;
}) => (
  <div className="space-y-3">
    <Select value={cancelReason} onValueChange={setCancelReason}>
      <SelectTrigger>
        <SelectValue placeholder="Select Cancel Reason" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price">High Price</SelectItem>
        <SelectItem value="time">Not Suitable Time</SelectItem>
        <SelectItem value="other">Other</SelectItem>
      </SelectContent>
    </Select>
    {cancelReason === "other" && (
      <Textarea
        placeholder="Enter custom reason"
        value={customReason}
        onChange={(e) => setCustomReason(e.target.value)}
      />
    )}
  </div>
);

export function BookingsTable({
  bookings,
  detailers = [],
}: {
  bookings: Ticket[];
  detailers?: { id: string; name: string }[];
}) {
  const [filter, setFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [cancelReason, setCancelReason] = useState<string>("");
  const [customReason, setCustomReason] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const itemsPerPage = 5;

  // ✅ Filter bookings
  const filteredBookings =
    filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setCancelDialogOpen(true);
  };

  const confirmCancel = () => {
    if (selectedTicket) {
      const reason = cancelReason === "other" ? customReason : cancelReason;
      console.log("Booking canceled:", selectedTicket.id, "Reason:", reason);
    }
    setCancelDialogOpen(false);
    setCancelReason("");
    setCustomReason("");
  };

  const handleDialogOpen = (ticket: Ticket) => {
    setSelectedTicket(ticket);

    if (ticket.date) {
      const parsedDate = new Date(ticket.date);
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
      } else {
        setSelectedDate(undefined);
      }
    } else {
      setSelectedDate(undefined);
    }
  };

  const renderDialogContent = (ticket: Ticket) => {
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

              <Select defaultValue={ticket.detailer_id || ""}>
                <SelectTrigger className="w-full">
                  <DialogTitle>Assign Detailer</DialogTitle>
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
                {/* Date Picker */}
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
                  <PopoverContent className="w-auto p-0" align="start">
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

                {/* Time Pickers */}
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

            {/* Confirmation Section */}
            <DialogFooter className="flex flex-col gap-2">
              <Button variant="success" className="w-full">
                Confirm Booking
              </Button>
            </DialogFooter>

            {/* Cancellation Section */}
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

              {/* Cancel Reason Section */}
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
  };

  return (
    <div>
      {/* Filter */}
      <div className="mb-4 flex items-center gap-2">
        <span className="font-medium">Filter by status:</span>
        <Select
          value={filter}
          onValueChange={(value) => {
            setFilter(value);
            handlePageChange(1);
          }}
        >
          <SelectTrigger className="w-40 rounded-md border-muted-foreground bg-muted/50">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="requested">Requested</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="canceled">Cancelled</SelectItem>
            <SelectItem value="finished">Finished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Table className="text-center bg-muted/50">
        <TableHeader className="bg-muted/50 font-bold">
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Service</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Secretary</TableCell>
            <TableCell>Detailer</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentBookings.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.user.name}</TableCell>
              <TableCell>{ticket.service}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="xs"
                      variant={statusColors[ticket.status]}
                      onClick={() => handleDialogOpen(ticket)}
                    >
                      {ticket.status}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md max-h-screen overflow-y-auto">
                    {renderDialogContent(ticket)}
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
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center w-full">
          <Pagination className="mx-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isCurrentPage = page === currentPage;

                const showPage =
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 2 && page <= currentPage + 2);

                if (!showPage && page === 2) {
                  return (
                    <PaginationItem key="ellipsis-start">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                if (!showPage && page === totalPages - 1) {
                  return (
                    <PaginationItem key="ellipsis-end">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                if (!showPage) return null;

                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={isCurrentPage}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Cancel Confirmation */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Back</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel}>
              Confirm Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
