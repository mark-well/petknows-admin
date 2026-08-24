import { createBrowserRouter } from "react-router";
import LoginPage from "../auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/page/DashboardPage";
import protectedLoader from "./protectedLoader";
import NotFound from "../shared/pages/NotFound";
import PetManagementPage from "../features/pet-management/pages/PetManagementPage";
import AdminLayout from "../layouts/AdminLayout";
import UserManagementPage from "../features/user-management/pages/UserManagementPage";
import AnalyticsPage from "../features/analytics/pages/AnalyticsPage";
import PetDetailsPage from "../features/pet-management/pages/PetDetailsPage";
import UserDetailsPage from "../features/user-management/pages/UserDetailsPage";
import AdminManagementPage from "../features/admin-management/pages/AdminManagementPage";
import MaoManagementPage from "../features/mao-management/pages/MaoManagementPage";

export const router = createBrowserRouter([
  { path: "login", Component: LoginPage },
  {
    path: "/",
    Component: AdminLayout,
    loader: protectedLoader,
    children: [
      { index: true, Component: DashboardPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "pet-management", Component: PetManagementPage },
      { path: "pet-management/:petId", Component: PetDetailsPage },
      { path: "user-management", Component: UserManagementPage },
      { path: "user-management/:userId", Component: UserDetailsPage },
      { path: "admin-management", Component: AdminManagementPage },
      { path: "mao-management", Component: MaoManagementPage },
      { path: "analytics", Component: AnalyticsPage },
    ],
  },
  { path: "*", Component: NotFound },
]);
