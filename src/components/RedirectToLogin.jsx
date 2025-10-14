import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Immediate redirect component for unauthorized access
export function RedirectToUserLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        toast.error("Unauthorized access! Please login first.");
        navigate("/user-login", { replace: true });
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-white text-lg">Redirecting to login...</div>
        </div>
    );
}

export function RedirectToAdminLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        toast.error("Unauthorized access! Please login first.");
        navigate("/admin-login", { replace: true });
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-white text-lg">Redirecting to login...</div>
        </div>
    );
}
