import React from 'react';
import RatingStars from "../../layouts/Ratings/RatingStars";

const apiKey = process.env.REACT_APP_API_KEY;

const PopularPlaces = ({ places, type, originLat, originLng }) => {
  const handleNavigate = (destinationLat, destinationLng) => {
    console.log(originLat,originLng)
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="popular-object-form">
      <div className="div-popular-object">
        {places?.map((place, index) => (
          <div className="block-popular-object" key={index}>
            <div className="popular-object">
              <img
                src={
                  place?.photos?.length > 0
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
                    : ""
                }
                alt={place?.name || "No image available"}
                className="popular-image-object"
              />
            </div>
            <div className="about-popular-object">
              <p className="place-name">{place?.name}</p>
              <p className="place-distance"></p>
            </div>
            {type === "restaurant" && (
              <div className="about-rating-object">
                <div className="rating-popular-object">
                  {place?.user_ratings_total} Reviews
                </div>
                <div className="rating-restaurant">
                  <RatingStars rating={place?.rating} />
                </div>
              </div>
            )}
            <div className="description-popular-object">
              <p>{place?.vicinity || "No description available"}</p>
            </div>
            <div className="button-places">
            <button
              className="navigate-button"
              onClick={() =>
                handleNavigate(place.geometry.location.lat, place.geometry.location.lng)
              }
            >
             Get directions
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPlaces;
