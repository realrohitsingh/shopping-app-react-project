import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import '../styles/UserForgotPass.css';

function UserForgotPass() {
  const [email, setEmail] = useState("");
  const [recoveredDetails, setRecoveredDetails] = useState(null);

  function handleRecovery(e) {
    e.preventDefault();
    setRecoveredDetails(null);

    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }

    axios.get("http://localhost:1001/user")
      .then((res) => {
        const userAccount = res.data.find(user => user.email === email);

        if (userAccount) {
          setRecoveredDetails({
            U_name: userAccount.U_name,
            password: userAccount.password,
          });
          toast.success("Account details found!");
        } else {
          toast.error("No account found with that email address.");
        }
      })
      .catch((err) => {
        toast.error("Could not connect to the server.");
        console.error(err);
      });
  }

  return (
    <>
      <div className="wrapper">
        <form onSubmit={handleRecovery}>
          <h2>Recover Account</h2>
          <p className="instructions">
            Enter the email address associated with your account.
          </p>
          <div className="input-field">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {recoveredDetails && (
            <div className="recovered-details">
              <h4>Your Account Details:</h4>
              <p><strong>Username:</strong> {recoveredDetails.U_name}</p>
              <p><strong>Password:</strong> {recoveredDetails.password}</p>
            </div>
          )}

          <button type="submit">Recover Password</button>

          <div className="back-to-login">
            <Link to="/user-login">← Back to Login</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserForgotPass;
