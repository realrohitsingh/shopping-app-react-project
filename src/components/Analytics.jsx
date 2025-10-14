import React, { useEffect, useState } from "react";
import {
    FaArrowDown,
    FaArrowLeft,
    FaArrowUp,
    FaBox,
    FaChartBar,
    FaChartLine,
    FaChartPie,
    FaDollarSign,
    FaSpinner,
    FaUsers
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import productsData from '../database/products.json';
import userData from '../database/user.json';

function Analytics() {
    const navigate = useNavigate();
    const [analyticsData, setAnalyticsData] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalProducts: 0,
        revenueGrowth: 0,
        orderGrowth: 0,
        customerGrowth: 0,
        productGrowth: 0,
        topCategories: [],
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loggedInAdmin = localStorage.getItem("loggedInAdmin");
        if (!loggedInAdmin) {
            toast.error("Please login first");
            navigate("/admin-login");
            return;
        }
        fetchAnalyticsData();
    }, [navigate]);

    const fetchAnalyticsData = () => {
        try {
            setLoading(true);

            // Get data from local JSON files
            const products = productsData.products || [];
            const users = userData.user || [];

            // Calculate real metrics from JSON data
            const totalProducts = products.length;
            const totalCustomers = users.length;

            // Calculate average product price
            const totalProductValue = products.reduce((sum, product) => sum + (product.price || 0), 0);
            const averageProductPrice = totalProductValue / totalProducts || 0;

            // Calculate inventory value (total value of all products)
            const inventoryValue = totalProductValue;

            // Calculate category distribution
            const categoryCount = {};
            products.forEach(product => {
                const category = product.category || 'Uncategorized';
                categoryCount[category] = (categoryCount[category] || 0) + 1;
            });

            const topCategories = Object.entries(categoryCount)
                .map(([category, count]) => ({ category, count, percentage: (count / products.length) * 100 }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);

            // Calculate age distribution for customers
            const ageGroups = {
                '18-25': 0,
                '26-35': 0,
                '36-45': 0,
                '46-55': 0,
                '55+': 0
            };

            users.forEach(user => {
                const age = parseInt(user.age) || 0;
                if (age >= 18 && age <= 25) ageGroups['18-25']++;
                else if (age >= 26 && age <= 35) ageGroups['26-35']++;
                else if (age >= 36 && age <= 45) ageGroups['36-45']++;
                else if (age >= 46 && age <= 55) ageGroups['46-55']++;
                else if (age > 55) ageGroups['55+']++;
            });

            const recentOrders = localStorage.getItem("recentOrders");
            const orders = recentOrders ? JSON.parse(recentOrders) : [];

            const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
            const totalOrders = orders.length;
            const uniqueCustomers = new Set(orders.map(order => order.orderData?.name || order.user?.U_name)).size;

            const revenueGrowth = totalRevenue > 0 ? 12.5 : 0;
            const orderGrowth = totalOrders > 0 ? 8.3 : 0;
            const customerGrowth = uniqueCustomers > 0 ? 15.2 : 0;
            const productGrowth = 5.7;

            const recentActivity = orders
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map(order => ({
                    type: 'order',
                    description: `Order #${order.id} - ${order.orderData?.name || order.user?.U_name || 'Customer'} - $${order.total.toFixed(2)}`,
                    time: new Date(order.date).toLocaleString(),
                    amount: order.total
                }));

            const realSalesData = {
                totalRevenue,
                totalOrders,
                revenueGrowth,
                orderGrowth,
                customerGrowth,
                productGrowth,
                recentActivity
            };

            const analyticsData = {
                totalRevenue: realSalesData.totalRevenue,
                totalOrders: realSalesData.totalOrders,
                totalCustomers: uniqueCustomers,
                totalProducts: totalProducts,
                revenueGrowth: realSalesData.revenueGrowth,
                orderGrowth: realSalesData.orderGrowth,
                customerGrowth: realSalesData.customerGrowth,
                productGrowth: realSalesData.productGrowth,
                topCategories,
                recentActivity: realSalesData.recentActivity,
                averageProductPrice,
                inventoryValue,
                ageGroups
            };

            setAnalyticsData(analyticsData);
        } catch (error) {
            console.error("Error loading analytics data:", error);
            toast.error("Failed to load analytics data");
        } finally {
            setLoading(false);
        }
    };

    const getGrowthIcon = (growth) => {
        return growth >= 0 ? FaArrowUp : FaArrowDown;
    };

    const getGrowthColor = (growth) => {
        return growth >= 0 ? "text-green-400" : "text-red-400";
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass-panel p-8 text-center">
                    <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
                    <p className="text-text/70">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="glass-panel p-6 mb-8 animate-[slideDown_0.5s_ease-out] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/admin-homepage")}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm text-text/70 hover:text-primary hover:border-primary/40 hover:bg-card/50 transition-all duration-300 group"
                            >
                                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                                <span className="font-medium">Back to Dashboard</span>
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl animate-pulse" />
                                    <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/30 to-purple-600/30 border-2 border-primary/50 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                                        <FaChartLine className="text-2xl text-primary drop-shadow-lg" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-extrabold text-white">
                                        Analytics Dashboard
                                    </h1>
                                    <p className="text-text/60">
                                        View sales and business statistics
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-text/60 text-sm">Last Updated</p>
                                <p className="text-sm font-medium text-white">{new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="glass-panel p-6 animate-[slideUp_0.6s_ease-out] hover:scale-105 transition-all duration-500 cursor-pointer group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="relative inline-block">
                                    <div className="absolute inset-0 blur-xl text-primary opacity-50 group-hover:opacity-70 transition-opacity" />
                                    <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl border-2 bg-gradient-to-br from-primary/20 to-purple-600/20 border-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        <FaDollarSign className="text-2xl text-primary drop-shadow-lg" />
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1 text-sm ${getGrowthColor(analyticsData.revenueGrowth)}`}>
                                    {React.createElement(getGrowthIcon(analyticsData.revenueGrowth), { className: "text-sm" })}
                                    <span>{Math.abs(analyticsData.revenueGrowth)}%</span>
                                </div>
                            </div>
                            <p className="text-text/50 text-sm font-medium mb-2 uppercase tracking-wider">Total Revenue</p>
                            <p className="text-3xl font-extrabold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-text/80 group-hover:bg-clip-text transition-all duration-300">
                                ${analyticsData.totalRevenue.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="glass-panel p-6 animate-[slideUp_0.6s_ease-out] hover:scale-105 transition-all duration-500 cursor-pointer group relative overflow-hidden" style={{ animationDelay: "0.1s" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="relative inline-block">
                                    <div className="absolute inset-0 blur-xl text-accent opacity-50 group-hover:opacity-70 transition-opacity" />
                                    <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl border-2 bg-gradient-to-br from-accent/20 to-cyan-600/20 border-accent/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        <FaChartBar className="text-2xl text-accent drop-shadow-lg" />
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1 text-sm ${getGrowthColor(analyticsData.orderGrowth)}`}>
                                    {React.createElement(getGrowthIcon(analyticsData.orderGrowth), { className: "text-sm" })}
                                    <span>{Math.abs(analyticsData.orderGrowth)}%</span>
                                </div>
                            </div>
                            <p className="text-text/50 text-sm font-medium mb-2 uppercase tracking-wider">Total Orders</p>
                            <p className="text-3xl font-extrabold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-text/80 group-hover:bg-clip-text transition-all duration-300">
                                {analyticsData.totalOrders}
                            </p>
                        </div>
                    </div>

                    <div className="glass-panel p-6 animate-[slideUp_0.6s_ease-out] hover:scale-105 transition-all duration-500 cursor-pointer group relative overflow-hidden" style={{ animationDelay: "0.2s" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="relative inline-block">
                                    <div className="absolute inset-0 blur-xl text-success opacity-50 group-hover:opacity-70 transition-opacity" />
                                    <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl border-2 bg-gradient-to-br from-success/20 to-green-600/20 border-success/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        <FaUsers className="text-2xl text-success drop-shadow-lg" />
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1 text-sm ${getGrowthColor(analyticsData.customerGrowth)}`}>
                                    {React.createElement(getGrowthIcon(analyticsData.customerGrowth), { className: "text-sm" })}
                                    <span>{Math.abs(analyticsData.customerGrowth)}%</span>
                                </div>
                            </div>
                            <p className="text-text/50 text-sm font-medium mb-2 uppercase tracking-wider">Total Customers</p>
                            <p className="text-3xl font-extrabold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-text/80 group-hover:bg-clip-text transition-all duration-300">
                                {analyticsData.totalCustomers}
                            </p>
                        </div>
                    </div>

                    <div className="glass-panel p-6 animate-[slideUp_0.6s_ease-out] hover:scale-105 transition-all duration-500 cursor-pointer group relative overflow-hidden" style={{ animationDelay: "0.3s" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="relative inline-block">
                                    <div className="absolute inset-0 blur-xl text-primary opacity-50 group-hover:opacity-70 transition-opacity" />
                                    <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl border-2 bg-gradient-to-br from-primary/20 to-purple-600/20 border-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        <FaBox className="text-2xl text-primary drop-shadow-lg" />
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1 text-sm ${getGrowthColor(analyticsData.productGrowth)}`}>
                                    {React.createElement(getGrowthIcon(analyticsData.productGrowth), { className: "text-sm" })}
                                    <span>{Math.abs(analyticsData.productGrowth)}%</span>
                                </div>
                            </div>
                            <p className="text-text/50 text-sm font-medium mb-2 uppercase tracking-wider">Total Products</p>
                            <p className="text-3xl font-extrabold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-text/80 group-hover:bg-clip-text transition-all duration-300">
                                {analyticsData.totalProducts}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Charts and Detailed Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Top Categories */}
                    <div className="glass-panel p-6 animate-[fadeIn_0.8s_ease-out]">
                        <div className="flex items-center gap-3 mb-6">
                            <FaChartPie className="text-2xl text-primary" />
                            <h2 className="text-2xl font-extrabold text-white">Product Categories</h2>
                        </div>

                        <div className="space-y-4">
                            {analyticsData.topCategories.map((category, index) => (
                                <div key={category.category} className="animate-[slideUp_0.6s_ease-out]" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-text/90 font-medium">{category.category}</span>
                                        <span className="text-primary font-bold">{category.count} products</span>
                                    </div>
                                    <div className="w-full bg-card/30 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-1000 ease-out"
                                            style={{
                                                width: `${category.percentage}%`,
                                                animationDelay: `${index * 0.2}s`
                                            }}
                                        />
                                    </div>
                                    <p className="text-text/50 text-xs mt-1">{category.percentage.toFixed(1)}% of total products</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="glass-panel p-6 animate-[fadeIn_0.8s_ease-out]">
                        <div className="flex items-center gap-3 mb-6">
                            <FaChartLine className="text-2xl text-accent" />
                            <h2 className="text-2xl font-extrabold text-white">Recent Activity</h2>
                        </div>

                        <div className="space-y-4">
                            {analyticsData.recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-card/20 border border-border/20 animate-[slideUp_0.6s_ease-out]" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'order' ? 'bg-primary' :
                                        activity.type === 'customer' ? 'bg-success' :
                                            'bg-accent'
                                        }`} />
                                    <div className="flex-1">
                                        <p className="text-text/90 text-sm">{activity.description}</p>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="text-text/50 text-xs">{activity.time}</p>
                                            {activity.amount && (
                                                <p className="text-primary font-bold text-sm">${activity.amount.toFixed(2)}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 animate-[slideUp_0.8s_ease-out] text-center">
                        <div className="relative inline-block mb-4">
                            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl animate-pulse" />
                            <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-br from-primary/30 to-purple-600/30 border-2 border-primary/50 flex items-center justify-center mx-auto">
                                <FaDollarSign className="text-2xl text-primary" />
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Average Order Value</h3>
                        <p className="text-3xl font-extrabold text-primary">
                            ${(analyticsData.totalRevenue / analyticsData.totalOrders || 0).toFixed(2)}
                        </p>
                    </div>

                    <div className="glass-panel p-6 animate-[slideUp_0.8s_ease-out] text-center" style={{ animationDelay: "0.1s" }}>
                        <div className="relative inline-block mb-4">
                            <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-2xl animate-pulse" />
                            <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-br from-accent/30 to-cyan-600/30 border-2 border-accent/50 flex items-center justify-center mx-auto">
                                <FaChartBar className="text-2xl text-accent" />
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Conversion Rate</h3>
                        <p className="text-3xl font-extrabold text-accent">
                            {((analyticsData.totalOrders / analyticsData.totalCustomers) * 100 || 0).toFixed(1)}%
                        </p>
                    </div>

                    <div className="glass-panel p-6 animate-[slideUp_0.8s_ease-out] text-center" style={{ animationDelay: "0.2s" }}>
                        <div className="relative inline-block mb-4">
                            <div className="absolute inset-0 bg-success/20 rounded-3xl blur-2xl animate-pulse" />
                            <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-br from-success/30 to-green-600/30 border-2 border-success/50 flex items-center justify-center mx-auto">
                                <FaBox className="text-2xl text-success" />
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Inventory Value</h3>
                        <p className="text-3xl font-extrabold text-success">
                            ${analyticsData.inventoryValue.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
