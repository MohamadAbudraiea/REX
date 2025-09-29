import { Card, CardContent } from "@/components/ui/card";
import { BookingsTable } from "@/components/booking/BookingsTable";
import { useBookingStore } from "@/stores/useBookingStore";
import {
  useGetAllDetailersForSecretary,
  useGetTicketsForSecretary,
} from "@/hooks/useSecretary";

export default function SecretaryDashboard() {
  const { detailers, isFetchingDetailers } = useGetAllDetailersForSecretary();
  const {
    filter,
    filterMonth,
    filterDay,
    filterYear,
    currentPage,
    itemsPerPage,
  } = useBookingStore();

  const queryParams: Record<string, string | number> = {
    page: currentPage,
    limit: itemsPerPage,
  };

  if (filter !== "All") {
    queryParams.filter = filter;
  }

  if (filterMonth) {
    queryParams.filterMonth = filterMonth;
  }

  if (filterDay) {
    queryParams.filterDay = filterDay;
  }

  if (filterYear) {
    queryParams.filterYear = filterYear;
  }

  const selectItems: Record<string, string> = {
    All: "All",
    requested: "Requested",
    pending: "Pending",
    canceled: "Cancelled",
    finished: "Finished",
  };

  const { tickets, pagination, isFetchingTickets } =
    useGetTicketsForSecretary(queryParams);

  if (isFetchingTickets || isFetchingDetailers) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">BLINK Secretary Dashboard</h1>
      <Card>
        <CardContent>
          <BookingsTable
            tickets={tickets}
            selectItems={selectItems}
            pagination={pagination}
            isFetchingTickets={isFetchingTickets}
            detailers={detailers}
            role="secretary"
          />
        </CardContent>
      </Card>
    </div>
  );
}
