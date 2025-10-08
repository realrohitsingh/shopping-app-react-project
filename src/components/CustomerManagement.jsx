import React, { useEffect, useState } from "react";
import {
    FaArrowLeft,
    FaEnvelope,
    FaEye,
    FaPhone,
    FaSearch,
    FaSpinner,
    FaTimes,
    FaUser,
    FaUserShield,
    FaUsers
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userData from '../database/user.json';

function CustomerManagement() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showCustomerDetails, setShowCustomerDetails] = useState(false);

    useEffect(() => {
        const loggedInAdmin = localStorage.getItem("loggedInAdmin");
        if (!loggedInAdmin) {
            toast.error("Please login first");
            navigate("/admin-login");
            return;
        }
        fetchCustomers();
    }, [navigate]);

    const fetchCustomers = () => {
        try {
            setLoading(true);
            setCustomers(userData.user || []);
        } catch (error) {
            console.error("Error loading customers:", error);
            toast.error("Failed to load customers");
        } finally {
            setLoading(false);
        }
    };

    const filteredCustomers = customers.filter(customer =>
        customer.U_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );

    const handleViewCustomer = (customer) => {
        setSelectedCustomer(customer);
        setShowCustomerDetails(true);
    };

    const formatDate = () => {
        // Since we don't have registration dates in the current data, we'll use a placeholder
        return "Registered recently";
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass-panel p-8 text-center">
                    <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
                    <p className="text-text/70">Loading customers...</p>
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
                                        <FaUsers className="text-2xl text-primary drop-shadow-lg" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-extrabold text-white">
                                        Customer Management
                                    </h1>
                                    <p className="text-text/60">
                                        View and manage customer accounts
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-text/60 text-sm">Total Customers</p>
                                <p className="text-2xl font-bold text-white">{customers.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="glass-panel p-6 mb-8 animate-[fadeIn_0.6s_ease-out]">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70 text-lg" />
                        <input
                            type="text"
                            placeholder="Search customers by name, email, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-glass pl-12 w-full"
                        />
                    </div>
                </div>

                {/* Customers List */}
                <div className="glass-panel p-6 animate-[fadeIn_0.8s_ease-out]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-extrabold text-white">
                            Customer List ({filteredCustomers.length})
                        </h2>
                    </div>

                    {filteredCustomers.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="relative inline-block mb-6">
                                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl animate-pulse" />
                                <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-600/20 border-2 border-primary/30 flex items-center justify-center">
                                    <FaUsers className="text-4xl text-primary/70" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {searchTerm ? "No Customers Found" : "No Customers Yet"}
                            </h3>
                            <p className="text-text/60 mb-6">
                                {searchTerm
                                    ? "Try adjusting your search criteria"
                                    : "Customers will appear here when they register"
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCustomers.map((customer, index) => (
                                <div
                                    key={customer.id}
                                    className="feature-card group animate-[slideUp_0.6s_ease-out] hover:scale-[1.03] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse" />
                                            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-purple-600/30 border-2 border-primary/50 flex items-center justify-center">
                                                <FaUser className="text-2xl text-primary" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-1">
                                                {customer.U_name}
                                            </h3>
                                            <p className="text-text/60 text-sm mb-2">
                                                Customer ID: {customer.id}
                                            </p>
                                            <p className="text-text/50 text-xs">
                                                {formatDate(customer.registrationDate)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-3 text-text/70">
                                            <FaEnvelope className="text-sm text-primary/70" />
                                            <span className="text-sm truncate">{customer.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-text/70">
                                            <FaPhone className="text-sm text-primary/70" />
                                            <span className="text-sm">{customer.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-text/70">
                                            <FaUserShield className="text-sm text-primary/70" />
                                            <span className="text-sm">Age: {customer.age}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleViewCustomer(customer)}
                                        className="w-full btn-primary group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 mt-auto"
                                    >
                                        <FaEye className="text-sm group-hover:scale-110 transition-transform" />
                                        <span>View Details</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Customer Details Modal */}
                {showCustomerDetails && selectedCustomer && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="glass-panel p-6 max-w-lg w-full animate-[scaleIn_0.3s_ease-out]">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">
                                    Customer Details
                                </h2>
                                <button
                                    onClick={() => setShowCustomerDetails(false)}
                                    className="p-2 rounded-lg bg-card/30 border border-border/30 text-text/70 hover:text-white hover:border-primary/40 transition-all duration-300"
                                >
                                    <FaTimes className="text-lg" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Customer Avatar */}
                                <div className="text-center">
                                    <div className="relative inline-block mb-4">
                                        <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-2xl animate-pulse" />
                                        <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/30 to-purple-600/30 border-2 border-primary/50 flex items-center justify-center mx-auto">
                                            <FaUser className="text-3xl text-primary" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1">
                                        {selectedCustomer.U_name}
                                    </h3>
                                    <p className="text-text/60">Customer ID: {selectedCustomer.id}</p>
                                </div>

                                {/* Customer Information */}
                                <div className="space-y-4">
                                    <div className="bg-card/30 rounded-lg p-4 border border-border/30">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FaEnvelope className="text-primary" />
                                            <span className="font-medium text-white">Email Address</span>
                                        </div>
                                        <p className="text-text/90">{selectedCustomer.email}</p>
                                    </div>

                                    <div className="bg-card/30 rounded-lg p-4 border border-border/30">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FaPhone className="text-primary" />
                                            <span className="font-medium text-white">Phone Number</span>
                                        </div>
                                        <p className="text-text/90">{selectedCustomer.phone}</p>
                                    </div>

                                    <div className="bg-card/30 rounded-lg p-4 border border-border/30">
                                        <div className="flex items-center gap-3 mb-2">
                                            <FaUserShield className="text-primary" />
                                            <span className="font-medium text-white">Age</span>
                                        </div>
                                        <p className="text-text/90">{selectedCustomer.age} years old</p>
                                    </div>
                                </div>

                                {/* Account Status */}
                                <div className="bg-card/30 rounded-lg p-4 border border-border/30">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-white">Account Status</span>
                                        <span className="px-3 py-1 rounded-lg bg-green-400/20 text-green-400 border border-green-400/30 text-sm font-medium">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomerManagement;
