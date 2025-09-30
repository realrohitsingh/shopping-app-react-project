import axios from "axios";
import { useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function UserForgotPass() {
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
      .get("http://localhost:1001/user")
      .then((res) => {
        const userAccount = res.data.find((user) => user.email === email);

        if (userAccount) {
          setRecoveredDetails({
            U_name: userAccount.U_name,
            password: userAccount.password,
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
      <div className="glass-panel w-full max-w-md p-10 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/40 before:to-white/10 before:pointer-events-none">
        <form onSubmit={handleRecovery} className="space-y-7 relative z-10">
          <h2 className="text-3xl font-extrabold text-accent text-center mb-6 drop-shadow-lg tracking-tight flex items-center justify-center gap-2">
            <FaKey className="text-accent" /> Recover Account
          </h2>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="user-forgot-email">
              <span className="flex items-center gap-2">
                <FaEnvelope className="text-accent" /> Email
              </span>
            </label>
            <div className="relative">
              <input
                id="user-forgot-email"
                className="input-glass pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                required
              />
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/60" />
            </div>
          </div>

          {recoveredDetails && (
            <div className="bg-white/50 border border-white/60 rounded-md p-4 shadow-inner mt-4">
              <h4 className="font-semibold text-accent mb-2">
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
            className="w-full btn-accent flex items-center justify-center gap-2"
            type="submit">
            <FaKey className="text-lg" /> Recover Password
          </button>

          <div className="text-center mt-4">
            <Link
              className="text-primary hover:underline font-medium"
              to="/user-login">
              &larr; Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForgotPass;
