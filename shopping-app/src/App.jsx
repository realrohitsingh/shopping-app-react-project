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
      {/* High-contrast Neon Slate background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0B0F] via-[#0F1220] to-[#0A0B0F]" />
        <div className="absolute -top-36 -left-40 h-[560px] w-[560px] rounded-full bg-primary/35 blur-[80px]" />
        <div className="absolute -bottom-40 -right-36 h-[560px] w-[560px] rounded-full bg-accent/35 blur-[80px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
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
      <ToastContainer />
    </div>
  );
}

export default App;
