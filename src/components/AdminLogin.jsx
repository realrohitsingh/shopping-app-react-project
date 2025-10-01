import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaLock, FaShieldAlt, FaSignInAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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
      .get("http://localhost:1000/Admins")
      .then((res) => {
        const adminUser = res.data.find(
          (user) => user.email === email || user.U_name === email
        );
        if (adminUser) {
          if (adminUser.password === pwd) {
            toast.success("Login Successful! Welcome Admin.");
            localStorage.setItem("loggedInAdmin", JSON.stringify(adminUser));
            navigate("/admin-homepage");

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
    <div className="min-h-screen flex items-center justify-center font-sans px-4 py-12">
      <div className="relative w-full max-w-md">
        <button
          type="button"
          className="absolute -top-14 left-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm text-text/70 hover:text-primary hover:border-primary/40 hover:bg-card/50 transition-all duration-300 group"
          onClick={handleBack}>
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back to Home</span>
        </button>
        <div className="glass-panel p-10 sm:p-12 animate-[scaleIn_0.5s_ease-out] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="relative text-center mb-10">
            <div className="relative inline-block mb-5">
              <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-2xl animate-pulse" />
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/25 to-purple-600/25 border-2 border-primary/40 shadow-[0_0_40px_rgba(139,92,246,0.4)]">
                <FaShieldAlt className="text-4xl text-primary drop-shadow-lg" />
              </div>
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-3">
              SmartShop <span className="text-primary">Admin</span>
            </h2>
            <p className="text-text/60 text-lg">
              Manage your store with ease
            </p>
          </div>
          <form onSubmit={val_login} className="space-y-6">
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="admin-email">
                Username or Email
              </label>
              <div className="relative">
                <input
                  id="admin-email"
                  className="input-glass pl-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Enter your username or email"
                  required
                />
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="admin-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  className="input-glass pl-11"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  required
                />
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label
                htmlFor="remember"
                className="flex items-center gap-2 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-card/50 text-primary focus:ring-2 focus:ring-primary/30 cursor-pointer"
                />
                <span className="text-text/70 group-hover:text-text transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                className="link-primary text-sm font-medium"
                to="/admin-forgot-pass">
                Forgot password?
              </Link>
            </div>
            <button type="submit" className="w-full btn-primary">
              <FaSignInAlt className="text-lg" />
              <span>Login</span>
            </button>
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-text/70 text-sm">
                Need an admin account?{" "}
                <Link
                  className="link-primary font-semibold"
                  to="/admin-sign">
                  Register Here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
