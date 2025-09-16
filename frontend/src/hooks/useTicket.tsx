import { getAllTickets } from "@/api/ticket";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTickets = () => {
  const { data, isPending: isFetchingTickets } = useQuery({
    queryKey: ["tickets"],
    queryFn: getAllTickets,
  });

  return { tickets: data?.data, isFetchingTickets };
};
