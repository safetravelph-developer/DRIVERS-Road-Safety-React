import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function FilterDialog(props) {
  
    const { open, onClose } = props
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [showSaveFilters, setShowSaveFilters] = React.useState(false);
    const [severity_filter_save, setSeverityFilterSave] = React.useState([]);
    const [maincause_filter_save, setMaincauseFilterSave] = React.useState([]);
    const [collision_filter_save, setCollisionFilterSave] = React.useState([]);
    const [agency_filter_save, setAgencyFilterSave] = React.useState([]);
    const [v_classification_filter_save, setV_classificationFilterSave] = React.useState([]);
    const [v_types_filter_save, setV_typesFilterSave] = React.useState([]);
    const [gender_filter_save, setGenderFilterSave] = React.useState([]);
    const [s_date, set_s_date] = React.useState();
    const [e_date, set_e_date] = React.useState();


      let formattedDate = `${
        startDate.getFullYear()
      }-${
        String(startDate.getMonth() + 1).padStart(2, '0')
      }-${
        String(startDate.getDate()).padStart(2, '0')
      }`;

      let formattedDate_1 = `${
        startDate.getFullYear()
      }-${
        String(startDate.getMonth() + 1).padStart(2, '0')
      }-${
        String(startDate.getDate()).padStart(2, '0')
      }`;
      


  // Initialize state for checked status of checkboxes
    //Adult and Child checboxes
    const [checkbox_adult, setCheckbox1_adult] = React.useState(false);
    const [checkbox_child, setCheckbox2_child] = React.useState(false);

    //Severity Checkboxes
    const [checkbox1, setCheckbox1] = React.useState(false);
    const [checkbox2, setCheckbox2] = React.useState(false);
    const [checkbox3, setCheckbox3] = React.useState(false);


    //Main Cause Checkboxes
    const [checkbox_main1, setCheckbox_main1] = React.useState(false);
    const [checkbox_main2, setCheckbox_main2] = React.useState(false);
    const [checkbox_main3, setCheckbox_main3] = React.useState(false);
    const [checkbox_main4, setCheckbox_main4] = React.useState(false);

    //Collision Type Checkboxes
    const [checkbox_collision1, setCheckbox_collision1] = React.useState(false);
    const [checkbox_collision2, setCheckbox_collision2] = React.useState(false);
    const [checkbox_collision3, setCheckbox_collision3] = React.useState(false);
    const [checkbox_collision4, setCheckbox_collision4] = React.useState(false);
    const [checkbox_collision5, setCheckbox_collision5] = React.useState(false);
    const [checkbox_collision6, setCheckbox_collision6] = React.useState(false);
    const [checkbox_collision7, setCheckbox_collision7] = React.useState(false);
    const [checkbox_collision8, setCheckbox_collision8] = React.useState(false);
    const [checkbox_collision9, setCheckbox_collision9] = React.useState(false);
    const [checkbox_collision10, setCheckbox_collision10] = React.useState(false);
    const [checkbox_collision11, setCheckbox_collision11] = React.useState(false);
    const [checkbox_collision12, setCheckbox_collision12] = React.useState(false);

    //Agency
    const [checkbox_agency1, setCheckbox_agency1] = React.useState(false);
    const [checkbox_agency2, setCheckbox_agency2] = React.useState(false);
    const [checkbox_agency3, setCheckbox_agency3] = React.useState(false);
    const [checkbox_agency4, setCheckbox_agency4] = React.useState(false);
    const [checkbox_agency5, setCheckbox_agency5] = React.useState(false);
    const [checkbox_agency6, setCheckbox_agency6] = React.useState(false);
    const [checkbox_agency7, setCheckbox_agency7] = React.useState(false);
    const [checkbox_agency8, setCheckbox_agency8] = React.useState(false);
    const [checkbox_agency9, setCheckbox_agency9] = React.useState(false);

    //Vehicle_Classification
    const [checkbox_v_classification1, setCheckbox_v_classification1] = React.useState(false);
    const [checkbox_v_classification2, setCheckbox_v_classification2] = React.useState(false);
    const [checkbox_v_classification3, setCheckbox_v_classification3] = React.useState(false);
    const [checkbox_v_classification4, setCheckbox_v_classification4] = React.useState(false);

    //Vehicle Types
    const [checkbox_v_type1, setCheckbox_v_type1] = React.useState(false);
    const [checkbox_v_type2, setCheckbox_v_type2] = React.useState(false);
    const [checkbox_v_type3, setCheckbox_v_type3] = React.useState(false);
    const [checkbox_v_type4, setCheckbox_v_type4] = React.useState(false);
    const [checkbox_v_type5, setCheckbox_v_type5] = React.useState(false);
    const [checkbox_v_type6, setCheckbox_v_type6] = React.useState(false);
    const [checkbox_v_type7, setCheckbox_v_type7] = React.useState(false);
    const [checkbox_v_type8, setCheckbox_v_type8] = React.useState(false);
    const [checkbox_v_type9, setCheckbox_v_type9] = React.useState(false);
    const [checkbox_v_type10, setCheckbox_v_type10] = React.useState(false);
    const [checkbox_v_type11, setCheckbox_v_type11] = React.useState(false);
    const [checkbox_v_type12, setCheckbox_v_type12] = React.useState(false);
    const [checkbox_v_type13, setCheckbox_v_type13] = React.useState(false);
    const [checkbox_v_type14, setCheckbox_v_type14] = React.useState(false);
    const [checkbox_v_type15, setCheckbox_v_type15] = React.useState(false);
    const [checkbox_v_type16, setCheckbox_v_type16] = React.useState(false);
    const [checkbox_v_type17, setCheckbox_v_type17] = React.useState(false);
    const [checkbox_v_type18, setCheckbox_v_type18] = React.useState(false);
    const [checkbox_v_type19, setCheckbox_v_type19] = React.useState(false);
    const [checkbox_v_type20, setCheckbox_v_type20] = React.useState(false);
    const [checkbox_v_type21, setCheckbox_v_type21] = React.useState(false);
    const [checkbox_v_type22, setCheckbox_v_type22] = React.useState(false);
    const [checkbox_v_type23, setCheckbox_v_type23] = React.useState(false);
    const [checkbox_v_type24, setCheckbox_v_type24] = React.useState(false);
    const [checkbox_v_type25, setCheckbox_v_type25] = React.useState(false);
    const [checkbox_v_type26, setCheckbox_v_type26] = React.useState(false);
    const [checkbox_v_type27, setCheckbox_v_type27] = React.useState(false);

    //Person Gender
    const [checkbox_gender1, setCheckbox_gender1] = React.useState(false);
    const [checkbox_gender2, setCheckbox_gender2] = React.useState(false);
    const [checkbox_gender3, setCheckbox_gender3] = React.useState(false);


  //Adult and Child
  React.useEffect(() => {
    const storedCheckboxes_adult_child = JSON.parse(sessionStorage.getItem('checkedCheckboxes_adult_child'));

    if (storedCheckboxes_adult_child) {
      setCheckbox1_adult(storedCheckboxes_adult_child.checkbox_adult || false);
      setCheckbox2_child(storedCheckboxes_adult_child.checkbox_child || false);
    }
    }, []);
  // Update session storage with the current checkbox states
  React.useEffect(() => {
    sessionStorage.setItem('checkedCheckboxes_adult_child', JSON.stringify({ checkbox_adult, checkbox_child }));
  }, [checkbox_adult, checkbox_child]);

  //Severity  
  React.useEffect(() => {
    const storedCheckboxes = JSON.parse(sessionStorage.getItem('checkedCheckboxes'));
    if (storedCheckboxes) {
      setCheckbox1(storedCheckboxes.checkbox1 || false);
      setCheckbox2(storedCheckboxes.checkbox2 || false);
      setCheckbox3(storedCheckboxes.checkbox3 || false);
    }
    }, []);
    // Update session storage with the current checkbox states
    React.useEffect(() => {
      sessionStorage.setItem('checkedCheckboxes', JSON.stringify({ checkbox1, checkbox2, checkbox3 }));
    }, [checkbox1, checkbox2, checkbox3]);


  //Main Cause  
  React.useEffect(() => {
    const storedCheckboxes_main_cause = JSON.parse(sessionStorage.getItem('checkedCheckboxes_main_cause'));
    if (storedCheckboxes_main_cause) {
      setCheckbox_main1(storedCheckboxes_main_cause.checkbox_main1 || false);
      setCheckbox_main2(storedCheckboxes_main_cause.checkbox_main2 || false);
      setCheckbox_main3(storedCheckboxes_main_cause.checkbox_main3 || false);
      setCheckbox_main4(storedCheckboxes_main_cause.checkbox_main4 || false);
    }
    }, []);
    // Update session storage with the current checkbox states
    React.useEffect(() => {
      sessionStorage.setItem('checkedCheckboxes_main_cause', JSON.stringify({ checkbox_main1, checkbox_main2, checkbox_main3, checkbox_main4 }));
    }, [checkbox_main1, checkbox_main2, checkbox_main3, checkbox_main4]);


  //Collision  
  React.useEffect(() => {
    const storedCheckboxes_collision = JSON.parse(sessionStorage.getItem('checkedCheckboxes_collision'));
    if (storedCheckboxes_collision) {
      setCheckbox_collision1(storedCheckboxes_collision.checkbox_collision1 || false);
      setCheckbox_collision2(storedCheckboxes_collision.checkbox_collision2 || false);
      setCheckbox_collision3(storedCheckboxes_collision.checkbox_collision3 || false);
      setCheckbox_collision4(storedCheckboxes_collision.checkbox_collision4 || false);
      setCheckbox_collision5(storedCheckboxes_collision.checkbox_collision5 || false);
      setCheckbox_collision6(storedCheckboxes_collision.checkbox_collision6 || false);
      setCheckbox_collision7(storedCheckboxes_collision.checkbox_collision7 || false);
      setCheckbox_collision8(storedCheckboxes_collision.checkbox_collision8 || false);
      setCheckbox_collision9(storedCheckboxes_collision.checkbox_collision9 || false);
      setCheckbox_collision10(storedCheckboxes_collision.checkbox_collision10 || false);
      setCheckbox_collision11(storedCheckboxes_collision.checkbox_collision11 || false);
      setCheckbox_collision12(storedCheckboxes_collision.checkbox_collision12 || false);
    }
    }, []);
    // Update session storage with the current checkbox states
    React.useEffect(() => {
      sessionStorage.setItem('checkedCheckboxes_collision', JSON.stringify({ checkbox_collision1, checkbox_collision2, checkbox_collision3, checkbox_collision4, checkbox_collision5, checkbox_collision6, checkbox_collision7, checkbox_collision8, checkbox_collision9, checkbox_collision10, checkbox_collision11, checkbox_collision12 }));
    }, [checkbox_collision1, checkbox_collision2, checkbox_collision3, checkbox_collision4, checkbox_collision5, checkbox_collision6, checkbox_collision7, checkbox_collision8, checkbox_collision9, checkbox_collision10, checkbox_collision11, checkbox_collision12]);

  //Reporting Agency  
  React.useEffect(() => {
    const storedCheckboxes_agency = JSON.parse(sessionStorage.getItem('checkedCheckboxes_agency'));
    if (storedCheckboxes_agency) {
      setCheckbox_agency1(storedCheckboxes_agency.checkbox_agency1 || false);
      setCheckbox_agency2(storedCheckboxes_agency.checkbox_agency2 || false);
      setCheckbox_agency3(storedCheckboxes_agency.checkbox_agency3 || false);
      setCheckbox_agency4(storedCheckboxes_agency.checkbox_agency4 || false);
      setCheckbox_agency5(storedCheckboxes_agency.checkbox_agency5 || false);
      setCheckbox_agency6(storedCheckboxes_agency.checkbox_agency6 || false);
      setCheckbox_agency7(storedCheckboxes_agency.checkbox_agency7 || false);
      setCheckbox_agency8(storedCheckboxes_agency.checkbox_agency8 || false);
      setCheckbox_agency9(storedCheckboxes_agency.checkbox_agency9 || false);
    }
    }, []);
    // Update session storage with the current checkbox states
    React.useEffect(() => {
      sessionStorage.setItem('checkedCheckboxes_agency', JSON.stringify({ checkbox_agency1, checkbox_agency2, checkbox_agency3, checkbox_agency4, checkbox_agency5, checkbox_agency6, checkbox_agency7, checkbox_agency8, checkbox_agency9 }));
    }, [checkbox_agency1, checkbox_agency2, checkbox_agency3, checkbox_agency4, checkbox_agency5, checkbox_agency6, checkbox_agency7, checkbox_agency8, checkbox_agency9]);


  //Vehicle Classification  
  React.useEffect(() => {
    const storedCheckboxes_v_classification = JSON.parse(sessionStorage.getItem('checkedCheckboxes_v_classification'));
    if (storedCheckboxes_v_classification) {
      setCheckbox_v_classification1(storedCheckboxes_v_classification.checkbox_v_classification1 || false);
      setCheckbox_v_classification2(storedCheckboxes_v_classification.checkbox_v_classification2 || false);
      setCheckbox_v_classification3(storedCheckboxes_v_classification.checkbox_v_classification3 || false);
      setCheckbox_v_classification4(storedCheckboxes_v_classification.checkbox_v_classification4 || false);
    }
    }, []);
    // Update session storage with the current checkbox states
    React.useEffect(() => {
      sessionStorage.setItem('checkedCheckboxes_v_classification', JSON.stringify({ checkbox_v_classification1, checkbox_v_classification2, checkbox_v_classification3, checkbox_v_classification4 }));
    }, [checkbox_v_classification1, checkbox_v_classification2, checkbox_v_classification3, checkbox_v_classification4]);


  //Vehicle Type  
  React.useEffect(() => {
    const storedCheckboxes_v_type = JSON.parse(sessionStorage.getItem('checkedCheckboxes_v_type'));
    if (storedCheckboxes_v_type) {
      setCheckbox_v_type1(storedCheckboxes_v_type.checkbox_v_type1 || false);
      setCheckbox_v_type2(storedCheckboxes_v_type.checkbox_v_type2 || false);
      setCheckbox_v_type3(storedCheckboxes_v_type.checkbox_v_type3 || false);
      setCheckbox_v_type4(storedCheckboxes_v_type.checkbox_v_type4 || false);
      setCheckbox_v_type5(storedCheckboxes_v_type.checkbox_v_type5 || false);
      setCheckbox_v_type6(storedCheckboxes_v_type.checkbox_v_type6 || false);
      setCheckbox_v_type7(storedCheckboxes_v_type.checkbox_v_type7 || false);
      setCheckbox_v_type8(storedCheckboxes_v_type.checkbox_v_type8 || false);
      setCheckbox_v_type9(storedCheckboxes_v_type.checkbox_v_type9 || false);
      setCheckbox_v_type10(storedCheckboxes_v_type.checkbox_v_type10 || false);
      setCheckbox_v_type11(storedCheckboxes_v_type.checkbox_v_type11 || false);
      setCheckbox_v_type12(storedCheckboxes_v_type.checkbox_v_type12 || false);
      setCheckbox_v_type13(storedCheckboxes_v_type.checkbox_v_type13 || false);
      setCheckbox_v_type14(storedCheckboxes_v_type.checkbox_v_type14 || false);
      setCheckbox_v_type15(storedCheckboxes_v_type.checkbox_v_type15 || false);
      setCheckbox_v_type16(storedCheckboxes_v_type.checkbox_v_type16 || false);
      setCheckbox_v_type17(storedCheckboxes_v_type.checkbox_v_type17 || false);
      setCheckbox_v_type18(storedCheckboxes_v_type.checkbox_v_type18 || false);
      setCheckbox_v_type19(storedCheckboxes_v_type.checkbox_v_type19 || false);
      setCheckbox_v_type20(storedCheckboxes_v_type.checkbox_v_type20 || false);
      setCheckbox_v_type21(storedCheckboxes_v_type.checkbox_v_type21 || false);
      setCheckbox_v_type22(storedCheckboxes_v_type.checkbox_v_type22 || false);
      setCheckbox_v_type23(storedCheckboxes_v_type.checkbox_v_type23 || false);
      setCheckbox_v_type24(storedCheckboxes_v_type.checkbox_v_type24 || false);
      setCheckbox_v_type25(storedCheckboxes_v_type.checkbox_v_type25 || false);
      setCheckbox_v_type26(storedCheckboxes_v_type.checkbox_v_type26 || false);
      setCheckbox_v_type27(storedCheckboxes_v_type.checkbox_v_type27 || false);
    }
    }, []);
    // Update session storage with the current checkbox states
    React.useEffect(() => {
      sessionStorage.setItem('checkedCheckboxes_v_type', JSON.stringify({ checkbox_v_type1, checkbox_v_type2, checkbox_v_type3, checkbox_v_type4, checkbox_v_type5, checkbox_v_type6, checkbox_v_type7, checkbox_v_type8, checkbox_v_type9, checkbox_v_type10, checkbox_v_type11, checkbox_v_type12, checkbox_v_type13, checkbox_v_type14, checkbox_v_type15, checkbox_v_type16, checkbox_v_type17, checkbox_v_type18, checkbox_v_type19, checkbox_v_type20, checkbox_v_type21, checkbox_v_type22, checkbox_v_type23, checkbox_v_type24, checkbox_v_type25, checkbox_v_type26, checkbox_v_type27 }));
    }, [checkbox_v_type1, checkbox_v_type2, checkbox_v_type3, checkbox_v_type4, checkbox_v_type5, checkbox_v_type6, checkbox_v_type7, checkbox_v_type8, checkbox_v_type9, checkbox_v_type10, checkbox_v_type11, checkbox_v_type12, checkbox_v_type13, checkbox_v_type14, checkbox_v_type15, checkbox_v_type16, checkbox_v_type17, checkbox_v_type18, checkbox_v_type19, checkbox_v_type20, checkbox_v_type21, checkbox_v_type22, checkbox_v_type23, checkbox_v_type24, checkbox_v_type25, checkbox_v_type26, checkbox_v_type27]);

  //Person Gender
  React.useEffect(() => {
    const storedCheckboxes_gender = JSON.parse(sessionStorage.getItem('checkedCheckboxes_gender'));
    if (storedCheckboxes_gender) {
      setCheckbox_gender1(storedCheckboxes_gender.checkbox_gender1 || false);
      setCheckbox_gender1(storedCheckboxes_gender.checkbox_gender2 || false);
      setCheckbox_gender1(storedCheckboxes_gender.checkbox_gender3 || false);
    }
    }, []);
    // Update session storage with the current checkbox states
    React.useEffect(() => {
      sessionStorage.setItem('checkedCheckboxes_gender', JSON.stringify({ checkbox_gender1, checkbox_gender2, checkbox_gender3 }));
    }, [checkbox_gender1, checkbox_gender2, checkbox_gender3]);


  //Apply button in filter
  const handleButtonClick = () => {
    //start and end date
    sessionStorage.setItem("start-date-filter", formattedDate);  
    sessionStorage.setItem("end-date-filter", formattedDate_1);

    set_s_date(formattedDate);
    set_e_date(formattedDate_1);


    //Adult and Child option
    const checkedCheckbox_adult_child = [];
    if (checkbox_adult) checkedCheckbox_adult_child.push('Adult');
    if (checkbox_child) checkedCheckbox_adult_child.push('Child');
    sessionStorage.setItem('Adult_Child', JSON.stringify(checkedCheckbox_adult_child));

    //Severity
    const checkedCheckboxNames = [];
    if (checkbox1) checkedCheckboxNames.push('PROPERTY_DAMAGE');
    if (checkbox2) checkedCheckboxNames.push('INJURY');
    if (checkbox3) checkedCheckboxNames.push('FATAL');
    sessionStorage.setItem('Severity', JSON.stringify(checkedCheckboxNames));
    setSeverityFilterSave(JSON.stringify(checkedCheckboxNames));

    //Main Cause
    const checkedCheckboxes_main_cause = [];
    if (checkbox_main1) checkedCheckboxes_main_cause.push('HUMAN_ERROR');
    if (checkbox_main2) checkedCheckboxes_main_cause.push('VEHICLE_DEFECT');
    if (checkbox_main3) checkedCheckboxes_main_cause.push('ROAD_DEFECT');
    if (checkbox_main4) checkedCheckboxes_main_cause.push('OTHERS');
    sessionStorage.setItem('Main_Cause', JSON.stringify(checkedCheckboxes_main_cause));
    setMaincauseFilterSave(JSON.stringify(checkedCheckboxes_main_cause))



    //Collistion Type
    const checkedCheckboxes_collision = [];
    if (checkbox_collision1) checkedCheckboxes_collision.push('HEAD_ON');
    if (checkbox_collision2) checkedCheckboxes_collision.push('REAR_END');
    if (checkbox_collision3) checkedCheckboxes_collision.push('RIGHT_ANGLE');
    if (checkbox_collision4) checkedCheckboxes_collision.push('OTHER_ANGLE');
    if (checkbox_collision5) checkedCheckboxes_collision.push('SIDE_SWIPE');
    if (checkbox_collision6) checkedCheckboxes_collision.push('OVERTURNED_VEHICLE');
    if (checkbox_collision7) checkedCheckboxes_collision.push('HIT_OBJECT_ON_ROAD');
    if (checkbox_collision8) checkedCheckboxes_collision.push('HIT_OBJECT_OFF_ROAD');
    if (checkbox_collision9) checkedCheckboxes_collision.push('HIT_PARKED_VEHICLE');
    if (checkbox_collision10) checkedCheckboxes_collision.push('HIT_PEDESTRIAN');
    if (checkbox_collision11) checkedCheckboxes_collision.push('HIT_ANIMAL');
    if (checkbox_collision12) checkedCheckboxes_collision.push('OTHERS');
    sessionStorage.setItem('Collistion_Type', JSON.stringify(checkedCheckboxes_collision));
    setCollisionFilterSave(JSON.stringify(checkedCheckboxes_collision))


    //Reporting Agency
    const checkedCheckboxes_agency = [];
    if (checkbox_agency1) checkedCheckboxes_agency.push('PNP');
    if (checkbox_agency2) checkedCheckboxes_agency.push('LOCAL_TRAFFIC_UNIT');
    if (checkbox_agency3) checkedCheckboxes_agency.push('BGCEA');
    if (checkbox_agency4) checkedCheckboxes_agency.push('CCTO');
    if (checkbox_agency5) checkedCheckboxes_agency.push('MMDA_METROBASE');
    if (checkbox_agency6) checkedCheckboxes_agency.push('MMDA_ROAD_SAFETY_UNIT');
    if (checkbox_agency7) checkedCheckboxes_agency.push('MUNTINLUPA_TRAFFIC_MANAGEMENT_BUREAU');
    if (checkbox_agency8) checkedCheckboxes_agency.push('ZAMBOANGA_ADMIN_OFFICE');
    if (checkbox_agency9) checkedCheckboxes_agency.push('OTHER');
    sessionStorage.setItem('Reporting_Agency', JSON.stringify(checkedCheckboxes_agency));
    setAgencyFilterSave(JSON.stringify(checkedCheckboxes_agency))


    //Vehicle Classfication
    const checkedCheckboxes_v_classification = [];
    if (checkbox_v_classification1) checkedCheckboxes_v_classification.push('PRIVATE');
    if (checkbox_v_classification2) checkedCheckboxes_v_classification.push('GOVERNMENT');
    if (checkbox_v_classification3) checkedCheckboxes_v_classification.push('PUBLIC_OR_FOR_HIRE');
    if (checkbox_v_classification4) checkedCheckboxes_v_classification.push('DIPLOMAT');
    sessionStorage.setItem('Vehicle_Classification', JSON.stringify(checkedCheckboxes_v_classification));
    setV_classificationFilterSave(JSON.stringify(checkedCheckboxes_v_classification))

    //Vehicle Types
    const checkedCheckboxes_v_type = [];
    if (checkbox_v_type1) checkedCheckboxes_v_type.push('CAR');
    if (checkbox_v_type2) checkedCheckboxes_v_type.push('VAN');
    if (checkbox_v_type3) checkedCheckboxes_v_type.push('SUV');
    if (checkbox_v_type4) checkedCheckboxes_v_type.push('BUS');
    if (checkbox_v_type5) checkedCheckboxes_v_type.push('JEEPNEY');
    if (checkbox_v_type6) checkedCheckboxes_v_type.push('TAXI_METERED');
    if (checkbox_v_type7) checkedCheckboxes_v_type.push('TRUCK_PICK_UP');
    if (checkbox_v_type8) checkedCheckboxes_v_type.push('TRUCK_RIGID ');
    if (checkbox_v_type9) checkedCheckboxes_v_type.push('TRUCK_ARTICULATED');
    if (checkbox_v_type10) checkedCheckboxes_v_type.push('TRUCK_FIRE');
    if (checkbox_v_type11) checkedCheckboxes_v_type.push('TRUCK');
    if (checkbox_v_type12) checkedCheckboxes_v_type.push('AMBULANCE');
    if (checkbox_v_type13) checkedCheckboxes_v_type.push('ARMORED_CAR');
    if (checkbox_v_type14) checkedCheckboxes_v_type.push('HEAVY_EQUIPMENT');
    if (checkbox_v_type15) checkedCheckboxes_v_type.push('MOTORCYCLE');
    if (checkbox_v_type16) checkedCheckboxes_v_type.push('TRICYCLE');
    if (checkbox_v_type17) checkedCheckboxes_v_type.push('BICYCLE');
    if (checkbox_v_type18) checkedCheckboxes_v_type.push('PEDICAB');
    if (checkbox_v_type19) checkedCheckboxes_v_type.push('PEDESTRIAN');
    if (checkbox_v_type20) checkedCheckboxes_v_type.push('PUSH_CART ');
    if (checkbox_v_type21) checkedCheckboxes_v_type.push('TARTANILLA');
    if (checkbox_v_type22) checkedCheckboxes_v_type.push('ANIMAL');
    if (checkbox_v_type23) checkedCheckboxes_v_type.push('WATER_VESSEL');
    if (checkbox_v_type24) checkedCheckboxes_v_type.push('ELECTRIC_BIKE');
    if (checkbox_v_type25) checkedCheckboxes_v_type.push('HABAL_HABAL');
    if (checkbox_v_type26) checkedCheckboxes_v_type.push('TRUCK_UNKNOWN');
    if (checkbox_v_type27) checkedCheckboxes_v_type.push('OTHERS');
    sessionStorage.setItem('Vehicle_Types', JSON.stringify(checkedCheckboxes_v_type));
    setV_typesFilterSave(JSON.stringify(checkedCheckboxes_v_type))

    //Person Gender
    const checkedCheckboxes_gender = [];
    if (checkbox_gender1) checkedCheckboxes_gender.push('MALE');
    if (checkbox_gender2) checkedCheckboxes_gender.push('FEMALE');
    if (checkbox_gender3) checkedCheckboxes_gender.push('OTHERS');
    sessionStorage.setItem('Gender', JSON.stringify(checkedCheckboxes_gender));
    setGenderFilterSave(JSON.stringify(checkedCheckboxes_gender))
    setShowSaveFilters(!showSaveFilters);
 
  };


    return (
        <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-filter"
        sx={{ '& .MuiDialog-paper': { width: '90%' } }}
        maxWidth='md'
      >
        <DialogTitle id="alert-dialog-title">
          {"Filters"}
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
          <DialogContentText id="alert-dialog-description">
            Interval <br></br>
            <DatePicker dateFormat="yyyy-MM-dd" showIcon selected={startDate} onChange={(date) => setStartDate(date)}/>
            &nbsp;&nbsp;
            To
            &nbsp;&nbsp;
            <DatePicker dateFormat="yyyy-MM-dd" showIcon selected={endDate} onChange={(date) => setEndDate(date)}/>

            <br></br>
            <br></br>
            <label><input type="checkbox" checked={checkbox_adult} onChange={() => setCheckbox1_adult(!checkbox_adult)} />&nbsp; Adult</label><br></br>
            <label><input type="checkbox" checked={checkbox_child} onChange={() => setCheckbox2_child(!checkbox_child)}/>&nbsp; Child</label><br></br>
            <br></br>
            Incident Details: Severity
            <br></br>
            <label><input type="checkbox" name="Property Damage" checked={checkbox1} onChange={() => setCheckbox1(!checkbox1)} />&nbsp; Property Damage</label><br></br>
            <label><input type="checkbox" name="Injury" checked={checkbox2} onChange={() => setCheckbox2(!checkbox2)}/>&nbsp; Injury</label><br></br>
            <label><input type="checkbox" name="Fatal" checked={checkbox3} onChange={() => setCheckbox3(!checkbox3)}/>&nbsp; Fatal</label><br></br>

            <br></br>
            Incident Details: Main cause
            <br></br>
            <label><input type="checkbox" checked={checkbox_main1} onChange={() => setCheckbox_main1(!checkbox_main1)}/>&nbsp; Human Error</label><br></br>
            <label><input type="checkbox" checked={checkbox_main2} onChange={() => setCheckbox_main2(!checkbox_main2)}/>&nbsp; Vehicle defect</label><br></br>
            <label><input type="checkbox" checked={checkbox_main3} onChange={() => setCheckbox_main3(!checkbox_main3)}/>&nbsp; Road defect</label><br></br>
            <label><input type="checkbox" checked={checkbox_main4} onChange={() => setCheckbox_main4(!checkbox_main4)}/>&nbsp; Other (see description)</label><br></br>

            <br></br>
            Incident Details: Collision type
            <br></br>
            <label><input type="checkbox" checked={checkbox_collision1} onChange={() => setCheckbox_collision1(!checkbox_collision1)}/>&nbsp; Head on</label><br></br>
            <label><input type="checkbox" checked={checkbox_collision2} onChange={() => setCheckbox_collision2(!checkbox_collision2)}/>&nbsp; Road end</label><br></br>
            <label><input type="checkbox" checked={checkbox_collision3} onChange={() => setCheckbox_collision3(!checkbox_collision3)}/>&nbsp; Right angle</label><br></br>
            <label><input type="checkbox" checked={checkbox_collision4} onChange={() => setCheckbox_collision4(!checkbox_collision4)}/>&nbsp; Angle (Other)</label><br></br>
            <label><input type="checkbox" checked={checkbox_collision5} onChange={() => setCheckbox_collision5(!checkbox_collision5)}/>&nbsp; Side swipe</label><br></br>
            <label><input type="checkbox" checked={checkbox_collision6} onChange={() => setCheckbox_collision6(!checkbox_collision6)}/>&nbsp; Overturned vehicle</label><br></br>
            <label><input type="checkbox" checked={checkbox_collision7} onChange={() => setCheckbox_collision7(!checkbox_collision7)}/>&nbsp; Hit object in road</label><br></br>
            <label><input type="checkbox" checked={checkbox_collision8} onChange={() => setCheckbox_collision8(!checkbox_collision8)}/>&nbsp; Hit object off road</label><br></br>
            <label><input type="checkbox" checked={checkbox_collision9} onChange={() => setCheckbox_collision9(!checkbox_collision9)}/>&nbsp; Hit parked vehicle</label><br></br>
            <label><input type="checkbox" checked={checkbox_collision10} onChange={() => setCheckbox_collision10(!checkbox_collision10)}/>&nbsp; Hit pedestrian</label><br></br>
            <label><input type="checkbox" checked={checkbox_collision11} onChange={() => setCheckbox_collision11(!checkbox_collision11)}/>&nbsp; Hit animal</label><br></br>
            <label><input type="checkbox" checked={checkbox_collision12} onChange={() => setCheckbox_collision12(!checkbox_collision12)}/>&nbsp; Other (see description)</label><br></br>

            <br></br>
            Incident Details: Reporting Agency
            <br></br>
            <label><input type="checkbox" checked={checkbox_agency1} onChange={() => setCheckbox_agency1(!checkbox_agency1)}/>&nbsp; PNP</label><br></br>
            <label><input type="checkbox" checked={checkbox_agency2} onChange={() => setCheckbox_agency2(!checkbox_agency2)}/>&nbsp; Local Traffic Unit</label><br></br>
            <label><input type="checkbox" checked={checkbox_agency3} onChange={() => setCheckbox_agency3(!checkbox_agency3)}/>&nbsp; BGCEA</label><br></br>
            <label><input type="checkbox" checked={checkbox_agency4} onChange={() => setCheckbox_agency4(!checkbox_agency4)}/>&nbsp; CCTO</label><br></br>
            <label><input type="checkbox" checked={checkbox_agency5} onChange={() => setCheckbox_agency5(!checkbox_agency5)}/>&nbsp; MMDA Metrobase</label><br></br>
            <label><input type="checkbox" checked={checkbox_agency6} onChange={() => setCheckbox_agency6(!checkbox_agency6)}/>&nbsp; MMDA Road Safety Unit</label><br></br>
            <label><input type="checkbox" checked={checkbox_agency7} onChange={() => setCheckbox_agency7(!checkbox_agency7)}/>&nbsp; Muntinlupa Traffic Management Bureau</label><br></br>
            <label><input type="checkbox" checked={checkbox_agency8} onChange={() => setCheckbox_agency8(!checkbox_agency8)}/>&nbsp; Zamboanga Admin Office</label><br></br>
            <label><input type="checkbox" checked={checkbox_agency9} onChange={() => setCheckbox_agency9(!checkbox_agency9)}/>&nbsp; Other</label><br></br>
            
            <br></br>
            Vehicle: Classification
            <br></br>
            <label><input type="checkbox" checked={checkbox_v_classification1} onChange={() => setCheckbox_v_classification1(!checkbox_v_classification1)}/>&nbsp; Private</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_classification2} onChange={() => setCheckbox_v_classification2(!checkbox_v_classification2)}/>&nbsp; Government</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_classification3} onChange={() => setCheckbox_v_classification3(!checkbox_v_classification3)}/>&nbsp; Public / For-Hire</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_classification4} onChange={() => setCheckbox_v_classification4(!checkbox_v_classification4)}/>&nbsp; Diplomat</label><br></br>

            <br></br>
            Vehicle: Vehicle type
            <br></br>
            <label><input type="checkbox" checked={checkbox_v_type1} onChange={() => setCheckbox_v_type1(!checkbox_v_type1)}/>&nbsp; Car</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type2} onChange={() => setCheckbox_v_type2(!checkbox_v_type2)}/>&nbsp; Van</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type3} onChange={() => setCheckbox_v_type3(!checkbox_v_type3)}/>&nbsp; SUV</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type4} onChange={() => setCheckbox_v_type4(!checkbox_v_type4)}/>&nbsp; Bus</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type5} onChange={() => setCheckbox_v_type5(!checkbox_v_type5)}/>&nbsp; Jeepney</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type6} onChange={() => setCheckbox_v_type6(!checkbox_v_type6)}/>&nbsp; Taxi (metered)</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type7} onChange={() => setCheckbox_v_type7(!checkbox_v_type7)}/>&nbsp; Truck (Pick-Up)</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type8} onChange={() => setCheckbox_v_type8(!checkbox_v_type8)}/>&nbsp; Truck (Rigid)</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type9} onChange={() => setCheckbox_v_type9(!checkbox_v_type9)}/>&nbsp; Truck (Articulated)</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type10} onChange={() => setCheckbox_v_type10(!checkbox_v_type10)}/>&nbsp; Truck (Fire)</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type11} onChange={() => setCheckbox_v_type11(!checkbox_v_type11)}/>&nbsp; Truck</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type12} onChange={() => setCheckbox_v_type12(!checkbox_v_type12)}/>&nbsp; Ambulance</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type13} onChange={() => setCheckbox_v_type13(!checkbox_v_type13)}/>&nbsp; Armored Car</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type14} onChange={() => setCheckbox_v_type14(!checkbox_v_type14)}/>&nbsp; Heavy Equipment</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type15} onChange={() => setCheckbox_v_type15(!checkbox_v_type15)}/>&nbsp; Motorcycle</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type16} onChange={() => setCheckbox_v_type16(!checkbox_v_type16)}/>&nbsp; Tricycle</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type17} onChange={() => setCheckbox_v_type17(!checkbox_v_type17)}/>&nbsp; Bicycle</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type18} onChange={() => setCheckbox_v_type18(!checkbox_v_type18)}/>&nbsp; Pedicab</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type19} onChange={() => setCheckbox_v_type19(!checkbox_v_type19)}/>&nbsp; Pedestrian</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type20} onChange={() => setCheckbox_v_type20(!checkbox_v_type20)}/>&nbsp; Push-Cart</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type21} onChange={() => setCheckbox_v_type21(!checkbox_v_type21)}/>&nbsp; Horse-Driven Carriage (Tartanilla)</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type22} onChange={() => setCheckbox_v_type22(!checkbox_v_type22)}/>&nbsp; Animal</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type23} onChange={() => setCheckbox_v_type23(!checkbox_v_type23)}/>&nbsp; Water Vessel</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type24} onChange={() => setCheckbox_v_type24(!checkbox_v_type24)}/>&nbsp; Electric Bike</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type25} onChange={() => setCheckbox_v_type25(!checkbox_v_type25)}/>&nbsp; Habal-habal</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type26} onChange={() => setCheckbox_v_type26(!checkbox_v_type26)}/>&nbsp; Truck (Unknown)</label><br></br>
            <label><input type="checkbox" checked={checkbox_v_type27} onChange={() => setCheckbox_v_type27(!checkbox_v_type27)}/>&nbsp; Others</label><br></br>

            <br></br>
            Person: Gender
            <br></br>
            <label><input type="checkbox" checked={checkbox_gender1} onChange={() => setCheckbox_gender1(!checkbox_gender1)}/>&nbsp; Male</label><br></br>
            <label><input type="checkbox" checked={checkbox_gender2} onChange={() => setCheckbox_gender2(!checkbox_gender2)}/>&nbsp; Female</label><br></br>
            <label><input type="checkbox" checked={checkbox_gender3} onChange={() => setCheckbox_gender3(!checkbox_gender3)}/>&nbsp; Others</label><br></br>

            <br></br>
            Saved filters
            <br></br>

            {showSaveFilters && (
            <p style={{fontSize: '12px', color: 'black'}}>
            
            Start Date: {s_date} <br></br>
            End Date: {e_date} <br></br>
            Severity: {severity_filter_save} <br></br>
            Main Cause: {maincause_filter_save} <br></br>
            Collision Type: {collision_filter_save} <br></br>
            Reporting Agency: {agency_filter_save} <br></br>
            Vehicle Classification: {v_classification_filter_save} <br></br>
            Vehicle Types: {v_types_filter_save} <br></br>
            Person Gender: {gender_filter_save}
            </p>
          )}

            <br></br>

        </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button>Save</Button> */}
          <Button autoFocus onClick={handleButtonClick}>
          {showSaveFilters ? '' : ''} Apply</Button>
          <Button>Reset</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>

    )

}

export default FilterDialog;
