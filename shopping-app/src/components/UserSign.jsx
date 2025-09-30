import axios from "axios";
import { useState } from "react";
import {
  FaArrowLeft,
  FaBirthdayCake,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaShoppingBag,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserSign() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    U_name: "",
    email: "",
    password: "",
    re_password: "",
    phone: "",
    age: "",
  });

  const handleBack = () => {
    navigate("/user-login");
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function register_user(e) {
    e.preventDefault();

    // Validate password match
    if (user.password !== user.re_password) {
      toast.error("Passwords do not match!");
      return;
    }

    axios
      .post("http://localhost:1001/user", user)
      .then((res) => {
        console.log(res);
        toast.success("Registration Successful! You can now login.");
        navigate("/user-login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Registration failed. Please try again.");
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
          <span className="font-medium">Back to Login</span>
        </button>

        {/* Registration Card */}
        <div className="glass-panel p-8 sm:p-10 animate-[scaleIn_0.5s_ease-out] max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-cyan-600/20 border border-accent/30 mb-4">
              <FaShoppingBag className="text-3xl text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Join SmartShop
            </h2>
            <p className="text-text/70">
              Create your account and start shopping smarter
            </p>
          </div>

          {/* Form */}
          <form onSubmit={register_user} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="user-sign-username">
                Username
              </label>
              <div className="relative">
                <input
                  id="user-sign-username"
                  className="input-glass pl-11"
                  type="text"
                  name="U_name"
                  value={user.U_name}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                />
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/70" />
              </div>
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="user-sign-email">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="user-sign-email"
                  className="input-glass pl-11"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/70" />
              </div>
            </div>
            {/* Password */}
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="user-sign-password">
                Password
              </label>
              <div className="relative">
                <input
                  id="user-sign-password"
                  className="input-glass pl-11"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  minLength={6}
                />
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/70" />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="user-sign-repassword">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="user-sign-repassword"
                  className="input-glass pl-11"
                  type="password"
                  name="re_password"
                  value={user.re_password}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/70" />
              </div>
            </div>
            {/* Phone */}
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="user-sign-phone">
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="user-sign-phone"
                  className="input-glass pl-11"
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  required
                />
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/70" />
              </div>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label
                className="block text-text/90 font-medium text-sm"
                htmlFor="user-sign-age">
                Age
              </label>
              <div className="relative">
                <input
                  id="user-sign-age"
                  className="input-glass pl-11"
                  type="number"
                  name="age"
                  value={user.age}
                  onChange={handleChange}
                  placeholder="Your age"
                  required
                  min="13"
                  max="120"
                />
                <FaBirthdayCake className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/70" />
              </div>
            </div>
            {/* Submit Button */}
            <button type="submit" className="w-full btn-accent mt-6">
              <FaUserPlus className="text-lg" />
              <span>Create Account</span>
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-text/70 text-sm">
                Already have an account?{" "}
                <Link
                  className="link-accent font-semibold"
                  to="/user-login">
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

export default UserSign;
