import React from "react";
import { FaHome } from "react-icons/fa";

function AdminHomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center font-sans">
      <div className="relative w-full max-w-2xl p-10 sm:p-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl ring-1 ring-white/10">
        <div className="relative z-10 flex flex-col items-center text-center">
          <FaHome className="text-primary text-5xl mb-4 drop-shadow" />
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-muted text-lg">
            Manage your store, view analytics, and more.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="card-product">
              <div className="card-title">Orders</div>
              <div className="card-meta">Track and fulfill customer orders</div>
            </div>
            <div className="card-product">
              <div className="card-title">Inventory</div>
              <div className="card-meta">Manage products and stock levels</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
