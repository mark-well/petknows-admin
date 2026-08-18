import { Outlet } from "react-router";
import Header from "../shared/components/Header";
import Sidebar from "../shared/components/Sidebar";

function AdminLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
