import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import { fetchBestProporties } from '../../../api/apiForBestProposition';
import mainBackground from '../../../img/AboutImages/mainbackground.png';
import './BestProposition.css'
import { TbBuildingSkyscraper } from "react-icons/tb";
import { LuBedDouble } from "react-icons/lu";
import { LiaBathSolid } from "react-icons/lia";
import { BsArrowsMove } from "react-icons/bs";

const BestProposition = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchBestProporties(); 
                console.log(result);
                setData(result);
            } catch (err) {
                setError(err.message);
            }
        };

        loadData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const items = Array.isArray(data) ? data : [data];

    return (
        <div className="container-best">
            {items.length > 0 ? (
                items.map((item) => {
                    const address = item.address || {};
                    const special = item.special || {};

                    return (
                        <div className="card-best" key={item.id}>  
                            <div className="div-card-best">
                                <img src={mainBackground} alt="" className="image-card" />
                            </div>
                            <div className="index-best">{address.postalCode || 'N/A'}</div>
                            <div className="adress-best">{address.street || 'No Street'}, {address.city || 'No City'}</div>
                            <div className="blockes-best">
                                <div className="block-best">
                                    <TbBuildingSkyscraper className="icons-best" />
                                    <p>{special.roomCount || 0} Room</p>
                                </div>
                                <div className="block-best">
                                    <LuBedDouble className="icons-best" />
                                    <p>{special.totalCapacity || 0} Capacity</p>
                                </div>
                                <div className="block-best">
                                    <LiaBathSolid className="icons-best" />
                                    <p>{special.toiletCount || 0} Bath</p>
                                </div>
                                <div className="block-best">
                                    <BsArrowsMove className="icons-best" />
                                    <p>{item.square || 0} Square</p>
                                </div>
                            </div>
                            <div className="price-and-button-best">
                                <div className="price-best">{item.price ? `${item.price}$/day` : 'Price not available'}</div>
                                <button className="button-read-more-best"  onClick={() => navigate(`/object/${item.id}`)}>Read more</button>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div>No items available</div>
            )}
        </div>
    );
};

export default BestProposition;
