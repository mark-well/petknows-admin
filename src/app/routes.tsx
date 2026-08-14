import { createBrowserRouter } from "react-router";
import LoginPage from "../auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/page/DashboardPage";
import protectedLoader from "./protectedLoader";
import NotFound from "../shared/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: DashboardPage, loader: protectedLoader },
      { path: "*", Component: NotFound },
      { path: "login", Component: LoginPage },
      { path: "dashboard", Component: DashboardPage, loader: protectedLoader },
    ],
  },
]);
