import { Helmet } from "react-helmet-async";
import UserTable from "../components/UserTable";
import IconButton from "../../../shared/components/IconButton";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function UserManagementPage() {
  return (
    <>
      <Helmet>
        <title>User Management</title>
      </Helmet>
      <div className="ont-inter text-text flex w-full flex-col gap-y-4 p-4">
        <h2 className="font-sora text-2xl font-semibold">Manage Users</h2>
        <div className="top-toolbar flex justify-between">
          <IconButton icon={faTrash} variant="danger">
            Delete
          </IconButton>
          <div className="flex gap-x-4">
            <input
              type="text"
              placeholder="Search here..."
              className="focus:border-secondary rounded-sm border border-gray-300 px-4 outline-none"
            />
            <IconButton icon={faPlus}>Add New</IconButton>
          </div>
        </div>

        <div>
          <UserTable />
        </div>
      </div>
    </>
  );
}

export default UserManagementPage;
