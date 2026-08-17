import { Outlet } from "react-router";
import Header from "../shared/components/Header";
import Sidebar from "../shared/components/Sidebar";

function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
