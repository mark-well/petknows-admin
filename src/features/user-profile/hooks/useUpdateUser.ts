import { useForm } from "react-hook-form";
import type { UpdateUserRecord } from "../types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateUserDetails from "../api/updateUserDetails";

export default function useUpdateUser() {
  const [userId, setUserId] = useState<string>("");
  const { register, handleSubmit, reset } = useForm<UpdateUserRecord>();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (
      { user_id, updatedData }: {
        user_id: string;
        updatedData: UpdateUserRecord;
      },
    ) => updateUserDetails(user_id, updatedData),
    onSuccess: () => {
      alert("Update success!");
      queryClient.invalidateQueries({ queryKey: ["singleUser"] });
    },
    onError: () => alert("Update failed!"),
  });

  const submit = (data: UpdateUserRecord) => {
    const conf = confirm("Save your changes?");
    if (!conf) return;

    if (!userId || userId === "") throw new Error("No user id");
    updateMutation.mutate({ user_id: userId, updatedData: data });
  };

  return {
    register,
    handleSubmit,
    reset,
    submit,
    setUserId,
    updateSuccess: updateMutation.isSuccess,
    updateFailed: updateMutation.isError,
    updating: updateMutation.isPending,
  };
}
