import { useQuery } from '@apollo/client';
import { GoogleMap, HeatmapLayer, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { gql } from 'apollo-boost';
import React, { useEffect, useRef, useState } from 'react';
import { FaLayerGroup } from "react-icons/fa";
import RecordDialog from "../components/RecordDialog";
import ViewRecord from "../components/ViewRecord";

// NOTE: The user can modify this GraphQL query based on the credentials and API endpoint 
// provided in the .env file. Ensure that the required variables are set correctly.

const FIND_ALL_INCIDENTS_QUERY = gql`
  query findAllValidatedByFilterWithPagination1($startDate: DateTime, $endDate: DateTime) {
    incident_findAllByFilterWithPagination(
      filters: { fromDate: $startDate, toDate: $endDate, isVerified: true },
      options: { paginationOption: { page: 1, resultsPerPage: 3000 } }
    ) {
      paginationDetails {
        page resultsPerPage totalCount hasPreviousPage hasNextPage previousPage nextPage numberOfPages
      }
      entities {
        id isVerified
        incidentDetails {
          id location { latitude longitude address }
          fromDateTime toDateTime
        }
        parties {
          id minors {
            id firstName middleName lastName gender gradeLevel involvement address licenseNumber age 
            driverError alchoholSuspicion drugsSuspicion seatbeltState hospital
          }
        }
      }
    }
  }
`;

// NOTE: Similar to the above query, this query includes an additional filter (`hasMinors: true`).
// The user can modify this based on their GraphQL API setup in the .env file.

const FIND_ALL_INCIDENTS_QUERY_1 = gql`
  query findAllValidatedByFilterWithPagination1($startDate: DateTime, $endDate: DateTime) {
    incident_findAllByFilterWithPagination(
      filters: { fromDate: $startDate, toDate: $endDate, isVerified: true, hasMinors: true },
      options: { paginationOption: { page: 1, resultsPerPage: 3000 } }
    ) {
      paginationDetails {
        page resultsPerPage totalCount hasPreviousPage hasNextPage previousPage nextPage numberOfPages
      }
      entities {
        id isVerified
        incidentDetails {
          id location { latitude longitude address }
          fromDateTime toDateTime
        }
        parties {
          id minors {
            id firstName middleName lastName gender gradeLevel involvement address licenseNumber age 
            driverError alchoholSuspicion drugsSuspicion seatbeltState hospital
          }
        }
        notes
      }
    }
  }
`;

const MapComponent = () => {
  var startDate = sessionStorage.getItem("start-date-filter");
  var endDate = sessionStorage.getItem("end-date-filter");

  // Checkbox state management
  const [checkedBoxes, setCheckedBoxes] = useState([false, false, false, false]);

  // State for markers, heatmap, and interaction
  const [showMarkers, setShowMarkers] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  const [heatmapData, setHeatmapData] = useState([]);
  const [queryData, setQueryData] = useState([]);
  const divRef = useRef(null);
  const [hoveringMouse, sethoveringMouse] = useState(true);
  const [hoveringMouse2, sethoveringMouse2] = useState(false);

  const handleCheckboxChange = (index) => {
    const updatedCheckedBoxes = [false, false, false, false];
    updatedCheckedBoxes[index] = !checkedBoxes[index];
    setCheckedBoxes(updatedCheckedBoxes);
    setShowMarkers(updatedCheckedBoxes[0] || updatedCheckedBoxes[2]);
    setShowHeatmap(updatedCheckedBoxes[1] || updatedCheckedBoxes[3]);
    setHeatmapData([]); // Reset heatmap data
  };

  // Fetch data using queries
  const { data: data1 } = useQuery(FIND_ALL_INCIDENTS_QUERY, {
    skip: !checkedBoxes[0] && !checkedBoxes[1],
    variables: { startDate, endDate }
  });

  const { data: data2 } = useQuery(FIND_ALL_INCIDENTS_QUERY_1, {
    skip: !checkedBoxes[2] && !checkedBoxes[3],
    variables: { startDate, endDate }
  });

  useEffect(() => {
    let incidents = [];
    if (data1 && (checkedBoxes[0] || checkedBoxes[1])) incidents = data1.incident_findAllByFilterWithPagination.entities;
    if (data2 && (checkedBoxes[2] || checkedBoxes[3])) incidents = data2.incident_findAllByFilterWithPagination.entities;
    setQueryData(incidents);
    setHeatmapData(incidents.map(incident => ({
      location: new window.google.maps.LatLng(
        incident.incidentDetails.location.latitude,
        incident.incidentDetails.location.longitude
      ),
      weight: 1
    })));
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        sethoveringMouse(true);
        sethoveringMouse2(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [data1, data2, checkedBoxes]);

  const gradient = [
    "rgba(0, 255, 255, 0)", "rgba(0, 255, 255, 1)", "rgba(0, 191, 255, 1)", "rgba(0, 127, 255, 1)", "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)", "rgba(0, 0, 223, 1)", "rgba(0, 0, 191, 1)", "rgba(0, 0, 159, 1)", "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)", "rgba(127, 0, 63, 1)", "rgba(191, 0, 31, 1)", "rgba(255, 0, 0, 1)"
  ];

  const handleClick = (e) => {
    if (sessionStorage.getItem("record-button") === 'clicked') {
      sessionStorage.setItem("lat", e.latLng.lat());
      sessionStorage.setItem("lng", e.latLng.lng());
      new window.google.maps.Geocoder().geocode(
        { location: { lat: e.latLng.lat(), lng: e.latLng.lng() } },
        (results, status) => {
          if (status === 'OK' && results[0]) {
            sessionStorage.setItem("loc", results[0].formatted_address);
          }
        }
      );
    }
  };

  const mapStyles = [
    { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
    { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] }
  ];

  return (
    <div style={{ position: 'relative', height: '95vh', width: '100%' }}>
      {/* Floating Control Box */}
      <div style={{ position: 'relative', top: '10px', right: '10px', zIndex: 1000, backgroundColor: 'white', padding: '10px', borderRadius: '5px', fontSize: '13px', float: 'right', border: '2px solid grey' }}>
        {/* Layer Toggle Button */}
        <button
          style={{ width: '30px', height: '20px', fontSize: '20px', border: 'none', backgroundColor: 'white' }}
          onClick={OpenLayerMenu}
          hidden={hoveringMouse2}>
          <FaLayerGroup style={{ border: 'none' }} />
        </button>

        {/* Checkbox Layer Menu */}
        <div
          ref={divRef}
          style={{
            top: '20px',
            right: '10px',
            backgroundColor: 'white',
            padding: '5px',
            borderRadius: '5px',
            fontSize: '12px'
          }}
          hidden={hoveringMouse}>
          {['Incidents (all)', 'Heatmap (all)', 'Incidents (children only)', 'Heatmap (children only)'].map((label, index) => (
            <label key={index}>
              <input type="checkbox" checked={checkedBoxes[index]} onChange={() => handleCheckboxChange(index)} />
              &nbsp;{label}
              <br />
            </label>
          ))}
        </div>
      </div>

      {/* Google Maps Integration */}
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={["visualization"]}>
        <GoogleMap
          mapContainerStyle={{ position: 'absolute', width: '100%', height: '95vh' }}
          center={{ lat: 14.5995, lng: 120.9842 }}
          zoom={11}
          options={{
            disableDefaultUI: true,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: mapStyles,
          }}
          onClick={handleClick}>

          {/* Incident Markers */}
          {showMarkers && queryData.map(incident => (
            <Marker
              key={incident.id}
              position={{
                lat: incident.incidentDetails.location.latitude,
                lng: incident.incidentDetails.location.longitude,
              }}
              title={incident.incidentDetails.location.address}
              icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue.png" }}
              onClick={() => onSelectMarker(incident)}
              zIndex={selectedMarker === incident ? 1000 : 1}
            />
          ))}

          {/* Heatmap Layer */}
          {showHeatmap && (
            <HeatmapLayer
              data={heatmapData}
              options={{ radius: 20, opacity: 1.1, gradient }}
            />
          )}

          {/* InfoWindow Popup */}
          {infoWindowVisible && selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.incidentDetails.location.latitude,
                lng: selectedMarker.incidentDetails.location.longitude,
              }}
              onCloseClick={() => {
                setInfoWindowVisible(false);
                setSelectedMarker(null);
              }}>
              <div>
                <h2>{selectedMarker.incidentDetails.fromDateTime}</h2>
                <p>{selectedMarker.incidentDetails.location.address}</p>
                <button
                  onClick={() => {
                    sessionStorage.setItem("incident-id", selectedMarker.id);
                    openDialog6();
                  }}>
                  View
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {/* Dialog Components */}
      <RecordDialog open={dialogIsOpen1} onClose={closeDialog1} />
      <ViewRecord open={dialogIsOpen6} onClose={closeDialog6} />
    </div>
  );
};

export default MapComponent;
