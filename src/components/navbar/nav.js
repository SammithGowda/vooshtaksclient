import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./nav.css"
import { AuthContext } from '../context/user';
import Avatar from '@mui/material/Avatar';

const Navbar = () => {
    const { goggleLogout, user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [userName, setUserName] = useState({ name: "", img: "" });
    let userPht;
    const logOut = () => {
        goggleLogout();
        navigate("/")
    }
    useEffect(() => {
        if (user) {
            // userName = user.firstName||user.name
            setUserName(() => {
                if (user.firstName) {
                    return { name: user.firstName, img: "" }
                } else if (user.name) {
                    return { name: user.name, img: user.picture }
                }
            })

        }
    }, [])
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
                <Avatar alt="User Name" src={userName.img} />
                <spna>{userName.name}</spna>
            </div>
        </div>
    );
};

export default Navbar;