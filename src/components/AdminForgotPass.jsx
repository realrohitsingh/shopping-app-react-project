import { useState } from "react";
import { FaArrowLeft, FaCheckCircle, FaEnvelope, FaKey, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// 1. REMOVED: "axios" is no longer needed.
// 2. ADDED: Import the admin data directly from your JSON file.
import adminData from '../database/admin.json';

function AdminForgotPass() {
  const [email, setEmail] = useState("");
  const [recoveredDetails, setRecoveredDetails] = useState(null);

  function handleRecovery(e) {
    e.preventDefault();
    setRecoveredDetails(null);

    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }

    // Check in JSON file first
    let adminUser = adminData.Admins.find((user) => user.email === email);

    // If not found in JSON, check in localStorage (registered admins)
    if (!adminUser) {
      const registeredAdmins = JSON.parse(localStorage.getItem('registeredAdmins') || '[]');
      adminUser = registeredAdmins.find((user) => user.email === email);
    }

    if (adminUser) {
      setRecoveredDetails({
        U_name: adminUser.U_name,
        password: adminUser.password,
      });
      toast.success("Account details found!");
    } else {
      toast.error("No account found with that email address.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-sans px-4 py-12">
      <div className="relative w-full max-w-md">
        <Link
          to="/admin-login"
          className="absolute -top-14 left-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm text-text/70 hover:text-primary hover:border-primary/40 hover:bg-card/50 transition-all duration-300 group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back to Login</span>
        </Link>
        <div className="glass-panel p-10 sm:p-12 animate-[scaleIn_0.5s_ease-out] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="relative text-center mb-10">
            <div className="relative inline-block mb-5">
              <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-2xl animate-pulse" />
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/25 to-purple-600/25 border-2 border-primary/40 shadow-[0_0_40px_rgba(139,92,246,0.4)]">
                <FaKey className="text-4xl text-primary drop-shadow-lg" />
              </div>
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-3">
              <span className="text-primary">Admin</span> Recovery
            </h2>
            <p className="text-text/60 text-lg">
              Enter your admin email to recover account access
            </p>
          </div>
          <form onSubmit={handleRecovery} className="space-y-6">
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="admin-forgot-email">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="admin-forgot-email"
                  className="input-glass pl-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your registered email"
                  required
                />
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" />
              </div>
            </div>
            {recoveredDetails && (
              <div className="relative bg-gradient-to-br from-success/25 to-success/10 border-2 border-success/40 rounded-2xl p-6 animate-[slideUp_0.4s_ease-out] shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                <div className="absolute top-0 right-0 w-20 h-20 bg-success/20 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-5">
                    <FaCheckCircle className="text-success text-2xl drop-shadow-lg" />
                    <h4 className="text-xl font-extrabold text-white">Account Found!</h4>
                  </div>
                  <div className="space-y-4 text-text/90 mb-5">
                    <div className="flex justify-between items-center p-3 bg-card/30 rounded-xl backdrop-blur-sm">
                      <span className="font-semibold text-text/70">Username:</span>
                      <span className="text-white font-bold text-lg">{recoveredDetails.U_name}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-card/30 rounded-xl backdrop-blur-sm">
                      <span className="font-semibold text-text/70">Password:</span>
                      <span className="text-white font-mono font-bold text-lg">{recoveredDetails.password}</span>
                    </div>
                  </div>
                  <Link
                    to="/admin-login"
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-success/20 border border-success/40 rounded-xl text-success hover:bg-success/30 hover:border-success/60 font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <FaShieldAlt className="text-lg" />
                    <span>Go to Admin Login</span>
                  </Link>
                </div>
              </div>
            )}
            <button type="submit" className="w-full btn-primary">
              <FaKey className="text-lg" />
              <span>Recover Account</span>
            </button>
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-text/70 text-sm">
                Remember your password?{" "}
                <Link
                  className="link-primary font-semibold"
                  to="/admin-login">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminForgotPass;