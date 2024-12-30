import React, { useState } from 'react';
import { FaHotel } from "react-icons/fa6";
import { BsGeoAlt } from "react-icons/bs";
import { MdOutlineAccessAlarm } from "react-icons/md";
import { GoSun } from "react-icons/go";
import { IoPeople } from "react-icons/io5";

import './ConfirmBooking.css'
import RatingStars from "../../layouts/Ratings/RatingStars";

const ConfirmBookings = () => {
    const [forms, setForms] = useState([1]);

    const addNewForm = () => {
        setForms([...forms, forms.length + 1]);
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
                            <div className="image-part-confirm"></div>
                            <div className="info-part-confirm">
                                <div className="name-object-confirm">Pride moon Village Resort & Spa</div>
                                <div className="icon-address-info-list"><BsGeoAlt className="geo-icon-list" /> 5855 W Century Blvd, Los Angeles - 90045</div>
                                <div className="rating-object-confirm"><RatingStars rating={4.5} /><span className="text-stars-confirm"> 4.5/5.0 </span></div>
                            </div>
                        </div>
                        <div className="about-object-confirm">
                            <div className="block-object-confirm">
                                <div className="checkIn-object-confim">Check-in</div>
                                <div className="date-object-confim">4 March 2022</div>
                                <div className="icon-and-desc-confirm">
                                    <MdOutlineAccessAlarm className="icon-object-confirm" />
                                    <div className="time-object-confim">12:30 pm</div>
                                </div>
                            </div>
                            <div className="block-object-confirm">
                                <div className="checkOut-object-confim">Check out</div>
                                <div className="date-object-confim">8 March 2022</div>
                                <div className="icon-and-desc-confirm">
                                    <MdOutlineAccessAlarm className="icon-object-confirm" />
                                    <div className="time-object-confim">4:30 pm</div>
                                </div>
                            </div>
                            <div className="block-object-confirm">
                                <div className="guests-object-confim">Guests</div>
                                <div className="count-object-confim">2 Guests</div>
                                <div className="icon-and-desc-confirm">
                                    <GoSun className="icon-object-confirm" />
                                    <div className="nights-object-confim"> 3 Nights - 4 Days</div>
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
                            <div className="sum-price-confirm">$2200</div>

                        </div>
                        <div className="block-price-confirm">
                            <div className="object-charges-price-confirm">Taxes 1.5% Fees</div>
                            <div className="sum-price-confirm">$2</div>
                        </div>
                        <div className="total-amount-price-confirm">
                            <div className="pay-block-price-confirm">
                                <div className="pay-object-charges-price-confirm">Payable Now</div>
                                <div className="pay-sum-price-confirm">$22,500</div>
                            </div>
                        </div>
                        <div className="button-proceed-confirm">
                            <button className="pay-object-confirm">Proceed</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default ConfirmBookings