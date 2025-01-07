import React from 'react';
const apiKey = process.env.REACT_APP_API_KEY;

const MapComponent = ({ latitude, longitude, zoom = 14, placeName }) => {
  const googleMapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}&zoom=${zoom}`;

  return (
    <div style={{ width: '100%', height: '400px' ,
    }}>
      <iframe
        title={placeName || 'Google Map'}
        src={googleMapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 ,borderRadius: '10px'}}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapComponent;
