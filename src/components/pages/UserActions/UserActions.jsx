import { useState, useEffect } from 'react';
import { fetchInfo } from '../../../api/fetchApi';
import { IoHome } from "react-icons/io5";
import './UserActions.css';
import { useNavigate, useParams } from 'react-router-dom';
import ObjectList from '../FindObjects/ObjectList';

const UserActions = () => {
    const [user, setUser] = useState('');
    const [booking, setBooking] = useState([]);
    const [listings, setListings] = useState([]);
    const { type } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            console.log("fd");
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
            const id = userData.id;
            const objectUrl = `https://localhost:7152/api/user/GetUserBookings/${id}`;
            const listingsUrl = `https://localhost:7152/api/user/GetUsersObject/${id}`;

            const dataObject = await fetchInfo(objectUrl);
            const dataListings = await fetchInfo(listingsUrl);
            console.log(dataObject);
            console.log(dataListings);
            const item = dataObject.livingObject
            console.log(item)
            setBooking(dataObject);
            setListings(dataListings);
        };
        fetchData();
    }, []);

   
    return (
        <div className="container-action">
            {type === "bookings" ? (
                <div className="container1-action">
                    <h2 className="bookings-action">My bookings</h2>
                    {booking.length > 0 ? (
                        booking.map((b) => (
                            <div key={b.id} className="bookings-card-action">
                                <div className="main-info-action">
                                    <div className="part1-action">
                                        <button className="icon-button-action">
                                            <IoHome className="icon-action" />
                                        </button>
                                        <div className="name-action">
                                            {b.livingObject ? b.livingObject.name : 'Booking Name'}
                                        </div>
                                    </div>
                                    <div className="part2-action">
                                        {b.livingObject && (
                                            <div className="button-action" onClick={() => navigate(`/object/${b.livingObject.id}`)}>
                                                View Object
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="footer-action">
                                    <div className="block-action">
                                        <div className="info-action">Date In</div>
                                        <div className="value-action">
                                            {b.dateIn ? new Date(b.dateIn).toLocaleDateString() : 'N/A'}
                                        </div>
                                    </div>
                                    <div className="block-action">
                                        <div className="info-action">Date Out</div>
                                        <div className="value-action">
                                            {b.dateOut ? new Date(b.dateOut).toLocaleDateString() : 'N/A'}
                                        </div>
                                    </div>
                                    <div className="block-action">
                                        <div className="info-action">Price</div>
                                        <div className="value-action">
                                            {b.totalPayingSum ? `$${b.totalPayingSum}` : 'N/A'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No bookings available.</p>
                    )}
                </div>
            ) : type === "listings" ? (
                <div className="user-listings">
                    <ObjectList objects={listings} />
                </div>
            ) : null}
        </div>
    );
};
export default UserActions;