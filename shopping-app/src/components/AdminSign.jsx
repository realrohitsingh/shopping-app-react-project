import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "../styles/AdminSign.css";
import {Link} from 'react-router-dom';

function AdminSign() {
    let [Admin, SetAdmin] = useState({
        U_name: "",
        email: "",
        password: "",
        re_password: "",
        phone: "",
        age: "",
    });

    function handleChange(e) {
        let { name, value } = e.target;
        SetAdmin((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function register_admin(e) {
        e.preventDefault();
        axios.post("http://localhost:1000/Admins", Admin).then((res) => {
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
                <h2>Admin Sign-up</h2>
                <div className="input-field">
                    <input
                        type="text"
                        name="U_name"
                        value={Admin.U_name}
                        onChange={handleChange}
                        placeholder="Enter name of Admin"
                        required
                    />
                </div>
                <div className="input-field">
                    <input
                        type="email"
                        name="email"
                        value={Admin.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        required
                    />
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        name="password"
                        value={Admin.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required
                    />
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        name="re_password"
                        value={Admin.re_password}
                        onChange={handleChange}
                        placeholder="Enter re-enter Password"
                        required
                    />
                </div>
                <div className="input-field">
                    <input
                        type="number"
                        name="phone"
                        value={Admin.phone}
                        onChange={handleChange}
                        placeholder="Enter phone of Admin"
                        required
                    />
                </div>
                <div className="input-field">
                    <input
                        type="number"
                        name="age"
                        value={Admin.age}
                        onChange={handleChange}
                        placeholder="Enter age of Admin"
                        required
                    />
                </div>
                <button>Register</button>

                <div className="register">
                    <Link to="/admin-login">Already have an account? ←← LogIn</Link>
                </div>
            </form>
        </div>
    );
}

export default AdminSign;