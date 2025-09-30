import axios from "axios";
import { useState } from "react";
import {
  FaBirthdayCake,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function UserSign() {
  let [User, SetUser] = useState({
    U_name: "",
    email: "",
    password: "",
    re_password: "",
    phone: "",
    age: "",
  });

  function handleChange(e) {
    let { name, value } = e.target;
    SetUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function register_admin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:1001/user", User)
      .then((res) => {
        console.log(res);
        toast.success("Registerd Successfull");
      })
      .catch((res) => {
        console.log(res);
        toast.error("Invalid Credentials");
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-sans">
      <div className="relative w-full max-w-md p-8 sm:p-10 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl ring-1 ring-white/10">
        <form onSubmit={register_admin} className="space-y-7 relative z-10">
          <h2 className="text-3xl font-extrabold text-white text-center mb-2 tracking-tight flex items-center justify-center gap-2">
            <FaUserPlus className="text-accent" /> User Sign-up
          </h2>
          <p className="text-center text-sm text-muted mb-4">
            Create your account
          </p>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="user-sign-username">
              Name
            </label>
            <div className="relative">
              <input
                id="user-sign-username"
                className="input-glass pl-10"
                type="text"
                name="U_name"
                value={User.U_name}
                onChange={handleChange}
                placeholder="Enter name of User"
                required
              />
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/60" />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="user-sign-email">
              Email
            </label>
            <div className="relative">
              <input
                id="user-sign-email"
                className="input-glass pl-10"
                type="email"
                name="email"
                value={User.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
              />
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/60" />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="user-sign-password">
              Password
            </label>
            <div className="relative">
              <input
                id="user-sign-password"
                className="input-glass pl-10"
                type="password"
                name="password"
                value={User.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
              />
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/60" />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="user-sign-repassword">
              Re-enter Password
            </label>
            <div className="relative">
              <input
                id="user-sign-repassword"
                className="input-glass pl-10"
                type="password"
                name="re_password"
                value={User.re_password}
                onChange={handleChange}
                placeholder="Enter re-enter Password"
                required
              />
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/60" />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="user-sign-phone">
              Phone
            </label>
            <div className="relative">
              <input
                id="user-sign-phone"
                className="input-glass pl-10"
                type="number"
                name="phone"
                value={User.phone}
                onChange={handleChange}
                placeholder="Enter phone of User"
                required
              />
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/60" />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="user-sign-age">
              Age
            </label>
            <div className="relative">
              <input
                id="user-sign-age"
                className="input-glass pl-10"
                type="number"
                name="age"
                value={User.age}
                onChange={handleChange}
                placeholder="Enter age of User"
                required
              />
              <FaBirthdayCake className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/60" />
            </div>
          </div>
          <button className="w-full btn-accent flex items-center justify-center gap-2">
            <FaUserPlus className="text-lg" /> Register
          </button>
          <div className="text-center mt-4">
            <Link
              className="text-primary hover:underline font-medium"
              to="/user-login">
              Already have an account? &larr; LogIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserSign;
