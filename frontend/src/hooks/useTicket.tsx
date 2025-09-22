import {
  getAllTickets,
  getRatingForTicket,
  acceptTicket,
  cancelTicket,
  finishTicket,
} from "@/api/ticket";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllTickets = () => {
  const { data, isPending: isFetchingTickets } = useQuery({
    queryKey: ["tickets"],
    queryFn: getAllTickets,
  });

  return { tickets: data?.data, isFetchingTickets };
};

export const useGetRatingForTicket = (id: string) => {
  const { data, isPending: isFetchingRating } = useQuery({
    queryKey: ["ticketRating", id],
    queryFn: () => getRatingForTicket({ id }),
  });

  return { rating: data?.data, isFetchingRating };
};

export const useAcceptTicket = () => {
  const queryClient = useQueryClient();
  const { mutate: acceptTicketMutation, isPending: isAcceptingTicket } =
    useMutation({
      mutationKey: ["acceptTicket"],
      mutationFn: acceptTicket,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tickets"] });
        toast.success("Ticket accepted successfully");
      },
      onError: () => {
        toast.error("Failed to accept ticket");
      },
    });

  return { acceptTicketMutation, isAcceptingTicket };
};

export const useCancelTicket = () => {
  const queryClient = useQueryClient();
  const { mutate: cancelTicketMutation, isPending: isCancellingTicket } =
    useMutation({
      mutationKey: ["cancelTicket"],
      mutationFn: ({ id, reason }: { id: string; reason: string }) =>
        cancelTicket({ id, reason }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tickets"] });
        toast.success("Ticket canceled successfully");
      },
      onError: () => {
        toast.error("Failed to cancel ticket");
      },
    });

  return { cancelTicketMutation, isCancellingTicket };
};

export const useFinishTicket = () => {
  const queryClient = useQueryClient();
  const { mutate: finishTicketMutation, isPending: isFinishingTicket } =
    useMutation({
      mutationKey: ["finishTicket"],
      mutationFn: finishTicket,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tickets"] });
        toast.success("Ticket finished successfully");
      },
      onError: () => {
        toast.error("Failed to finish ticket");
      },
    });

  return { finishTicketMutation, isFinishingTicket };
};
