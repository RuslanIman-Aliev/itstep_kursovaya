const apiKey = process.env.REACT_APP_API_KEY;
const PopularPlaces = ({ places, type }) => {
    return (
        <div className="popular-object-form">
            <div className="div-popular-object">
                {places?.map((place, index) => (
                    <div className="block-popular-object" key={index}>
                        <div className="popular-object">
                            
                            <img
                                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0]?.photo_reference}&key=${apiKey}`}
                                alt={place.name}
                                className="popular-image-object"
                            />
                        </div>
                        <div className="about-popular-object">
                            <p className="place-name">{place.name}</p>
                            <p className="place-distance"> km</p>
                        </div>
                        {type === "restaurant" && (
                            <div className="about-rating-object">
                                <div className="rating-popular-object">
                                    {place.user_ratings_total}
                                </div>
                                <div className="rating-restaurant">{place.rating}</div>
                            </div>
                        )}
                        <div className="description-popular-object">
                            <p>{place.vicinity || "No description available"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default PopularPlaces