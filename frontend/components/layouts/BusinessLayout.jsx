import Sidebar from "./Sidebar"; // your admin sidebar
import useProtectedRoute from "../../hooks/useProtectedRoute";

import { businessRoutes } from "../../utils/routes"; // your admin routes

export default function BusinessLayout({ children }) {
  const { loading, authorized } = useProtectedRoute(["business"]);
  if (loading || !authorized) return null;

  return (
    <div className="py-0.5 flex items-start justify-start gap-2">
      <Sidebar routes={businessRoutes} />
      <main className=" p-4 w-full">{children}</main>
    </div>
  );
}
