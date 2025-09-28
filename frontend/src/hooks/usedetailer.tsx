import { getTicketsForDetailer } from "@/api/detailer";
import { useQuery } from "@tanstack/react-query";

export const useGetTicketsForDetailer = (params = {}) => {
  const { data, isPending: isFetchingTickets } = useQuery({
    queryKey: ["ticketsForDetailer", params],
    queryFn: () => getTicketsForDetailer(params),
  });

  return {
    tickets: data?.data?.tickets,
    pagination: data?.data?.pagination,
    isFetchingTickets,
  };
};
