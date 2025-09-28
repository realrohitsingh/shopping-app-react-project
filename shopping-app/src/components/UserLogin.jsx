import { useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/UserLogin.css';


function UserLogin() {
  let [email, setEmail] = useState("")
  let [pwd, setPwd] = useState("")

  function val_login(e) {
    e.preventDefault();
    if (email === "abcd" && pwd === "1234") {
      toast.success("Login Successfull")
    } else {
      toast.error("Login Failed")
    }
  }

  return (
    <div className='wrapper'>
      <form onSubmit={val_login}>
        <h2>User-Login</h2>
        <div className='input-field'>
          <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder='Enter your Email' required />
        </div>
        <div className='input-field'>
          <input value={pwd} onChange={(e) => { setPwd(e.target.value) }} type="password" placeholder='Enter your Password' required />
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

export default UserLogin
