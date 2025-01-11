import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import flatpickr from "flatpickr";
import { navigate } from 'react-router-dom';
import { BlobServiceClient } from "@azure/storage-blob";
import "flatpickr/dist/flatpickr.min.css";
import './Objects.css'
import { TbBuildingSkyscraper } from "react-icons/tb";
import { LuBedDouble } from "react-icons/lu";
import { LiaBathSolid } from "react-icons/lia";
import { BsArrowsMove } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { MdPeopleOutline } from "react-icons/md";
import { fetchBestPlacesNear } from '../../../api/apiForPopularObjectNear';
import { fetchForRecomendation } from '../../../api/fetchForRecomendation';
import PopularPlaces from './PopularPlaces';
import PhotoCarousel from "../PhotoCarousel/PhotoCarousel";
import { fetchInfo } from '../../../api/fetchApi';
import { checkAuth } from '../Auth/CheckAuth';


const Objects = (formData ) => {
    const { id } = useParams();
    const [object, setObject] = useState(formData||[]);
    const [days, setDays] = useState(0);
    const [bestPlaces, setBestPlaces] = useState([]);
    const [bestRestaurant, setRestaurant] = useState([]);
    const [photos, setPhotos] = useState([]);
    const dateRangeRef = useRef(null);
    const [dates, setDates] = useState('');
    const [guests, setGuests] = useState('');
    const [dateError, setDateError] = useState('');
    const [user,setUser] = useState('')
    const [guestsError, setGuestsError] = useState('');
    const [isUserObj,setUserObj] = useState(false)
    const [lat,setLat] = useState(false)
    const [lng,setLng] = useState(false)

    const navigate = useNavigate();
    console.log(formData)
    useEffect(() => {
        const fetchData = async () => {
            console.log("fd")
            if (formData && Object.keys(formData).length > 0) {
                return
                
            }

            if (Object.keys(formData).length !== 0) {
                return;
            }
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
                        setUser(userData);
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

                const objectUrl = `https://localhost:7152/api/objects/${id}`;
                const photoUrl = `https://localhost:7152/api/objects/photo/${id}`;
                console.log("HEre")
                const dataObject = await fetchInfo(objectUrl);
                setObject(dataObject);
                const dataPhotos = await fetchInfo(photoUrl);
                setPhotos(dataPhotos?.map(photo => photo?.imageUrl));
                const address = `${dataObject?.address?.postalCode}+${dataObject?.address?.street}+${dataObject?.address?.city}+${dataObject?.address?.country}`;
                const result = await fetchBestPlacesNear(address);
                const { lat, lng } = result?.results[0]?.geometry.location;
                setLat(lat)
                setLng(lng)
                const bestProposition = await fetchForRecomendation(lat, lng, "tourist_attraction");
                setBestPlaces(bestProposition);
                const bestRestaurants = await fetchForRecomendation(lat, lng, "restaurant");
                setRestaurant(bestRestaurants);
            } catch (er) {
                console.error('Fetch error:', er);
            }
        };

        fetchData();

        return () => {
            if (dateRangeRef.current && typeof flatpickr !== 'undefined') {
                flatpickr(dateRangeRef.current).destroy();
            }
        };
    }, [id]);

    useEffect(() => {
        if (user?.id === object?.ownerId) {
            setUserObj(true);
        }
        if(user?.id !== object?.ownerId) {
            setUserObj(false);
        }
    }, [user, object]);
    
    useEffect(() => {
        
        if (object.bookings && dateRangeRef.current) {
            const bookedRanges = object?.bookings?.map(range => {
                const from = new Date(range.dateIn);
                const to = new Date(range.dateOut);
                from.setDate(from.getDate() - 1);  
                to.setDate(to.getDate() - 1);  
                return { from, to };
            });
            
            const availableRanges = object?.availabilities?.map(range => {
                const from = new Date(range.dateIn)
                const to = new Date(range.dateOut);
                from.setDate(from.getDate() - 1);  
                return { from, to };
            });
    
            const disableDates = (date) => {
                const isAvailable = availableRanges?.some(range => {
                    return date >= range.from && date <= range.to;
                });
                return !isAvailable;  
            };
    
            const calendar = flatpickr(dateRangeRef.current, {
                mode: "range",
                dateFormat: "Y-m-d",
               
                disable: [disableDates, ...bookedRanges ],  
                minDate: "today",
                onChange: (selectedDates) => {
                    if (selectedDates.length === 2) {
                        const startDate = selectedDates[0];
                        const endDate = selectedDates[1];
                        const diffTime = Math.abs(endDate - startDate);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        setDays(diffDays);
                        setDates(selectedDates);
                    }
                },
            });
    
            return () => {
                if (calendar && typeof calendar.destroy === "function") {
                    calendar.destroy();
                }
            };
        }
    }, [object]);
    
   
    const handleClick = () => {
        setDateError('');
        setGuestsError('');

        if (!dates || dates.length !== 2) {
            setDateError("Please select a valid date range.");
            return;
        }

        if (!guests || isNaN(guests) || guests >=object?.special?.maxPeopleCapacity || guests <1 ) {
            setGuestsError("Please enter a valid number of guests.");
            return;
        }
       
         const items = object;
        const address = items?.address;
        const totalCount = items?.price * days;
        const service = Math.round(totalCount * 0.01 * 100) / 100;
        const totalSum = service + totalCount;
        const totalAddress = `${address?.postalCode} ${address?.street} ${address?.city} ${address?.country}`;
        console.log(totalAddress)
        Object.assign(object, {
            totalprice: totalSum,
            dates: dates,
            guest: guests,
            totalAddress: totalAddress,
            charges: service,
            totalCount: totalCount,
            photos
        });
        const objectString = encodeURIComponent(JSON.stringify(object));
        navigate(`/confirm?data=${objectString}`);
    };

    if (!object) {
        return <div>Loading...</div>;
    }
     
    
    console.log(object)
    const items = object;
    const address = items?.address;
    const special = items?.special;
    const totalCount = items?.price * days;
    const service = totalCount * 0.01;
    const totalSum = service + totalCount;
    const totalAddress = `${address?.postalCode} ${address?.street} ${address?.city} ${address?.country}`;
    const formAddress = `${formData?.formData?.postalCode} ${formData?.formData?.street} ${formData?.formData?.city} ${formData?.formData?.country}`
    const imageUrls = formData?.formData?.image?.map(item => item.preview) || [];
    console.log(imageUrls)

    return (
        <div className="container-object">
            <div className="container-img-pay-object">
                <div className="address-photo-object">
                    <div className="address-object">
                        <div>{isUserObj &&(
                            <div className="is-user-object">Your object</div>
                        )}</div>
                        <div className="name-object">{items?.name || formData?.formData?.name}</div>
                        <div className="all-address-object">   {(formAddress && !formAddress.includes("undefined undefined ")) ? formAddress : totalAddress}
                        </div>
                    </div>
                    <div className="div-image-object">
                        {photos?.length > 1 && (
                            <PhotoCarousel images={photos} />
                        ) }
                        { imageUrls?.length >1 &&
                            (
                                <PhotoCarousel images={imageUrls} />
                            )
                        }
                        {photos?.length == 1 && (
                            <img  className="image-object" src={photos} />
                        )
                        }
                        {imageUrls?.length == 1 && (
                            <img  className="image-object" src={photos} />
                        )
                        }
                       
                    </div>
                    
                </div>

                <div className="payment-form-object">
                    <div className="payment-object">
                        <div className="price-object">Price</div>
                        <div className="input-calendar-object">
                            <FaCalendarAlt className='calendar-object' />
                            <div className="inputs-object">
                                <input
                                    type="text"
                                    className='find-date-object'
                                    ref={dateRangeRef}
                                    placeholder="Check in - Check out"
                                />
                                <p className="inputs-text-object">Check in - Check out</p>
                               
                            </div>
                        </div>
                        <div className="input-people-object">
                            <MdPeopleOutline className='people-object' />
                            <div className="inputs-object">
                                <input
                                    type="text"
                                    onChange={(e) => setGuests(e.target.value)}
                                    className='people-count-object'
                                    placeholder="Guests"
                                />
                                <p className="inputs-text-object">Guests</p>
                               
                            </div>
                        </div>
                        {days && (
                            <>
                                <div className="price-block-object">
                                    <div className="calculate-sum-object">
                                        {items?.price || formData?.formData?.price}$ x {days} night
                                    </div>
                                    <div className="calculated-object">
                                        {totalCount}$
                                    </div>
                                </div>
                                <div className="service-charge-object">
                                    <p className="service-object">Service charge:</p>
                                    <p className="total-charge-object">{service}$</p>
                                </div>
                                <br />
                                <div className="total-sum-object">
                                    <div className="text-object">Total:</div>
                                    <div className="price-for-object">{totalSum}$</div>
                                </div>
                            </>
                        )}
                        {
                           !Object.keys(formData).length === 0 || isUserObj ? (
                            <button className="proceed-object" onClick={handleClick} disabled={true}>It's your object</button>
                        ) : (
                            <button className="proceed-object" onClick={handleClick} disabled={false}>Proceed</button>
                        )

                        }
                        {dateError && <p className="error-message">{dateError}</p>}
                        {guestsError && <p className="error-message">{guestsError}</p>}
                    </div>
                </div>
            </div>

            <div className="second-container-object">
                <div className="block-container-object">
                    <div className="blockes-best">
                        <div className="block-best">
                            <TbBuildingSkyscraper className="icons-best" />
                            <p>{special?.roomCount || formData?.formData?.roomCount} Room</p>
                        </div>
                        <div className="block-best">
                            <LuBedDouble className="icons-best" />
                            <p>{special?.maxPeopleCapacity || formData?.formData?.maxCapacity} Capacity</p>
                        </div>
                        <div className="block-best">
                            <LiaBathSolid className="icons-best" />
                            <p>{special?.toiletCount || formData?.formData?.toiletCount} Bath</p>
                        </div>
                        <div className="block-best">
                            <BsArrowsMove className="icons-best" />
                            <p>{items?.square || formData?.formData?.square} Square</p>
                        </div>
                    </div>
                </div>

                <div className="description-object">
                    {items?.description || formData?.formData?.description}
                </div>

                <h2 className='popular-places-object'>Popular places nearby</h2>
                <PopularPlaces places={bestPlaces} originLat={lat} originLng={lng} />
                <h2 className='popular-places-object'>Popular restaurants nearby</h2>
                <PopularPlaces places={bestRestaurant} type="restaurant" />
            </div>
        </div>
    );
};

export default Objects;