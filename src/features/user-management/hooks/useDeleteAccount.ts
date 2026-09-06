import { useMutation } from "@tanstack/react-query";
import deleteUserAccount from "../services/deleteUserAccount";

export default function useDeleteAccount() {
  return useMutation({
    mutationFn: (userIds: Set<string>) => deleteUserAccount(userIds),
  });
}
