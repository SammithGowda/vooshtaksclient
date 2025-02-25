import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { LoginApi } from '../api/apiServices';
import Navbar from '../navbar/nav';
import { AuthContext } from '../context/user';
const Login = () => {
    const { setUserProfile } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const naviagte = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await LoginApi(formData);
            if (response.status === 201) {
                setUserProfile(response.data.message)
                naviagte('/task')
            } else {
                alert(response.data.data)
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="login-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="login-footer">
                    <p>Don't have an account? <Link to="/">Signup</Link></p>
                </div>
            </div>
        </>
    );
}

export default Login;
