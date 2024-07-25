import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { AuthApiPost } from '../api/apiServices';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AuthContext } from '../context/user';
const Signup = () => {
    const { goggleLogin } = useContext(AuthContext)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

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

        try {
            let response = await AuthApiPost("signup", formData)
            // console.log(response,"sam");
            if (response.status === 201) {
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                })

            }
        } catch (error) {
            console.error('Error during signup:', error);
            // Handle errors, e.g., show an error message
        }
    };

    const googleAuth = useGoogleLogin({
        onSuccess: (response) => {
            MakeGoogleApi(response)
        },
        onerror: (error) => { console.log(error) }
    })

    const MakeGoogleApi = async (res) => {
        console.log(res);
        try {
            const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${res.access_token}`, {
                headers: {
                    Authorization: `Bearer ${res.access_token}`,
                    Accept: 'application/json'
                }
            })
            // console.log(response)
            if (response.status === 200) {
                goggleLogin(response.data)
                navigate('/task')
                // console.log(response.data);
            }
        } catch (error) {

            console.log(`Error while make G-auth api ${error}`)
        }

    }

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
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
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="signup-button">Signup</button>
            </form>
            <div className="signup-footer">
                <p>Already have an account? <Link to="/login">Login</Link></p>
                <button onClick={() => googleAuth()} className="google-login-button">Login with Google</button>
            </div>
        </div>
    );
}

export default Signup;
