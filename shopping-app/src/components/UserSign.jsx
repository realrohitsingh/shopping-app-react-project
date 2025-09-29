import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "../styles/UserSign.css";
import {Link} from 'react-router-dom';

function AdminSign() {
    let [User, SetUser] = useState({
        U_name: "",
        email: "",
        password: "",
        re_password: "",
        phone: "",
        age: "",
    });

    function handleChange(e) {
        let { name, value } = e.target;
        SetUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function register_admin(e) {
        e.preventDefault();
        axios.post("http://localhost:1001/user", User).then((res) => {
            console.log(res);
            toast.success("Registerd Successfull");
        }).catch((res) => {
            console.log(res);
            toast.error("Invalid Credentials");
        });
    }

    return (
        <div className="wrapper">
            <form action="" onSubmit={register_admin}>
                <h2>User Sign-up</h2>
                <div className="input-field">
                    <input
                        type="text"
                        name="U_name"
                        value={User.U_name}
                        onChange={handleChange}
                        placeholder="Enter name of User"
                        required
                    />
                </div>
                <div className="input-field">
                    <input
                        type="email"
                        name="email"
                        value={User.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        required
                    />
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        name="password"
                        value={User.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required
                    />
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        name="re_password"
                        value={User.re_password}
                        onChange={handleChange}
                        placeholder="Enter re-enter Password"
                        required
                    />
                </div>
                <div className="input-field">
                    <input
                        type="number"
                        name="phone"
                        value={User.phone}
                        onChange={handleChange}
                        placeholder="Enter phone of User"
                        required
                    />
                </div>
                <div className="input-field">
                    <input
                        type="number"
                        name="age"
                        value={User.age}
                        onChange={handleChange}
                        placeholder="Enter age of User"
                        required
                    />
                </div>
                <button>Register</button>

                <div className="register">
                    <Link to="/user-login">Already have an account? ← LogIn</Link>
                </div>
            </form>
        </div>
    );
}

export default AdminSign;