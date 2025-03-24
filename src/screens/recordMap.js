import React from "react";
import GoogleMapReact from 'google-map-react';

// Component for a custom marker using an image
const AnyReactComponent = (props) => (
  <div {...props}>
    <img src="http://maps.google.com/mapfiles/ms/icons/blue.png" alt="marker" />
  </div>
);

// Marker component that displays a circular marker using a custom image
const Marker = ({ markerUrl }) => (
  <div style={{
    width: '32px',
    height: '32px',
    backgroundImage: `url(${markerUrl})`,
    backgroundSize: 'cover',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer'
  }} />
);

export default function SimpleMap() {

  // Default map properties with center coordinates fetched from sessionStorage
  const defaultProps = {
    center: {
      lat: parseFloat(sessionStorage.getItem("lat")),
      lng: parseFloat(sessionStorage.getItem("lng"))
    },
    zoom: 17 // Default zoom level
  };

  // Retrieve stored latitude and longitude from sessionStorage
  const storedLat = parseFloat(sessionStorage.getItem('lat'));
  const storedLng = parseFloat(sessionStorage.getItem('lng'));

  // Define specific marker position based on stored coordinates
  const specificMarker = {
    lat: storedLat,
    lng: storedLng
  };

  // State to track marker position, initially set to default center
  const [markerPosition, setMarkerPosition] = React.useState(defaultProps.center);

  // Function to handle map center change
  const handleMapChange = ({ center }) => {
    setMarkerPosition(center);
  };

  return (
    // Important! Always set the container height explicitly
    <div className="record-map">
      <div className="record-map-div">
        <GoogleMapReact
          // Note: The API key should be stored in a .env file as REACT_APP_GOOGLE_API_KEY
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onChange={handleMapChange}
          options={{ disableDefaultUI: true, zoomControl: false }}
        >
          {/* Render a marker at the specific coordinates */}
          <Marker
            lat={specificMarker.lat}
            lng={specificMarker.lng}
            markerUrl={'http://maps.google.com/mapfiles/ms/icons/blue.png'} // Custom marker image URL
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}
