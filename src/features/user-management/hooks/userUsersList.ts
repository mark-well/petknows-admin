import { useQuery } from "@tanstack/react-query";
import { getUsers, getUsersAdmins } from "../../user-profile/services/getUsers";
import { useState } from "react";
import { useAuth } from "../../../auth/providers/useAuth";

export default function useUsersList() {
  const { userRole } = useAuth();

  const { data: allUsers, isPending: usersLoading } = useQuery({
    queryKey: ["users", userRole],
    queryFn: () => {
      if (userRole === "super_admin") {
        return getUsersAdmins();
      } else {
        return getUsers();
      }
    },
  });

  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(
    new Set(),
  );
  const allSelected =
    !!allUsers?.length &&
    allUsers
      .filter((user) => user.role !== "super_admin")
      .every((user) => selectedUserIds.has(user.id));

  const toggleUserSelection = (userId: string, checked: boolean) => {
    setSelectedUserIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(userId) : next.delete(userId);
      return next;
    });
  };

  const toggleSelectAll = (checked: boolean) => {
    setSelectedUserIds(
      checked
        ? new Set(
            allUsers
              ?.filter((user) => user.role !== "super_admin")
              .map((user) => user.id),
          )
        : new Set(),
    );
  };

  const clearSelectedUsers = () => {
    setSelectedUserIds(new Set());
  };

  return {
    allUsers,
    usersLoading,
    selectedUserIds,
    allSelected,
    clearSelectedUsers,
    toggleSelectAll,
    toggleUserSelection,
  };
}
