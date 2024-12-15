import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './PhotoCarousel.css'
const PhotoCarousel = ({ images }) => {
    const settings = {
        dots: true,  
        infinite: true,  
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <button className="slick-next">→</button>,
        prevArrow: <button className="slick-prev">←</button>,
    };

    return (
        <div className="photo-carousel">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="carousel-image-wrapper">
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="image-object"
                            
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default PhotoCarousel;
