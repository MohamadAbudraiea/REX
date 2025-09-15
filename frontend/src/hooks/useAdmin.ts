/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUsers, addUser, deleteUser, editUser } from "@/api/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetUsers = () => {
  const { data, isPending: isGettingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    retry: false,
  });

  return {
    users: data?.data,
    isGettingUsers,
  };
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  const { mutate: addUserMutation, isPending: isAddingUser } = useMutation({
    mutationKey: ["addUser"],
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User added successfully");
    },
    onError: () => {
      toast.error("Failed to add user, please try again");
    },
  });

  return { addUserMutation, isAddingUser };
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteUserMutation, isPending: isDeletingUser } = useMutation(
    {
      mutationKey: ["deleteUser"],
      mutationFn: deleteUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("User deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete user, please try again");
      },
    }
  );

  return { deleteUserMutation, isDeletingUser };
};

export const useEditUser = () => {
  const queryClient = useQueryClient();
  const { mutate: editUserMutation, isPending: isEditingUser } = useMutation({
    mutationKey: ["editUser"],
    mutationFn: editUser,
    onSuccess: (data) => {
      // data is the response from your backend
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success(data.message || "User edited successfully");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Failed to edit user, please try again";
      toast.error(message);
    },
  });

  return { editUserMutation, isEditingUser };
};
