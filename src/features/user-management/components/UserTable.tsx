import { useNavigate } from "react-router";
import Checkbox from "../../../shared/components/Checkbox";
import useUsersList from "../hooks/userUsersList";

interface Props {
  useUserList: ReturnType<typeof useUsersList>;
}

function UserTable({ useUserList }: Props) {
  const {
    allUsers,
    usersLoading,
    selectedUserIds,
    allSelected,
    toggleUserSelection,
    toggleSelectAll,
  } = useUserList;
  const navigate = useNavigate();

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="w-full rounded-sm bg-gray-200">
            <th className="flex gap-2 px-4 py-2 text-left">
              <Checkbox
                checked={allSelected}
                partial={selectedUserIds.size > 0}
                onChange={toggleSelectAll}
              />
              ID
            </th>
            <th className="text-left">First Name</th>
            <th className="text-left">Last Name</th>
            <th className="text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {usersLoading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            allUsers?.map((user) => (
              <tr
                onClick={() => {
                  navigate(`/user-management/${user.public_id}`);
                }}
                key={user.id}
                className={`${user.role === "admin" ? "bg-yellow-100 hover:bg-yellow-200" : user.role === "super_admin" ? "bg-red-100 hover:bg-red-200" : ""} cursor-pointer border-b border-gray-300 transition-colors duration-75 hover:bg-gray-100`}
              >
                <td className={`flex gap-2 px-4 py-1`}>
                  <div onClick={(e) => e.stopPropagation()}>
                    {user.role !== "super_admin" && (
                      <Checkbox
                        checked={selectedUserIds.has(user.id)}
                        onChange={(checked) =>
                          toggleUserSelection(user.id, checked)
                        }
                      />
                    )}
                  </div>
                  {user.public_id}
                </td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default UserTable;
