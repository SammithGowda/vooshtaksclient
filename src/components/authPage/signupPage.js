import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { SignUpApi } from '../api/apiServices';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AuthContext } from '../context/user';
import Navbar from '../navbar/nav';
const Signup = () => {
    const { setUserProfile } = useContext(AuthContext)
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

        

        try {
            let response = await SignUpApi("signup", formData)
            
            if (response.status === 201) {
                console.log(response,"in signup")
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                })
                setUserProfile(response.data.message)
                navigate('/login')
            }else{
                alert(response.data.data)
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
        try {
            const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${res.access_token}`, {
                headers: {
                    Authorization: `Bearer ${res.access_token}`,
                    Accept: 'application/json'
                }
            })
            if (response.status === 200) {
                setUserProfile(response.data)
                navigate('/task')
            }
        } catch (error) {
            console.log(`Error while trying G-auth api ${error}`)
        }

    }

    return (
        <>
            <Navbar />
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
        </>
    );
}

export default Signup;
