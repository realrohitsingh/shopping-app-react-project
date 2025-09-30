import { FaArrowRight, FaShoppingBag, FaUser, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16 animate-[slideDown_0.6s_ease-out]">
        <div className="inline-flex items-center gap-3 mb-4">
          <FaShoppingBag className="text-primary text-4xl md:text-5xl" />
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent">
            SmartShop
          </h1>
        </div>
        <p className="text-lg md:text-xl text-text/80 mt-4 max-w-2xl mx-auto">
          Your intelligent shopping companion. Fast, secure, and beautifully designed.
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-5xl w-full animate-[slideUp_0.8s_ease-out]">
        {/* Admin Card */}
        <Link
          className="group glass-panel w-full md:w-96 p-10 hover:scale-[1.02] hover:border-primary/50 transition-all duration-300"
          to="/admin-login">
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/30 group-hover:border-primary/60 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/50">
              <FaUserShield className="w-16 h-16 text-primary drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
              Admin Portal
            </h2>
            <p className="text-text/70 text-base mb-6 leading-relaxed">
              Manage your store, track inventory, and oversee operations with powerful admin tools
            </p>
            <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
              Continue as Admin <FaArrowRight className="text-sm" />
            </div>
          </div>
        </Link>

        {/* User Card */}
        <Link
          className="group glass-panel w-full md:w-96 p-10 hover:scale-[1.02] hover:border-accent/50 transition-all duration-300"
          to="/user-login">
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-accent/20 to-cyan-600/20 border border-accent/30 group-hover:border-accent/60 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/50">
              <FaUser className="w-16 h-16 text-accent drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
              Customer Portal
            </h2>
            <p className="text-text/70 text-base mb-6 leading-relaxed">
              Browse products, manage your cart, and enjoy a seamless shopping experience
            </p>
            <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all">
              Continue as Customer <FaArrowRight className="text-sm" />
            </div>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-text/50 text-sm animate-[fadeIn_1s_ease-out]">
        <p>Secure • Fast • Modern</p>
      </div>
    </div>
  );
}

export default LandingPage;
