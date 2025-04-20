// hooks/useProtectedRoute.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function useProtectedRoute(allowedRoles = []) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
//   const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.replace("/auth/login");
      return;
    }

    const parsed = JSON.parse(stored);
    const userRole = parsed?.role;

    // If allowedRoles is empty → allow all roles
    const hasAccess = allowedRoles.length === 0 || allowedRoles.includes(userRole);

    if (!hasAccess) {
      router.replace("/unauthorized");
      return;
    }

    // setUser(parsed);
    setAuthorized(true);
    setLoading(false);
  }, [allowedRoles, router]);

  return { authorized, loading };
}
