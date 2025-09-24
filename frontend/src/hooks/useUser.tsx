import { addTicket } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
