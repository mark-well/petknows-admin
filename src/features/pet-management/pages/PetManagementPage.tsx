import { Helmet } from "react-helmet-async";

function PetManagementPage() {
  return (
    <>
      <Helmet>
        <title>Pet Management</title>
      </Helmet>
      <div className="w-full min-h-dvh">
        <h1>Pet Management</h1>
      </div>
    </>
  );
}

export default PetManagementPage;
