import React, { useState } from 'react';
import { FaArrowLeft, FaKey, FaShieldAlt, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import AccessDenied from './AccessDenied';

function UserOtp() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");

    // IMMEDIATE SECURITY CHECK - NO RENDERING IF NOT AUTHORIZED
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userOtp = localStorage.getItem("UserOtp");

    if (!loggedInUser || !userOtp || loggedInUser === 'null' || userOtp === 'null') {
        localStorage.removeItem("UserOtp");
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("userCart");
        localStorage.removeItem("userWishlist");
        toast.error("Unauthorized access! Please login first.");
        return <AccessDenied redirectTo="/user-login" userType="user" />;
    }

    const num = localStorage.getItem("UserOtp");

    const handleBack = () => {
        navigate("/user-login");
    };

    function checkOtp(e) {
        e.preventDefault()
        if (num === otp) {
            toast.success("Login Successful")
            navigate("/user-homepage")
        }
        else {
            toast.error("Invalid OTP. Please try again.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center font-sans px-4 py-12">
            <div className="relative w-full max-w-md">
                <button
                    type="button"
                    className="absolute -top-14 left-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm text-text/70 hover:text-accent hover:border-accent/40 hover:bg-card/50 transition-all duration-300 group"
                    onClick={handleBack}>
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="font-medium">Back to Login</span>
                </button>

                <div className="glass-panel p-10 sm:p-12 animate-[scaleIn_0.5s_ease-out] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />

                    <div className="relative text-center mb-10">
                        <div className="relative inline-block mb-5">
                            <div className="absolute inset-0 bg-accent/30 rounded-3xl blur-2xl animate-pulse" />
                            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-accent/25 to-cyan-600/25 border-2 border-accent/40 shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                                <FaShieldAlt className="text-4xl text-accent drop-shadow-lg" />
                            </div>
                        </div>
                        <h2 className="text-4xl font-extrabold text-white mb-3">
                            Enter your <span className="text-accent">OTP</span>
                        </h2>
                    </div>

                    <form onSubmit={checkOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label
                                className="block text-text/90 font-medium text-sm"
                                htmlFor="otp-input">
                                One-Time Password
                            </label>
                            <div className="relative">
                                <input
                                    id="otp-input"
                                    className="input-glass pl-11"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    type="text"
                                    placeholder="Enter your OTP"
                                    required
                                    maxLength="6"
                                />
                                <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/70" />
                            </div>
                        </div>

                        <button type="submit" className="w-full btn-accent">
                            <FaSignInAlt className="text-lg" />
                            <span>Verify & Login</span>
                        </button>

                        <div className="text-center pt-4 border-t border-border/50">
                            <p className="text-text/70 text-sm">
                                Didn't receive the OTP?{" "}
                                <button
                                    type="button"
                                    className="link-accent font-semibold hover:text-accent/80 transition-colors"
                                    onClick={() => {
                                        const newOtp = Math.round(Math.random() * 10000);
                                        localStorage.setItem("UserOtp", newOtp);
                                        toast.info("New OTP generated");
                                    }}>
                                    Resend OTP
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserOtp
