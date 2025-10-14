import { useEffect, useState } from "react";

// Custom hook to check authentication
export function useAuth(type = "user") {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (type === "admin") {
        const loggedInAdmin = localStorage.getItem("loggedInAdmin");
        const adminOtp = localStorage.getItem("AdminOtp");

        if (loggedInAdmin && adminOtp) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        const loggedInUser = localStorage.getItem("loggedInUser");
        const userOtp = localStorage.getItem("UserOtp");

        if (loggedInUser && userOtp) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [type]);

  return { isAuthenticated, isLoading };
}
