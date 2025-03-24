import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import RecordMap from '../screens/recordMap';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useMutation } from '@apollo/client';
import { IconButton } from '@mui/material';
import { MdHelp } from "react-icons/md";
import { gql } from '@apollo/client'

sessionStorage.setItem("Adult", "");
sessionStorage.setItem("Child", "");

console.log(sessionStorage.getItem("Adult"));
console.log(sessionStorage.getItem("Child"));

const CREATE_POST = gql`
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
        photos{
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

function RecordDialog(props) {

  const { open, onClose } = props
  const [activeWindow, setActiveWindow] = useState('main');
  const [activeWindow1, setActiveWindow1] = useState('main');
  const [peopleOpen, setpeopleOpen] = React.useState(true);
  const [photoOpen, setphotoOpen] = React.useState(true);
  const [childOpen, setChildOpen] = React.useState(true)
  const [openParties, setOpenParties] = React.useState(true)
  var item_value = sessionStorage.getItem("login_user");

  const [openhelp, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Popup = ({ onClose }) => {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h2>Incident report was successfully added!!</h2>
          <button className="yes-btn" onClick={() => {
            onClose()
            window.location.reload();
          }
          }>Close</button>
        </div>
      </div>
    );
  }

  var value;
  if (item_value === 'true') {
    value = true;
  } else {
    value = false;
  }


  var openAdult;
  var openChild;
  var mutationType;

  const handleOpenParties = (e) => {
    setOpenParties(false);
    mutationType = 'clicked_1';
  }

  const handleOpenPeople = (e) => {
    setpeopleOpen(false);
    openAdult = 'clicked';
    sessionStorage.setItem("Adult", "clicked");

  }

  const handleOpenChild = (e) => {
    setChildOpen(false);
    openChild = 'clicked';
    sessionStorage.setItem("Child", "clicked");

  }


  const handleOpenPhoto = (e) => {
    setphotoOpen(false);
  }

  // Function to handle button click and switch between windows
  const handleButtonClick = (windowName) => {
    setActiveWindow(windowName);
  };

  // Function to handle button click and switch between windows
  const handleButtonClick1 = (windowName) => {
    setActiveWindow1(windowName);
  };

  var lat = sessionStorage.getItem("lat");
  var lng = sessionStorage.getItem("lng");
  var loc = sessionStorage.getItem("loc");

  const [value1, setValue] = React.useState(dayjs(new Date()));


  //Incident Details
  const [collisionType, setcollisionType] = useState('HEAD_ON');
  const [dateTime, setdateTime] = useState(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"));
  const [description, setdescription] = useState('');
  const [encodeEmail, setencodeEmail] = useState('');
  const [weather, setweather] = useState('DAY');
  const [light, setlight] = useState('NIGHT');
  const [latitude_, setlatitude_] = useState('');
  const [longitude_, setlongitude_] = useState('');

  const [locationApproximate, setlocationApproximate] = useState(true);
  const [mainCause, setmainCause] = useState('HUMAN_ERROR');
  const [reportingAgency, setreportingAgency] = useState('PNP');
  const [severity, setseverity] = useState('');
  const [crashType, setcrashType] = useState('PEDESTRIAN_ON_FOOT');
  const [maimovementCodenCause, setmovementCode] = useState('');
  const [notes, setnotes] = useState('');



  const handlecollisionType = (e) => {
    setcollisionType(e.target.value === '' ? null : e.target.value);
  };


  const handleweather = (e) => {
    setweather(e.target.value === '' ? null : e.target.value);
  };

  const handleDateChange = (newDate) => {
    setValue(newDate);
    setdateTime(dayjs(newDate).format("YYYY-MM-DD HH:mm:ss"));
  };
  const handledescription = (e) => {
    setdescription(e.target.value === '' ? null : e.target.value);
  };

  const handleencodeEmail = (e) => {
    setencodeEmail(e.target.value === '' ? null : e.target.value);
  };

  const handlelightl = (e) => {
    setlight(e.target.value === '' ? null : e.target.value);
  };

  const handlelocationApproximate = (e) => {
    if (e.target.value === 'true') {
      setlocationApproximate(true);
    }

    if (e.target.value === 'false') {
      setlocationApproximate(false);
    }
  };

  const handlemainCause = (e) => {
    setmainCause(e.target.value === '' ? null : e.target.value);
  };

  const handlereportingAgency = (e) => {
    setreportingAgency(e.target.value === '' ? null : e.target.value);
  };

  const handleseverity = (e) => {
    setcrashType(e.target.value === '' ? null : e.target.value);
  };

  const handlecrashType = (e) => {
    setcrashType(e.target.value === '' ? null : e.target.value);
  };

  const handlemaimovementCodenCause = (e) => {
    setmovementCode(e.target.value === '' ? null : e.target.value);
  };

  const handlenotes = (e) => {
    setnotes(e.target.value === '' ? null : e.target.value);
  };


  // Parties - an array to hold multiple parties
  const [parties, setParties] = useState([]);
  const [expandedParty, setExpandedParty] = useState(null);
  const [expandedAdult, setExpandedAdult] = useState({});
  const [expandedMinor, setExpandedMinor] = useState({});

  // Example of a party structure with partyIndex
  const partyTemplate = {
    partyIndex: 0.0,  // Default value for party index, it will be updated when adding a party
    name: '',  // Changed partyName to name
    vehicle: {
      classification: 'PRIVATE',
      vehicleType: 'CAR',
      make: '',
      plateNumber: '',
      model: '',
      maneuver: 'LEFT_TURN',
      damages: 'FRONT',
      defects: 'NONE',  // Changed defect to defects
      engineNumber: '',
      chassisNumber: '',
      insuranceDetails: '',
      loading: 'LEGAL',
    },
    adults: [],
    minors: []
  };

  // Function to add a new party with a unique partyIndex
  const addParty = () => {
    const newPartyIndex = parties.length + 1.0;  // Increment index as a float
    setParties([...parties, { ...partyTemplate, partyIndex: newPartyIndex }]);
    setExpandedParty(newPartyIndex);  // Expand the newly added party
  };

  // Function to toggle party sections
  const togglePartySection = (index) => {
    setExpandedParty(expandedParty === index ? null : index);
  };

  // Function to handle changes to a party
  const handlePartyChange = (index, field, value) => {
    const updatedParties = parties.map((party, idx) =>
      idx === index ? { ...party, [field]: value } : party
    );
    setParties(updatedParties);
  };

  // Function to add an adult to a party and close other adults
  const addAdult = (partyIndex) => {
    const updatedParties = parties.map((party, idx) => {
      if (idx === partyIndex) {
        return {
          ...party,
          adults: [
            ...party.adults,
            {
              firstName: '',
              lastName: '',
              address: '',
              gender: 'MALE',
              license_number: '',  // Changed licenseNumber to license_number
              involvement: 'PEDESTRIAN',
              age: '',  // Will convert to float on submit
              driverError: 'FATIGUED_OR_ASLEEP',
              injury: 'FATAL',
              alchoholSuspicion: true,  // Boolean value
              drugsSuspicion: true,  // Boolean value
              seatbeltState: 'WORN_CORRECTLY',
              hospital: '',
            }
          ]
        };
      }
      return party;
    });
    setParties(updatedParties);
    setExpandedAdult({ [partyIndex]: updatedParties[partyIndex].adults.length - 1 }); // Expand newly added adult
  };

  // Function to toggle individual adult visibility for a party
  const toggleAdult = (partyIndex, adultIndex) => {
    setExpandedAdult((prevExpandedAdult) => ({
      ...prevExpandedAdult,
      [`${partyIndex}-${adultIndex}`]: prevExpandedAdult[`${partyIndex}-${adultIndex}`] ? null : true,
    }));
  };
  // Function to add a minor to a party and close other minors
  const addMinor = (partyIndex) => {
    const updatedParties = parties.map((party, idx) => {
      if (idx === partyIndex) {
        return {
          ...party,
          minors: [
            ...party.minors,
            {
              firstName: '',
              lastName: '',
              address: '',
              gender: 'MALE',
              license_number: '',  // Changed licenseNumber to license_number
              involvement: 'PEDESTRIAN',
              gradeLevel: 'PRESCHOOL',
              age: '',  // Will convert to float on submit
              driverError: 'FATIGUED_OR_ASLEEP',
              injury: 'FATAL',
              alchoholSuspicion: true,  // Boolean value
              drugsSuspicion: true,  // Boolean value
              seatbeltState: 'WORN_CORRECTLY',
              hospital: '',
            }
          ]
        };
      }
      return party;
    });
    setParties(updatedParties);
    setExpandedMinor({ [partyIndex]: updatedParties[partyIndex].minors.length - 1 }); // Expand newly added minor
  };

  // Function to toggle individual minor visibility for a party
  const toggleMinor = (partyIndex, minorIndex) => {
    setExpandedMinor((prevExpandedMinor) => ({
      ...prevExpandedMinor,
      [`${partyIndex}-${minorIndex}`]: prevExpandedMinor[`${partyIndex}-${minorIndex}`] ? null : true,
    }));
  };

  // Function to handle changes in the adult section for a specific party
  const handleAdultChange = (partyIndex, adultIndex, field, value) => {
    const updatedParties = parties.map((party, idx) => {
      if (idx === partyIndex) {
        const updatedAdults = party.adults.map((adult, aIdx) => {
          if (aIdx === adultIndex) {
            return { ...adult, [field]: value };
          }
          return adult;
        });
        return { ...party, adults: updatedAdults };
      }
      return party;
    });
    setParties(updatedParties);
  };

  // Function to handle changes in the minor section for a specific party
  const handleMinorChange = (partyIndex, minorIndex, field, value) => {
    const updatedParties = parties.map((party, idx) => {
      if (idx === partyIndex) {
        const updatedMinors = party.minors.map((minor, mIdx) => {
          if (mIdx === minorIndex) {
            return { ...minor, [field]: value };
          }
          return minor;
        });
        return { ...party, minors: updatedMinors };
      }
      return party;
    });
    setParties(updatedParties);
  };

  // Function to handle changes in the vehicle section for a specific party
  const handleVehicleChange = (partyIndex, field, value) => {
    const updatedParties = parties.map((party, idx) => {
      if (idx === partyIndex) {
        return { ...party, vehicle: { ...party.vehicle, [field]: value } };
      }
      return party;
    });
    setParties(updatedParties);
  };

  // Function to handle submit and include partyIndex in the mutation
  const handleSubmit = () => {
    const partiesInput = parties.map(party => ({
      partyIndex: party.partyIndex,
      name: party.name,  // Changed partyName to name
      vehicle: party.vehicle,
      adults: party.adults.map(adult => ({
        ...adult,
        age: parseFloat(adult.age),  // Convert age to float
        alchoholSuspicion: Boolean(adult.alchoholSuspicion),  // Boolean value
        drugsSuspicion: Boolean(adult.drugsSuspicion),  // Boolean value
      })),
      minors: party.minors.map(minor => ({
        ...minor,
        age: parseFloat(minor.age),  // Convert age to float
        alchoholSuspicion: Boolean(minor.alchoholSuspicion),  // Boolean value
        drugsSuspicion: Boolean(minor.drugsSuspicion),  // Boolean value
      }))
    }));

    // Execute the mutation with variables
    createPost({
      variables: {
        description,  // Assuming description is a state or variable
        encodeEmail,  // Assuming encodeEmail is a state or variable
        collisionType,
        dateTime,
        weather,
        light,
        lat_convert: parseFloat(lat),
        lng_convert: parseFloat(lng),
        loc,
        locationApproximate,
        mainCause,
        reportingAgency,
        crashType,
        notes,
        parties: partiesInput  // Pass the parties array with the partyIndex included
      }
    });

    mutationType = '';
  };

  // GraphQL mutation setup
  const [createPost, { data, error }] = useMutation(CREATE_POST, {
    onCompleted: (data) => {
      if (data) {
        setIsPopupOpen(!isPopupOpen);
        console.log(sessionStorage.getItem("mutation_state"));
        mutationType = '';
        console.log(data);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      alert("An error occurred while submitting the form. Please try again.");
    },
  });

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };


  return (

    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-filter1"
      sx={{ '& .MuiDialog-paper': { width: '90%' } }}
      maxWidth='md'
    >
      <DialogTitle id="alert-dialog-title">
        {"Record"}

        <div style={{ float: 'right', marginTop: '-10px' }}>
          {/* Button with Question Mark Icon */}
          <IconButton onClick={handleClickOpen} >
            <MdHelp size={30} />
          </IconButton>

          {/* Dialog */}
          <Dialog open={openhelp} onClose={handleClose}>
            <DialogContent>
              <h4>Here’s a step-by-step guide for recording accidents in the DRIVER app: </h4>
              <br></br>
              <p>1. Log In: Open the DRIVER system and log in with your credentials.</p>
              <p>2. Access the Accident Recording Tool: Navigate to the accident data recording section.</p>
              <p>3. Enter Details: Input essential data fields such as location (geocode if needed), time, type of crash, involved vehicles, and casualties.</p>
              <p>4. Verify and Save: Review the entered information, ensure accuracy, and click save.</p>
              <p>5. Geospatial Mapping: The system will plot the crash location on a map using the integrated GIS features.</p>
              <br></br>
              <p>For more detailed steps, refer to the official DRIVER documentation.</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>




      </DialogTitle>


      <hr
        style={{
          background: 'lightgrey',
          color: 'lightgrey',
          borderColor: 'lightgrey',
          height: '1px',
        }}
      />
      {/* hidden={value? true : false} hide in google log in people tab
        hidden={value? true : false} hide in google log in child tab */}
      <DialogContent>

        <DialogContentText id="alert-dialog-description">
          <button className={`record-button ${activeWindow === 'main' ? 'active' : ''}`} onClick={() => handleButtonClick('main')}>Incident Details</button>
          <button className={`record-button ${activeWindow === 'window2' ? 'active' : ''}`} onClick={() => handleButtonClick('window2')}>Notes</button>
          <button className={`record-button ${activeWindow === 'window3' ? 'active' : ''}`} onClick={() => handleButtonClick('window3')}>Crash Diagram</button>
          <button className={`record-button ${activeWindow === 'window4' ? 'active' : ''}`} onClick={() => handleButtonClick('window4')}>Parties</button>
          <hr className="hr-line" />

          <div className="dialog-container">
            <div className={`dialog-window ${activeWindow === 'main' ? 'active' : ''}`}>
              <RecordMap></RecordMap>

              <br></br>
              <p style={{ color: 'black' }}>Latitude:</p>
              <input className='input-record' value={lat}></input>
              <hr className="hr-line-2" />
              <p style={{ color: 'black' }}>Longitude:</p>
              <input className='input-record' value={lng}></input>
              <hr className="hr-line-2" />
              <p style={{ color: 'black' }}>Location:</p>
              <input className='input-record' value={loc}></input>
              <hr className="hr-line-2" />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                  <DateTimePicker
                    className='input-record1'
                    label="Date and Time"
                    value={value1}
                    onChange={handleDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>

              {/* <input className='input-record-date'></input> : &nbsp;
        <input className='input-record-date'></input> */}
              <hr className="hr-line-2" />
              <p style={{ color: 'black' }}>Weather:</p>
              <select className='input-record' onChange={handleweather}>
                <option value="DAY">Day</option>
                <option value="CLEAR_DAY">Clear Day</option>
                <option value="CLEAR_NIGHT">Clear Night</option>
                <option value="CLOUDY">Cloudy</option>
                <option value="FOG">Fog</option>
                <option value="HAIL">Hail</option>
                <option value="PARTIALLY_CLOUDY_DAY">Partially Cloudy Day</option>
                <option value="PARTIALLY_CLOUDY_NIGHT">Partially Cloudy Night</option>
                <option value="RAIN">Rain</option>
                <option value="THUNDERSTORM">Thunderstorm</option>
                <option value="WIND">Wind</option>
                <option value="OVERCAST_CLOUDS">Overcast Clouds</option>
                <option value="SCATTERED_CLOUDS">Scattered Clouds</option>
                <option value="FEW_CLOUDS">Few Clouds</option>
                <option value="BROKEN_CLOUDS">Broken Clouds</option>
                <option value="MODERATE_RAIN">Moderate Rain</option>
                <option value="LIGHT_RAIN">Light Rain</option>
                <option value="TORNADO">Tornado</option>
              </select>
              <hr className="hr-line-2" />

              <p style={{ color: 'black' }}>Light:</p>
              <select className='input-record' onChange={handlelightl}>
                <option value="NIGHT">Night</option>
                <option value="DUSK">Dusk</option>
                <option value="DAY">Day</option>
                <option value="DAWN">Dawn</option>
              </select>

              <p style={{ marginTop: '15px', color: 'black' }}>Severity:</p>
              <input className='input-record-serverity' type="checkbox" value="PROPERTY_DAMAGE" style={{ color: 'black' }} /> Property Damage
              <input className='input-record-serverity' type="checkbox" value="INJURY" style={{ marginLeft: '10px', color: 'black' }} /> Injury
              <input className='input-record-serverity' type="checkbox" value="FATAL" style={{ marginLeft: '10px', color: 'black' }} /> Fatal

              <p style={{ marginTop: '10px', color: 'black' }}>Main Cause:</p>
              <select className='input-record' onChange={handlemainCause}>
                <option value="HUMAN_ERROR">HUMAN_ERROR</option>
                <option value="VEHICLE_DEFECT">VEHICLE_DEFECT</option>
                <option value="ROAD_DEFECT">ROAD_DEFECT</option>
                <option value="OTHER">OTHER</option>
              </select>

              <p style={{ marginTop: '10px', color: 'black' }}>Collision Type:</p>
              <select className='input-record' onChange={handlecollisionType}>
                <option value="HEAD_ON">HEAD_ON</option>
                <option value="REAR_END">REAR_END</option>
                <option value="RIGHT_ANGLE">RIGHT_ANGLE</option>
                <option value="OTHER_ANGLE">OTHER_ANGLE</option>
                <option value="SIDE_SWIPE">SIDE_SWIPE</option>
                <option value="OVERTURNED_VEHICLE">OVERTURNED_VEHICLE</option>
                <option value="HIT_OBJECT_ON_ROAD">HIT_OBJECT_ON_ROAD</option>
                <option value="HIT_OBJECT_OFF_ROAD">HIT_OBJECT_OFF_ROAD</option>
                <option value="HIT_PARKED_VEHICLE">HIT_PARKED_VEHICLE</option>
                <option value="HIT_PEDESTRIAN">HIT_PEDESTRIAN </option>
                <option value="HIT_ANIMAL">HIT_ANIMAL</option>
                <option value="OTHER">OTHER</option>
              </select>

              <p style={{ marginTop: '10px', color: 'black' }}>Reporting Agency:</p>
              <select className='input-record' onChange={handlereportingAgency}>
                <option value="PNP">PNP</option>
                <option value="LOCAL_TRAFFIC_UNIT">Local Traffic Unit</option>
                <option value="BGCEA">BGCEA</option>
                <option value="CCTO">CCTO</option>
                <option value="MMDA_METROBASE">MMDA Metrobase</option>
                <option value="MMDA_ROAD_SAFETY_UNIT">MMDA Road Safety Unit</option>
                <option value="MUNTINLUPA_TRAFFIC_MANAGEMENT_BUREAU">Muntinlupa Traffic Management Bureau</option>
                <option value="ZAMBOANGA_ADMIN_OFFICE">Zamboanga Admin Office</option>
                <option value="OTHER">Other</option>
              </select>

              <p style={{ marginTop: '10px', color: 'black' }}>Email of Encoder:</p>
              <input className='input-record' onChange={handleencodeEmail}></input>

              <p style={{ marginTop: '10px', color: 'black' }}>Description:</p>
              <input className='input-record' onChange={handledescription}></input>

              <p style={{ marginTop: '10px', color: 'black' }}>Location Approximate:</p>
              <select className='input-record' onChange={handlelocationApproximate}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>


            </div>
            <div className={`dialog-window ${activeWindow === 'window2' ? 'active' : ''}`}>

              <p style={{ marginTop: '10px', color: 'black' }}>Notes:</p>
              <input className='input-record' onChange={handlenotes}></input>

            </div>

            <div className={`dialog-window ${activeWindow === 'window3' ? 'active' : ''}`}>

              <p style={{ marginTop: '10px', color: 'black' }}>Crash Type:</p>
              <select className="input-record" onChange={handlecrashType}>
                <option value="PEDESTRIAN_ON_FOOT">Pedestrian on foot</option>
                <option value="VEHICLE_FROM_ADJACENT_DIRECTION_INTERSECTION_ONLY">Vehicle from adjacent direction (intersection only)</option>
                <option value="VEHICLE_FROM_ADJACENT_DIRECTION">Vehicle from opposing direction</option>
                <option value="VEHICLE_FROM_SAME_DIRECTION">Vehicle from same direction</option>
                <option value="MANEUVERING">Manuevering</option>
                <option value="OVERTAKING">Overtaking</option>
                <option value="ON_PATH">On path</option>
                <option value="OFF_PATH_STRAIGHT">On path straight</option>
                <option value="OFF_PATH_CURVE">Off path curve</option>
                <option value="PASSENGER_AND_MISCELLANEOUS">Passenger and miscellaneous</option>
              </select>

              <p style={{ marginTop: '10px', color: 'black' }}>Movement Code:</p>
              <input className='input-record' onChange={handlemaimovementCodenCause}></input>

              <p style={{ marginTop: '10px', color: 'black' }}>Image:</p>

            </div>

            <div className={`dialog-window ${activeWindow === 'window4' ? 'active' : ''}`}>
              <button className='parties-button' onClick={addParty} style={{ backgroundColor: '#1A73E8', color: 'white', width: '100px', height: '30px', borderRadius: '5px' }}>Add Party</button>

              {parties.map((party, partyIndex) => (
                <div key={partyIndex}>
                  <h4>Party {partyIndex + 1}</h4>

                  {/* Party Name */}
                  <p style={{ marginTop: '10px', color: 'black' }}>Party Name:</p>
                  <input
                    className='input-record'
                    value={party.partyName}
                    onChange={(e) => handlePartyChange(partyIndex, 'partyName', e.target.value)}
                  />
                  <br /><br />


                  {/* Toggle party section */}
                  <button onClick={() => togglePartySection(partyIndex)} style={{ backgroundColor: '#1A73E8', fontWeight: 'bold', color: 'white', width: '100px', height: '20px', borderRadius: '5px', marginBottom: '10px', cursor: 'pointer' }}>
                    {expandedParty === partyIndex ? 'Hide Party Details' : 'Show Party Details'}
                  </button>
                  <br></br><br></br>

                  {expandedParty === partyIndex && (
                    <>
                      {/* Subtabs for Party */}
                      <button className={`record-button ${activeWindow1 === 'main' ? 'active' : ''}`} onClick={() => handleButtonClick1('main')}>Overview</button>
                      <button className={`record-button ${activeWindow1 === 'window5' ? 'active' : ''}`} onClick={() => handleButtonClick1('window5')}>Adult</button>
                      <button className={`record-button ${activeWindow1 === 'window6' ? 'active' : ''}`} onClick={() => handleButtonClick1('window6')}>Minors</button>
                      <hr className="hr-line" />

                      <div className={`dialog-window ${activeWindow1 === 'main' ? 'active' : ''}`}>
                        {/* Vehicle Section */}
                        <div className='vehicle-form'>
                          <h2 style={{ color: 'black', marginTop: '10px' }}>Vehicle</h2>
                          <h4>A vehicle involved in the incident</h4>

                          <p style={{ marginTop: '10px', color: 'black' }}>Classification:</p>
                          <select className="input-record" value={party.vehicle.classification} onChange={(e) => handleVehicleChange(partyIndex, 'classification', e.target.value)}>
                            <option value="PRIVATE">Private</option>
                            <option value="GOVERNMENT">Government</option>
                            <option value="PUBLIC_OR_FOR_HIRE">Public / For-hire</option>
                            <option value="DIPLOMAT">Diplomat</option>
                          </select>

                          <p style={{ marginTop: '10px', color: 'black' }}>Vehicle Type:</p>
                          <select className="input-record" value={party.vehicle.vehicleType} onChange={(e) => handleVehicleChange(partyIndex, 'vehicleType', e.target.value)}>
                            <option value="CAR">Car</option>
                            <option value="VAN">Van</option>
                            <option value="SUV">SUV</option>
                            <option value="BUS">Bus</option>
                            <option value="JEEPNEY">Jeepney</option>
                            <option value="TAXI_METERED">Taxi (metered)</option>
                            <option value="TRUCK_PICK_UP">Truck (Pick-Up)</option>
                            <option value="TRUCK_RIGID">Truck (Rigid)</option>
                            <option value="TRUCK_ARTICULATED">Truck (Articulated)</option>
                            <option value="TRUCK_FIRE">Truck (Fire)</option>
                            <option value="TRUCK_UNKNOWN">Truck (Unknown)</option>
                            <option value="TRUCK">Truck</option>
                            <option value="AMBULANCE">Ambulance</option>
                            <option value="ARMORED_CAR">Armored Car</option>
                            <option value="HEAVY_EQUIPMENT">Heavy Equipment</option>
                            <option value="MOTORCYCLE">Motorcycle</option>
                            <option value="TRICYCLE">Tricycle</option>
                            <option value="BICYCLE">Bicycle</option>
                            <option value="PEDICAB">Pedicab</option>
                            <option value="PEDESTRIAN">Pedestrian</option>
                            <option value="PUSH_CART">Push-Cart</option>
                            <option value="TARTANILLA">Horse-Driven Carriage (Tartanilla)</option>
                            <option value="ANIMAL">Animal</option>
                            <option value="WATER_VESSEL">Water Vessel</option>
                            <option value="ELECTRIC_BIKE">Electric Bike</option>
                            <option value="OTHERS">Others</option>
                            <option value="HABAL_HABAL">Habal-habal</option>
                          </select>

                          <p style={{ marginTop: '10px', color: 'black' }}>Make:</p>
                          <input className='input-record' value={party.vehicle.make} onChange={(e) => handleVehicleChange(partyIndex, 'make', e.target.value)} />

                          <p style={{ marginTop: '10px', color: 'black' }}>Plate number:</p>
                          <input className='input-record' value={party.vehicle.plateNumber} onChange={(e) => handleVehicleChange(partyIndex, 'plateNumber', e.target.value)}></input>


                          <p style={{ marginTop: '10px', color: 'black' }}>Model:</p>
                          <input className='input-record' value={party.vehicle.model} onChange={(e) => handleVehicleChange(partyIndex, 'model', e.target.value)}></input>

                          <p style={{ marginTop: '10px', color: 'black' }}>Manuever:</p>
                          <select className="input-record" value={party.vehicle.maneuver} onChange={(e) => handleVehicleChange(partyIndex, 'maneuver', e.target.value)}>
                            <option value="LEFT_TURN">Left turn</option>
                            <option value="RIGHT_TURN">Right turn</option>
                            <option value="U_TURN">U turn</option>
                            <option value="CROSS_TRAFFIC">Cross traffic</option>
                            <option value="MERGING">Merging</option>
                            <option value="DIVERGING">Diverging</option>
                            <option value="OVERTAKING">Overtaking</option>
                            <option value="GOING_AHEAD">Going ahead</option>
                            <option value="REVERSING">Reversing</option>
                            <option value="SUDDEN_START">Sudden start</option>
                            <option value="SUDDEN_STOP">Sudden stop</option>
                            <option value="PARKED_OFF_ROAD">Parked off road</option>
                            <option value="PARKED_ON_ROAD">Parked on road</option>
                          </select>

                          <p style={{ marginTop: '10px', color: 'black' }}>Damage:</p>
                          <select className="input-record" value={party.vehicle.damages} onChange={(e) => handleVehicleChange(partyIndex, 'damages', e.target.value)}>
                            <option value="FRONT">Front</option>
                            <option value="REAR">Rear</option>
                            <option value="RIGHT">Right</option>
                            <option value="LEFT">Left</option>
                            <option value="ROOF">Roof</option>
                            <option value="MULTIPLE">Multiple</option>
                          </select>

                          <p style={{ marginTop: '10px', color: 'black' }}>Defect:</p>
                          <select className="input-record" value={party.vehicle.defects} onChange={(e) => handleVehicleChange(partyIndex, 'defects', e.target.value)}>
                            <option value="LIGHTS">Lights</option>
                            <option value="BRAKES">Brakes</option>
                            <option value="STEERING">Steering</option>
                            <option value="TIRES">Tires</option>
                            <option value="MULTIPLE">Multiple</option>
                          </select>

                          <p style={{ marginTop: '10px', color: 'black' }}>Loading:</p>
                          <select className="input-record" value={party.vehicle.loading} onChange={(e) => handleVehicleChange(partyIndex, 'loading', e.target.value)}>
                            <option value="LEGAL">Legal</option>
                            <option value="OVERLOADED">Overloaded</option>
                            <option value="UNSAFE_LOAD">Unsafe Load</option>
                          </select>

                          <p style={{ marginTop: '10px', color: 'black' }}>Insurance Details:</p>
                          <input className='input-record' value={party.vehicle.insuranceDetails} onChange={(e) => handleVehicleChange(partyIndex, 'insuranceDetails', e.target.value)}></input>

                          <p style={{ marginTop: '10px', color: 'black' }}>Engine number:</p>
                          <input className='input-record' value={party.vehicle.engineNumber} onChange={(e) => handleVehicleChange(partyIndex, 'engineNumber', e.target.value)}></input>


                          <p style={{ marginTop: '10px', color: 'black' }}>Chasis number:</p>
                          <input className='input-record' value={party.vehicle.chassisNumber} onChange={(e) => handleVehicleChange(partyIndex, 'chassisNumber', e.target.value)}></input>
                        </div>
                      </div>

                      <div className={`dialog-window ${activeWindow1 === 'window5' ? 'active' : ''}`}>
                        <h4>Adults</h4>
                        <button onClick={() => addAdult(partyIndex)} style={{ backgroundColor: '#1A73E8', color: 'white', width: '100px', height: '30px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Add Adult Details</button>
                        <br></br>
                        {party.adults.map((adult, adultIndex) => (
                          <div key={adultIndex}>
                            <button onClick={() => toggleAdult(partyIndex, adultIndex)} style={{ backgroundColor: '#1A73E8', fontWeight: 'bold', color: 'white', width: '100px', height: '20px', borderRadius: '5px', marginBottom: '5px', marginTop: '10px', cursor: 'pointer' }}>
                              {expandedAdult[`${partyIndex}-${adultIndex}`] ? `Hide Adult ${adultIndex + 1}` : `Show Adult ${adultIndex + 1}`}
                            </button>

                            {expandedAdult[`${partyIndex}-${adultIndex}`] && (
                              <>

                                <p style={{ marginTop: '10px', color: 'black' }}>Involvement:</p>
                                <select className="input-record" value={adult.involvement} onChange={(e) => handleAdultChange(partyIndex, adultIndex, 'involvement', e.target.value)}>
                                  <option value="PEDESTRIAN">Pedestrian</option>
                                  <option value="WITNESS">Witness</option>
                                  <option value="PASSENGER">Passenger</option>
                                  <option value="DRIVER">Driver</option>
                                </select>

                                <p style={{ marginTop: '10px', color: 'black' }}>First Name:</p>
                                <input className='input-record' value={adult.firstName} onChange={(e) => handleAdultChange(partyIndex, adultIndex, 'firstName', e.target.value)}></input>

                                {/* Add more fields for adults like lastName, age, etc. */}
                                <p style={{ marginTop: '10px', color: 'black' }}>Last Name:</p>
                                <input className='input-record' value={adult.lastName} onChange={(e) => handleAdultChange(partyIndex, adultIndex, 'lastName', e.target.value)} />

                                <p style={{ marginTop: '10px', color: 'black' }}>Address:</p>
                                <input className='input-record' value={adult.address} onChange={(e) => handleAdultChange(partyIndex, adultIndex, 'address', e.target.value)}></input>

                                <p style={{ marginTop: '10px', color: 'black' }}>Sex (assigned at birth):</p>
                                <select className="input-record" value={adult.gender} onChange={(e) => handleAdultChange(partyIndex, adultIndex, 'gender', e.target.value)}>
                                  <option value="MALE">Male</option>
                                  <option value="FEMALE">Female</option>
                                </select>

                                <p style={{ marginTop: '10px', color: 'black' }}>License Number:</p>
                                <input className='input-record' value={adult.license_number} onChange={(e) => handleAdultChange(partyIndex, adultIndex, 'license_number', e.target.value)}></input>

                                <p style={{ marginTop: '10px', color: 'black' }}>Age:</p>
                                <input className='input-record' type='number' value={adult.age} onChange={(e) => handleAdultChange(partyIndex, adultIndex, 'age', e.target.value)}></input>

                                <p style={{ marginTop: '10px', color: 'black' }}>Driver Error:</p>
                                <select className="input-record" value={adult.driverError} onChange={(e) => handleAdultChange(partyIndex, adultIndex, 'driverError', e.target.value)}>
                                  <option value="FATIGUED_OR_ASLEEP">Fatigue/asleep</option>
                                  <option value="INATTENTIVE">Inattentive</option>
                                  <option value="TOO_FAST">Too Fast</option>
                                  <option value="TOO_CLOSE">Too Close</option>
                                  <option value="NO_SIGNAL">No Signal</option>
                                  <option value="BAD_OVERTAKING">Bad overtaking</option>
                                  <option value="BAD_TURNING">Bad turning</option>
                                  <option value="USING_CELLPHONE">Using cell phone</option>
                                </select>

                                <p style={{ marginTop: '10px', color: 'black' }}>Injury:</p>
                                <select className="input-record" value={adult.injury} onChange={(e) => handleAdultChange(partyIndex, adultIndex, 'injury', e.target.value)}>
                                  <option value="FATAL">Fatal</option>
                                  <option value="SERIOUS">Serious</option>
                                  <option value="MINOR">Minor</option>
                                  <option value="NOT_INJURED">Not Injured</option>
                                </select>

                                <p style={{ marginTop: '10px', color: 'black' }}>Alcohol Suspicion:</p>
                                <select className='input-record' value={adult.alchoholSuspicion} onChange={(e) => handleAdultChange(partyIndex, adultIndex, 'alchoholSuspicion', e.target.value)}>
                                  <option value="true">Yes</option>
                                  <option value="false">No</option>
                                </select>

                                <p style={{ marginTop: '10px', color: 'black' }}>Drug Suspicion:</p>
                                <select className='input-record' value={adult.drugsSuspicion} onChange={(e) => handleAdultChange(partyIndex, adultIndex, 'drugsSuspicion', e.target.value)}>
                                  <option value="true">Yes</option>
                                  <option value="false">No</option>
                                </select>

                                <p style={{ marginTop: '10px', color: 'black' }}>Seat belt/helmet:</p>
                                <select className="input-record" value={adult.seatbeltState} onChange={(e) => handleAdultChange(partyIndex, adultIndex, 'seatbeltState', e.target.value)}>
                                  <option value="WORN_CORRECTLY">Seat belt/helmet worn</option>
                                  <option value="NOT_WORN">Not worn</option>
                                  <option value="NOT_WORN_CORRECTLY">Not worn correctly</option>
                                </select>

                                <p style={{ marginTop: '10px', color: 'black' }}>Hospital:</p>
                                <input className='input-record' value={adult.hospital} onChange={(e) => handleAdultChange(partyIndex, adultIndex, 'hospital', e.target.value)}></input>

                                {/* Divider Line */}
                                <hr style={{ borderTop: '1px solid black', marginTop: '20px' }} />
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className={`dialog-window ${activeWindow1 === 'window6' ? 'active' : ''}`}>
                        <h4>Minors</h4>
                        <button onClick={() => addMinor(partyIndex)} style={{ backgroundColor: '#1A73E8', color: 'white', width: '100px', height: '30px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Add Child Details</button>

                        {party.minors.map((minor, minorIndex) => (
                          <div key={minorIndex}>
                            <button onClick={() => toggleMinor(partyIndex, minorIndex)} style={{ backgroundColor: '#1A73E8', fontWeight: 'bold', color: 'white', width: '100px', height: '20px', borderRadius: '5px', marginBottom: '5px', marginTop: '10px', cursor: 'pointer' }}>
                              {expandedMinor[`${partyIndex}-${minorIndex}`] ? `Hide Minor ${minorIndex + 1}` : `Show Minor ${minorIndex + 1}`}
                            </button>

                            {expandedMinor[`${partyIndex}-${minorIndex}`] && (
                              <>
                                <p style={{ marginTop: '10px', color: 'black' }}>Grade Level:</p>
                                <select className="input-record" value={minor.gradeLevel} onChange={(e) => handleMinorChange(partyIndex, minorIndex, 'gradeLevel', e.target.value)}>
                                  <option value="PRESCHOOL">Preschool</option>
                                  <option value="ELEMENTARY">Elementary</option>
                                  <option value="HIGH_SCHOOL">High School</option>
                                </select>

                                <p style={{ marginTop: '10px', color: 'black' }}>Involvement:</p>
                                <select className="input-record" value={minor.involvement} onChange={(e) => handleMinorChange(partyIndex, minorIndex, 'involvement', e.target.value)}>
                                  <option value="PEDESTRIAN">Pedestrian</option>
                                  <option value="WITNESS">Witness</option>
                                  <option value="PASSENGER">Passenger</option>
                                  <option value="DRIVER">Driver</option>
                                </select>


                                <p style={{ marginTop: '10px', color: 'black' }}>First Name:</p>
                                <input className='input-record' value={minor.firstName} onChange={(e) => handleMinorChange(partyIndex, minorIndex, 'firstName', e.target.value)}></input>

                                <p style={{ marginTop: '10px', color: 'black' }}>Last Name:</p>
                                <input className='input-record' value={minor.lastName} onChange={(e) => handleMinorChange(partyIndex, minorIndex, 'lastName', e.target.value)} />

                                <p style={{ marginTop: '10px', color: 'black' }}>Address:</p>
                                <input className='input-record' value={minor.address} onChange={(e) => handleMinorChange(partyIndex, minorIndex, 'address', e.target.value)}></input>

                                <p style={{ marginTop: '10px', color: 'black' }}>Sex (assigned at birth):</p>
                                <select className="input-record" value={minor.gender} onChange={(e) => handleMinorChange(partyIndex, minorIndex, 'gender', e.target.value)}>
                                  <option value="MALE">Male</option>
                                  <option value="FEMALE">Female</option>
                                </select>

                                <p style={{ marginTop: '10px', color: 'black' }}>Age:</p>
                                <input className='input-record' value={minor.age} onChange={(e) => handleMinorChange(partyIndex, minorIndex, 'age', e.target.value)}></input>

                                <p style={{ marginTop: '10px', color: 'black' }}>License Number:</p>
                                <input className='input-record' value={minor.license_number} onChange={(e) => handleMinorChange(partyIndex, minorIndex, 'license_number', e.target.value)}></input>

                                <p style={{ marginTop: '10px', color: 'black' }}>Driver Error:</p>
                                <select className="input-record" value={minor.driverError} onChange={(e) => handleMinorChange(partyIndex, minorIndex, 'driverError', e.target.value)}>
                                  <option value="FATIGUED_OR_ASLEEP">Fatigue/asleep</option>
                                  <option value="INATTENTIVE">Inattentive</option>
                                  <option value="TOO_FAST">Too Fast</option>
                                  <option value="TOO_CLOSE">Too Close</option>
                                  <option value="NO_SIGNAL">No Signal</option>
                                  <option value="BAD_OVERTAKING">Bad overtaking</option>
                                  <option value="BAD_TURNING">Bad turning</option>
                                  <option value="USING_CELLPHONE">Using cell phone</option>
                                </select>

                                <p style={{ marginTop: '10px', color: 'black' }}>Injury:</p>
                                <select className="input-record" value={minor.injury} onChange={(e) => handleMinorChange(partyIndex, minorIndex, 'injury', e.target.value)}>
                                  <option value="FATAL">Fatal</option>
                                  <option value="SERIOUS">Serious</option>
                                  <option value="MINOR">Minor</option>
                                  <option value="NOT_INJURED">Not Injured</option>
                                </select>

                                <p style={{ marginTop: '10px', color: 'black' }}>Alcohol Suspicion:</p>
                                <select className='input-record' value={minor.alchoholSuspicion} onChange={(e) => handleMinorChange(partyIndex, minorIndex, 'alchoholSuspicion', e.target.value)}>
                                  <option value="true">Yes</option>
                                  <option value="false">No</option>
                                </select>

                                <p style={{ marginTop: '10px', color: 'black' }}>Drug Suspicion:</p>
                                <select className='input-record' value={minor.drugsSuspicion} onChange={(e) => handleMinorChange(partyIndex, minorIndex, 'drugsSuspicion', e.target.value)}>
                                  <option value="true">Yes</option>
                                  <option value="false">No</option>
                                </select>

                                <p style={{ marginTop: '10px', color: 'black' }}>Seat belt/helmet:</p>
                                <select className="input-record" value={minor.seatbeltState} onChange={(e) => handleMinorChange(partyIndex, minorIndex, 'seatbeltState', e.target.value)}>
                                  <option value="WORN_CORRECTLY">Seat belt/helmet worn</option>
                                  <option value="NOT_WORN">Not worn</option>
                                  <option value="NOT_WORN_CORRECTLY">Not worn correctly</option>
                                </select>

                                <p style={{ marginTop: '10px', color: 'black' }}>Hospital:</p>
                                <input className='input-record' value={minor.hospital} onChange={(e) => handleMinorChange(partyIndex, minorIndex, 'hospital', e.target.value)}></input>

                                {/* Divider Line */}
                                <hr style={{ borderTop: '1px solid black', marginTop: '20px' }} />
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

          </div>
          <br></br>
          <br></br>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Delete</Button>
        <Button autoFocus onClick={handleSubmit}>Save</Button>
        {isPopupOpen && <Popup onClose={togglePopup} />}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>

  )

}

export default RecordDialog;



