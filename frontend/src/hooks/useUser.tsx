import { getUserTickets, addTicket } from "@/api/user";
import type { Booking } from "@/shared/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetUserTickets = (): {
  tickets: Booking[];
  isGettingUserTickets: boolean;
} => {
  const { data, isPending: isGettingUserTickets } = useQuery({
    queryKey: ["userTickets"],
    queryFn: getUserTickets,
  });

  return { tickets: data?.data, isGettingUserTickets };
};

export const useAddTicket = () => {
  const queryClient = useQueryClient();
  const { mutate: addTicketMutation, isPending: isAddingTicket } = useMutation({
    mutationKey: ["addTicket"],
    mutationFn: addTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filteredTickets"] });
      toast.success("Ticket added successfully");
    },
    onError: () => {
      toast.error("Failed to add ticket");
    },
  });

  return { addTicketMutation, isAddingTicket };
};
