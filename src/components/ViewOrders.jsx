import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBox,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaShoppingCart,
  FaSpinner,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ViewOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    const loggedInAdmin = localStorage.getItem("loggedInAdmin");
    if (!loggedInAdmin) {
      toast.error("Please login first");
      navigate("/admin-login");
      return;
    }
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const savedOrders = localStorage.getItem("userOrders");

      if (savedOrders) {
        const userOrders = JSON.parse(savedOrders);
        const transformedOrders = userOrders.map(order => ({
          id: order.id.toString(),
          customerName: order.orderData?.name || order.user?.U_name || "Unknown Customer",
          customerEmail: order.orderData?.email || order.user?.email || "No email",
          items: order.items.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount: order.total,
          status: order.status || "pending",
          orderDate: order.date,
          shippingAddress: order.orderData?.address || "No address",
        }));
        setOrders(transformedOrders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400/30";
      case "approved":
        return "text-green-400 bg-green-400/20 border-green-400/30";
      case "rejected":
        return "text-red-400 bg-red-400/20 border-red-400/30";
      case "shipped":
        return "text-blue-400 bg-blue-400/20 border-blue-400/30";
      case "delivered":
        return "text-emerald-400 bg-emerald-400/20 border-emerald-400/30";
      case "cancelled":
        return "text-red-400 bg-red-400/20 border-red-400/30";
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/30";
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const savedOrders = localStorage.getItem("userOrders");
    if (savedOrders) {
      const userOrders = JSON.parse(savedOrders);
      const updatedOrders = userOrders.map(order =>
        order.id.toString() === orderId
          ? { ...order, status: newStatus }
          : order
      );
      localStorage.setItem("userOrders", JSON.stringify(updatedOrders));

      if (newStatus === "approved" || newStatus === "delivered") {
        const orderToMove = userOrders.find(order => order.id.toString() === orderId);
        if (orderToMove) {
          const recentOrders = JSON.parse(localStorage.getItem("recentOrders") || "[]");
          const existingOrderIndex = recentOrders.findIndex(order => order.id === orderToMove.id);

          if (existingOrderIndex >= 0) {
            recentOrders[existingOrderIndex] = { ...orderToMove, status: newStatus };
          } else {
            recentOrders.push({ ...orderToMove, status: newStatus });
          }

          localStorage.setItem("recentOrders", JSON.stringify(recentOrders));

          window.dispatchEvent(new CustomEvent('orderUpdated'));
        }
      }

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );

      toast.success(`Order ${newStatus} successfully!`);
    }
  };

  const handleApproveOrder = (orderId) => {
    updateOrderStatus(orderId, "approved");
  };

  const handleRejectOrder = (orderId) => {
    updateOrderStatus(orderId, "rejected");
  };

  const handleDeliverOrder = (orderId) => {
    updateOrderStatus(orderId, "delivered");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return FaClock;
      case "shipped":
        return FaBox;
      case "delivered":
        return FaCheckCircle;
      case "cancelled":
        return FaTimes;
      default:
        return FaClock;
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      // Update the orders state
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);

      // Save the updated orders to localStorage
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      toast.success(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-panel p-8 text-center">
          <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
          <p className="text-text/70">Loading orders...</p>
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
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm text-text/70 hover:text-primary hover:border-primary/40 hover:bg-card/50 transition-all duration-300 group">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium">Back to Dashboard</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl animate-pulse" />
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/30 to-purple-600/30 border-2 border-primary/50 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                    <FaShoppingCart className="text-2xl text-primary drop-shadow-lg" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold text-white">
                    View Orders
                  </h1>
                  <p className="text-text/60">
                    Track and manage customer orders
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-text/60 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-white">{orders.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="glass-panel p-6 animate-[fadeIn_0.8s_ease-out]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-white">
              Recent Orders ({orders.length})
            </h2>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl animate-pulse" />
                <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-600/20 border-2 border-primary/30 flex items-center justify-center">
                  <FaShoppingCart className="text-4xl text-primary/70" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No Orders Yet
              </h3>
              <p className="text-text/60 mb-6">
                Orders will appear here when customers make purchases
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {orders.map((order, index) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <div
                    key={order.id}
                    className="glass-panel p-6 group animate-[slideUp_0.6s_ease-out] hover:scale-[1.03] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer border border-transparent hover:border-primary/30 relative overflow-hidden flex flex-col h-full"
                    style={{ animationDelay: `${index * 0.1}s` }}>
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Order Header */}
                    <div className="relative flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg animate-pulse" />
                          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-purple-600/30 border border-primary/50 flex items-center justify-center group-hover:border-primary/80 group-hover:shadow-lg group-hover:shadow-primary/30">
                            <FaUser className="text-lg text-primary group-hover:scale-110 transition-transform duration-300" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary group-hover:bg-clip-text transition-all duration-300">
                            Order #{order.id}
                          </h3>
                          <p className="text-text/50 text-xs">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border transition-all duration-300 ${getStatusColor(
                          order.status
                        )}`}>
                        <StatusIcon className="text-xs group-hover:rotate-12 transition-transform duration-300" />
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-4 p-3 rounded-lg bg-card/20 border border-border/20 group-hover:border-primary/20 transition-colors duration-300">
                      <p className="text-text/80 text-sm font-medium mb-1">
                        {order.customerName}
                      </p>
                      <p className="text-text/60 text-xs">
                        {order.customerEmail}
                      </p>
                    </div>

                    {/* Order Items Preview */}
                    <div className="flex-1 mb-4">
                      <h4 className="text-text/70 text-sm font-medium mb-3">
                        Order Items ({order.items.length})
                      </h4>
                      <div className="space-y-2 min-h-[60px]">
                        {order.items.slice(0, 2).map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center justify-between text-xs">
                            <span className="text-text/70 truncate flex-1 mr-2">
                              {item.name}
                            </span>
                            <span className="text-text/50">
                              x{item.quantity}
                            </span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-text/50 text-xs italic">
                            +{order.items.length - 2} more items
                          </p>
                        )}
                        {/* Add empty space if less than 2 items to maintain consistent height */}
                        {order.items.length === 1 && (
                          <div className="h-5"></div>
                        )}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="border-t border-border/30 pt-4 mb-4 group-hover:border-primary/20 transition-colors duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-text/60 text-sm">
                          Total Amount
                        </span>
                        <span className="text-xl font-bold text-primary group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      {order.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApproveOrder(order.id)}
                            className="flex-1 btn-success group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                            <FaCheckCircle className="text-sm group-hover:scale-110 transition-transform" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleRejectOrder(order.id)}
                            className="flex-1 btn-danger group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">
                            <FaTimes className="text-sm group-hover:scale-110 transition-transform" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}
                      {order.status === "approved" && (
                        <button
                          onClick={() => handleDeliverOrder(order.id)}
                          className="flex-1 btn-accent group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                          <FaBox className="text-sm group-hover:scale-110 transition-transform" />
                          <span>Mark Delivered</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="flex-1 btn-primary group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                        <FaEye className="text-sm group-hover:scale-110 transition-transform" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {showOrderDetails && selectedOrder && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-card border-2 border-border/40 rounded-2xl p-6 max-w-3xl w-full animate-[scaleIn_0.3s_ease-out] shadow-2xl relative">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl" />

              <div className="relative flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg animate-pulse" />
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-purple-600/30 border border-primary/50 flex items-center justify-center">
                      <FaShoppingCart className="text-lg text-primary" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Order #{selectedOrder.id} Details
                    </h2>
                    <p className="text-text/60 text-sm">Order Information</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="p-3 rounded-xl bg-card/50 border border-border/30 text-text/70 hover:text-white hover:border-red-400/40 hover:bg-red-500/10 hover:scale-110 transition-all duration-300 cursor-pointer group">
                  <FaTimes className="text-lg group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="relative space-y-4">
                {/* Customer Information */}
                <div className="bg-card/40 rounded-xl p-4 border border-border/30 hover:border-primary/20 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md" />
                      <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-purple-600/30 border border-primary/50 flex items-center justify-center">
                        <FaUser className="text-sm text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      Customer Information
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-text/90 flex items-center gap-2">
                      <span className="font-medium text-primary min-w-[60px]">
                        Name:
                      </span>
                      <span>{selectedOrder.customerName}</span>
                    </p>
                    <p className="text-text/90 flex items-center gap-2">
                      <span className="font-medium text-primary min-w-[60px]">
                        Email:
                      </span>
                      <span>{selectedOrder.customerEmail}</span>
                    </p>
                    <p className="text-text/90 flex items-start gap-2">
                      <span className="font-medium text-primary min-w-[60px] mt-1">
                        Address:
                      </span>
                      <span>{selectedOrder.shippingAddress}</span>
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-card/40 rounded-xl p-4 border border-border/30 hover:border-primary/20 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent/20 rounded-lg blur-md" />
                      <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-accent/30 to-cyan-600/30 border border-accent/50 flex items-center justify-center">
                        <FaBox className="text-sm text-accent" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      Order Items ({selectedOrder.items.length})
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-card/60 rounded-lg p-3 border border-border/20 hover:border-primary/20 transition-colors duration-300">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-white mb-1">
                              {item.name}
                            </p>
                            <p className="text-text/60 text-sm">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-primary font-bold text-lg">
                              ${item.price.toFixed(2)}
                            </p>
                            <p className="text-text/50 text-xs">per item</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-4 border border-primary/20">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-white">
                      Total Amount:
                    </span>
                    <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                      ${selectedOrder.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Status Update */}
                <div className="bg-card/40 rounded-xl p-4 border border-border/30 hover:border-primary/20 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-success/20 rounded-lg blur-md" />
                      <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-success/30 to-green-600/30 border border-success/50 flex items-center justify-center">
                        <FaCheckCircle className="text-sm text-success" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      Update Order Status
                    </h3>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {["pending", "shipped", "delivered", "cancelled"].map(
                      (status) => {
                        const StatusIcon = getStatusIcon(status);
                        return (
                          <button
                            key={status}
                            onClick={() => {
                              handleUpdateOrderStatus(selectedOrder.id, status);
                              setShowOrderDetails(false);
                            }}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 font-medium ${selectedOrder.status === status
                              ? getStatusColor(status) + " shadow-lg"
                              : "text-text/70 bg-card/50 border-border/30 hover:border-primary/40 hover:text-primary hover:bg-primary/10 hover:shadow-md"
                              }`}>
                            <StatusIcon className="text-sm hover:rotate-12 transition-transform duration-300" />
                            <span className="capitalize">{status}</span>
                          </button>
                        );
                      }
                    )}
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

export default ViewOrders;
