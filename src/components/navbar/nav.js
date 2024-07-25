import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./nav.css"
import { AuthContext } from '../context/user';

const Navbar = () => {
    const { goggleLogout } = useContext(AuthContext)
    const navigate = useNavigate()
    const logOut = () => {
        goggleLogout();
        navigate("/")
    }
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                </Link>
                <div className="navbar-right">
                    <button onClick={logOut} className="logout-btn">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;