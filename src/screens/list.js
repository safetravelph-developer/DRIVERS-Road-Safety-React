
import { gql, useQuery } from '@apollo/client';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import ViewRecord from '../components/ViewRecord';
import "./list.css";

// NOTE: The user can modify this GraphQL query based on the credentials and API endpoint 
// provided in the .env file. Ensure that the required variables are set correctly.

const GET_LOCATIONS = gql`
  query sampleFindAll($page: Float!, $startDate: DateTime, $endDate: DateTime, $childChecker: Boolean, $sortDirection: String) {
    incident_findAllByFilterWithPagination(
      filters: { fromDate: $startDate, toDate: $endDate, isVerified: true, hasMinors: $childChecker },
      options: { paginationOption: { page: $page, resultsPerPage: 30 }, sortOptions: { by: "createdAt", direction: $sortDirection } }
    ) {
      paginationDetails { page resultsPerPage totalCount hasPreviousPage hasNextPage previousPage nextPage numberOfPages }
      entities {
        id isVerified
        incidentDetails {
          id location { latitude longitude address }
          collisionType description encoderEmail light locationApproximate mainCause reportingAgency severities weather
          fromDateTime toDateTime
        }
        parties { id minors { id firstName middleName lastName gender gradeLevel involvement address licenseNumber age 
          driverError alchoholSuspicion drugsSuspicion seatbeltState hospital } }
        notes
      }
      paginationDetails { page resultsPerPage }
    }
  }
`;

// NOTE: This GraphQL query is similar to GET_LOCATIONS but without the 'hasMinors' filter. 
// Users can adjust it depending on their GraphQL API setup in the .env file.

const GET_LOCATIONS_1 = gql`
  query sampleFindAll($page: Float!, $startDate: DateTime, $endDate: DateTime, $sortDirection: String) {
    incident_findAllByFilterWithPagination(
      filters: { fromDate: $startDate, toDate: $endDate, isVerified: true },
      options: { paginationOption: { page: $page, resultsPerPage: 30 }, sortOptions: { by: "createdAt", direction: $sortDirection } }
    ) {
      paginationDetails { page resultsPerPage totalCount hasPreviousPage hasNextPage previousPage nextPage numberOfPages }
      entities {
        id isVerified
        incidentDetails {
          id location { latitude longitude address }
          collisionType description encoderEmail light locationApproximate mainCause reportingAgency severities weather
          fromDateTime toDateTime
        }
        parties { id minors { id firstName middleName lastName gender gradeLevel involvement address licenseNumber age 
          driverError alchoholSuspicion drugsSuspicion seatbeltState hospital } }
        notes
      }
      paginationDetails { page resultsPerPage }
    }
  }
`;

function List() {
  // State to manage dialog visibility
  const [dialogIsOpen1, setDialogIsOpen1] = React.useState(false);
  const openDialog1 = () => setDialogIsOpen1(true);

  // State to manage pagination
  const [page, setPage] = React.useState(1);
  const pageSize = 30; // Number of items per page
  const [sortDirection, setSortDirection] = React.useState('DESC');

  // Retrieve date filters from session storage
  var startDate = sessionStorage.getItem("start-date-filter");
  var endDate = sessionStorage.getItem("end-date-filter");

  // Function to close dialog and clear session storage
  const closeDialog1 = () => {
    setDialogIsOpen1(false);
    sessionStorage.removeItem("incident-id");
  }

  // Determine which GraphQL query to use based on child filter
  var childFilter = sessionStorage.getItem("childFilter");
  var queryToUse = childFilter === "true" ? GET_LOCATIONS : GET_LOCATIONS_1;
  var childChecker = childFilter === "true";

  // Fetch data using the selected query
  const { loading, error, data, refetch } = useQuery(queryToUse, {
    fetchPolicy: 'network-only',
    variables: { page, pageSize, startDate, endDate, childChecker, sortDirection },
  });

  // Handle pagination input changes
  const handlePageChange = (event) => {
    const newPage = Number(event.target.value);
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      refetch({ page: newPage, pageSize, startDate, endDate, childChecker, sortDirection });
    }
  };

  // Handle sorting changes
  const handleSortChange = (direction) => {
    setSortDirection(direction);
    setPage(1);
    refetch({ page: 1, pageSize, startDate, endDate, childChecker, sortDirection });
  };

  if (loading) return console.log('Loading ..');
  if (error) return console.log(error.message);

  // Calculate total pages based on fetched data
  const totalPages = Math.ceil(data.incident_findAllByFilterWithPagination.paginationDetails.totalCount / pageSize);


  return (
    <div>
      <Header></Header>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date and Time</th>
              <th>Location</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {data.incident_findAllByFilterWithPagination.entities.map(incident => (

              <tr key={incident.id}>
                <td>
                  <button className="date-time-button"
                    onClick={() => {
                      sessionStorage.setItem("incident-id", incident.id);
                      openDialog1();
                    }}>{incident.incidentDetails.fromDateTime}
                  </button>
                </td>
                <td>{incident.incidentDetails.location.address}</td>
                <td>{incident.incidentDetails.severities.join(', ')}</td>
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
              refetch({ page: newPage, pageSize, startDate, endDate, childChecker, sortDirection });
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

export default List;
