import { getUserTickets, addTicket, cancelTicket } from "@/api/user";
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

export const useUserCancelTicket = () => {
  const queryClient = useQueryClient();
  const { mutate: cancelTicketMutation, isPending: isCancellingTicket } =
    useMutation({
      mutationKey: ["cancelTicket"],
      mutationFn: ({ id, reason }: { id: string; reason: string }) =>
        cancelTicket({ id, reason }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["filteredTickets"] });
        toast.success("Ticket canceled successfully");
      },
      onError: () => {
        toast.error("Failed to cancel ticket");
      },
    });

  return { cancelTicketMutation, isCancellingTicket };
};
