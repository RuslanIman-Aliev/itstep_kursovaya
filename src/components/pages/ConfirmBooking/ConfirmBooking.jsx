import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { FaHotel } from "react-icons/fa6";
import { BsGeoAlt } from "react-icons/bs";
import { MdOutlineAccessAlarm } from "react-icons/md";
import { GoSun } from "react-icons/go";
import { IoPeople } from "react-icons/io5";

import './ConfirmBooking.css'
import RatingStars from "../../layouts/Ratings/RatingStars";
import { checkAuth } from '../Auth/CheckAuth';

const ConfirmBookings = () => {
    const [forms, setForms] = useState([1]);
    const navigate = useNavigate(); 
    const [tonConnectUI] = useTonConnectUI();
    const [user, setUser] = useState(null);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const objectString = params.get('data');
    const myObject = JSON.parse(decodeURIComponent(objectString));
    console.log(myObject); 
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' }; 
        const formatted = date.toLocaleDateString('en-GB', options);   
        return formatted.replace(',', '');
    };
    const newDate = myObject.dates.map(formatDate);
    const startDate = new Date(newDate[0]);
    const endDate = new Date(newDate[1]);
    const differenceInMilliseconds = endDate - startDate;
    const days = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    const nights = days - 1;
    const addNewForm = () => {
        setForms([...forms, forms.length + 1]);
    };
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const isAuthenticated = await checkAuth();
                if (!isAuthenticated) {
                    console.error("User not authenticated, redirecting to login...");
                    navigate("/login");
                    return;
                }
        
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
          fetchUserData()        
       
    }, [navigate]);
    
    const transaction = {
        validUntil: Date.now() + 5 * 60 * 1000,  
        messages: [
          {
            address: 'UQB-eaopqBjwEDhJ2yV9lIXRa1Ml2UQYFS8Uuu4dloFSbot-',  
            amount: '500000',  
          },
          {
            address: 'UQAzaGpyuDi-g3njM7aJdq7Xr8KexP5OU6ZRKfF2FLElV0yU',   
            amount: '100000',         
            description: 'Tax',  
             
          },
        ],
      };
      const hashTransaction = async (boc) => {
         const data = new Uint8Array(atob(boc).split('').map(c => c.charCodeAt(0)));
    
         const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        
         const hashArray = new Uint8Array(hashBuffer);    
         const hexHash = Array.from(hashArray)
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
        return {hexHash };
    };
    
      const checkTransactionStatus = async (boc) => {

        const apiUrl = `https://toncenter.com/api/v2/getTransactions?address=UQB-eaopqBjwEDhJ2yV9lIXRa1Ml2UQYFS8Uuu4dloFSbot-&limit=1&hash=${boc}&to_lt=0&archival=false
`; 
        try {
            const response = await fetch(`${apiUrl}`);
            const data = await response.json();
            console.log('Transaction Status Data:', data);
            if (!response.ok || data.error) {
                throw new Error(data.error?.message || 'Ошибка получения статуса транзакции');
            }
            return data.ok;
        } catch (error) {
            console.error('Ошибка при проверке статуса транзакции:', error);
            throw error;
        }
    };

    const periodicallyCheckTransactionStatus = async (boc) => {
        const maxAttempts = 2; 
        const interval = 5000;  
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                const status = await checkTransactionStatus(boc);
                if (status === true) {
                    Object.assign(myObject, {
                        paymentMethod: "Crypto",
                        date1:newDate[0],
                        date2:newDate[1],
                        userName:user.name,
                        userSurname:user.surname,
                        userId:user.id,
                        hash:boc,
                        days,
                        nights
                       
                    });
                    const objectString = encodeURIComponent(JSON.stringify(myObject));
                    navigate(`/finishbooking?data=${objectString}`);
                    return;
                }

            } catch (error) {
                console.error('Ошибка при проверке статуса транзакции:', error);
                alert('Error');
            }

            await new Promise((resolve) => setTimeout(resolve, interval));
        }

     };

    const submitHandler = async () => {
        
        try {

            const result = await tonConnectUI.sendTransaction(transaction, {
                modals: ['before','error'],
                notifications: ['before', 'success', 'error']
            });
            tonConnectUI.closeModal()
           
            if (!result.boc) {
                throw new Error('BOC отсутствует в ответе');
            }
            const {hexHash } = await hashTransaction(result.boc);
             console.log(hexHash)
            await periodicallyCheckTransactionStatus(hexHash);
        } catch (error) {
            console.error('Ошибка транзакции:', error);
         }  
    };
    return (
        <div className="container-confirm">

            <div className="header-confirm">
                <h3 className="text-header-confirm">Review your Booking</h3>
                <div className="image-header-confirm"></div>
            </div>

            <div className="main-container-confirm">
                <div className="part1-container-confirm">
                    <div className="object-container-confirm">
                        <h3 className="object-info-confirm"><FaHotel className="object-icon-confirm" /> Object Information </h3>
                        <div className="main-object-confirm">
                            <div className="image-part-confirm"><img className="image-part-confirm" src={myObject.photos[0]} alt="" /></div>
                            <div className="info-part-confirm">
                                <div className="name-object-confirm">{myObject.name}</div>
                                <div className="icon-address-info-list"><BsGeoAlt className="geo-icon-list" />{myObject.totalAddress}</div>
                                <div className="rating-object-confirm"><RatingStars rating={myObject.reviews.starsCount} /><span className="text-stars-confirm"> {myObject.reviews.starsCount}/5.0 </span></div>
                            </div>
                        </div>
                        <div className="about-object-confirm">
                            <div className="block-object-confirm">
                                <div className="checkIn-object-confim">Check-in</div>
                                <div className="date-object-confim">{newDate[0]}</div>
                                <div className="icon-and-desc-confirm">
                                    <MdOutlineAccessAlarm className="icon-object-confirm" />
                                    <div className="time-object-confim">12:30 pm</div>
                                </div>
                            </div>
                            <div className="block-object-confirm">
                                <div className="checkOut-object-confim">Check out</div>
                                <div className="date-object-confim">{newDate[1]}</div>
                                <div className="icon-and-desc-confirm">
                                    <MdOutlineAccessAlarm className="icon-object-confirm" />
                                    <div className="time-object-confim">4:30 pm</div>
                                </div>
                            </div>
                            <div className="block-object-confirm">
                                <div className="guests-object-confim">Guests</div>
                                <div className="count-object-confim">{myObject.guest} Guests</div>
                                <div className="icon-and-desc-confirm">
                                    <GoSun className="icon-object-confirm" />
                                    <div className="nights-object-confim"> {nights} Nights - {days} Days</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="guests-container-confirm">
                        <h3 className="object-info-confirm "><IoPeople id="people" className="people-icon-confirm " /> Guest Details </h3>
                        <div className="main-guest-confirm">Main Guest</div>
                        
                        {forms.map((form, index) => (
                            <div key={index} className="mini-form">
                                <div className="label-and-input-confirm">
                                    <label className="guest-label">Title</label>
                                    <select className="select-input">
                                        <option value="">Select Title</option>
                                        <option value="Mr">Mr</option>
                                        <option value="Ms">Ms</option>
                                        <option value="Mrs">Mrs</option>
                                        <option value="Dr">Dr</option>
                                    </select>
                                </div>
                                <div className="label-and-input-confirm">
                                    <label className="guest-label">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your first name"
                                        className="guest-input"
                                    />
                                </div>
                                <div className="label-and-input-confirm">

                                    <label className="guest-label">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your last name"
                                        className="guest-input"
                                    />
                                </div>

                            </div>
                        ))}



                        <a onClick={addNewForm} className="add-guest-button">
                            + Add New Guest
                        </a>
                    </div>
                </div>

                <div className="part2-container-confirm">
                    <div className="price-container-confirm">
                        <div className="header-price-confirm">Price Summary</div>
                        <div className="block-price-confirm">
                            <div className="object-charges-price-confirm">Object Charges</div>
                            <div className="sum-price-confirm">${myObject.totalCount}</div>

                        </div>
                        <div className="block-price-confirm">
                            <div className="object-charges-price-confirm">Taxes 1.5% Fees</div>
                            <div className="sum-price-confirm">${myObject.charges}</div>
                        </div>
                        <div className="total-amount-price-confirm">
                            <div className="pay-block-price-confirm">
                                <div className="pay-object-charges-price-confirm">Payable Now</div>
                                <div className="pay-sum-price-confirm">${myObject.totalprice}</div>
                            </div>
                        </div>
                        <div className="button-proceed-confirm">
                        <button onClick={submitHandler} className='pay-object-confirm'>Pay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default ConfirmBookings