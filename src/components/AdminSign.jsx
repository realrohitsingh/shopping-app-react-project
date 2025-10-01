import axios from "axios";
import { useState } from "react";
import {
  FaArrowLeft,
  FaBirthdayCake,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaShieldAlt,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminSign() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    U_name: "",
    email: "",
    password: "",
    re_password: "",
    phone: "",
    age: "",
  });

  const handleBack = () => {
    navigate("/admin-login");
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function register_admin(e) {
    e.preventDefault();

    // Validate password match
    if (admin.password !== admin.re_password) {
      toast.error("Passwords do not match!");
      return;
    }

    axios
      .post("http://localhost:1000/Admins", admin)
      .then((res) => {
        console.log(res);
        toast.success("Registration Successful! You can now login.");
        navigate("/admin-login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Registration failed. Please try again.");
      });
  }

  return (
    <div className="min-h-screen font-sans px-4 py-16 md:py-20">
      <div className="relative w-full max-w-md mx-auto">
        <button
          type="button"
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm text-text/70 hover:text-primary hover:border-primary/40 hover:bg-card/50 transition-all duration-300 group"
          onClick={handleBack}>
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back to Login</span>
        </button>
        <div className="glass-panel p-8 sm:p-10 animate-[scaleIn_0.5s_ease-out] relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-2xl animate-pulse" />
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/25 to-purple-600/25 border-2 border-primary/40 shadow-[0_0_40px_rgba(139,92,246,0.4)]">
                <FaShieldAlt className="text-4xl text-primary drop-shadow-lg" />
              </div>
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-3">
              SmartShop <span className="text-primary">Admin Setup</span>
            </h2>
            <p className="text-text/60 text-base">
              Create your admin account to manage SmartShop
            </p>
          </div>
          <form onSubmit={register_admin} className="space-y-5">
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="admin-sign-username">
                Username
              </label>
              <div className="relative">
                <input
                  id="admin-sign-username"
                  className="input-glass pl-11"
                  type="text"
                  name="U_name"
                  value={admin.U_name}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                />
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="admin-sign-email">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="admin-sign-email"
                  className="input-glass pl-11"
                  type="email"
                  name="email"
                  value={admin.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="admin-sign-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-sign-password"
                  className="input-glass pl-11"
                  type="password"
                  name="password"
                  value={admin.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  minLength={6}
                />
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="admin-sign-repassword">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="admin-sign-repassword"
                  className="input-glass pl-11"
                  type="password"
                  name="re_password"
                  value={admin.re_password}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="admin-sign-phone">
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="admin-sign-phone"
                  className="input-glass pl-11"
                  type="tel"
                  name="phone"
                  value={admin.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  required
                />
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="admin-sign-age">
                Age
              </label>
              <div className="relative">
                <input
                  id="admin-sign-age"
                  className="input-glass pl-11"
                  type="number"
                  name="age"
                  value={admin.age}
                  onChange={handleChange}
                  placeholder="Your age"
                  required
                  min="18"
                  max="120"
                />
                <FaBirthdayCake className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" />
              </div>
            </div>
            <button type="submit" className="w-full btn-primary mt-6">
              <FaUserPlus className="text-lg" />
              <span>Create Admin Account</span>
            </button>
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-text/70 text-sm">
                Already have an account?{" "}
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

export default AdminSign;
