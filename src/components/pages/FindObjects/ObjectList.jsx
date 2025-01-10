import React from 'react';
import { FaShareAlt } from "react-icons/fa";
import { BsGeoAlt } from "react-icons/bs";
import PhotoCarousel from '../PhotoCarousel/PhotoCarousel';
import RatingStars from "../../layouts/Ratings/RatingStars";
import { useNavigate } from "react-router-dom";

const ObjectList = ({ objects }) => {
    const navigate = useNavigate();
    return (
        <div className="container2-main-object-list">
            {objects.map((object) => (
                <div className="object-card-list" key={object.id}>
                    <div className="row-info-list">
                        <div className="image-row-list">
                            {object.photos.length > 1 ? (
                                <PhotoCarousel images={object.photos} />
                            ) : (
                                <img src={object.photos} alt="" className='image-object' />
                            )}
                        </div>
                        <div className="main-info-list">
                            <div className="emoji-block-info-list">
                                <div className="emoji1-info-list">
                                    <RatingStars rating={object.reviews.starsCount} />
                                </div>
                                <div className="emoji2-info-list">
                                    <button className="share-button-list">
                                        <FaShareAlt className="share-icon-list" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="header-info-list">{object.name}</h3>
                            <div className="icon-address-info-list">
                                <BsGeoAlt className="geo-icon-list" />
                                {`${object.address.postalCode} ${object.address.street} ${object.address.city} ${object.address.country}`}
                            </div>
                            <div className="price-info-list">
                                <div className="sum-per-day-info-list">
                                    {object.price}$ <span className="days-info-list"> /day</span>
                                </div>
                                <button
                                    className="button-read-more-info-list"
                                    onClick={() => navigate(`/object/${object.id}`)}
                                >
                                    Read more
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ObjectList;
