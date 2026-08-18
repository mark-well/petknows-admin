import { useAuth } from "../../../auth/providers/useAuth";
import { Helmet } from "react-helmet-async";
import UserCard from "../components/UserCard";
import StatCard from "../components/StatCard";
import { useQuery } from "@tanstack/react-query";
import {
  getTotalPetCount,
  getTotalPetCountFromMao,
} from "../../pet-management/services";
import { getTotalAdmins, getTotalUsers } from "../../user-profile/services";

function DashboardPage() {
  const { loading, userProfile } = useAuth();

  const { data: totalPetsCount, isPending: totalPetsPending } = useQuery({
    queryKey: ["totalPets", userProfile?.id],
    queryFn: getTotalPetCount,
  });

  const { data: totalPetsCountMao, isPending: totalPetsMaoPending } = useQuery({
    queryKey: ["totalPetsAtMao", userProfile?.id],
    queryFn: () => getTotalPetCountFromMao(userProfile?.admin_at ?? null),
  });

  const { data: totalUsers, isPending: totalUsersPending } = useQuery({
    queryKey: ["totalUsers", userProfile?.id],
    queryFn: getTotalUsers,
  });

  const { data: totalAdmins, isPending: totalAdminsPending } = useQuery({
    queryKey: ["totalAdmins", userProfile?.id],
    queryFn: getTotalAdmins,
  });

  if (loading || !userProfile) return <div>Loading...</div>;
  return (
    <>
      <Helmet>
        <title>PetKnows Admin</title>
      </Helmet>
      <div className="font-inter text-text flex w-full flex-col gap-y-4 p-4">
        <UserCard userProfile={userProfile} />
        <h2 className="font-sora text-2xl font-semibold">Dashboard</h2>
        <div className="flex w-full gap-4">
          <StatCard
            title="Total Pets"
            value={
              totalPetsMaoPending ? "Loading..." : (totalPetsCountMao ?? 0)
            }
          />
          <StatCard
            title="Total Pets (system)"
            value={totalPetsPending ? "Loading..." : (totalPetsCount ?? 0)}
          />
          <StatCard
            title="Users"
            value={totalUsersPending ? "Loading..." : (totalUsers ?? 0)}
          />
          <StatCard
            title="Admin"
            value={totalAdminsPending ? "Loading..." : (totalAdmins ?? 0)}
          />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
