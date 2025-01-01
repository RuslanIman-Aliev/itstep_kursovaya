import { useTonConnectUI } from '@tonconnect/ui-react';

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
    const infoPart1 = [
        { icon: <FaUser className="icon-finish"/>, label: "Booked by:", value: "Frances Guerrero" },
        { icon: <BsWallet2 className="icon-finish"/>, label: "Payment Method:", value: "Credit card" },
        { icon: <BsCalendar className="icon-finish"/>, label: "Date in:", value: "29 July 2022" },
        { icon: <IoTimeOutline className="icon-finish" />, label: "Time in:", value: "10:00" },
    ];

    const infoPart2 = [
        { icon: <IoPeople className="icon-finish" />, label: "Guests:", value: "3" },
        { icon: <BiDollar className="icon-finish" />, label: "Total Price:", value: "$1200" },
        { icon: <BsCalendar className="icon-finish" />, label: "Date out:", value: "15 Aug 2022" },
        { icon: <IoTimeOutline className="icon-finish"/>, label: "Time out:", value: "15:00" },
    ];

    return (
        <div className="main-container-finish">
            <div className="card-finish">
                <div className="image-finish"></div>
                
                <h2 className="congratulation-finish">🎊 Congratulations! 🎊</h2>
                <div className="confirm-finish">Your trip has been booked</div>
                <div className="object-name-finish">Beautiful Bali with Malaysia</div>
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
                <button className="button-finish">Ok</button>
                </div>

                </div>
            </div>
    );
};

export default FinishBooking;
