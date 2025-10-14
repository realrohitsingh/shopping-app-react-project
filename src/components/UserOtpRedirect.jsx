import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserOtpRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("UserOtpRedirect - Immediate redirect");
        console.log("UserOtpRedirect - Current localStorage:");
        console.log("loggedInUser:", localStorage.getItem("loggedInUser"));
        console.log("UserOtp:", localStorage.getItem("UserOtp"));

        toast.error("Unauthorized access! Please login first.");
        // Clear any existing data
        localStorage.removeItem("UserOtp");
        localStorage.removeItem("loggedInUser");
        navigate("/user-login", { replace: true });
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-white text-lg">Access denied. Redirecting...</div>
        </div>
    );
}

export default UserOtpRedirect;
