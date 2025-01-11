import React from 'react';
import { useState,useEffect } from 'react';
import { FaShareAlt } from "react-icons/fa";
import { BsGeoAlt } from "react-icons/bs";
import PhotoCarousel from '../PhotoCarousel/PhotoCarousel';
import RatingStars from "../../layouts/Ratings/RatingStars";
import { useNavigate } from "react-router-dom";
import { checkAuth } from '../Auth/CheckAuth';
import { fetchInfo } from '../../../api/fetchApi';

const ObjectList = ( {object} ) => {
    const [page, setPage] = useState(1);
    const [objects, setObjects] = useState(); 

    const navigate = useNavigate()
  useEffect(() => {
        setObjects(object || [])
        console.log(objects)
          const fetchData = async () => {
            if (object && object.length > 0) return;
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
                
                  console.log("HEre")
                  const dataObject = await fetchInfo(objectUrl);
                  console.log(dataObject)
                  setObjects(dataObject);
                  console.log(dataObject)
                  
              } catch (er) {
                  console.error('Fetch error:', er);
              }
          };
  
          fetchData();
  
          
      }, [object,navigate]);
    return (
        <div className="container2-main-object-list">
            { objects?.map((object) => (
                <div className="object-card-list" key={object.id}>
                    <div className="row-info-list">
                        <div className="image-row-list">
                            {object?.photos?.length > 1 ? (
                                <PhotoCarousel images={object?.photos} />
                            ) : object?.photos?.[0] ? (
                                <img src={object?.photos} alt={object.name} className="image-object" />
                            ) : null}

                            {object?.images?.length > 1 ? (
                                <PhotoCarousel images={object?.images.map(image => image?.imageUrl)} />
                            ) : object?.images?.[0]?.imageUrl ? (
                                <img src={object?.images[0]?.imageUrl} alt={object.name} className="image-object" />
                            ) : null}

                        </div>
                        <div className="main-info-list">
                            <div className="emoji-block-info-list">
                                <div className="emoji1-info-list">
                                    <RatingStars rating={object?.reviews?.starsCount} />
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
                                {`${object?.address?.postalCode} ${object?.address?.street} ${object?.address?.city} ${object?.address?.country}`}
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
