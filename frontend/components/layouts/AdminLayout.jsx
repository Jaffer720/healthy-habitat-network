import Sidebar from "./Sidebar"; // your admin sidebar
import useProtectedRoute from "../../hooks/useProtectedRoute";

import { adminRoutes } from "../../utils/routes"; // your admin routes

export default function AdminLayout({ children }) {
  const { loading, authorized } = useProtectedRoute(["admin"]);
  if (loading || !authorized) return null;

  return (
    <div className="py-0.5 flex items-start justify-start gap-2">
      <Sidebar routes={adminRoutes} />
      <main className=" p-4 w-full">{children}</main>
    </div>
  );
}
