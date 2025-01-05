import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TonConnectButton } from '@tonconnect/ui-react';
import { checkAuth } from '../../pages/Auth/CheckAuth';
import { IoIosArrowDown } from "react-icons/io";

import './NavBars.css';


const NavBars = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Состояние для дропдаун-меню

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const isAuthenticated = await checkAuth();

                if (!isAuthenticated) {
                    console.error("User not authenticated, redirecting to login...");
                    navigate("/login");
                    return;
                }
                setAuth(isAuthenticated);
                const response = await fetch("https://localhost:7152/api/user/me", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    console.error("Failed to fetch user data");
                    return;
                }

                const userData = await response.json();
                setUser(userData);
                console.log("User data:", userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [navigate]);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-container')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="mainContainer">
            <div className="menu">
                <ul className="menuList">
                    <li><a href="">MyLogoandSiteName</a></li>
                    <li><a href="">Home</a></li>
                    <li><a href="">Book places</a></li>
                    <li><a href="">Contact</a></li>
                    <ul className="listUser">
                        {!auth ? (
                            <>
                                <li className="signIn"><a href="/login">Sign In</a></li>
                                <li><a href="/register">Sign Up</a></li>
                            </>
                        ) : (
                            <div className="dropdown-container">
                                <div className="blocks-navbar">
                                <TonConnectButton className='ton-button-navbar'/>
                                <li className="user-profile" onClick={toggleDropdown}>
                                    {user?.name} {user?.surname}                               
                                </li>
                                <IoIosArrowDown className='icon-navbar' onClick={toggleDropdown}/>
                               
                                
                                </div>
                                {isDropdownOpen && (
                                    <div className="dropdown-menu">
                                        <ul>
                                            <li><a href="/profile">My Objects</a></li>
                                            <li><a href="/bookings">My Bookings</a></li>
                                            <li><a href="/settings">My Favorites</a></li>
                                            <li><a href="/help">Help Center</a></li>
                                            <li onClick={() => console.log('Sign Out')}>Sign Out</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </ul>
                </ul>
            </div>
        </div>
    );
};

export default NavBars;
