import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

function FilterDialog(props) {
  
    const { open, onClose } = props
    const [selectedDate, setSelectedDate] = React.useState(sessionStorage.getItem('start-date-filter'));
    const [selectedDate_2, setSelectedDate_2] = React.useState(sessionStorage.getItem('end-date-filter'));

    const [isChecked, setIsChecked] = React.useState(false);

 

      
    React.useEffect(() => {
 
        // Retrieve selected date from sessionStorage on component mount
        const storedDate = sessionStorage.getItem('start-date-filter');
        if (storedDate) {
            setSelectedDate(new Date(storedDate));
        } 

        const storedDate_2 = sessionStorage.getItem('end-date-filter');
        if (storedDate_2) {
          setSelectedDate_2(new Date(storedDate_2));
        } 

        const storedValue = sessionStorage.getItem('childFilter');
        if (storedValue) {
          setIsChecked(JSON.parse(storedValue));
        }

      }, []);

        


    const handleDateChange = (date) => {
        const dateWithFixedTime = dayjs(date).hour(0).minute(0).second(0).millisecond(0).toDate();
        setSelectedDate(dateWithFixedTime);
        sessionStorage.setItem('selectedDate', dateWithFixedTime);
        
      };
  
      const handleDateChange_2 = (date) => {
          const dateWithFixedTime_2 = dayjs(date).hour(23).minute(59).second(59).millisecond(0).toDate();
          setSelectedDate_2(dateWithFixedTime_2);
          sessionStorage.setItem('selectedDate', dateWithFixedTime_2);
        };

        const handleCheckboxChange = (event) => {
          const checked = event.target.checked;
          setIsChecked(checked);
        };
  
        const handleButtonClick = () => {


          if (isChecked) {
            sessionStorage.setItem('childFilter', "true");
          } else {
            sessionStorage.setItem('childFilter', "false");
          }
    
          onClose();
          window.location.reload();
        }
  

    return (
        <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-filter"
        sx={{ '& .MuiDialog-paper': { width: '90%' } }}
        maxWidth='xs'
      >
        <DialogTitle id="alert-dialog-title">
          {"Filter by Date"}
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

          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange} // Allow checkbox interaction
            />
            &nbsp;Child Incidents only
          </label>
          <br></br>

          
            
            <br></br>
            <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            showTimeSelect={false}
            showIcon
            />

            {selectedDate && (
            sessionStorage.setItem("start-date-filter", dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss'))
            )}    
            
    
            <br></br>
            <br></br>
            <br></br>
            <p style={{color: 'black', fontSize:'14px'}}>TO</p>
            <br></br>
            <br></br>

            <DatePicker
            selected={selectedDate_2}
            onChange={handleDateChange_2}
            dateFormat="yyyy-MM-dd"
            showTimeSelect={false}
            showIcon
            />

            {selectedDate_2 && (
                sessionStorage.setItem("end-date-filter", dayjs(selectedDate_2).format('YYYY-MM-DD HH:mm:ss'))
            )}    
            




        
        </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleButtonClick}>Apply</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
        
            <br></br>
            <br></br>
            <br></br>
            <br></br>
      </Dialog>


    )

}

export default FilterDialog;
