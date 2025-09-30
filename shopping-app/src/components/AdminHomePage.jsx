import React from "react";
import { FaHome } from "react-icons/fa";

function AdminHomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center font-sans">
      <div className="glass-panel w-full max-w-lg p-12 flex flex-col items-center">
        <div className="relative z-10 flex flex-col items-center">
          <FaHome className="text-primary text-5xl mb-4 drop-shadow" />
          <h1 className="text-3xl font-extrabold text-primary text-center mb-2 drop-shadow-lg tracking-tight">
            Welcome to ADMINHOMEPAGE
          </h1>
          <p className="text-muted text-center text-lg">
            Manage your store, view analytics, and more.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
