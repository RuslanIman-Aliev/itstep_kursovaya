import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { BsWallet2, BsCalendar } from "react-icons/bs";
import { BiDollar } from "react-icons/bi";
import { IoPeople, IoTimeOutline } from "react-icons/io5";

import './FinishBooking.css';

const InfoBlock = ({ icon, label, value }) => (
    <div className="info-container-finish">
        <div className="info-icon-finish">
            {icon}
            <div className="info-finish">{label}</div>
        </div>
        <div className="value-finish">{value}</div>
    </div>
);

const FinishBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const objectString = params.get('data');
    const myObject = JSON.parse(decodeURIComponent(objectString));

    const [isBooked, setIsBooked] = useState(false);
    const [isRequestSent, setIsRequestSent] = useState(false); 

    const data = useMemo(() => ({
        objectId: myObject.id,
        userId: myObject.userId,
        ownerId: myObject.ownerId,
        objectType: myObject.objectType,
        dateIn: myObject.date1,
        dateOut: myObject.date2,
        totalSum: myObject.totalprice,
        days: myObject.days,
        night: myObject.nights,
        hash: myObject.hash,
        paymentMethod: myObject.paymentMethod,
        guest: myObject.guest
    }), [myObject]);

    useEffect(() => {
        if (isRequestSent || isBooked) return;  

        const bookTrip = async () => {
            try {
                console.log('Sending booking data:', data);
                const response = await fetch('https://localhost:7152/api/objects/book', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                console.log(result);

                if (response.ok) {
                    setIsBooked(true);
                } else {
                    console.error("Ошибка при создании бронирования", result);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsRequestSent(true);  
            }
        };

        bookTrip();
    }, [data, isRequestSent, isBooked]);

    const infoPart1 = [
        { icon: <FaUser className="icon-finish"/>, label: "Booked by:", value: myObject.userName + " " + myObject.userSurname },
        { icon: <BsWallet2 className="icon-finish"/>, label: "Payment Method:", value: myObject.paymentMethod },
        { icon: <BsCalendar className="icon-finish"/>, label: "Date in:", value: myObject.date1 },
        { icon: <IoTimeOutline className="icon-finish" />, label: "Time in:", value: "10:00" },
    ];

    const infoPart2 = [
        { icon: <IoPeople className="icon-finish" />, label: "Guests:", value: myObject.guest },
        { icon: <BiDollar className="icon-finish" />, label: "Total Price:", value: "$" + myObject.totalprice },
        { icon: <BsCalendar className="icon-finish" />, label: "Date out:", value: myObject.date2 },
        { icon: <IoTimeOutline className="icon-finish"/>, label: "Time out:", value: "15:00" },
    ];

    return (
        <div className="main-container-finish">
            <div className="card-finish">
                <div className="image-finish"></div>
                
                <h2 className="congratulation-finish">🎊 Congratulations! 🎊</h2>
                <div className="confirm-finish">Your trip has been booked</div>
                <div className="object-name-finish">{myObject.name}</div>
                <div className="main-info-finish">
                    <div className="part1-info-finish">
                        {infoPart1.map((item, index) => (
                            <InfoBlock
                                key={index}
                                icon={item.icon}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </div>
                    <div className="part2-info-finish">
                        {infoPart2.map((item, index) => (
                            <InfoBlock
                                key={index}
                                icon={item.icon}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </div>
                </div>
                <div className="btn-div-finish">
                    <button className="button-finish" onClick={()=> navigate('/')}>Ok</button>
                </div>

            </div>
        </div>
    );
};

export default FinishBooking;
