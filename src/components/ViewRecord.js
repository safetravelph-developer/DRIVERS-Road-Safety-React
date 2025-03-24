import { Tabs, Tab, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { UPDATE_POST } from '../query_and_mutations/view_record';
import { useQuery } from '@apollo/client';
import { Divider } from '@mui/material'; // Import the Divider component

function ViewRecord(props) {
  const { open, onClose } = props;

  const [isHidden, setIsHidden] = useState(false);
  const [tabValue, setTabValue] = useState(0); // State for main Tabs
  const [partiesTabValue, setPartiesTabValue] = useState(0); // State for nested Tabs inside Parties
  const [incidentId, setIncidentId] = useState(null); // State for incident ID

  useEffect(() => {
    const sessionName = sessionStorage.getItem("login_user");
    if (sessionName === "true") {
      setIsHidden(true);
    }
  }, []);

  var id = sessionStorage.getItem('incident-id');
  console.log(id);

  // Use Apollo's useLazyQuery to trigger the query manually
  const { loading, error, data } = useQuery(UPDATE_POST, {
    fetchPolicy: 'network-only',
    variables: { id },
  });

  if (loading) return console.log('Loading ..');
  if (error) return console.log(error.message);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePartiesTabChange = (event, newValue) => {
    setPartiesTabValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-filter1"
      sx={{ '& .MuiDialog-paper': { width: '90%' } }}
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">
        {"Record"}
      </DialogTitle>
      <hr
        style={{
          background: 'lightgrey',
          color: 'lightgrey',
          borderColor: 'lightgrey',
          height: '1px',
        }}
      />
      <DialogContent>
        <Box className="responsive-box" sx={{ borderBottom: 1, borderColor: 'divider', '@media (max-width: 600px)': {
              padding: '8px',
            },}}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Incident Details" />
            <Tab label="Notes" />
            <Tab label="Crash Diagram" />
            <Tab label="Parties" />
          </Tabs>
        </Box>
        <DialogContentText id="alert-dialog-description">
          {tabValue === 0 && (
            <div>
              <br />
              {loading && <p>Loading incident details...</p>}
              {error && <p>Error: {error.message}</p>}
              {data && (
                <div>
                  <h3>Incident Details</h3><br />
                  <p><strong>Address:</strong> {data.incident_findOneById.incidentDetails.location.address}</p>
                  <p><strong>Date and Time:</strong> {data.incident_findOneById.incidentDetails.fromDateTime}</p>
                  <p><strong>Weather:</strong> {data.incident_findOneById.incidentDetails.weather}</p>
                  <p><strong>Light:</strong> {data.incident_findOneById.incidentDetails.light}</p>
                  <p><strong>Severities:</strong> {data.incident_findOneById.incidentDetails.severities}</p>
                  <p><strong>Main Cause:</strong> {data.incident_findOneById.incidentDetails.mainCause}</p>
                  <p><strong>Collision Type:</strong> {data.incident_findOneById.incidentDetails.collisionType}</p>
                  <p><strong>Reporting Agency:</strong> {data.incident_findOneById.incidentDetails.reportingAgency}</p>
                  <p><strong>Encoder Email:</strong> {data.incident_findOneById.incidentDetails.encoderEmail}</p>
                  <p><strong>Description:</strong> {data.incident_findOneById.incidentDetails.description}</p>
                </div>
              )}
            </div>
          )}
          {tabValue === 1 && (
            <div>
              <br />
              <h3>Notes</h3><br />
              <p>{data.incident_findOneById.notes}</p>
            </div>
          )}
          {tabValue === 2 && (
            <div>
              <br />
              <h3>Crash Diagram</h3><br />
              <p><strong>Crash Type:</strong> {data.incident_findOneById.incidentDetails.crashType}</p>
              <p><strong>Movement Code:</strong> {data.incident_findOneById.incidentDetails.movementCode}</p>
            </div>
          )}
          {tabValue === 3 && (
            <div>
              <br />
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={partiesTabValue} onChange={handlePartiesTabChange} aria-label="parties tabs">
                  <Tab label="Party Overview" />
                  <Tab label="Adult" />
                  <Tab label="Minor" />
                </Tabs>
              </Box>
              <br />
              {partiesTabValue === 0 && (
                <div>
                  <h3>Party Overview</h3>
                  {data.incident_findOneById.parties.map((party, index) => (
                    <div key={index}>
                      <p><strong>Party Index:</strong> {party.partyIndex}</p>
                      
                      {/* Vehicle details */}
                      <h4>Vehicle Details:</h4>
                      <p><strong>Classification:</strong> {party.vehicle.classification}</p>
                      <p><strong>Vehicle Type:</strong> {party.vehicle.vehicleType}</p>
                      <p><strong>Make:</strong> {party.vehicle.make}</p>
                      <p><strong>Model:</strong> {party.vehicle.model}</p>
                      <p><strong>Plate Number:</strong> {party.vehicle.plateNumber}</p>
                      <p><strong>Maneuver:</strong> {party.vehicle.maneuver}</p>
                      <p><strong>Damages:</strong> {party.vehicle.damages}</p>
                      <p><strong>Defects:</strong> {party.vehicle.defects}</p>
                      <p><strong>Loading:</strong> {party.vehicle.loading}</p>
                      <p><strong>Insurance Details:</strong> {party.vehicle.insuranceDetails}</p>
                      <p><strong>Engine Number:</strong> {party.vehicle.engineNumber}</p>
                      <p><strong>Chassis Number:</strong> {party.vehicle.chassisNumber}</p>
                      
                      {/* Divider between each party */}
                      <Divider sx={{ margin: '20px 0' }} />
                    </div>
                  ))}
                </div>
              )}
              {partiesTabValue === 1 && (
                <div>
                  <h3>Adult</h3>
                  {data.incident_findOneById.parties.map((party, partyIndex) => (
                    <div key={partyIndex}>
                      <h5>Party Index: {party.partyIndex}</h5>
                      {party.adults && party.adults.length > 0 ? (
                        party.adults.map((adult, adultIndex) => (
                          <div key={adultIndex}>
                            <p><strong>Involvement:</strong> {adult.involvement}</p>
                            <p><strong>First Name:</strong> {adult.firstName}</p>
                            <p><strong>Last Name:</strong> {adult.lastName}</p>
                            <p><strong>Address:</strong> {adult.address}</p>
                            <p><strong>Gender:</strong> {adult.gender}</p>
                            <p><strong>License Number:</strong> {adult.licenseNumber}</p>
                            <p><strong>Age:</strong> {adult.age}</p>
                            <p><strong>Driver Error:</strong> {adult.driverError}</p>
                            <p><strong>Injury:</strong> {adult.injury}</p>
                            <p><strong>Alcohol Suspicion:</strong> {adult.alchoholSuspicion}</p>
                            <p><strong>Drugs Suspicion:</strong> {adult.drugsSuspicion}</p>
                            <p><strong>Seatbelt State:</strong> {adult.seatbeltState}</p>
                            <p><strong>Hospital:</strong> {adult.hospital}</p>
                            {/* Divider between each adult */}
                            <Divider sx={{ margin: '20px 0' }} />
                          </div>
                        ))
                      ) : (
                        <p>No Adults Details available for this party.</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {partiesTabValue === 2 && (
                <div>
                  <h3>Minor</h3>
                  {data.incident_findOneById.parties.map((party, partyIndex) => (
                    <div key={partyIndex}>
                      <h5>Party Index: {party.partyIndex}</h5>
                      {party.minors && party.minors.length > 0 ? (
                        party.minors.map((minor, minorIndex) => (
                          <div key={minorIndex}>
                            <p><strong>Grade Level:</strong> {minor.gradeLevel}</p>
                            <p><strong>Involvement:</strong> {minor.involvement}</p>
                            <p><strong>First Name:</strong> {minor.firstName}</p>
                            <p><strong>Last Name:</strong> {minor.lastName}</p>
                            <p><strong>Address:</strong> {minor.address}</p>
                            <p><strong>Gender:</strong> {minor.gender}</p>
                            <p><strong>License Number:</strong> {minor.licenseNumber}</p>
                            <p><strong>Age:</strong> {minor.age}</p>
                            <p><strong>Driver Error:</strong> {minor.driverError}</p>
                            <p><strong>Injury:</strong> {minor.injury}</p>
                            <p><strong>Alcohol Suspicion:</strong> {minor.alchoholSuspicion}</p>
                            <p><strong>Drugs Suspicion:</strong> {minor.drugsSuspicion}</p>
                            <p><strong>Seatbelt State:</strong> {minor.seatbeltState}</p>
                            <p><strong>Hospital:</strong> {minor.hospital}</p>
                            {/* Divider between each minor */}
                            <Divider sx={{ margin: '20px 0' }} />
                          </div>
                        ))
                      ) : (
                        <p>No Child Details available for this party.</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewRecord;
