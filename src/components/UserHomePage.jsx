import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    FaBox,
    FaCartPlus,
    FaCheckCircle,
    FaCreditCard,
    FaEye,
    FaHeart,
    FaMinus,
    FaPlus,
    FaSearch,
    FaShoppingBag,
    FaShoppingCart,
    FaSignOutAlt,
    FaStar,
    FaTimes,
    FaTrash,
    FaUser
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AccessDenied from './AccessDenied';

function UserHomePage() {
    const navigate = useNavigate();

    // IMMEDIATE SECURITY CHECK - NO RENDERING IF NOT AUTHORIZED
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userOtp = localStorage.getItem("UserOtp");

    if (!loggedInUser || !userOtp || loggedInUser === 'null' || userOtp === 'null') {
        localStorage.removeItem("UserOtp");
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("userCart");
        localStorage.removeItem("userWishlist");
        toast.error("Unauthorized access! Please login first.");
        return <AccessDenied redirectTo="/user-login" userType="user" />;
    }

    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showWishlist, setShowWishlist] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [userOrders, setUserOrders] = useState([]);
    const [orderData, setOrderData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        paymentMethod: "credit-card"
    });

    useEffect(() => {
        setUserData(JSON.parse(loggedInUser));
        fetchProducts();
        loadCart();
        loadWishlist();
        loadUserOrders();
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:1002/products");
            setProducts(response.data || []);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const loadCart = () => {
        const savedCart = localStorage.getItem("userCart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    };

    const saveCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("userCart", JSON.stringify(newCart));
    };

    const loadWishlist = () => {
        const savedWishlist = localStorage.getItem("userWishlist");
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    };

    const saveWishlist = (newWishlist) => {
        setWishlist(newWishlist);
        localStorage.setItem("userWishlist", JSON.stringify(newWishlist));
    };

    const loadUserOrders = () => {
        const savedOrders = localStorage.getItem("userOrders");
        if (savedOrders) {
            const orders = JSON.parse(savedOrders);
            // Filter orders for current user
            const userOrders = orders.filter(order =>
                order.user && order.user.U_name === userData?.U_name
            );
            setUserOrders(userOrders);
        }
    };

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            saveCart(updatedCart);
            toast.success("Quantity updated in cart");
        } else {
            const newItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
                stock: product.stock
            };
            saveCart([...cart, newItem]);
            toast.success("Product added to cart");
        }
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        const updatedCart = cart.map(item =>
            item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        );
        saveCart(updatedCart);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        saveCart(updatedCart);
        toast.success("Product removed from cart");
    };

    const toggleWishlist = (product) => {
        const isInWishlist = wishlist.find(item => item.id === product.id);

        if (isInWishlist) {
            // Remove from wishlist
            const updatedWishlist = wishlist.filter(item => item.id !== product.id);
            saveWishlist(updatedWishlist);
            toast.success("Removed from wishlist");
        } else {
            // Add to wishlist
            const wishlistItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                stock: product.stock
            };
            saveWishlist([...wishlist, wishlistItem]);
            toast.success("Added to wishlist");
        }
    };

    const isInWishlist = (productId) => {
        return wishlist.find(item => item.id === productId);
    };

    const openProductDetails = (product) => {
        setSelectedProduct(product);
        setShowProductDetails(true);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartItemCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getWishlistCount = () => {
        return wishlist.length;
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["all", ...new Set(products.map(product => product.category))];

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("userCart");
        localStorage.removeItem("userWishlist");
        toast.success("Logged out successfully");
        navigate("/user-login");
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }
        // Clear previous order data
        setOrderData({
            name: "",
            email: "",
            phone: "",
            address: "",
            paymentMethod: "credit-card"
        });
        setShowCheckout(true);
    };

    const placeOrder = () => {
        if (!orderData.name || !orderData.email || !orderData.phone || !orderData.address) {
            toast.error("Please fill in all required fields");
            return;
        }

        const order = {
            id: Date.now(),
            user: userData,
            items: cart,
            total: getCartTotal(),
            orderData,
            status: "pending",
            date: new Date().toISOString()
        };

        // Save order to localStorage (in real app, this would go to backend)
        const existingOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");
        existingOrders.push(order);
        localStorage.setItem("userOrders", JSON.stringify(existingOrders));

        // Clear cart
        setCart([]);
        localStorage.removeItem("userCart");

        // Refresh orders
        loadUserOrders();

        toast.success("Order placed successfully!");
        setShowCheckout(false);
        setShowCart(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-white text-lg">Loading products...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="glass-panel border-b border-border/30 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/25 to-cyan-600/25 border-2 border-accent/40 flex items-center justify-center">
                                <FaShoppingBag className="text-accent text-xl" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">SmartShop</h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="input-glass pl-10 pr-4 w-64"
                                />
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/70" />
                            </div>

                            <button
                                onClick={() => setShowWishlist(true)}
                                className="relative p-3 rounded-xl bg-card/50 border border-border/30 hover:bg-card/70 transition-all duration-300 group"
                            >
                                <FaHeart className="text-accent text-xl" />
                                {getWishlistCount() > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                                        {getWishlistCount()}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => setShowOrders(true)}
                                className="relative p-3 rounded-xl bg-card/50 border border-border/30 hover:bg-card/70 transition-all duration-300 group"
                            >
                                <FaBox className="text-accent text-xl" />
                                {userOrders.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                                        {userOrders.length}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => setShowCart(true)}
                                className="relative p-3 rounded-xl bg-card/50 border border-border/30 hover:bg-card/70 transition-all duration-300 group"
                            >
                                <FaShoppingCart className="text-accent text-xl" />
                                {getCartItemCount() > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                                        {getCartItemCount()}
                                    </span>
                                )}
                            </button>

                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/30 border border-border/30">
                                <FaUser className="text-accent" />
                                <span className="text-white font-medium">{userData?.U_name}</span>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="p-3 rounded-xl bg-card/50 border border-border/30 hover:bg-card/70 transition-all duration-300 group"
                            >
                                <FaSignOutAlt className="text-accent text-xl group-hover:text-accent/80" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Category Filter */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-white font-medium">Categories:</span>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-xl border transition-all duration-300 ${selectedCategory === category
                                    ? "bg-accent/20 border-accent/40 text-accent"
                                    : "bg-card/30 border-border/30 text-text/70 hover:bg-card/50"
                                    }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="card-product animate-[slideUp_0.6s_ease-out]"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="relative overflow-hidden rounded-2xl mb-4">
                                <img
                                    src={product.image || "/api/placeholder/300/200"}
                                    alt={product.name}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-3 right-3">
                                    <button
                                        onClick={() => toggleWishlist(product)}
                                        className={`p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/30 hover:bg-card transition-all duration-300 ${isInWishlist(product.id) ? 'text-red-500' : 'text-accent'
                                            }`}
                                    >
                                        <FaHeart className={`${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                                    </button>
                                </div>
                                {product.stock <= 5 && (
                                    <div className="absolute top-3 left-3 bg-accent/90 text-white px-2 py-1 rounded-lg text-xs font-medium">
                                        Low Stock
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <h3 className="card-title mb-2">{product.name}</h3>
                                <p className="card-meta mb-3 line-clamp-2">{product.description}</p>

                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-bold text-accent">${product.price}</span>
                                    <div className="flex items-center gap-1">
                                        <FaStar className="text-yellow-400 text-sm" />
                                        <span className="text-text/70 text-sm">4.5</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => addToCart(product)}
                                        disabled={product.stock === 0}
                                        className="flex-1 btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FaCartPlus className="text-lg" />
                                        <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
                                    </button>
                                    <button
                                        onClick={() => openProductDetails(product)}
                                        className="p-3 rounded-xl bg-card/50 border border-border/30 hover:bg-card/70 transition-all duration-300"
                                    >
                                        <FaEye className="text-accent" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <FaBox className="text-6xl text-text/30 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                        <p className="text-text/60">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </main>

            {/* Cart Sidebar */}
            {showCart && (
                <div className="fixed inset-0 z-50 flex items-end justify-end">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCart(false)} />
                    <div className="relative w-full max-w-md h-full bg-card border-l border-border/30 backdrop-blur-xl">
                        <div className="p-6 border-b border-border/30">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
                                <button
                                    onClick={() => setShowCart(false)}
                                    className="p-2 rounded-xl hover:bg-card/50 transition-all duration-300"
                                >
                                    <FaTimes className="text-text/70" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-12">
                                    <FaShoppingCart className="text-4xl text-text/30 mx-auto mb-4" />
                                    <p className="text-text/60">Your cart is empty</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/30">
                                            <img
                                                src={item.image || "/api/placeholder/80/80"}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h4 className="text-white font-medium">{item.name}</h4>
                                                <p className="text-accent font-semibold">${item.price}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 rounded-lg hover:bg-card/50 transition-all duration-300"
                                                    >
                                                        <FaMinus className="text-accent text-sm" />
                                                    </button>
                                                    <span className="text-white font-medium px-3">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 rounded-lg hover:bg-card/50 transition-all duration-300"
                                                    >
                                                        <FaPlus className="text-accent text-sm" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 rounded-lg hover:bg-card/50 transition-all duration-300"
                                            >
                                                <FaTrash className="text-red-400" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-border/30">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-semibold text-white">Total:</span>
                                    <span className="text-2xl font-bold text-accent">${getCartTotal().toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full btn-accent"
                                >
                                    <FaCreditCard className="text-lg" />
                                    <span>Checkout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Wishlist Sidebar */}
            {showWishlist && (
                <div className="fixed inset-0 z-50 flex items-end justify-end">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowWishlist(false)} />
                    <div className="relative w-full max-w-md h-full bg-card border-l border-border backdrop-blur-xl">
                        <div className="p-6 border-b border-border/30">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FaHeart className="text-red-500 text-xl" />
                                    <h2 className="text-xl font-bold text-white">Wishlist</h2>
                                </div>
                                <button
                                    onClick={() => setShowWishlist(false)}
                                    className="p-2 rounded-xl hover:bg-card/50 transition-all duration-300"
                                >
                                    <FaTimes className="text-text/70" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {wishlist.length === 0 ? (
                                <div className="text-center py-12">
                                    <FaHeart className="text-4xl text-text/30 mx-auto mb-4" />
                                    <p className="text-text/60">Your wishlist is empty</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {wishlist.map(item => (
                                        <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/30">
                                            <img
                                                src={item.image || "/api/placeholder/80/80"}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h4 className="text-white font-medium">{item.name}</h4>
                                                <p className="text-accent font-semibold">${item.price}</p>
                                                <p className="text-text/60 text-sm">{item.category}</p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => {
                                                        const product = products.find(p => p.id === item.id);
                                                        if (product) {
                                                            addToCart(product);
                                                        }
                                                    }}
                                                    className="p-2 rounded-lg bg-accent/20 border border-accent/30 hover:bg-accent/30 transition-all duration-300"
                                                >
                                                    <FaCartPlus className="text-accent text-sm" />
                                                </button>
                                                <button
                                                    onClick={() => toggleWishlist(item)}
                                                    className="p-2 rounded-lg hover:bg-card/50 transition-all duration-300"
                                                >
                                                    <FaTrash className="text-red-400" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {wishlist.length > 0 && (
                            <div className="p-6 border-t border-border/30">
                                <div className="text-center">
                                    <p className="text-text/60 text-sm mb-4">
                                        {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist
                                    </p>
                                    <button
                                        onClick={() => setShowWishlist(false)}
                                        className="w-full btn-accent"
                                    >
                                        <FaHeart className="text-lg" />
                                        <span>Continue Shopping</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Orders Sidebar */}
            {showOrders && (
                <div className="fixed inset-0 z-50 flex items-end justify-end">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowOrders(false)} />
                    <div className="relative w-full max-w-2xl h-full bg-card border-l border-border backdrop-blur-xl">
                        <div className="p-6 border-b border-border/30">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FaBox className="text-accent text-xl" />
                                    <h2 className="text-xl font-bold text-white">My Orders</h2>
                                </div>
                                <button
                                    onClick={() => setShowOrders(false)}
                                    className="p-2 rounded-xl hover:bg-card/50 transition-all duration-300"
                                >
                                    <FaTimes className="text-text/70" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {userOrders.length === 0 ? (
                                <div className="text-center py-12">
                                    <FaBox className="text-4xl text-text/30 mx-auto mb-4" />
                                    <p className="text-text/60">No orders yet</p>
                                    <p className="text-text/40 text-sm mt-2">Start shopping to see your orders here</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {userOrders.map(order => (
                                        <div key={order.id} className="p-6 rounded-xl bg-card/30 border border-border/30">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">Order #{order.id}</h3>
                                                    <p className="text-text/60 text-sm">
                                                        {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                                <div className={`px-3 py-1 rounded-lg text-sm font-medium ${order.status === 'approved' ? 'bg-green-500/20 text-green-400 border border-green-500/40' :
                                                    order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                                                        order.status === 'rejected' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                                                            'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                                                    }`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </div>
                                            </div>

                                            <div className="space-y-3 mb-4">
                                                {order.items.map(item => (
                                                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-card/50">
                                                        <img
                                                            src={item.image || "/api/placeholder/60/60"}
                                                            alt={item.name}
                                                            className="w-12 h-12 object-cover rounded-lg"
                                                        />
                                                        <div className="flex-1">
                                                            <h4 className="text-white font-medium">{item.name}</h4>
                                                            <p className="text-text/60 text-sm">Qty: {item.quantity} × ${item.price}</p>
                                                        </div>
                                                        <span className="text-accent font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-border/30">
                                                <div>
                                                    <p className="text-text/60 text-sm">Payment: {order.orderData.paymentMethod}</p>
                                                    <p className="text-text/60 text-sm">Address: {order.orderData.address}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-accent">${order.total.toFixed(2)}</p>
                                                    <p className="text-text/60 text-sm">Total Amount</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {userOrders.length > 0 && (
                            <div className="p-6 border-t border-border/30">
                                <div className="text-center">
                                    <p className="text-text/60 text-sm mb-4">
                                        {userOrders.length} order{userOrders.length !== 1 ? 's' : ''} found
                                    </p>
                                    <button
                                        onClick={() => setShowOrders(false)}
                                        className="w-full btn-accent"
                                    >
                                        <FaBox className="text-lg" />
                                        <span>Continue Shopping</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Checkout Modal */}
            {showCheckout && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowCheckout(false)} />
                    <div className="relative w-full max-w-md bg-card border border-border rounded-2xl p-8 mx-4 animate-[scaleIn_0.3s_ease-out] shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/25 to-cyan-600/25 border-2 border-accent/40 flex items-center justify-center">
                                    <FaCreditCard className="text-accent text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Checkout</h2>
                            </div>
                            <button
                                onClick={() => setShowCheckout(false)}
                                className="p-3 rounded-xl bg-card/50 border border-border hover:bg-card/70 transition-all duration-300 group"
                            >
                                <FaTimes className="text-text/70 group-hover:text-white" />
                            </button>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); placeOrder(); }} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-text/90 font-medium text-sm">Full Name</label>
                                <input
                                    type="text"
                                    value={orderData.name}
                                    onChange={(e) => setOrderData({ ...orderData, name: e.target.value })}
                                    className="input-glass"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-text/90 font-medium text-sm">Email</label>
                                <input
                                    type="email"
                                    value={orderData.email}
                                    onChange={(e) => setOrderData({ ...orderData, email: e.target.value })}
                                    className="input-glass"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-text/90 font-medium text-sm">Phone</label>
                                <input
                                    type="tel"
                                    value={orderData.phone}
                                    onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                                    className="input-glass"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-text/90 font-medium text-sm">Address</label>
                                <textarea
                                    value={orderData.address}
                                    onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                                    className="input-glass"
                                    rows="3"
                                    placeholder="Enter your delivery address"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-text/90 font-medium text-sm">Payment Method</label>
                                <select
                                    value={orderData.paymentMethod}
                                    onChange={(e) => setOrderData({ ...orderData, paymentMethod: e.target.value })}
                                    className="input-glass bg-card text-white border-border focus:border-accent focus:ring-2 focus:ring-accent/30"
                                >
                                    <option value="credit-card" className="bg-card text-white">💳 Credit Card</option>
                                    <option value="debit-card" className="bg-card text-white">💳 Debit Card</option>
                                    <option value="upi" className="bg-card text-white">📱 UPI</option>
                                    <option value="net-banking" className="bg-card text-white">🏦 Net Banking</option>
                                    <option value="cash" className="bg-card text-white">💰 Cash on Delivery</option>
                                </select>
                            </div>

                            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-white">Order Total:</span>
                                    <span className="text-2xl font-bold text-accent">${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="text-sm text-text/60">
                                    {cart.length} item{cart.length !== 1 ? 's' : ''} in your order
                                </div>
                                <button type="submit" className="w-full btn-accent">
                                    <FaCheckCircle className="text-lg" />
                                    <span>Place Order</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Product Details Modal */}
            {showProductDetails && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowProductDetails(false)} />
                    <div className="relative w-full max-w-4xl bg-card border border-border rounded-2xl p-8 mx-4 animate-[scaleIn_0.3s_ease-out] shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-white">Product Details</h2>
                            <button
                                onClick={() => setShowProductDetails(false)}
                                className="p-3 rounded-xl bg-card/50 border border-border hover:bg-card/70 transition-all duration-300 group"
                            >
                                <FaTimes className="text-text/70 group-hover:text-white" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Product Image */}
                            <div className="space-y-4">
                                <div className="relative overflow-hidden rounded-2xl">
                                    <img
                                        src={selectedProduct.image || "/api/placeholder/500/400"}
                                        alt={selectedProduct.name}
                                        className="w-full h-80 object-cover"
                                    />
                                    {selectedProduct.stock <= 5 && (
                                        <div className="absolute top-4 left-4 bg-accent/90 text-white px-3 py-1 rounded-lg text-sm font-medium">
                                            Low Stock
                                        </div>
                                    )}
                                </div>

                                {/* Product Actions */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => addToCart(selectedProduct)}
                                        disabled={selectedProduct.stock === 0}
                                        className="flex-1 btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FaCartPlus className="text-lg" />
                                        <span>{selectedProduct.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
                                    </button>
                                    <button
                                        onClick={() => toggleWishlist(selectedProduct)}
                                        className={`p-4 rounded-xl border transition-all duration-300 ${isInWishlist(selectedProduct.id)
                                            ? 'bg-red-500/20 border-red-500/40 text-red-500'
                                            : 'bg-card/50 border-border hover:bg-card/70 text-accent'
                                            }`}
                                    >
                                        <FaHeart className={`text-xl ${isInWishlist(selectedProduct.id) ? 'fill-current' : ''}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Product Information */}
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">{selectedProduct.name}</h1>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-3xl font-bold text-accent">${selectedProduct.price}</span>
                                        <div className="flex items-center gap-1">
                                            <FaStar className="text-yellow-400 text-lg" />
                                            <span className="text-text/70">4.5 (128 reviews)</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-text/60">
                                        <span className="px-3 py-1 bg-card/50 rounded-lg">Category: {selectedProduct.category}</span>
                                        <span className="px-3 py-1 bg-card/50 rounded-lg">Stock: {selectedProduct.stock} available</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                                    <p className="text-text/80 leading-relaxed">{selectedProduct.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-card/30 border border-border/30">
                                        <h4 className="text-white font-semibold mb-2">Availability</h4>
                                        <p className="text-text/70 text-sm">
                                            {selectedProduct.stock > 0 ? `${selectedProduct.stock} items in stock` : 'Out of stock'}
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-card/30 border border-border/30">
                                        <h4 className="text-white font-semibold mb-2">Category</h4>
                                        <p className="text-text/70 text-sm capitalize">{selectedProduct.category}</p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-card/30 border border-border/30">
                                    <h4 className="text-white font-semibold mb-3">Product Features</h4>
                                    <ul className="space-y-2 text-text/80 text-sm">
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                                            High quality materials
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                                            Fast shipping available
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                                            30-day return policy
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                                            Customer support included
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserHomePage;
