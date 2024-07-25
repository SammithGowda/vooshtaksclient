import React, { useContext, useEffect, useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./nav.css"
import { AuthContext } from '../context/user';
import Avatar from '@mui/material/Avatar';
const Navbar = () => {
    const { goggleLogout, user } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState('')
    const navigate = useNavigate()

    const logOut = () => {
        goggleLogout();
        navigate("/")
    }
    useEffect(() => {
        if (user) {
            const userName = user.name || user.firstName || 'Unknown User';
            setUserInfo(userName)
        }
    }, [user])
    return (
        <div className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                </Link>
                <div className="navbar-right">
                    <button onClick={logOut} className="logout-btn">{user ? 'Logout' : 'login'}</button>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}  >
                <Avatar alt="User Name" src="" />
                <span>{userInfo}</span>
            </div>
        </div>
    );
};

export default Navbar;