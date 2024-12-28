import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Search from "../../layouts/Search/Search"
import mainBackground from '../../../img/AboutImages/mainbackground.png';
import RatingStars from "../../layouts/Ratings/RatingStars";
import './FindObjects.css'
import { FaShareAlt } from "react-icons/fa";
import { BsGeoAlt } from "react-icons/bs";
import { fetchInfo } from '../../../api/fetchApi';

const FindObjects = () => {
    const [searchParams] = useSearchParams();
    const [objects, setObjects] = useState([]);
    const location = searchParams.get("location");
    const dateRange = searchParams.get("dateRange");
    const guests = searchParams.get("guests");
    const date = dateRange.split(' to ');
    const dateIn = date[0];
    const dateOut = date[1];
    console.log(dateIn);
    console.log(dateOut);
    console.log(guests, dateRange, location)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const objectsUrl = `https://localhost:7152/api/objects/getlistobjects?city=${location}&guestCount=${guests}&dateIn=2024-11-11&dateOut=2024-11-176`
                const dataObject = await fetchInfo(objectsUrl)
                
            } catch (er) {
                console.error('Fetch error:', er);
            }
        };

        fetchData();


    }, []);
    return (
        <div>
            <div className="container-search-find">
                <div className="container-image-list">
                    <h2 className="text-find">150 Hotels in New York</h2>
                    <Search loc={location} date={dateRange} guest={guests} />
                </div>
            </div>
            <div className="container-main-list">
                <div className="container-part1-filters-list">
                    <div className="filters-part1-list">
                        <div className="object-type-list">
                            <h6 className="object-text-list">Object type</h6>
                            <div className="form-check-list">
                                <input type="checkbox" id="objecttype1" className="checkbox-list" />
                                <label htmlFor="objecttype1" className="label-list">All</label>
                            </div>
                            <div className="form-check-list">
                                <input type="checkbox" id="objecttype2" className="checkbox-list" />
                                <label htmlFor="objecttype2" className="label-list">Hotel</label>
                            </div>
                            <div className="form-check-list">
                                <input className="checkbox-list" type="checkbox" id="objecttype3" />
                                <label htmlFor="objecttype3" className="label-list">Hostel</label>
                            </div>
                            <div className="form-check-list">
                                <input type="checkbox" id="objecttype4" className="checkbox-list" />
                                <label htmlFor="objecttype4" className="label-list">Flat</label>
                            </div>
                            <div className="form-check-list">
                                <input type="checkbox" id="objecttype5" className="checkbox-list" />
                                <label htmlFor="objecttype5" className="label-list">House</label>
                            </div>
                        </div>
                    </div>
                    <div className="filters-part2-list">
                        <div className="price-range-list">
                            <h6 className="object-text-list" >Price type</h6>

                            <div className="form-check-list">
                                <input type="checkbox" id="price1" className="checkbox-list" />
                                <label htmlFor="price1" className="label-list">Up to 100$</label>
                            </div>
                            <div className="form-check-list">
                                <input type="checkbox" id="price2" className="checkbox-list" />
                                <label htmlFor="price2" className="label-list">Up to 200$</label>
                            </div>
                            <div className="form-check-list">
                                <input type="checkbox" id="price3" className="checkbox-list" />
                                <label htmlFor="price3" className="label-list">Up to 300$</label>
                            </div>
                            <div className="form-check-list">
                                <input type="checkbox" id="price4" className="checkbox-list" />
                                <label htmlFor="price4" className="label-list">Up to 400$</label>
                            </div>
                            <div className="form-check-list">
                                <input type="checkbox" id="price5" className="checkbox-list" />
                                <label htmlFor="price5" className="label-list">400$+</label>
                            </div>
                        </div>
                    </div>
                    <div className="filters-part3-list">
                        <h6 className="object-text-list">Rating</h6>

                        <div className="form-check-star">
                            <input type="checkbox" id="star1" className="checkbox-list" />
                            <label htmlFor="star1" className="label-list">1 <span className="star">★</span></label>
                        </div>
                        <div className="form-check-star">
                            <input type="checkbox" id="star2" className="checkbox-list" />
                            <label htmlFor="star2" className="label-list">2 <span className="star">★</span></label>
                        </div>
                        <div className="form-check-star">
                            <input type="checkbox" id="star3" className="checkbox-list" />
                            <label htmlFor="star3" className="label-list">3 <span className="star">★</span></label>
                        </div>
                        <div className="form-check-star">
                            <input type="checkbox" id="star4" className="checkbox-list" />
                            <label htmlFor="star4" className="label-list">4 <span className="star">★</span></label>
                        </div>
                        <div className="form-check-star">
                            <input type="checkbox" id="star5" className="checkbox-list" />
                            <label htmlFor="star5" className="label-list">5 <span className="star">★</span></label>
                        </div>
                    </div>

                </div>
                <div className="container2-main-object-list">
                    <div className="object-card-list">
                        <div className="row-info-list">
                            <div className="image-row-list"> {//добавтиь карусель
                            }
                                <img src={mainBackground} alt="" className="photo-list" />
                            </div>
                            <div className="main-info-list">
                                <div className="emoji-block-info-list">
                                    <div className="emoji1-info-list"><RatingStars rating={4.5} /></div>
                                    <div className="emoji2-info-list"><button className="share-button-list"><FaShareAlt className="share-icon-list" />                                    </button></div>
                                </div>
                                <h3 className="header-info-list">Courtyard by Marriot New York</h3>
                                <div className="icon-address-info-list"><BsGeoAlt className="geo-icon-list" />                                 5855 W Century Blvd, Los Angeles - 90045</div>
                                <div className="price-info-list">
                                    <div className="sum-per-day-info-list">800$ <span className="days-info-list"> /day</span></div>
                                    <button className="button-read-more-info-list">Read more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="object-card-list">
                        <div className="row-info-list">
                            <div className="image-row-list"> {//добавтиь карусель
                            }
                                <img src={mainBackground} alt="" className="photo-list" />
                            </div>
                            <div className="main-info-list">
                                <div className="emoji-block-info-list">
                                    <div className="emoji1-info-list"><RatingStars rating={4.5} /></div>
                                    <div className="emoji2-info-list"><button className="share-button-list"><FaShareAlt className="share-icon-list" />                                    </button></div>
                                </div>
                                <h3 className="header-info-list">Courtyard by Marriot New York</h3>
                                <div className="icon-address-info-list"><BsGeoAlt className="geo-icon-list" />                                 5855 W Century Blvd, Los Angeles - 90045</div>
                                <div className="price-info-list">
                                    <div className="sum-per-day-info-list">800$ <span className="days-info-list"> /day</span></div>
                                    <button className="button-read-more-info-list">Read more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FindObjects