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

function AdminSign() {
  let [Admin, SetAdmin] = useState({
    U_name: "",
    email: "",
    password: "",
    re_password: "",
    phone: "",
    age: "",
  });

  function handleChange(e) {
    let { name, value } = e.target;
    SetAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function register_admin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:1000/Admins", Admin)
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
      <div className="glass-panel w-full max-w-md p-10 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/40 before:to-white/10 before:pointer-events-none">
        <form
          action=""
          onSubmit={register_admin}
          className="space-y-7 relative z-10">
          <h2 className="text-3xl font-extrabold text-primary text-center mb-6 drop-shadow-lg tracking-tight flex items-center justify-center gap-2">
            <FaUserPlus className="text-primary" /> Admin Sign-up
          </h2>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="admin-sign-username">
              Name
            </label>
            <div className="relative">
              <input
                id="admin-sign-username"
                className="input-glass pl-10"
                type="text"
                name="U_name"
                value={Admin.U_name}
                onChange={handleChange}
                placeholder="Enter name of Admin"
                required
              />
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="admin-sign-email">
              Email
            </label>
            <div className="relative">
              <input
                id="admin-sign-email"
                className="input-glass pl-10"
                type="email"
                name="email"
                value={Admin.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
              />
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="admin-sign-password">
              Password
            </label>
            <div className="relative">
              <input
                id="admin-sign-password"
                className="input-glass pl-10"
                type="password"
                name="password"
                value={Admin.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
              />
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="admin-sign-repassword">
              Re-enter Password
            </label>
            <div className="relative">
              <input
                id="admin-sign-repassword"
                className="input-glass pl-10"
                type="password"
                name="re_password"
                value={Admin.re_password}
                onChange={handleChange}
                placeholder="Enter re-enter Password"
                required
              />
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="admin-sign-phone">
              Phone
            </label>
            <div className="relative">
              <input
                id="admin-sign-phone"
                className="input-glass pl-10"
                type="number"
                name="phone"
                value={Admin.phone}
                onChange={handleChange}
                placeholder="Enter phone of Admin"
                required
              />
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="block text-muted font-medium"
              htmlFor="admin-sign-age">
              Age
            </label>
            <div className="relative">
              <input
                id="admin-sign-age"
                className="input-glass pl-10"
                type="number"
                name="age"
                value={Admin.age}
                onChange={handleChange}
                placeholder="Enter age of Admin"
                required
              />
              <FaBirthdayCake className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
            </div>
          </div>
          <button className="w-full btn-primary flex items-center justify-center gap-2">
            <FaUserPlus className="text-lg" /> Register
          </button>
          <div className="text-center mt-4">
            <Link
              className="text-accent hover:underline font-medium"
              to="/admin-login">
              Already have an account? &larr; LogIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminSign;
