// Import marker icon for map
import blueDotMarker from '../assets/bluecircle.png'; 
import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import RecordDialog from "../components/RecordDialog";
import { FaLayerGroup } from "react-icons/fa";
import { useQuery, gql } from '@apollo/client';

// NOTE: The user can set the Google API key in the .env file using:
// REACT_APP_GOOGLE_API_KEY=your_api_key_here

// GraphQL query to fetch incident locations
const GET_LOCATIONS = gql`
query findAllValidatedByFilterWithPagination {
  incident_findAllValidatedByFilterWithPagination(filters: {
    fromDate: "2015-01-01 00:00:00",
    toDate: "2024-12-31 23:59:59",
  }, options: {
    paginationOption: {
      page: 4
      resultsPerPage: 100
    }
  }) {
    entities {
      id
      isVerified
      incidentDetails {
        id
        location {
          latitude
          longitude
          address
        }
      }
    }
    paginationDetails {
      page
      resultsPerPage
    }
  }
}
`;

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showHeatmap: false,
          showMarkers: false,
          showHeatmap2: false,
          showMarkers2: false,
          latitude: null,
          longitude: null,
          locationName: '',
          openDialog: false,
          hoveringMouse: true,
          hoveringMouse2: false,
          isVisible: true 
        };

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  // Handle clicks outside the layer menu to close it
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        hoveringMouse: true,
        hoveringMouse2: false
      });
    }
  }

  // Toggle visibility of heatmaps and markers
  toggleHeatmap = () => {
    this.setState({ showHeatmap: !this.state.showHeatmap });
  };

  toggleMarkers = () => {
    this.setState({ showMarkers: !this.state.showMarkers });
  };

  toggleHeatmap2 = () => {
    this.setState({ showHeatmap2: !this.state.showHeatmap2 });
  };

  toggleMarkers2 = () => {
    this.setState({ showMarkers2: !this.state.showMarkers2 });
  };

  // Open and close dialog for recording incidents
  handleOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
    sessionStorage.setItem("record-button", "not-clicked");
  };

  // Open layer menu
  OpenLayerMenu = () => {
    this.setState({ hoveringMouse: false, hoveringMouse2: true });
  };

  // Handle map click to record incident location
  handleMapClick = (mapProps, map, clickEvent) => {
    const { latLng } = clickEvent;
    var recordbutton = sessionStorage.getItem("record-button");

    if (recordbutton === 'clicked') {
      // Check if latLng is valid
      if (latLng && latLng.lat && latLng.lng) {
        const latitude = latLng.lat();
        const longitude = latLng.lng();

        // Reverse geocoding to get location address
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              const locationName = results[0].formatted_address;
              this.setState({ latitude, longitude, locationName });
              console.log(locationName);
              sessionStorage.setItem("lat", latitude);
              sessionStorage.setItem("lng", longitude);
              sessionStorage.setItem("loc", locationName);
              this.setState({ openDialog: true });
            }
          } else {
            console.error('Geocoder failed due to: ', status);
          }
        });
      } else {
        console.error('Invalid LatLng object: ', latLng);
      }
    }
  };

  render() {
    return (
      <div style={{ position: 'relative', height: '95vh', width: '100%' }}>
        {/* Layer menu button */}
        <div style={{ position: 'relative', top: '10px', right: '10px', zIndex: 1000, backgroundColor: 'white', padding: '10px', borderRadius: '5px', fontSize: '13px', float: 'right', border: '2px solid grey'}}>
          <button style={{width: '30px', height: '20px', fontSize: '20px', border: 'none', backgroundColor: 'white'}}
                onClick={this.OpenLayerMenu} hidden={this.state.hoveringMouse2}>
            <FaLayerGroup style={{border: 'none'}}/>
          </button>

          {/* Layer options */}
          <div ref={this.wrapperRef} style={{ top: '20px', right: '10px', backgroundColor: 'white', padding: '5px', borderRadius: '5px', fontSize: '12px' }} hidden={this.state.hoveringMouse}>
            <label>
              <input type="checkbox" checked={this.state.showMarkers} onChange={this.toggleMarkers} />
              &nbsp;Incidents (all)
            </label>
            <br />
            <label>
              <input type="checkbox" checked={this.state.showHeatmap} onChange={this.toggleHeatmap} style={{ marginTop: '3px' }} />
              &nbsp;Heatmap (all)
            </label>
            <br />
            <label>
              <input type="checkbox" checked={this.state.showMarkers2} onChange={this.toggleMarkers2} style={{ marginTop: '3px' }} />
              &nbsp;Incidents (children only)
            </label>
            <br />
            <label>
              <input type="checkbox" checked={this.state.showHeatmap2} onChange={this.toggleHeatmap2} style={{ marginTop: '3px' }} />
              &nbsp;Heatmap (children only)
            </label>
          </div>
        </div> 

        {/* Google Map component */}
        <Map   
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: 14.5995,
            lng: 120.9842
          }}
          mapTypeControl={false}
          onClick={this.handleMapClick}
        >
          {/* Render markers from GraphQL data */}
          <MarkersWithData />
        </Map>

        {/* Dialog for recording incidents */}
        <RecordDialog open={this.state.openDialog} onClose={this.handleCloseDialog} />
      </div>
    );
  }
}

// Component to fetch and display markers using GraphQL query
function MarkersWithData() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {data.incident_findAllValidatedByFilterWithPagination.entities.map(item => (
        <Marker
          key={item.id}
          position={{ lat: item.incidentDetails.location.latitude, lng: item.incidentDetails.location.longitude }}
          title={item.incidentDetails.location.address}
          icon={{ url: blueDotMarker }}
        />
      ))}
    </>
  );
}


// NOTE: The user can set the Google API key in the .env file using:
// REACT_APP_GOOGLE_API_KEY=your_api_key_here
// Export MapContainer with Google Maps API key from .env

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);
