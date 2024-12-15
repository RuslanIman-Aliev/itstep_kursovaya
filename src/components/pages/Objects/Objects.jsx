import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import flatpickr from "flatpickr";
import mainBackground from '../../../img/AboutImages/mainbackground.png';
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

const Objects = () => {
    const { id } = useParams();
    const [object, setObject] = useState(null);
    const [days, setDays] = useState(0);
    const [bestPlaces, setBestPlaces] = useState([]);
    const [bestRestaurant, setRestaurant] = useState([]);

    const dateRangeRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:7152/api/objects/${id}`);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const data = await response.json();
                setObject(data);
                const address = `${data.address.postalCode}+${data.address.street}+${data.address.city}+${data.address.country}`
                const result = await fetchBestPlacesNear(address);
                const { lat, lng } = result.results[0].geometry.location;
                console.log(lat, lng)
                const bestProposition = await fetchForRecomendation(lat, lng, "tourist_attraction");
                console.log(bestProposition)
                setBestPlaces(bestProposition)
                const bestRestaurants = await fetchForRecomendation(lat, lng, "restaurant");
                console.log(bestRestaurants)
                setRestaurant(bestRestaurants)
                console.log(`${bestPlaces} sdsdsds`)
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
        if (object && dateRangeRef.current) {
            const calendar = flatpickr(dateRangeRef.current, {
                mode: "range",
                dateFormat: "Y-m-d",
                onChange: (selectedDates) => {
                    if (selectedDates.length === 2) {
                        const startDate = selectedDates[0];
                        const endDate = selectedDates[1];
                        const diffTime = Math.abs(endDate - startDate);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        setDays(diffDays);
                    }
                }
            });

            return () => {
                if (calendar && typeof calendar.destroy === 'function') {
                    calendar.destroy();
                }
            };
        }
    }, [object]);

    if (!object) {
        return <div>Loading...</div>;
    }

    const items = object;
    const address = items?.address;
    const special = items?.special;
    const totalCount = items.price * days;
    const service = totalCount * 0.01;
    const totalSum = service + totalCount;
    const images = object.images || [mainBackground,mainBackground,mainBackground];
    return (
        <div className="container-object">
            <div className="container-img-pay-object">
                <div className="address-photo-object">
                    <div className="address-object">
                        <div className="name-object">{items.name}</div>
                        <div className="all-address-object">{address.postalCode} {address.street} {address.city} {address.country}</div>


                    </div>
                    <div className="div-image-object">
                         {images.length > 0 ? (
                            <PhotoCarousel images={images} />
                        ):(
                         <div></div>   
                        )}
                    </div>

                </div>

                <div className="payment-form-object">
                    <div className="payment-object">
                        <div className="price-object">Price</div>
                        <div className="input-calendar-object">
                            <FaCalendarAlt className='calendar-object' />
                            <div className="inputs-object">
                                <input type="text" className='find-date-object' ref={dateRangeRef} placeholder="Check in - Check out" />
                                <p className="inputs-text-object">Check in - Check out</p>
                            </div>
                        </div>
                        <div className="input-people-object">
                            <MdPeopleOutline className='people-object' />
                            <div className="inputs-object">
                                <input type="text" className='people-count-object' placeholder="Guests" />
                                <p className="inputs-text-object">Guests</p>
                            </div>
                        </div>
                        {days && (
                            <>
                                <div className="price-block-object">
                                    <div className="calculate-sum-object">
                                        {items.price}$ x {days} night
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
                        <button className="proceed-object">Proceed</button>
                    </div>
                    {/* <div className="weather-object-form">
                    <div className="weather-object">9 C</div>
                    <p className="weather-info-object">Moderate rain</p>
                    <p className="weather-info-object">New York-Today</p>
                        {Array(6).fill().map((_, index) => (
                            <>
                                
                                    <hr className='hr-object'/>
                                <div className="weather-block-object">
                                    <p className="day-of-week-object">Tuesday</p>
                                    <p className="day-temp-object">9</p>
                                </div>
                                
                            </>
                        ))}
                    </div> */}

                </div>
            </div>
            {/* //вынести в отдельный компонент */}
            <div className="second-container-object">
                <div className="block-container-object">

                    <div className="blockes-best">
                        <div className="block-best">
                            <TbBuildingSkyscraper className="icons-best" />
                            <p>{special.roomCount || 0} Room</p>
                        </div>
                        <div className="block-best">
                            <LuBedDouble className="icons-best" />
                            <p>{special.roomCount || 0} Capacity</p>
                        </div>
                        <div className="block-best">
                            <LiaBathSolid className="icons-best" />
                            <p>{special.toiletCount || 0} Bath</p>
                        </div>
                        <div className="block-best">
                            <BsArrowsMove className="icons-best" />
                            <p>{items.square || 0} Square</p>
                        </div>
                    </div>
                </div>

                <div className="description-object">
                    {items.description}
                </div>

               
                <PopularPlaces places={bestPlaces} />
                <PopularPlaces places={bestRestaurant} type="restaurant" />

            </div>
        </div>

    );
};

export default Objects;
