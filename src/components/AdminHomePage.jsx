import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
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
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const loggedInAdmin = localStorage.getItem("loggedInAdmin");
    if (loggedInAdmin) {
      setAdminData(JSON.parse(loggedInAdmin));
      fetchProductCount();
    } else {
      toast.error("Please login first");
      navigate("/admin-login");
    }

    // Listen for product updates to refresh product count
    const handleProductUpdate = () => {
      fetchProductCount();
    };

    window.addEventListener('productUpdated', handleProductUpdate);

    return () => {
      window.removeEventListener('productUpdated', handleProductUpdate);
    };
  }, [navigate]);

  const fetchProductCount = async () => {
    try {
      const response = await axios.get("http://localhost:1002/products");
      setProductCount((response.data || []).length);
    } catch (error) {
      console.error("Error fetching product count:", error);
      setProductCount(0);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInAdmin");
    toast.success("Logged out successfully");
    navigate("/admin-login");
  };

  const handleManageProducts = () => {
    navigate("/admin-homepage/manage-products");
  };

  const handleViewOrders = () => {
    navigate("/admin-homepage/view-orders");
  };

  const handleCustomerManagement = () => {
    navigate("/admin-homepage/customer-management");
  };

  const handleAnalytics = () => {
    navigate("/admin-homepage/analytics");
  };

  const stats = [
    {
      icon: FaShoppingCart,
      label: "Total Orders",
      value: "45",
      iconBg: "bg-gradient-to-br from-primary/20 to-purple-600/20 border-primary/30",
      iconColor: "text-primary"
    },
    {
      icon: FaDollarSign,
      label: "Revenue",
      value: "$22789.99",
      iconBg: "bg-gradient-to-br from-accent/20 to-cyan-600/20 border-accent/30",
      iconColor: "text-accent"
    },
    {
      icon: FaUsers,
      label: "Customers",
      value: "10",
      iconBg: "bg-gradient-to-br from-success/20 to-green-600/20 border-success/30",
      iconColor: "text-success"
    },
    {
      icon: FaBox,
      label: "Products",
      value: productCount.toString(),
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
      iconColor: "text-primary",
      onClick: handleManageProducts
    },
    {
      icon: FaShoppingCart,
      label: "View Orders",
      desc: "Track and fulfill orders",
      iconBg: "bg-gradient-to-br from-accent/20 to-cyan-600/20 border-accent/30",
      iconColor: "text-accent",
      onClick: handleViewOrders
    },
    {
      icon: FaUsers,
      label: "Customer Management",
      desc: "View and manage customers",
      iconBg: "bg-gradient-to-br from-success/20 to-green-600/20 border-success/30",
      iconColor: "text-success",
      onClick: handleCustomerManagement
    },
    {
      icon: FaChartLine,
      label: "Analytics",
      desc: "View sales and statistics",
      iconBg: "bg-gradient-to-br from-primary/20 to-purple-600/20 border-primary/30",
      iconColor: "text-primary",
      onClick: handleAnalytics
    },
  ];


  return (
    <div className="min-h-screen font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto mb-10">
        <div className="glass-panel p-8 animate-[slideDown_0.5s_ease-out] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl animate-pulse" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-purple-600/30 border-2 border-primary/50 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                  <FaUserShield className="text-4xl text-primary drop-shadow-lg" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                  Welcome back, <span className="text-primary">{adminData?.U_name || "Admin"}</span>!
                </h1>
                <p className="text-text/60 text-lg">
                  Here's your SmartShop analytics dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-secondary group">
                <FaCog className="text-lg group-hover:rotate-90 transition-transform duration-500" />
                <span>Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="btn-secondary hover:border-red-500/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group">
                <FaSignOutAlt className="text-lg group-hover:translate-x-0.5 transition-transform" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-panel p-7 hover:scale-105 transition-all duration-500 cursor-pointer group relative overflow-hidden animate-[slideUp_0.6s_ease-out]"
              style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="relative inline-block mb-5">
                  <div className={`absolute inset-0 blur-xl ${stat.iconColor} opacity-50 group-hover:opacity-70 transition-opacity`} />
                  <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-2xl border-2 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${stat.iconBg}`}>
                    <stat.icon className={`text-3xl ${stat.iconColor} drop-shadow-lg`} />
                  </div>
                </div>
                <p className="text-text/50 text-sm font-medium mb-2 uppercase tracking-wider">{stat.label}</p>
                <p className="text-4xl font-extrabold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-text/80 group-hover:bg-clip-text transition-all duration-300">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8 animate-[fadeIn_0.8s_ease-out]">
          <h2 className="text-3xl font-extrabold text-white">
            Quick Actions
          </h2>
          <div className="h-1 flex-1 max-w-32 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="feature-card cursor-pointer group animate-[slideUp_0.8s_ease-out] relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={action.onClick || undefined}>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex items-start gap-5">
                <div className="relative flex-shrink-0">
                  <div className={`absolute inset-0 blur-2xl ${action.iconColor} opacity-40 group-hover:opacity-60 transition-opacity`} />
                  <div className={`relative w-16 h-16 rounded-2xl border-2 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 ${action.iconBg}`}>
                    <action.icon className={`text-3xl ${action.iconColor} drop-shadow-lg`} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {action.label}
                  </h3>
                  <p className="text-text/60 text-base leading-relaxed">
                    {action.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Get Started</span>
                    <FaArrowRight className="text-sm" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="max-w-7xl mx-auto mt-16 text-center">
        <div className="glass-panel p-8 animate-[fadeIn_1s_ease-out] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
          <div className="relative">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="text-4xl">🚀</span>
              <h3 className="text-2xl font-extrabold text-white">Coming Soon</h3>
            </div>
            <p className="text-text/60 text-lg leading-relaxed max-w-2xl mx-auto">
              Product management, order tracking, customer analytics, and more powerful features to help you manage your store better!
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default AdminHomePage;
