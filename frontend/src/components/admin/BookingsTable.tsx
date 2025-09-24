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
import { months, getDaysInMonth, getYears } from "@/shared/utils";
import { useGetFilteredTickets } from "@/hooks/useTicket";
import { Button } from "../ui/button";

export function BookingsTable({
  detailers = [],
}: {
  detailers?: { id: string; name: string }[];
}) {
  const {
    filter,
    filterMonth,
    filterDay,
    filterYear,
    currentPage,
    itemsPerPage,
    cancelDialogOpen,
    setFilter,
    setFilterMonth,
    setFilterDay,
    setFilterYear,
    setCurrentPage,
    setCancelDialogOpen,
    confirmCancel,
  } = useBookingStore();

  // Build query params for the API call
  const queryParams: Record<string, string | number> = {
    page: currentPage,
    limit: itemsPerPage,
  };

  // Only add filter if it's not "All"
  if (filter !== "All") {
    queryParams.filter = filter;
  }

  // Only add month/day/year filters if they have values
  if (filterMonth) {
    queryParams.filterMonth = filterMonth;
  }

  if (filterDay) {
    queryParams.filterDay = filterDay;
  }

  if (filterYear) {
    queryParams.filterYear = filterYear;
  }

  const { tickets, pagination, isFetchingTickets } =
    useGetFilteredTickets(queryParams);

  // Get current date for default values
  const now = new Date();
  const currentYear = now.getFullYear();

  // Calculate days in selected month and year
  const selectedYear = filterYear ? parseInt(filterYear) : currentYear;
  const daysInSelectedMonth = filterMonth
    ? getDaysInMonth(selectedYear, Number(filterMonth) - 1)
    : 31;

  const years = getYears(2025, currentYear);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleMonthChange = (month: string | null) => {
    setFilterMonth(month);
    setFilterDay(null);
    setCurrentPage(1);
  };

  const handleDayChange = (day: string | null) => {
    setFilterDay(day);
    setCurrentPage(1);
  };

  const handleYearChange = (year: string | null) => {
    setFilterYear(year);
    setCurrentPage(1);
  };

  if (isFetchingTickets) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Filter options */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
          <Select value={filter} onValueChange={handleFilterChange}>
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

        {/* Year Filter */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Year:</span>
          <Select
            value={filterYear ?? "all"}
            onValueChange={(value) =>
              handleYearChange(value === "all" ? null : value)
            }
          >
            <SelectTrigger className="w-28 rounded-md border-muted-foreground bg-muted/50">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Month Filter */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Month:</span>
          <Select
            value={filterMonth ?? "all"}
            onValueChange={(value) =>
              handleMonthChange(value === "all" ? null : value)
            }
          >
            <SelectTrigger className="w-28 rounded-md border-muted-foreground bg-muted/50">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {months.map((monthName, i) => {
                const monthValue = String(i + 1).padStart(2, "0");
                return (
                  <SelectItem key={monthValue} value={monthValue}>
                    {monthName}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Day Filter */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Day:</span>
          <Select
            disabled={filterMonth === "all" || !filterMonth}
            value={filterDay ?? "all"}
            onValueChange={(value) =>
              handleDayChange(value === "all" ? null : value)
            }
          >
            <SelectTrigger className="w-28 rounded-md border-muted-foreground bg-muted/50">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {Array.from({ length: daysInSelectedMonth }, (_, i) => {
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

        {/* Clear Filters */}
        {(filterYear || filterMonth || filterDay || filter !== "All") && (
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setFilter("All");
                setFilterYear(null);
                setFilterMonth(null);
                setFilterDay(null);
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Table and other components remain the same */}
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
            <TableCell>Note</TableCell>
            <TableCell>Secretary</TableCell>
            <TableCell>Detailer</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets && tickets.length > 0 ? (
            tickets.map((ticket: Ticket) => (
              <BookingsTableRow
                key={ticket.id}
                ticket={ticket}
                detailers={detailers}
              />
            ))
          ) : (
            <TableRow className="">
              <TableCell colSpan={10}>No bookings found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Cancel confirmation dialog */}
      <CancelConfirmationDialog
        open={cancelDialogOpen}
        setOpen={setCancelDialogOpen}
        onConfirm={confirmCancel}
      />
    </div>
  );
}
