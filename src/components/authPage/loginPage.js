import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import loginApi from './api/apiLogin';
import './style.css';
import { AuthApiGet } from '../api/apiServices';
import Navbar from '../navbar/nav';

const Login = () => {
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

        // You can add form validation here if needed

        // console.log('Login successful:', formData);
        try {

            const response = await AuthApiGet(formData);
            console.log('Login successful:', response);
            if (response.status === 201) {
                //next page
                naviagte('/task')
            }
            // Handle successful login, e.g., redirect to home page
        } catch (error) {
            console.error('Error during login:', error);
            // Handle errors, e.g., show an error message
        }
    };

    return (
        <>
            <Navbar/>
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
