import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './PhotoCarousel.css'

const PhotoCarousel = ({ images }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <button className="slick-next">→</button>,
        prevArrow: <button className="slick-prev">←</button>,
    };
    const openModal = (index) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="photo-carousel">
            <Slider {...settings}>
                {images?.map((image, index) => (
                    <div key={index} className="carousel-image-wrapper">
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="image-object"
                            onClick={() => openModal(index)} // Открытие модалки
                        />
                    </div>
                ))}
            </Slider>

            {/* Модалка для увеличенных изображений */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>✖</button>
                        <Slider {...settings} initialSlide={currentImageIndex}>
                            {images.map((image, index) => (
                                <div key={index} className="modal-image-wrapper">
                                    <img
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        className="modal-image"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoCarousel;
