import {gql} from '@apollo/client'

export const UPDATE_POST = gql`
 query findOneIncident($id: ID!) {
    incident_findOneById(id: $id, options: {}) {
    id
    incidentDetails {
      id
      location {
          latitude
          longitude
          address
      }
      fromDateTime
      toDateTime
      weather
      light
      severities
      mainCause
      collisionType
      reportingAgency
      encoderEmail
      description
      locationApproximate
    }
    parties {
      name
      partyIndex
        adults {
            involvement
            firstName
            lastName
            address
            gender
            licenseNumber
            age
            driverError
            injury
            alchoholSuspicion
            drugsSuspicion
            seatbeltState
            hospital
          }
        minors {
          gradeLevel
          involvement
          firstName
          lastName
          address
          gender
          licenseNumber
          age
          driverError
          injury
          alchoholSuspicion
          drugsSuspicion
          seatbeltState
          hospital
        }
        vehicle {
          classification
          vehicleType
          make
          plateNumber
          model
          maneuver
          damages
          defects
          loading
          insuranceDetails
          engineNumber
          chassisNumber
        }
    }
    notes
    crashDiagram {
      crashType
      movementCode
    }
    isVerified
  }
}
`;

