import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '350px'
};

const center = {
      lat: parseFloat(sessionStorage.getItem("lat")),
      lng: parseFloat(sessionStorage.getItem("lng"))
};

const MyComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  return isLoaded ? (

    <GoogleMap
     mapContainerStyle={containerStyle}
      center={center}
      zoom={18}
      options={{
        disableDefaultUI: true, // Disable all default UI controls
        zoomControl: false // Disable zoom control specifically
      }}
    >
      <Marker
        position={center}
      />
    </GoogleMap>

  ) : <></>;
};

export default MyComponent;