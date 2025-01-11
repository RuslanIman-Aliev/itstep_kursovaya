import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchInfo } from "../../../api/fetchApi";
import "./BookingTable.css";

const BookingsTable = () => {
    const [user, setUser] = useState('');
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const { role } = useParams(); 

    useEffect(() => {
        const fetchData = async () => {
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
            console.log(role)
            let bookingsUrl;
            if (role === "admin") {
                bookingsUrl = `https://localhost:7152/api/objects/all-bookings?userId=${userData.id}`; 
            } else {
                bookingsUrl = `https://localhost:7152/api/user/getUserBookObject/${userData.id}`;  
            }

            const data = await fetchInfo(bookingsUrl);
            setBookings(data);
        };

        fetchData();
    }, [role]);

    return (
        <div className="bookings-table-container">
            <h2>{role === "admin" ? "All Bookings" : "Your Bookings"}</h2>
            <table className="bookings-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.flatMap((object, index) =>
                        object.bookings
                            .sort((a, b) => new Date(b.dateIn) - new Date(a.dateIn))
                            .map((b, subIndex) => (
                                <tr key={`${index}-${subIndex}`}>
                                    <td>{index + subIndex + 1}</td>
                                    <td>{object.objectName}</td>
                                    <td>
                                        {b.dateIn ? new Date(b.dateIn).toLocaleDateString() : "N/A"} -{" "}
                                        {b.dateOut ? new Date(b.dateOut).toLocaleDateString() : "N/A"}
                                    </td>
                                    <td>{b.totalPayingSum ? `$${b.totalPayingSum}` : "N/A"}</td>
                                    <td className="button-td">
                                        <button
                                            className="view-button"
                                            onClick={() => navigate(`/object/${object.objectId}`)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookingsTable;
