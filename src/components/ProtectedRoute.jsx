import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Protected Route for Admin OTP
export function ProtectedAdminOtp({ children }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Check if admin is logged in and OTP is generated
        const loggedInAdmin = localStorage.getItem("loggedInAdmin");
        const adminOtp = localStorage.getItem("AdminOtp");

        console.log("ProtectedAdminOtp - loggedInAdmin:", loggedInAdmin);
        console.log("ProtectedAdminOtp - adminOtp:", adminOtp);

        if (!loggedInAdmin) {
            console.log("No logged in admin found, redirecting to login");
            toast.error("Unauthorized access! Please login first.");
            navigate("/admin-login", { replace: true });
            return;
        }

        if (!adminOtp) {
            console.log("No OTP found, redirecting to login");
            toast.error("OTP session expired. Please login again.");
            navigate("/admin-login", { replace: true });
            return;
        }

        console.log("Access granted to AdminOtp");
        setIsAuthorized(true);
        setIsLoading(false);
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-white text-lg">Verifying access...</div>
            </div>
        );
    }

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-white text-lg">Access denied. Redirecting...</div>
            </div>
        );
    }

    return children;
}

// Protected Route for User OTP
export function ProtectedUserOtp({ children }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Check if user is logged in and OTP is generated
        const loggedInUser = localStorage.getItem("loggedInUser");
        const userOtp = localStorage.getItem("UserOtp");

        console.log("ProtectedUserOtp - loggedInUser:", loggedInUser);
        console.log("ProtectedUserOtp - userOtp:", userOtp);

        if (!loggedInUser) {
            console.log("No logged in user found, redirecting to login");
            toast.error("Unauthorized access! Please login first.");
            navigate("/user-login", { replace: true });
            return;
        }

        if (!userOtp) {
            console.log("No OTP found, redirecting to login");
            toast.error("OTP session expired. Please login again.");
            navigate("/user-login", { replace: true });
            return;
        }

        console.log("Access granted to UserOtp");
        setIsAuthorized(true);
        setIsLoading(false);
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-white text-lg">Verifying access...</div>
            </div>
        );
    }

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-white text-lg">Access denied. Redirecting...</div>
            </div>
        );
    }

    return children;
}
