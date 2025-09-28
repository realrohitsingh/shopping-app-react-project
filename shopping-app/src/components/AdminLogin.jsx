import { useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/AdminLogin.css';


function AdminLogin() {
  let [email, setEmail] = useState("")
  let [pwd, setPwd] = useState("")

  function val_login(e) {
    e.preventDefault();
    if (email === "admin" && pwd === "admin") {
      toast.success("Login Successfull")
    } else {
      toast.error("Login Failed")
    }
  }
  return (
    <div className='wrapper'>
      <form onSubmit={val_login}>
        <h2>Admin-Login</h2>
        <div className='input-field'>
          <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder='Enter Email' required />
        </div>
        <div className='input-field'>
          <input value={pwd} onChange={(e) => { setPwd(e.target.value) }} type="password" placeholder='Enter Password' required />
        </div>
        <div className='forget'>
          <label htmlFor="remember">
            <input type="checkbox" id='remember' />
            <p>Remember Me</p>
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button>Login</button>
        <div className='register'>
          <p>Don't have an account? <a href="#">Register</a></p>
        </div>
      </form>
    </div>
  )
}

export default AdminLogin
