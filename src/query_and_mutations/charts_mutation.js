import { gql } from '@apollo/client';

/**
 * NOTE: The query depends on user input and the GraphQL API endpoint
 * is configured in the .env file.
 */

export const CHART_PD_2017 = gql`
query updateIncident  {
    incident_findAllByFilterWithPagination(filters: {fromDate: "2017-01-01 00:00:00", toDate: "2017-12-31 23:59:59", incidentDetailsSeverities: [PROPERTY_DAMAGE],
        isVerified: true
        }, options: {
          paginationOption: {
            page: 1
            resultsPerPage: 30
          }
        }) {
          paginationDetails {
            totalCount
          }
        }
  }  
`;

export const CHART_PD_2018 = gql`
query updateIncident  {
    incident_findAllByFilterWithPagination(filters: {fromDate: "2018-01-01 00:00:00", toDate: "2018-12-31 23:59:59", incidentDetailsSeverities: [PROPERTY_DAMAGE],
        isVerified: true
        }, options: {
          paginationOption: {
            page: 1
            resultsPerPage: 30
          }
        }) {
          paginationDetails {
            totalCount
          }
        }
  }  
`;

export const CHART_PD_2019 = gql`
query updateIncident  {
    incident_findAllByFilterWithPagination(filters: {fromDate: "2019-01-01 00:00:00", toDate: "2019-12-31 23:59:59", incidentDetailsSeverities: [PROPERTY_DAMAGE],
        isVerified: true
        }, options: {
          paginationOption: {
            page: 1
            resultsPerPage: 30
          }
        }) {
          paginationDetails {
            totalCount
          }
        }
  }  
`;

export const CHART_FATAL_2017 = gql`
query updateIncident  {
    incident_findAllByFilterWithPagination(filters: {fromDate: "2017-01-01 00:00:00", toDate: "2017-12-31 23:59:59", incidentDetailsSeverities: [FATAL],
        isVerified: true
        }, options: {
          paginationOption: {
            page: 1
            resultsPerPage: 30
          }
        }) {
          paginationDetails {
            totalCount
          }
        }
  }  
`;

export const CHART_FATAL_2018 = gql`
query updateIncident  {
    incident_findAllByFilterWithPagination(filters: {fromDate: "2018-01-01 00:00:00", toDate: "2018-12-31 23:59:59", incidentDetailsSeverities: [FATAL],
        isVerified: true
        }, options: {
          paginationOption: {
            page: 1
            resultsPerPage: 30
          }
        }) {
          paginationDetails {
            totalCount
          }
        }
  }  
`;

export const CHART_FATAL_2019 = gql`
query updateIncident  {
    incident_findAllByFilterWithPagination(filters: {fromDate: "2019-01-01 00:00:00", toDate: "2019-12-31 23:59:59", incidentDetailsSeverities: [FATAL],
        isVerified: true
        }, options: {
          paginationOption: {
            page: 1
            resultsPerPage: 30
          }
        }) {
          paginationDetails {
            totalCount
          }
        }
  }  
`;

export const CHART_INJURY_2017 = gql`
query updateIncident  {
    incident_findAllByFilterWithPagination(filters: {fromDate: "2017-01-01 00:00:00", toDate: "2017-12-31 23:59:59", incidentDetailsSeverities: [INJURY],
        isVerified: true
        }, options: {
          paginationOption: {
            page: 1
            resultsPerPage: 30
          }
        }) {
          paginationDetails {
            totalCount
          }
        }
  }  
`;

export const CHART_INJURY_2018 = gql`
query updateIncident  {
    incident_findAllByFilterWithPagination(filters: {fromDate: "2018-01-01 00:00:00", toDate: "2018-12-31 23:59:59", incidentDetailsSeverities: [INJURY],
        isVerified: true
        }, options: {
          paginationOption: {
            page: 1
            resultsPerPage: 30
          }
        }) {
          paginationDetails {
            totalCount
          }
        }
  }  
`;

export const CHART_INJURY_2019 = gql`
query updateIncident  {
    incident_findAllByFilterWithPagination(filters: {fromDate: "2019-01-01 00:00:00", toDate: "2019-12-31 23:59:59", incidentDetailsSeverities: [INJURY],
        isVerified: true
        }, options: {
          paginationOption: {
            page: 1
            resultsPerPage: 30
          }
        }) {
          paginationDetails {
            totalCount
          }
        }
  }  
`;
