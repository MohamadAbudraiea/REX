import {
  getFilteredTickets,
  acceptTicket,
  cancelTicket,
  finishTicket,
  getChartsData,
} from "@/api/ticket";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetChartsData = (
  month: number | undefined,
  year: number | undefined
) => {
  const { data, isPending: isFetchingChartsData } = useQuery({
    queryKey: ["charts", month, year],
    queryFn: () => getChartsData({ month, year }),
  });

  return {
    chartsData: data?.data,
    isFetchingTickets: isFetchingChartsData,
  };
};

export const useGetFilteredTickets = (params = {}) => {
  const { data, isPending: isFetchingTickets } = useQuery({
    queryKey: ["filteredTickets", params],
    queryFn: () => getFilteredTickets(params),
  });

  return {
    tickets: data?.data?.tickets,
    pagination: data?.data?.pagination,
    isFetchingTickets,
  };
};

export const useAcceptTicket = () => {
  const queryClient = useQueryClient();
  const { mutate: acceptTicketMutation, isPending: isAcceptingTicket } =
    useMutation({
      mutationKey: ["acceptTicket"],
      mutationFn: acceptTicket,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["filteredTickets"] });
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
        queryClient.invalidateQueries({ queryKey: ["filteredTickets"] });
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
        queryClient.invalidateQueries({ queryKey: ["filteredTickets"] });
        toast.success("Ticket finished successfully");
      },
      onError: () => {
        toast.error("Failed to finish ticket");
      },
    });

  return { finishTicketMutation, isFinishingTicket };
};
