import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/UserLogin.css";

function AdminLogin() {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [pwd, setPwd] = useState("");
  let [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedUser");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  function val_login(e) {
    e.preventDefault();
    axios
      .get("http://localhost:1001/user")
      .then((res) => {
        const adminUser = res.data.find(
          (user) => user.email === email || user.U_name === email
        );
        if (adminUser) {
          if (adminUser.password === pwd) {
            toast.success("Login Successfull");
            if (rememberMe) {
              localStorage.setItem("rememberedUser", email);
            } else {
              localStorage.removeItem("rememberedUser");
            }
          } else {
            toast.error("Invalid password.");
          }
        } else {
          toast.error("No admin found with that email.");
        }
      })
      .catch((err) => {
        toast.error("Login failed. Could not connect to the server.");
        console.log(err);
      })
      .finally(() => {
        setEmail("");
        setPwd("");
      });
  }
  return (
    <div className="wrapper">
      <button type="button" className="back-btn" onClick={handleBack}>
        &larr;
      </button>
      <form onSubmit={val_login}>
        <div className="form-header">
          <h2>User-Login</h2>
        </div>
        <div className="input-field">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Enter User Name or Email"
            required
          />
        </div>
        <div className="input-field">
          <input
            value={pwd}
            onChange={(e) => {
              setPwd(e.target.value);
            }}
            type="password"
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="forget">
          <label htmlFor="remember">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <p>Remember Me</p>
          </label>
          <Link to="/user-forgot-pass">Forgot password?</Link>
        </div>
        <button>Login</button>
        <div className="register">
          <Link to="/user-sign">New User ? Register</Link>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;