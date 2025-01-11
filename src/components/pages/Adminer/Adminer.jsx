import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Adminer.css";
import { checkAuth } from "../Auth/CheckAuth";
import { fetchInfo } from "../../../api/fetchApi";
import PhotoCarousel from "../PhotoCarousel/PhotoCarousel";

const itemsPerPage = 12;

const RoomList = () => {
    const [page, setPage] = useState(1);
    const [objects, setObjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authenticateUser = async () => {
                    try {
                        const response = await fetch("https://localhost:7152/api/user/me", {
                            method: "GET",
                            credentials: "include",
                        });

                        if (!response.ok) {
                            console.error("Failed to fetch user data");
                            return;
                        }

                        const userData = await response.json();
                        const isAuthenticated = await checkAuth();

                        if (!isAuthenticated) {
                            alert("You need to log in first!");
                            navigate("/login");
                        }
                    } catch (authError) {
                        console.error("Authentication error:", authError);
                    }
                };

                await authenticateUser();

                const objectUrl = `https://localhost:7152/api/objects/showalltypebyrating`;

                const dataObject = await fetchInfo(objectUrl);
                console.log(dataObject)
                setObjects(dataObject);
            } catch (er) {
                console.error('Fetch error:', er);
            }
        };

        fetchData();
    }, [navigate]);

    const startIndex = (page - 1) * itemsPerPage;
    const items = objects.slice(startIndex, startIndex + itemsPerPage);
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this object?")) return;

        try {
            const response = await fetch(`https://localhost:7152/api/objects/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || "Failed to delete object.");
                return;
            }

            alert("Object deleted successfully.");
            setObjects(objects.filter((object) => object.id !== id));
        } catch (error) {
            console.error("Delete error:", error);
            alert("An error occurred while deleting the object.");
        }
    };


    return (
        <div className="room-list">
            <div className="rooms-container">
                {items.map((object) => (
                    <div className="room-card" key={object.id}>
                        {object?.photos?.length > 1 ? (
                            <PhotoCarousel images={object?.photos}  className="room-image"/>
                        ) : object?.photos?.[0] ? (
                            <img src={object?.photos} alt={object.name} className="room-image" />

                        ) : null}
                        <div className="room-details">
                            <div className="all-address-object">{object.address?.postalCode} {object.address?.street} {object.address?.city} {object.address?.country}</div>
                            <p className="room-floor">{object.floor}</p>
                            <p className="room-bed">{object.bed}</p>
                            <p className="room-price">{object.price} / per day</p>
                            <div className="buttons">
                                <button className="view-detail-button">View Detail</button>
                                <button  onClick={() => handleDelete(object.id)} className="delete-button">Delete</button>
                            </div>


                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {Array.from({ length: Math.ceil(objects.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`page-button ${page === index + 1 ? "active" : ""}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RoomList;
