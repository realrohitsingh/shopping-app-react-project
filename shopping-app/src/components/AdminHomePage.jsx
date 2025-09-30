import React, { useEffect, useState } from "react";
import {
  FaBox,
  FaChartLine,
  FaCog,
  FaDollarSign,
  FaShoppingCart,
  FaSignOutAlt,
  FaUsers,
  FaUserShield
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminHomePage() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const loggedInAdmin = localStorage.getItem("loggedInAdmin");
    if (loggedInAdmin) {
      setAdminData(JSON.parse(loggedInAdmin));
    } else {
      toast.error("Please login first");
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInAdmin");
    toast.success("Logged out successfully");
    navigate("/admin-login");
  };

  const stats = [
    {
      icon: FaShoppingCart,
      label: "Total Orders",
      value: "156",
      iconBg: "bg-gradient-to-br from-primary/20 to-purple-600/20 border-primary/30",
      iconColor: "text-primary"
    },
    {
      icon: FaDollarSign,
      label: "Revenue",
      value: "$12,450",
      iconBg: "bg-gradient-to-br from-accent/20 to-cyan-600/20 border-accent/30",
      iconColor: "text-accent"
    },
    {
      icon: FaUsers,
      label: "Customers",
      value: "1,234",
      iconBg: "bg-gradient-to-br from-success/20 to-green-600/20 border-success/30",
      iconColor: "text-success"
    },
    {
      icon: FaBox,
      label: "Products",
      value: "89",
      iconBg: "bg-gradient-to-br from-primary/20 to-purple-600/20 border-primary/30",
      iconColor: "text-primary"
    },
  ];

  const quickActions = [
    {
      icon: FaBox,
      label: "Manage Products",
      desc: "Add, edit, or remove products",
      iconBg: "bg-gradient-to-br from-primary/20 to-purple-600/20 border-primary/30",
      iconColor: "text-primary"
    },
    {
      icon: FaShoppingCart,
      label: "View Orders",
      desc: "Track and fulfill orders",
      iconBg: "bg-gradient-to-br from-accent/20 to-cyan-600/20 border-accent/30",
      iconColor: "text-accent"
    },
    {
      icon: FaUsers,
      label: "Customer Management",
      desc: "View and manage customers",
      iconBg: "bg-gradient-to-br from-success/20 to-green-600/20 border-success/30",
      iconColor: "text-success"
    },
    {
      icon: FaChartLine,
      label: "Analytics",
      desc: "View sales and statistics",
      iconBg: "bg-gradient-to-br from-primary/20 to-purple-600/20 border-primary/30",
      iconColor: "text-primary"
    },
  ];

  return (
    <div className="min-h-screen font-sans p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="glass-panel p-6 animate-[slideDown_0.5s_ease-out]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/30 flex items-center justify-center">
                <FaUserShield className="text-3xl text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Welcome back, {adminData?.U_name || "Admin"}!
                </h1>
                <p className="text-text/70 mt-1">
                  Here's your SmartShop analytics dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-secondary">
                <FaCog className="text-lg" />
                <span>Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="btn-secondary hover:border-red-500/50 hover:text-red-400 transition-colors">
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-[slideUp_0.6s_ease-out]">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-panel p-6 hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-4 group-hover:scale-110 transition-transform ${stat.iconBg}`}>
                <stat.icon className={`text-2xl ${stat.iconColor}`} />
              </div>
              <p className="text-text/70 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6 animate-[fadeIn_0.8s_ease-out]">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-[slideUp_0.8s_ease-out]">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="feature-card cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform ${action.iconBg}`}>
                  <action.icon className={`text-2xl ${action.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {action.label}
                  </h3>
                  <p className="text-text/70">
                    {action.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <div className="glass-panel p-6 animate-[fadeIn_1s_ease-out]">
          <p className="text-text/70">
            🚀 <strong className="text-white">Coming Soon:</strong> Product management, order tracking, customer analytics, and more!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
