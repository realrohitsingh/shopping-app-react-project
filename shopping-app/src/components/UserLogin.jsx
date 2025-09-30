import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaLock, FaShoppingBag, FaSignInAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserLogin() {
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
      .get("http://localhost:1001/user")
      .then((res) => {
        const foundUser = res.data.find(
          (user) => user.email === email || user.U_name === email
        );
        if (foundUser) {
          if (foundUser.password === pwd) {
            toast.success("Login Successful! Welcome back.");
            if (rememberMe) {
              localStorage.setItem("rememberedUser", email);
            } else {
              localStorage.removeItem("rememberedUser");
            }
          } else {
            toast.error("Invalid password.");
          }
        } else {
          toast.error("No user found with that email.");
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
        {/* Back Button */}
        <button
          type="button"
          className="absolute -top-12 left-0 flex items-center gap-2 text-text/70 hover:text-accent transition-colors group"
          onClick={handleBack}>
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Login Card */}
        <div className="glass-panel p-8 sm:p-10 animate-[scaleIn_0.5s_ease-out]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-cyan-600/20 border border-accent/30 mb-4">
              <FaShoppingBag className="text-3xl text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome to SmartShop
            </h2>
            <p className="text-text/70">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={val_login} className="space-y-6">
            {/* Email/Username Input */}
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="user-email">
                Username or Email
              </label>
              <div className="relative">
                <input
                  id="user-email"
                  className="input-glass pl-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Enter your username or email"
                  required
                />
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/70" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="user-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="user-password"
                  className="input-glass pl-11"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  required
                />
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/70" />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label
                htmlFor="remember"
                className="flex items-center gap-2 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-card/50 text-accent focus:ring-2 focus:ring-accent/30 cursor-pointer"
                />
                <span className="text-text/70 group-hover:text-text transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                className="link-accent text-sm font-medium"
                to="/user-forgot-pass">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button type="submit" className="w-full btn-accent">
              <FaSignInAlt className="text-lg" />
              <span>Sign In</span>
            </button>

            {/* Register Link */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-text/70 text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  className="link-accent font-semibold"
                  to="/user-sign">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
