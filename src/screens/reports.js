import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import ReportDialog from '../components/ReportDialog';
import { useQuery, gql } from '@apollo/client';

// Note: The GraphQL API endpoint depends on the user's environment variables (.env)
const GET_LOCATIONS = gql`
query sampleFindAll($page: Float!, $startDate: DateTime, $endDate: DateTime, $childChecker: Boolean, $sortDirection: String) {
  incident_findAllByFilterWithPagination(filters: { fromDate: $startDate, toDate: $endDate, isVerified: true, hasMinors: $childChecker }, 
    options: { paginationOption: { page: $page, resultsPerPage: 30 }, sortOptions: { by: "createdAt", direction: $sortDirection } }) {
    paginationDetails { page, resultsPerPage, totalCount, hasPreviousPage, hasNextPage, previousPage, nextPage, numberOfPages }
    entities { id, isVerified, incidentDetails { id, mainCause, collisionType, reportingAgency, weather, light, severities, encoderEmail, location { address }, fromDateTime } }
  }
}`;

const GET_LOCATIONS_1 = gql`
query sampleFindAll($page: Float!, $startDate: DateTime, $endDate: DateTime, $sortDirection: String) {
  incident_findAllByFilterWithPagination(filters: { fromDate: $startDate, toDate: $endDate, isVerified: true }, 
    options: { paginationOption: { page: $page, resultsPerPage: 30 }, sortOptions: { by: "createdAt", direction: $sortDirection } }) {
    paginationDetails { page, resultsPerPage, totalCount, hasPreviousPage, hasNextPage, previousPage, nextPage, numberOfPages }
    entities { id, isVerified, incidentDetails { id, mainCause, collisionType, reportingAgency, weather, light, severities, encoderEmail, location { address }, fromDateTime } }
  }
}`;


export default function Report({ incident }) {

  // State to manage the visibility of a UI element (e.g., a modal or filter panel)
  const [open, setOpen] = React.useState(true);

  // useEffect to check session storage for a "report-filter" value on component mount
  // If not found, keep the UI element open; otherwise, close it
  React.useEffect(() => {
    const reportFilter = sessionStorage.getItem("report-filter");
    setOpen(reportFilter === null);
  }, []);

  // Function to handle closing the UI element
  const handleClose = () => {
    setOpen(false);
  };

  // State for pagination (default page is 1)
  const [page, setPage] = React.useState(1);
  const pageSize = 30; // Number of results per page

  // Retrieving date filters from session storage
  var startDate = sessionStorage.getItem("start-date-filter");
  var endDate = sessionStorage.getItem("end-date-filter");

  // State for sorting direction (default is descending order)
  const [sortDirection, setSortDirection] = React.useState('DESC');

  // Retrieving child filter from session storage
  var childFilter = sessionStorage.getItem("childFilter");
  var queryToUse; // Variable to store the appropriate GraphQL query
  var childChecker; // Boolean value to determine child-related filtering

  // Check if childFilter is "true" (string), then set childChecker accordingly
  // Choose the appropriate GraphQL query based on childFilter value
  if (childFilter === "true") {
    childChecker = true;
    queryToUse = GET_LOCATIONS;
  } else {
    childChecker = false;
    queryToUse = GET_LOCATIONS_1;
  }

  // Fetch data using GraphQL query with variables from session storage
  const { loading, error, data, refetch } = useQuery(queryToUse, {
    fetchPolicy: 'network-only', // Ensures fresh data is always fetched
    variables: { page, pageSize, startDate, endDate, childChecker, sortDirection },
  });

  // Function to handle page changes and fetch new data
  const handlePageChange = (event) => {
    const newPage = Number(event.target.value);
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      refetch({ page: newPage, pageSize, startDate, endDate, childChecker, sortDirection });
    }
  };

  // Function to handle sorting changes, resets page to 1 and fetches sorted data
  const handleSortChange = (direction) => {
    setSortDirection(direction);
    setPage(1);
    refetch({ page: 1, pageSize, startDate, endDate, childChecker, sortDirection });
  };

  // Display loading message if data is still being fetched
  if (loading) return console.log('Loading ..');

  // Display error message if there is an error fetching data
  if (error) return console.log(error.message);

  // Calculate total number of pages based on total count from GraphQL response
  const totalPages = Math.ceil(data.incident_findAllByFilterWithPagination.paginationDetails.totalCount / pageSize);

  return (
    <div>
      <Header></Header>
      <React.Fragment>
        <CssBaseline />
        <div>
          <table>
            <thead>
              <tr>
                <th>{sessionStorage.getItem("report-filter")}</th>
                <th>Location</th>
                <th>Severity</th>
                <th>Date and Time</th>
                <th>Weather</th>
                <th>Light</th>
                <th>Encoder Email</th>
              </tr>
            </thead>
            <tbody>
              {data.incident_findAllByFilterWithPagination.entities.map(incident => (

                <tr key={incident.id}>
                  <td>
                    {sessionStorage.getItem("report-filter") === "Main Cause"
                      ? incident.incidentDetails.mainCause
                      : sessionStorage.getItem("report-filter") === "Collision Type"
                        ? incident.incidentDetails.collisionType
                        : sessionStorage.getItem("report-filter") === "Reporting Agency"
                          ? incident.incidentDetails.reportingAgency
                          : null}
                  </td>
                  <td>{incident.incidentDetails.location.address}</td>
                  <td>{incident.incidentDetails.severities.join(', ')}</td>
                  <td>{incident.incidentDetails.fromDateTime}</td>
                  <td>{incident.incidentDetails.weather}</td>
                  <td>{incident.incidentDetails.light}</td>
                  <td>{incident.incidentDetails.encoderEmail}</td>
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
        <ReportDialog open={open} onClose={handleClose}></ReportDialog>
      </React.Fragment>
      <Outlet></Outlet>
    </div>
  );
}

