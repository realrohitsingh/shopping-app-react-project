import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
    FaAlignLeft,
    FaArrowLeft,
    FaBox,
    FaDollarSign,
    FaEdit,
    FaImage,
    FaImage as FaImageIcon,
    FaPlus,
    FaSave,
    FaShoppingBag,
    FaSpinner,
    FaTag,
    FaTimes,
    FaTrash
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ManageProducts() {
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [imageLoading, setImageLoading] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: "",
    });

    // Check authentication and fetch products on component mount
    useEffect(() => {
        const loggedInAdmin = localStorage.getItem("loggedInAdmin");
        if (!loggedInAdmin) {
            toast.error("Please login first");
            navigate("/admin-login");
            return;
        }
        fetchProducts();
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:1002/products");
            setProducts(response.data || []);
            // Update localStorage with current product count
            localStorage.setItem('productCount', (response.data || []).length.toString());
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.price || !formData.description) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            if (editingProduct) {
                // Update existing product
                await axios.put(`http://localhost:1002/products/${editingProduct.id}`, {
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock) || 0,
                });
                toast.success("Product updated successfully!");
            } else {
                // Create new product
                await axios.post("http://localhost:1002/products", {
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock) || 0,
                });
                toast.success("Product added successfully!");
            }

            resetForm();
            fetchProducts();

            // Notify admin dashboard to update product count
            window.dispatchEvent(new CustomEvent('productUpdated'));
        } catch (error) {
            console.error("Error saving product:", error);
            toast.error("Failed to save product");
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name || "",
            price: product.price || "",
            description: product.description || "",
            category: product.category || "",
            stock: product.stock || "",
            image: product.image || "",
        });
        setShowForm(true);

        // Scroll to form section after a brief delay to ensure form is rendered
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        }, 100);
    };

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:1002/products/${productId}`);
                toast.success("Product deleted successfully!");
                fetchProducts();

                // Notify admin dashboard to update product count
                window.dispatchEvent(new CustomEvent('productUpdated'));
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error("Failed to delete product");
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            price: "",
            description: "",
            category: "",
            stock: "",
            image: "",
        });
        setEditingProduct(null);
        setShowForm(false);
    };

    const handleAddNew = () => {
        resetForm();
        setShowForm(true);

        // Scroll to form section after a brief delay to ensure form is rendered
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        }, 100);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass-panel p-8 text-center">
                    <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
                    <p className="text-text/70">Loading products...</p>
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
                                        <FaBox className="text-2xl text-primary drop-shadow-lg" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-extrabold text-white">
                                        Manage Products
                                    </h1>
                                    <p className="text-text/60">
                                        Add, edit, and manage your product inventory
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleAddNew}
                            className="btn-primary group"
                        >
                            <FaPlus className="text-lg group-hover:rotate-90 transition-transform duration-500" />
                            <span>Add Product</span>
                        </button>
                    </div>
                </div>

                {/* Product Form */}
                {showForm && (
                    <div ref={formRef} className="glass-panel p-8 mb-8 animate-[scaleIn_0.5s_ease-out] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

                        <div className="relative">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-extrabold text-white">
                                    {editingProduct ? "Edit Product" : "Add New Product"}
                                </h2>
                                <button
                                    onClick={resetForm}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/30 border border-border/30 text-text/70 hover:text-red-400 hover:border-red-400/40 transition-all duration-300"
                                >
                                    <FaTimes className="text-sm" />
                                    <span>Cancel</span>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Product Name */}
                                <div className="space-y-2">
                                    <label className="block text-text/90 font-medium text-sm">
                                        Product Name *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="input-glass pl-11"
                                            placeholder="Enter product name"
                                            required
                                        />
                                        <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" />
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="space-y-2">
                                    <label className="block text-text/90 font-medium text-sm">
                                        Price *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            className="input-glass pl-11"
                                            placeholder="0.00"
                                            step="0.01"
                                            min="0"
                                            required
                                        />
                                        <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" />
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <label className="block text-text/90 font-medium text-sm">
                                        Category
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="input-glass pl-11"
                                            placeholder="e.g., Electronics, Clothing"
                                        />
                                        <FaBox className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" />
                                    </div>
                                </div>

                                {/* Stock */}
                                <div className="space-y-2">
                                    <label className="block text-text/90 font-medium text-sm">
                                        Stock Quantity
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleInputChange}
                                            className="input-glass pl-11"
                                            placeholder="0"
                                            min="0"
                                        />
                                        <FaShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" />
                                    </div>
                                </div>

                                {/* Image URL */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-text/90 font-medium text-sm">
                                        Image URL
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="url"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleInputChange}
                                            className="input-glass pl-11"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70" />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-text/90 font-medium text-sm">
                                        Description *
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="input-glass pl-11 min-h-[120px] resize-none"
                                            placeholder="Enter product description..."
                                            required
                                        />
                                        <FaAlignLeft className="absolute left-4 top-4 text-primary/70" />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="md:col-span-2 flex justify-end">
                                    <button
                                        type="submit"
                                        className="btn-primary group"
                                    >
                                        <FaSave className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                                        <span>{editingProduct ? "Update Product" : "Add Product"}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Products List */}
                <div className="glass-panel p-6 animate-[fadeIn_0.8s_ease-out]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-extrabold text-white">
                            Products ({products.length})
                        </h2>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="relative inline-block mb-6">
                                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl animate-pulse" />
                                <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-600/20 border-2 border-primary/30 flex items-center justify-center">
                                    <FaBox className="text-4xl text-primary/70" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Products Yet</h3>
                            <p className="text-text/60 mb-6">Start by adding your first product to the inventory</p>
                            <button
                                onClick={handleAddNew}
                                className="btn-primary group"
                            >
                                <FaPlus className="text-lg group-hover:rotate-90 transition-transform duration-500" />
                                <span>Add Your First Product</span>
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                            {products.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="card-product group animate-[slideUp_0.6s_ease-out] hover:scale-[1.03] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Product Image */}
                                    <div className="relative mb-6 overflow-hidden rounded-2xl bg-white/5 border-2 border-white/10 shadow-2xl backdrop-blur-sm group-hover:border-white/20 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-500">
                                        {product.image ? (
                                            <>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-80 object-contain group-hover:scale-110 transition-all duration-700 brightness-110 contrast-125 saturate-110 hover:brightness-125 hover:contrast-135 hover:saturate-125"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                        setImageLoading(prev => ({ ...prev, [product.id]: false }));
                                                    }}
                                                    onLoad={(e) => {
                                                        e.target.style.opacity = '1';
                                                        setImageLoading(prev => ({ ...prev, [product.id]: false }));
                                                    }}
                                                    onLoadStart={() => {
                                                        setImageLoading(prev => ({ ...prev, [product.id]: true }));
                                                    }}
                                                    style={{
                                                        opacity: imageLoading[product.id] ? 0 : 1,
                                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                                                    }}
                                                />
                                                {imageLoading[product.id] && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/30 to-purple-600/30 backdrop-blur-sm">
                                                        <FaSpinner className="text-5xl text-primary animate-spin" />
                                                    </div>
                                                )}
                                            </>
                                        ) : null}
                                        <div
                                            className={`w-full h-80 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border-2 border-dashed border-white/20 ${product.image ? 'hidden' : ''}`}
                                        >
                                            <div className="text-center">
                                                <FaImageIcon className="text-7xl text-white/40 mx-auto mb-3" />
                                                <p className="text-white/60 text-base font-medium">No Image Available</p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="p-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-lg"
                                            >
                                                <FaEdit className="text-base" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-3 rounded-xl bg-red-500/30 backdrop-blur-md border border-red-400/40 text-red-300 hover:bg-red-500/40 hover:scale-110 transition-all duration-300 shadow-lg"
                                            >
                                                <FaTrash className="text-base" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="card-title text-lg">{product.name}</h3>
                                            {product.category && (
                                                <p className="card-meta text-xs">{product.category}</p>
                                            )}
                                        </div>

                                        <p className="text-text/70 text-sm line-clamp-3">
                                            {product.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-3 border-t border-border/30">
                                            <div className="text-lg font-bold text-primary">
                                                ${product.price}
                                            </div>
                                            <div className="text-sm text-text/60">
                                                Stock: {product.stock || 0}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageProducts;
