import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle, FaLock, FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AccessDenied({ redirectTo = "/", userType = "user" }) {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate(redirectTo, { replace: true });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate, redirectTo]);

    const getRedirectMessage = () => {
        if (userType === "admin") {
            return "Redirecting to admin login...";
        }
        return "Redirecting to user login...";
    };

    const getIcon = () => {
        if (userType === "admin") {
            return <FaShieldAlt className="text-6xl text-primary mb-6" />;
        }
        return <FaLock className="text-6xl text-accent mb-6" />;
    };

    const getTitle = () => {
        if (userType === "admin") {
            return "Admin Access Denied";
        }
        return "Access Denied";
    };

    const getDescription = () => {
        if (userType === "admin") {
            return "You need admin privileges to access this page.";
        }
        return "You need to login first to access this page.";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background font-sans">
            <div className="relative w-full max-w-md">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl blur-3xl animate-pulse" />

                {/* Main Container */}
                <div className="relative glass-panel p-12 text-center animate-[scaleIn_0.5s_ease-out]">
                    {/* Warning Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500/30 rounded-full blur-2xl animate-pulse" />
                            <div className="relative p-6 rounded-full bg-red-500/20 border-2 border-red-500/40">
                                {getIcon()}
                            </div>
                        </div>
                    </div>

                    {/* Access Denied Title */}
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {getTitle()}
                    </h1>

                    {/* Description */}
                    <p className="text-text/70 text-lg mb-8 leading-relaxed">
                        {getDescription()}
                    </p>

                    {/* Countdown Timer */}
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500/40 mb-4">
                            <span className="text-3xl font-bold text-red-400">
                                {countdown}
                            </span>
                        </div>
                        <p className="text-text/60 text-sm">
                            {getRedirectMessage()}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-card/30 rounded-full h-2 mb-6">
                        <div
                            className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                            style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                        />
                    </div>

                    {/* Manual Redirect Button */}
                    <button
                        onClick={() => navigate(redirectTo, { replace: true })}
                        className="w-full btn-primary hover:scale-105 transition-transform duration-300"
                    >
                        <FaExclamationTriangle className="text-lg" />
                        <span>Go to Login Now</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AccessDenied;
