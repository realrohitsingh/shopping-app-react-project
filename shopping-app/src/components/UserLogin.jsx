import axios from "axios";
import { useEffect, useState } from "react";
import { FaLock, FaSignInAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserLogin() {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [pwd, setPwd] = useState("");
  let [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedUser");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  function val_login(e) {
    e.preventDefault();
    axios
      .get("http://localhost:1001/user")
      .then((res) => {
        const adminUser = res.data.find(
          (user) => user.email === email || user.U_name === email
        );
        if (adminUser) {
          if (adminUser.password === pwd) {
            toast.success("Login Successfull");
            if (rememberMe) {
              localStorage.setItem("rememberedUser", email);
            } else {
              localStorage.removeItem("rememberedUser");
            }
          } else {
            toast.error("Invalid password.");
          }
        } else {
          toast.error("No admin found with that email.");
        }
      })
      .catch((err) => {
        toast.error("Login failed. Could not connect to the server.");
        console.log(err);
      })
      .finally(() => {
        setEmail("");
        setPwd("");
      });
  }
  return (
    <div className="min-h-screen flex items-center justify-center font-sans">
      <div className="glass-panel w-full max-w-md p-10 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/40 before:to-white/10 before:pointer-events-none">
        <button
          type="button"
          className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center text-primary bg-white/40 border border-white/60 rounded-full hover:bg-primary hover:text-white transition z-10 shadow"
          onClick={handleBack}>
          &larr;
        </button>
        <form onSubmit={val_login} className="space-y-7 relative z-10">
          <h2 className="text-3xl font-extrabold text-primary text-center mb-6 drop-shadow-lg tracking-tight">
            User Login
          </h2>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="user-email">
              User Name or Email
            </label>
            <div className="relative">
              <input
                id="user-email"
                className="input-glass pl-10"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                placeholder="Enter User Name or Email"
                required
              />
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="user-password">
              Password
            </label>
            <div className="relative">
              <input
                id="user-password"
                className="input-glass pl-10"
                value={pwd}
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                type="password"
                placeholder="Enter Password"
                required
              />
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label
              htmlFor="remember"
              className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-primary"
              />
              <span className="text-muted">Remember Me</span>
            </label>
            <Link
              className="text-primary hover:underline"
              to="/user-forgot-pass">
              Forgot password?
            </Link>
          </div>
          <button className="w-full btn-primary flex items-center justify-center gap-2">
            <FaSignInAlt className="text-lg" /> Login
          </button>
          <div className="text-center mt-4">
            <Link
              className="text-accent hover:underline font-medium"
              to="/user-sign">
              New User? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
