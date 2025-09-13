import type { Ticket } from "@/shared/types";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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

const statusColors: Record<
  string,
  "success" | "warning" | "secondary" | "destructive" | "default"
> = {
  Completed: "success",
  Pending: "default",
  Requested: "warning",
  Cancelled: "destructive",
};

export function BookingsTable({ bookings }: { bookings: Ticket[] }) {
  const [filter, setFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Filter bookings
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
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Requested">Requested</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
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
            <TableCell>Price</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Secretary</TableCell>
            <TableCell>Delivery</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Cancel Reason</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentBookings.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>{ticket.user_id}</TableCell>
              <TableCell>{ticket.service}</TableCell>
              <TableCell>
                <Badge variant={statusColors[ticket.status]}>
                  {ticket.status}
                </Badge>
              </TableCell>
              <TableCell>${ticket.price}</TableCell>
              <TableCell>{ticket.date}</TableCell>
              <TableCell>{ticket.secretary_id || "-"}</TableCell>
              <TableCell>{ticket.detailer_id || "-"}</TableCell>
              <TableCell>
                {ticket.rating !== null ? `${ticket.rating} ⭐` : "-"}
              </TableCell>
              <TableCell>{ticket.cancel_reason || "-"}</TableCell>
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
    </div>
  );
}
