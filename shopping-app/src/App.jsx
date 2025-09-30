import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AdminForgotPass from "./components/AdminForgotPass";
import AdminHomePage from "./components/AdminHomePage";
import AdminLogin from "./components/AdminLogin";
import AdminSign from "./components/AdminSign";
import LandingPage from "./components/LandingPage";
import UserForgotPass from "./components/UserForgotPass";
import UserLogin from "./components/UserLogin";
import UserSign from "./components/UserSign";

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans">
      {/* Cursor.com inspired background */}
      <div className="fixed inset-0 -z-10 bg-background">
        {/* Large gradient orbs for depth */}
        <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-accent/30 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: '1s', animationDuration: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(139,92,246,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.15) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-sign" element={<UserSign />} />
          <Route path="/admin-sign" element={<AdminSign />} />
          <Route path="/admin-forgot-pass" element={<AdminForgotPass />} />
          <Route path="/user-forgot-pass" element={<UserForgotPass />} />
          <Route path="/admin-homepage" element={<AdminHomePage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
