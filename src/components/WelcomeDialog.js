import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function WelcomeDialog(props) {
    const { open, onClose } = props

    return (
        <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-filter"
        sx={{ '& .MuiDialog-paper': {width:'90%'}}}
        maxWidth='xs'>

        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div className="content" style={{color: 'black'}}>
          <p style={{marginTop: '10px', fontSize:'14px'}}>Welcome! The DRIVER Web App visualizes on the map a rich database of road incidents. </p>
          <p style={{marginTop: '10px', fontSize:'14px'}}>Please use the FILTERS on the top bar and the LAYERS button on the map to start showing specific data sets.</p>
          </div>
        </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} style={{backgroundColor: '#0D6EFD', color: 'white'}}>Close</Button>
        </DialogActions>
      </Dialog>

    )

}

export default WelcomeDialog;
