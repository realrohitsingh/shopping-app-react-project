import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminLogin from './components/AdminLogin'
import LandingPage from './components/LandingPage'
import UserLogin from './components/UserLogin'
import {ToastContainer} from 'react-toastify'
import AdminSign from './components/AdminSign'
import AdminForgotPass from './components/AdminForgotPass'


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/user-login' element={<UserLogin />} />
          <Route path='/admin-sign' element={<AdminSign/>} />
          <Route path='/admin-forgot-pass' element={<AdminForgotPass/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  )
}

export default App
