import "./list.css";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import * as React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import ViewRecord from "../components/ViewRecord";
import { UPDATE_POST } from "../query_and_mutations/update_record";

// Note: This query depends on the GraphQL API endpoint set in the .env file.
const GET_LOCATIONS = gql`
  query sampleFindAll($page: Float!, $sortDirection: String) {
    incident_findAllByFilterWithPagination(
      filters: { isVerified: false },
      options: { paginationOption: { page: $page, resultsPerPage: 30 }, sortOptions: { by: "createdAt", direction: $sortDirection } }
    ) {
      paginationDetails { page, resultsPerPage, totalCount, hasPreviousPage, hasNextPage, previousPage, nextPage, numberOfPages }
      entities {
        id, isVerified, notes
        incidentDetails {
          id, location { latitude, longitude, address }, collisionType, description, encoderEmail, light, locationApproximate,
          mainCause, reportingAgency, severities, weather, fromDateTime, toDateTime
        }
        parties {
          id
          adults { id, firstName, middleName, lastName, gender, involvement, address, licenseNumber, age, driverError, 
                   alchoholSuspicion, drugsSuspicion, seatbeltState, hospital }
          minors { id, firstName, middleName, lastName, gender, gradeLevel, involvement, address, licenseNumber, age, driverError, 
                   alchoholSuspicion, drugsSuspicion, seatbeltState, hospital }
          vehicle { id, classification, vehicleType, make, plateNumber, model, maneuver, damages, defects, loading, insuranceDetails, 
                    engineNumber, chassisNumber }
          photos { id, url }
        }
      }
    }
  }
`;


function Stph() {

  // State to manage the visibility of a dialog (modal)
  const [dialogIsOpen1, setDialogIsOpen1] = React.useState(false);

  // Function to open the dialog
  const openDialog1 = () => setDialogIsOpen1(true);

  // State to manage the current page number for pagination
  const [page, setPage] = React.useState(1);

  // Number of items displayed per page
  const pageSize = 20;

  // State to manage the visibility of the confirmation popup
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  // State to store the sorting direction (ascending or descending)
  const [sortDirection, setSortDirection] = React.useState('DESC');

  // Function to toggle the popup's visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Function to close the dialog and remove the "incident-id" from session storage
  const closeDialog1 = () => {
    setDialogIsOpen1(false);
    sessionStorage.removeItem("incident-id");
  };

  // Fetch data using the GraphQL query with pagination and sorting options
  const { loading, error, data, refetch } = useQuery(GET_LOCATIONS, {
    fetchPolicy: 'network-only', // Ensures fresh data is always fetched
    variables: { page, pageSize, sortDirection },
  });

  // Show loading state while fetching data
  if (loading) return console.log('Loading ..');

  // Show error message if the query fails
  if (error) return console.log(error.message);

  // Calculate the total number of pages based on the total records count
  const totalPages = Math.ceil(
    data.incident_findAllByFilterWithPagination.paginationDetails.totalCount / pageSize
  );

  // Function to handle page changes when the user inputs a page number
  const handlePageChange = (event) => {
    const newPage = Number(event.target.value);
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      refetch({ page: newPage, pageSize, sortDirection }); // Fetch updated data
    }
  };

  // Function to handle sorting changes (ASC or DESC)
  const handleSortChange = (direction) => {
    setSortDirection(direction);
    setPage(1); // Reset to the first page after sorting
    refetch({ page: 1, pageSize, sortDirection });
  };

  // Note: The UPDATE_POST query is defined in ../query_and_mutations/update_record and may change.
  const Popup = ({ onClose }) => {
    const [createPost_1, { data_2, error_2 }] = useMutation(UPDATE_POST, {
      fetchPolicy: 'network-only', // Ensures mutation results are not cached

      onCompleted: (data) => {
        if (data) {
          alert("Data has been added to the DRIVER database");
          window.location.reload(); // Refresh the page after successful submission
        }
      },
      onError: (error_2) => {
        console.error("Mutation error:", error_2);
        alert("An error occurred while submitting the form. Please try again.");
      },
    });

    return (
      <div className="popup">
        <div className="popup-inner">
          <h2>Are you sure you want to add this data to the DRIVER database?</h2>
          <button className="yes-btn" onClick={() => {
            const id = sessionStorage.getItem("incident-id");
            const description = sessionStorage.getItem("description");
            const encodeEmail = sessionStorage.getItem("email");
            const collisionType = sessionStorage.getItem("collision");
            const dateTime = sessionStorage.getItem("fromDate");
            const weather = sessionStorage.getItem("weather");
            const light = sessionStorage.getItem("light");
            const lat = sessionStorage.getItem("lat");
            const lng = sessionStorage.getItem("lng");
            const loc = sessionStorage.getItem("address");
            var locationApproximate = sessionStorage.getItem("approximate");
            const mainCause = sessionStorage.getItem("maincause");
            const reportingAgency = sessionStorage.getItem("agency");

            var lat_convert = parseFloat(lat);
            var lng_convert = parseFloat(lng);

            if (locationApproximate === "true") {
              locationApproximate = true;
            } else {
              locationApproximate = false;
            }

            createPost_1({
              variables: {
                id, description, encodeEmail, collisionType, dateTime, weather, light,
                lat_convert, lng_convert, loc, locationApproximate, mainCause,
                reportingAgency
              }
            });

            onClose();
          }}>Yes</button>
          <button className="no-btn" onClick={onClose}>No</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header></Header>
      <div>
        <table>
          <thead>
            <tr>
              <th style={{ fontSize: '14px' }}>Date and Time</th>
              <th style={{ fontSize: '14px' }}>Location</th>
              <th style={{ fontSize: '14px' }}>Validated Record?</th>
              {/* Add other headers */}
            </tr>
          </thead>
          <tbody>
            {data.incident_findAllByFilterWithPagination.entities.map(incident => (
              <tr key={incident.id}>
                { }
                <td>
                  <button className="date-time-button"
                    onClick={() => {
                      sessionStorage.setItem('incident-id', incident.id);
                      console.log(sessionStorage.getItem("incident-id"))
                      openDialog1();
                      // console.log(sessionStorage.getItem("incident-id"))
                    }}>{incident.incidentDetails.fromDateTime}
                  </button>

                </td>
                <td>{incident.incidentDetails.location.address}</td>
                <td>
                  <button className="database-btn"
                    onClick={() => {
                      sessionStorage.setItem("incident-id", incident.id);
                      sessionStorage.setItem("lat", incident.incidentDetails.location.latitude)
                      sessionStorage.setItem("lng", incident.incidentDetails.location.longitude)
                      sessionStorage.setItem("address", incident.incidentDetails.location.address)
                      sessionStorage.setItem("fromDate", incident.incidentDetails.fromDateTime)
                      sessionStorage.setItem("toDate", incident.incidentDetails.toDateTime)
                      sessionStorage.setItem("weather", incident.incidentDetails.weather)
                      sessionStorage.setItem("light", incident.incidentDetails.light)
                      sessionStorage.setItem("severities", incident.incidentDetails.severities)
                      sessionStorage.setItem("maincause", incident.incidentDetails.mainCause)
                      sessionStorage.setItem("collision", incident.incidentDetails.collisionType)
                      sessionStorage.setItem("agency", incident.incidentDetails.reportingAgency)
                      sessionStorage.setItem("email", incident.incidentDetails.encoderEmail)
                      sessionStorage.setItem("description", incident.incidentDetails.description)
                      sessionStorage.setItem("approximate", incident.incidentDetails.locationApproximate)
                      togglePopup()
                    }
                    }>ADD to DRIVER dbase</button>
                  {isPopupOpen && <Popup onClose={togglePopup} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button className='pagination-button' onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
            Previous
          </button>
          <input
            type="number"
            value={page}
            onChange={handlePageChange}
            min="1"
            max={totalPages}
            style={{ width: '60px', marginLeft: '5px' }}
          />
          <span>&nbsp;&nbsp; / {totalPages}&nbsp;&nbsp;</span>
          <button className='next-button'
            onClick={() => {
              const newPage = Math.min(page + 1, totalPages);
              setPage(newPage);
              refetch({ page: newPage, pageSize, sortDirection });
            }}
            disabled={page === totalPages}
          >
            Next
          </button>

          <button className='asc-button' onClick={() => handleSortChange('ASC')}>
            Sort Ascending
          </button>
          <button className='desc-button' onClick={() => handleSortChange('DESC')}>
            Sort Descending
          </button>
        </div>
      </div>
      <ViewRecord open={dialogIsOpen1} onClose={closeDialog1}></ViewRecord>
      <Outlet></Outlet>
    </div>
  );
};

export default Stph;
