import { createBrowserRouter } from "react-router";
import LoginPage from "../auth/pages/LoginPage";
import SignupPage from "../auth/pages/SignupPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: LoginPage },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignupPage },
    ],
  },
]);
