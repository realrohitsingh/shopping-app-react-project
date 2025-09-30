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
      {/* New Cursor-inspired background */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0,_rgba(255,255,255,0)_15%)]" />
        <div
          className="absolute top-0 left-0 h-full w-full bg-repeat"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent 70%)',
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
