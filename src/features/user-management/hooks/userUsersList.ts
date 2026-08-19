import { useQuery } from "@tanstack/react-query";
import getUsers from "../../user-profile/services/getUsers";
import { useState } from "react";

export default function useUsersList() {
  const { data: allUsers, isPending: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(
    new Set(),
  );
  const allSelected =
    !!allUsers?.length &&
    allUsers.every((user) => selectedUserIds.has(user.id));

  const toggleUserSelection = (userId: string, checked: boolean) => {
    setSelectedUserIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(userId) : next.delete(userId);
      return next;
    });
  };

  const toggleSelectAll = (checked: boolean) => {
    setSelectedUserIds(
      checked ? new Set(allUsers?.map((user) => user.id)) : new Set(),
    );
  };

  return {
    allUsers,
    usersLoading,
    selectedUserIds,
    allSelected,
    toggleSelectAll,
    toggleUserSelection,
  };
}
