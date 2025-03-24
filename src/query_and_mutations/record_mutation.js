import { gql } from '@apollo/client';

/**
 * NOTE: The mutation depends on user input and the GraphQL API endpoint
 * is configured in the .env file.
 */

export const CREATE_POST = gql`
mutation CreatePost ($description: String!, $encodeEmail: String!, $dateTime: DateTime!, $collisionType: CollisionTypeEnum, 
$weather: WeatherEnum!, $light: LightEnum, $lat_convert: Float!, $lng_convert: Float!, $loc: String, $locationApproximate: Boolean!, 
$mainCause: MainCauseEnum, $reportingAgency: AgencyEnum, $crashType:  CrashTypeEnum!,  $notes: String, $parties: [PartyInput!]!
) {
  incident_add(entity: {
          isVerified: false,
          incidentDetails: {
              collisionType: $collisionType,
              fromDateTime: $dateTime,
              toDateTime: $dateTime,
              description: $description,
              encoderEmail: $encodeEmail,
              light: $light,
              location: {
                  latitude: $lat_convert,
                  longitude: $lng_convert,
                  address: $loc
              },
              locationApproximate: $locationApproximate,
              mainCause: $mainCause,
              reportingAgency: $reportingAgency,
              severities: INJURY,
              weather: $weather
          },
          crashDiagram: {
            crashType: $crashType,
            movementCode: ""
          },
          notes: $notes,
          parties: $parties
      }
  ) {
      id
      incidentDetails {
        location {
            latitude
            longitude
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
        id
        name
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
        photos {
          url
        }
      }
      notes
      crashDiagram {
        id
        crashType
        movementCode
      }
      isVerified
    }
  }
`;
