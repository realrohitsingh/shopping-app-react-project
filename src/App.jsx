import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AdminForgotPass from "./components/AdminForgotPass";
import AdminHomePage from "./components/AdminHomePage";
import AdminLogin from "./components/AdminLogin";
import AdminSign from "./components/AdminSign";
import Analytics from "./components/Analytics";
import CustomerManagement from "./components/CustomerManagement";
import ErrorPage from "./components/ErrorPage";
import LandingPage from "./components/LandingPage";
import ManageProducts from "./components/ManageProducts";
import UserForgotPass from "./components/UserForgotPass";
import UserLogin from "./components/UserLogin";
import UserSign from "./components/UserSign";
import ViewOrders from "./components/ViewOrders";

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans">
      <div className="fixed inset-0 -z-10 bg-background">
        <div
          className="absolute top-0 -left-40 w-[700px] h-[700px] bg-primary/40 rounded-full blur-[140px] animate-pulse"
          style={{
            animationDuration: '4s',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)'
          }}
        />
        <div
          className="absolute bottom-0 -right-40 w-[700px] h-[700px] bg-accent/40 rounded-full blur-[140px] animate-pulse"
          style={{
            animationDelay: '1s',
            animationDuration: '5s',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%)'
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/25 rounded-full blur-[120px] animate-pulse"
          style={{
            animationDelay: '2s',
            animationDuration: '6s',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 100%)'
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139,92,246,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139,92,246,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(10, 10, 10, 0.4) 100%)'
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-sign" element={<UserSign />} />
          <Route path="/admin-sign" element={<AdminSign />} />
          <Route path="/admin-forgot-pass" element={<AdminForgotPass />} />
          <Route path="/user-forgot-pass" element={<UserForgotPass />} />
          <Route path="/admin-homepage" element={<AdminHomePage />} />
          <Route path="/admin-homepage/manage-products" element={<ManageProducts />} />
          <Route path="/admin-homepage/view-orders" element={<ViewOrders />} />
          <Route path="/admin-homepage/customer-management" element={<CustomerManagement />} />
          <Route path="/admin-homepage/analytics" element={<Analytics />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
