import { Link } from 'react-router-dom'
import '../styles/LandingPage.css'

function LandingPage() {
    return (
        <div className='LandingPage'>
            <Link to="/admin-login">
                <img src="https://imgs.search.brave.com/SFleVxA2dyKQfqlkzxiilyusRsQ_4NPkdoAvhyAdH7M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvY29tcHV0ZXIt/dXNlci1pY29uLXZl/Y3Rvcl83ODAyOTAt/OTg2Ny5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQwJnE9ODA" alt="" />
                <h1>Admin Login</h1>
            </Link>

            <Link to="/user-login">
                <img src="https://imgs.search.brave.com/ZjYCn841WlQJNLdF4VjEJ5eutqAVGIAHn09XJznEAGQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMTY3ODUvMTY3/ODU4NzAucG5n" alt="" />
                <h1>User Login</h1>
            </Link>
        </div>
    )
}

export default LandingPage
