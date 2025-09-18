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
    currentPage,
    itemsPerPage,
    cancelDialogOpen,
    setFilter,
    setCurrentPage,
    setCancelDialogOpen,
    confirmCancel,
  } = useBookingStore();

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
          {currentBookings.map((ticket) => (
            <BookingsTableRow
              key={ticket.id}
              ticket={ticket}
              detailers={detailers}
            />
          ))}
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
