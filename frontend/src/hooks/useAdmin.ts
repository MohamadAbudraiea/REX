/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getUsers,
  addUser,
  deleteUser,
  editUser,
  getDetailerSchedule,
  getDetailerScheduleByDate,
} from "@/api/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";
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

export const useGetDetailerSchedule = (id?: string) => {
  const { data, isPending: isGettingDetailerSchedule } = useQuery({
    queryKey: ["detailerSchedule", id],
    queryFn: () => getDetailerSchedule({ id: id! }),
    enabled: !!id,
    retry: false,
  });

  return {
    schedule: data?.schedule,
    isGettingDetailerSchedule,
  };
};

export const useGetDetailerScheduleByDate = (id?: string, date?: Date) => {
  // Use local date formatting instead of UTC
  const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
  const [timestamp, setTimestamp] = useState(Date.now());

  // Update timestamp when date changes to force refetch
  useEffect(() => {
    if (date) {
      setTimestamp(Date.now());
    }
  }, [date]);

  const { data, isPending: isGettingDetailerSchedule } = useQuery({
    queryKey: ["detailerSchedule", id, formattedDate, timestamp],
    queryFn: () => {
      if (!id || !formattedDate) {
        throw new Error("Detailer ID and date are required");
      }
      return getDetailerScheduleByDate({ id, date: formattedDate });
    },
    enabled: !!id && !!formattedDate,
    retry: false,
  });

  return {
    schedule: data?.schedule,
    isGettingDetailerSchedule,
  };
};
