import { FaUser, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center font-sans">
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
        <Link
          className="glass-panel w-80 p-10 hover:scale-105 transition-transform ring-1 ring-white/20"
          to="/admin-login">
          <div className="relative z-10 flex flex-col items-center">
            <FaUserShield className="w-20 h-20 text-white drop-shadow mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
            <span className="text-white/80 text-sm">
              For store managers and admins
            </span>
          </div>
        </Link>
        <Link
          className="glass-panel w-80 p-10 hover:scale-105 transition-transform ring-1 ring-white/20"
          to="/user-login">
          <div className="relative z-10 flex flex-col items-center">
            <FaUser className="w-20 h-20 text-white drop-shadow mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">User Login</h1>
            <span className="text-white/80 text-sm">
              For customers and shoppers
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
