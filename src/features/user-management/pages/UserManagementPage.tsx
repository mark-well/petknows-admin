import { Helmet } from "react-helmet-async";
import UserTable from "../components/UserTable";
import IconButton from "../../../shared/components/IconButton";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import useUsersList from "../hooks/userUsersList";
import { useEffect, useState } from "react";
import type { UserProfile } from "../../user-profile/types";
import { useMutation } from "@tanstack/react-query";
import deleteUserAccount from "../services/deleteUserAccount";
import { queryClient } from "../../../app/queryClient";

function UserManagementPage() {
  const userList = useUsersList();
  const [filteredUsers, setFilteredUsers] = useState<
    UserProfile[] | undefined
  >();

  useEffect(() => {
    setFilteredUsers(userList.allUsers ?? undefined);
  }, [userList.allUsers]);

  const deleteUserMutation = useMutation({
    mutationFn: (selectedUserIds: Set<string>) =>
      deleteUserAccount(selectedUserIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      userList.refreshUsers();
      userList.clearSelectedUsers();
      alert("Delete success");
    },
    onError: (e: Error) => {
      console.error(e.message);
    },
  });

  const handleDeleteUser = () => {
    if (userList.selectedUserIds.size === 0) {
      alert("No selected user");
      return;
    }

    const confirmed = confirm(
      "Are you sure you want to delete this account/s? This action cannot be undone.",
    );
    if (!confirmed) return;

    //Delete user/s
    deleteUserMutation.mutate(userList.selectedUserIds);
  };

  const handleUserSearch = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const value = event.target.value.toLowerCase().trim();
    const filtered = userList.allUsers?.filter(
      (user) =>
        user.public_id.toLowerCase().includes(value) ||
        user.first_name?.toLowerCase().includes(value) ||
        user.last_name?.toLowerCase().includes(value) ||
        user.email?.toLowerCase().includes(value),
    );

    setFilteredUsers(filtered);
  };

  return (
    <>
      <Helmet>
        <title>User Management</title>
      </Helmet>
      <div className="font-inter text-text flex w-full flex-col gap-y-4 p-4">
        <h2 className="font-sora text-2xl font-semibold">Manage Users</h2>
        <div className="top-toolbar flex justify-between">
          <div className="flex items-center gap-x-2">
            <IconButton
              icon={faTrash}
              variant="danger"
              className="h-full"
              onClick={handleDeleteUser}
            >
              Delete
            </IconButton>
            <p className="text-xl font-semibold">{`${userList.selectedUserIds.size}/${userList.allUsers?.length}`}</p>
          </div>

          <div className="flex gap-x-4">
            <input
              type="text"
              placeholder="Search here..."
              className="focus:border-secondary rounded-sm border border-gray-300 px-4 outline-none"
              onChange={(e) => handleUserSearch(e)}
            />
            <IconButton icon={faPlus}>Add New</IconButton>
          </div>
        </div>

        <div>
          <UserTable useUserList={userList} filteredUsers={filteredUsers} />
        </div>
      </div>
    </>
  );
}

export default UserManagementPage;
