import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/AdminSign.css';

function AdminSign() {

    let [Admin, SetAdmin] = useState({
        U_name: "",
        email: "",
        password: "",
        re_password: "",
        phone: "",
        age: "",
        profile: ""
    })

    function handleChange(e) {
        let { name, value } = e.target;
        SetAdmin((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    function register_admin(e) {
        e.preventDefault();
        axios.post("http://localhost:1000/Admins", Admin)
            .then((res) => {
                console.log(res);
                toast.success("Registerd Successfull");
            })
            .catch((res)=>{
                console.log(res);
                toast.error("Invalid Credentials")
            })
    }

    return (
        <div className='AdminSign'>
            <div>Admin Sign-up</div>
            <form action="" onSubmit={register_admin}>
                <label htmlFor="">
                    Name :
                    <input type="text" name='U_name' value={Admin.U_name} onChange={handleChange} placeholder='Enter name of Admin' required />
                </label>
                <label htmlFor="">
                    email :
                    <input type="text" name='email' value={Admin.email} onChange={handleChange} placeholder='example@gmail.com' required />
                </label>
                <label htmlFor="">
                    Password :
                    <input type="password" name='password' value={Admin.password} onChange={handleChange} placeholder='Enter Password' required />
                </label>
                <label htmlFor="">
                    Re - password :
                    <input type="password" name='re_password' value={Admin.re_password} onChange={handleChange} placeholder='Enter re-enter Password' required />
                </label>
                <label htmlFor="">
                    Phone :
                    <input type="number" name='phone' value={Admin.phone} onChange={handleChange} placeholder='Enter phone of Admin' required />
                </label>
                <label htmlFor="">
                    Age :
                    <input type="number" name='age' value={Admin.age} onChange={handleChange} placeholder='Enter age of Admin' required />
                </label>
                <label htmlFor="">
                    Image :
                    <input type="text" name='profile' value={Admin.profile} onChange={handleChange} placeholder='Enter image of Admin' required />
                </label>
                <button>Register</button>
            </form>
        </div>
    )
}

export default AdminSign
