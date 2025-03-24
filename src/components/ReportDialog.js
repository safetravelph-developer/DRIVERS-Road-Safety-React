import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SelectRowImport from '../components/SelectRowReport'

function ReportDialog(props) {
    const { open, onClose } = props

    const sdf = sessionStorage.getItem("start-date-filter");
    const edf = sessionStorage.getItem("end-date-filter");

      
  const StartdateString = sdf.split(" ")[0]; 
  const EnddateString = edf.split(" ")[0]; 

    const [selectedValue, setSelectedValue] = React.useState('');
    const [isButtonEnabled, setIsButtonEnabled] = React.useState(false);

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    if (e.target.value) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  const handleSubmit = () => {
    // alert(`Selected value: ${selectedValue}`);
    sessionStorage.setItem("report-filter", selectedValue);
    window.location.reload();
    onClose();
  };


    return (
      <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-filter"
      sx={{ '& .MuiDialog-paper': { width: '80%' } }}
      maxWidth='sm'
    >
      <DialogTitle id="alert-dialog-title">
        {"Report"}
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
        <div style={{width: '100%', height: '90px', border: '1px solid grey'}}>
        <p style={{fontSize: '15px', marginLeft: '5px', marginTop: '5px', color: 'black'}}>Active Filter</p>
        <p style={{fontSize: '11px', marginTop: '10px' ,marginLeft: '5px'}}>Occured Date: {StartdateString} to {EnddateString} </p>
        <p style={{fontSize: '11px', marginTop: '10px' ,marginLeft: '5px'}}>Column Selected: {sessionStorage.getItem("report-filter")} </p>
        </div>

        {/* <button style={{marginTop: '10px', height: '25px', width: '50px', fontSize:'13px'}}>Rows</button>
        <SelectRowImport></SelectRowImport>
        <br></br>
        <button style={{marginTop: '10px', height: '25px', width: '60px', fontSize:'13px'}}>Columns</button>
        <SelectRowImport></SelectRowImport> */}

        <button style={{marginTop: '10px', height: '25px', width: '60px', fontSize:'13px'}}>Columns</button>
        <select style={{marginTop: '10px', height: '25px', width: '200px', fontSize:'13px'}} onChange={handleSelectChange} value={selectedValue}>
          <option value="1"> </option>
          <option value="Main Cause">Main Cause</option>
          <option value="Collision Type">Collision Type</option>
          <option value="Reporting Agency">Reporting Agency</option> 
        </select>

      </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button>Reset</Button> */}
        <Button autoFocus onClick={handleSubmit} disabled={!isButtonEnabled}>Apply</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>

    )

}

export default ReportDialog;
