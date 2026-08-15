import { RouterProvider } from "react-router";
import { router } from "./routes";
import AuthProvider from "../auth/providers/AuthContext";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
