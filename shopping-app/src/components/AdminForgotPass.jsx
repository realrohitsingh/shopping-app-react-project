import axios from "axios";
import { useState } from "react";
import { FaArrowLeft, FaCheckCircle, FaEnvelope, FaKey, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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

    axios
      .get("http://localhost:1000/Admins")
      .then((res) => {
        const adminUser = res.data.find((user) => user.email === email);

        if (adminUser) {
          setRecoveredDetails({
            U_name: adminUser.U_name,
            password: adminUser.password,
          });
          toast.success("Account details found!");
        } else {
          toast.error("No account found with that email address.");
        }
      })
      .catch((err) => {
        toast.error("Could not connect to the server.");
        console.error(err);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-sans px-4 py-12">
      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/admin-login"
          className="absolute -top-12 left-0 flex items-center gap-2 text-text/70 hover:text-primary transition-colors group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Login</span>
        </Link>

        {/* Recovery Card */}
        <div className="glass-panel p-8 sm:p-10 animate-[scaleIn_0.5s_ease-out]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/30 mb-4">
              <FaKey className="text-3xl text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              SmartShop Admin Recovery
            </h2>
            <p className="text-text/70">
              Enter your admin email to recover account access
            </p>
          </div>

          {/* Form */}
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

            {/* Recovered Details */}
            {recoveredDetails && (
              <div className="bg-gradient-to-br from-success/20 to-success/10 border border-success/30 rounded-xl p-5 animate-[slideUp_0.4s_ease-out]">
                <div className="flex items-center gap-2 mb-3">
                  <FaCheckCircle className="text-success text-xl" />
                  <h4 className="font-bold text-white">Account Found!</h4>
                </div>
                <div className="space-y-2 text-text/90">
                  <p className="flex justify-between">
                    <span className="font-medium">Username:</span>
                    <span className="text-white font-semibold">{recoveredDetails.U_name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Password:</span>
                    <span className="text-white font-mono font-semibold">{recoveredDetails.password}</span>
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-success/30">
                  <Link
                    to="/admin-login"
                    className="flex items-center justify-center gap-2 text-success hover:text-success/80 font-semibold transition-colors">
                    <FaShieldAlt />
                    <span>Go to Admin Login</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="w-full btn-primary">
              <FaKey className="text-lg" />
              <span>Recover Account</span>
            </button>

            {/* Back Link */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-text/70 text-sm">
                Remember your password?{" "}
                <Link
                  className="link-primary font-semibold"
                  to="/admin-login">
                  Sign In
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
