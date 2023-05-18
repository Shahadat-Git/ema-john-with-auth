import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg'
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                console.log('successfully log out');
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div>
            <nav className="header">
                <img src={logo} alt="" />
                <div>
                    <NavLink className={({ isActive }) => isActive ? "nav-active" : ''} to="/">Shop</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "nav-active" : ''} to="/orders">Orders</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "nav-active" : ''} to="/inventory">Inventory</NavLink>
                    {
                        !user && <><NavLink className={({ isActive }) => isActive ? "nav-active" : ''} to="/login">Login</NavLink>
                            <NavLink className={({ isActive }) => isActive ? "nav-active" : ''} to="/register">Register</NavLink></>
                    }
                    {
                        user && <><a>{user.email}</a> <button onClick={handleSignOut}>Sign Out</button></>
                    }
                </div>
            </nav>
        </div>
    );
};

export default Header;