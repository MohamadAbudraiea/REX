import type { Ticket } from "@/shared/types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BookingsTableRow } from "@/components/admin/booking/BookingsTableRow";
import { PaginationControls } from "@/components/admin/booking/PaginationControls";
import { CancelConfirmationDialog } from "@/components/admin/booking/CancelConfirmationDialog";
import { useBookingStore } from "@/stores/useBookingStore";

export function BookingsTable({
  bookings,
  detailers = [],
}: {
  bookings: Ticket[];
  detailers?: { id: string; name: string }[];
}) {
  const {
    filter,
    filterMonth,
    filterDay,
    currentPage,
    itemsPerPage,
    cancelDialogOpen,
    setFilter,
    setFilterMonth,
    setFilterDay,
    setCurrentPage,
    setCancelDialogOpen,
    confirmCancel,
  } = useBookingStore();

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filter === "All" || b.status === filter;

    const bookingDate = b.date ? new Date(b.date) : null;
    const bookingMonth = bookingDate
      ? String(bookingDate.getMonth() + 1).padStart(2, "0")
      : null;
    const bookingDay = bookingDate
      ? String(bookingDate.getDate()).padStart(2, "0")
      : null;

    const matchesMonth = !filterMonth || bookingMonth === filterMonth;
    const matchesDay = !filterDay || bookingDay === filterDay;

    return matchesStatus && matchesMonth && matchesDay;
  });

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

  return (
    <div>
      {/* Filter options */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
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

        {/* Month Filter */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Month:</span>
          <Select
            value={filterMonth ?? "all"}
            onValueChange={(value) =>
              setFilterMonth(value === "all" ? null : value)
            }
          >
            <SelectTrigger className="w-28 rounded-md border-muted-foreground bg-muted/50">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {Array.from({ length: 12 }, (_, i) => {
                const month = String(i + 1).padStart(2, "0");
                return (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Day Filter (Optional) */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Day:</span>
          <Select
            disabled={filterMonth === "all" || !filterMonth}
            value={filterDay ?? "all"}
            onValueChange={(value) =>
              setFilterDay(value === "all" ? null : value)
            }
          >
            <SelectTrigger className="w-28 rounded-md border-muted-foreground bg-muted/50">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {Array.from({ length: 31 }, (_, i) => {
                const day = String(i + 1).padStart(2, "0");
                return (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <Table className="text-center bg-muted/50">
        <TableHeader className="bg-muted/50 font-bold">
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
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
          {currentBookings.length > 0 ? (
            currentBookings.map((ticket) => (
              <BookingsTableRow
                key={ticket.id}
                ticket={ticket}
                detailers={detailers}
              />
            ))
          ) : (
            <TableRow className="">
              <TableCell colSpan={9}>No bookings found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Cancel confirmation dialog */}
      <CancelConfirmationDialog
        open={cancelDialogOpen}
        setOpen={setCancelDialogOpen}
        onConfirm={confirmCancel}
      />
    </div>
  );
}
