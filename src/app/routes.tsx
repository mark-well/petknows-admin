import { createBrowserRouter } from "react-router";
import LoginPage from "../auth/pages/LoginPage";
import SignupPage from "../auth/pages/SignupPage";
import DashboardPage from "../features/dashboard/page/DashboardPage";
import protectedLoader from "./protectedLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: DashboardPage, loader: protectedLoader },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignupPage },
      { path: "dashboard", Component: DashboardPage, loader: protectedLoader },
    ],
  },
]);
