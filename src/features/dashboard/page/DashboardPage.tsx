import { useAuth } from "../../../auth/providers/useAuth";
import { Helmet } from "react-helmet-async";

function DashboardPage() {
  const { loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Helmet>
        <title>PetKnows Admin</title>
      </Helmet>
      <div className="w-full min-h-dvh">
        <h1>Dashboard</h1>
      </div>
    </>
  );
}

export default DashboardPage;
