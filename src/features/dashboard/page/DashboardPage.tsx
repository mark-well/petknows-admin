import { useNavigate } from "react-router";
import { useAuth } from "../../../auth/providers/useAuth";
import { Helmet } from "react-helmet-async";

function DashboardPage() {
  const { signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Helmet>
        <title>PetKnows Admin</title>
      </Helmet>
      <div>
        <div>Dashboard Page</div>
        <div>This is protected</div>
        <button onClick={handleSignout}>Log Out</button>
      </div>
    </>
  );
}

export default DashboardPage;
