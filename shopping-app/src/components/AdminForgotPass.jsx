import axios from "axios";
import { useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
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
    <div className="min-h-screen flex items-center justify-center font-sans">
      <div className="relative w-full max-w-md p-8 sm:p-10 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl ring-1 ring-white/10">
        <form onSubmit={handleRecovery} className="space-y-7 relative z-10">
          <h2 className="text-3xl font-extrabold text-white text-center mb-2 tracking-tight flex items-center justify-center gap-2">
            <FaKey className="text-primary" /> Recover Account
          </h2>
          <p className="text-center text-sm text-muted mb-4">
            Enter your email to recover your account
          </p>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="admin-forgot-email">
              <span className="flex items-center gap-2">
                <FaEnvelope className="text-primary" /> Email
              </span>
            </label>
            <div className="relative">
              <input
                id="admin-forgot-email"
                className="input-glass pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                required
              />
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
            </div>
          </div>

          {recoveredDetails && (
            <div className="bg-white/50 border border-white/60 rounded-md p-4 shadow-inner mt-4">
              <h4 className="font-semibold text-primary mb-2">
                Your Account Details:
              </h4>
              <p>
                <strong>Username:</strong> {recoveredDetails.U_name}
              </p>
              <p>
                <strong>Password:</strong> {recoveredDetails.password}
              </p>
            </div>
          )}

          <button
            className="w-full btn-primary flex items-center justify-center gap-2"
            type="submit">
            <FaKey className="text-lg" /> Recover Password
          </button>

          <div className="text-center mt-4">
            <Link
              className="text-primary hover:underline font-medium"
              to="/admin-login">
              &larr; Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminForgotPass;
