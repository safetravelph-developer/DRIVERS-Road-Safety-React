import {gql} from '@apollo/client'

export const UPDATE_POST = gql`
mutation updateIncident ($id: ID!) {
        incident_validate(id: $id) {
            id
            isVerified
          } 
        } 
`;

