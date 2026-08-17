import { Helmet } from "react-helmet-async";

function UserManagementPage() {
  return (
    <>
      <Helmet>
        <title>User Management</title>
      </Helmet>
      <div className="w-full min-h-dvh">
        <h1>User Management</h1>
      </div>
    </>
  );
}

export default UserManagementPage;
