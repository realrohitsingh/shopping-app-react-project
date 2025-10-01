import { FaArrowRight, FaShoppingBag, FaUser, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans px-4 py-12">
      <div className="text-center mb-20 animate-[slideDown_0.6s_ease-out]">
        <div className="inline-flex items-center gap-4 mb-6">
          <div className="relative">
            <FaShoppingBag className="text-primary text-5xl md:text-6xl drop-shadow-[0_0_30px_rgba(139,92,246,0.6)] animate-[float_3s_ease-in-out_infinite]" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-white via-primary via-40% to-accent bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(139,92,246,0.5)]">
            SmartShop
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-text/70 mt-6 max-w-3xl mx-auto font-light leading-relaxed">
          Your complete shopping destination.<br />
          <span className="text-primary/90 font-medium">Fast, secure, and beautifully designed.</span>
        </p>
        <div className="flex items-center justify-center gap-6 mt-8 text-text/50 text-sm font-medium">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Secure
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
            Fast
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '1s' }} />
            Modern
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-6xl w-full">
        <Link
          className="group glass-panel w-full md:w-[480px] p-12 hover:scale-[1.03] hover:border-primary/70 transition-all duration-500 animate-[slideInLeft_0.8s_ease-out] relative overflow-hidden"
          to="/admin-login">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <div className="relative p-7 rounded-3xl bg-gradient-to-br from-primary/25 to-purple-600/25 border-2 border-primary/40 group-hover:border-primary/70 transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(139,92,246,0.5)]">
                <FaUserShield className="w-20 h-20 text-primary drop-shadow-[0_0_20px_rgba(139,92,246,0.8)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
              </div>
            </div>

            <h2 className="text-4xl font-extrabold text-white mb-4 group-hover:text-primary transition-colors duration-300">
              Admin Portal
            </h2>
            <p className="text-text/60 text-lg mb-8 leading-relaxed max-w-sm">
              Manage your store, track inventory, and oversee operations with powerful admin tools
            </p>
            <div className="flex items-center gap-3 text-primary font-bold text-lg group-hover:gap-5 transition-all duration-300">
              Continue as Admin
              <FaArrowRight className="text-base group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </Link>

        <Link
          className="group glass-panel w-full md:w-[480px] p-12 hover:scale-[1.03] hover:border-accent/70 transition-all duration-500 animate-[slideInRight_0.8s_ease-out] relative overflow-hidden"
          to="/user-login">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-accent/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <div className="relative p-7 rounded-3xl bg-gradient-to-br from-accent/25 to-cyan-600/25 border-2 border-accent/40 group-hover:border-accent/70 transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(6,182,212,0.5)]">
                <FaUser className="w-20 h-20 text-accent drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500" />
              </div>
            </div>

            <h2 className="text-4xl font-extrabold text-white mb-4 group-hover:text-accent transition-colors duration-300">
              Customer Portal
            </h2>
            <p className="text-text/60 text-lg mb-8 leading-relaxed max-w-sm">
              Browse products, manage your cart, and enjoy a seamless shopping experience
            </p>
            <div className="flex items-center gap-3 text-accent font-bold text-lg group-hover:gap-5 transition-all duration-300">
              Continue as Customer
              <FaArrowRight className="text-base group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-20 text-center animate-[fadeIn_1.2s_ease-out]">
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-card/30 border border-border/30 backdrop-blur-sm">
          <span className="text-text/40 text-sm font-medium">© 2025 SmartShop</span>
          <span className="w-1 h-1 rounded-full bg-text/20" />
          <span className="text-text/40 text-sm">All rights reserved</span>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
