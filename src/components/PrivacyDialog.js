import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function PrivacyDialog(props) {
  const { open, onClose } = props

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
        <h1 style={{ marginTop: '20px' }}>Data Privacy Notice for DRIVER Philippines</h1>
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

          <div className="content" style={{ color: 'black' }}>
            {/* Introduction Section */}
            <h2 style={{ marginTop: '10px' }}>Introduction</h2>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              Welcome to DRIVER Philippines. Protecting your privacy is of utmost importance to us.
              This Data Privacy Notice outlines our practices regarding the collection, use, and
              protection of your personal data.
            </p>

            {/* Data Collection Section */}
            <h2 style={{ marginTop: '20px' }}>Collection of Information</h2>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              We collect information related to road incidents, including personal details such as
              name, age, gender, and contact information, as well as incident specifics like location,
              time, and nature of the incident. This data is essential for analyzing road safety and
              developing effective traffic management strategies.
            </p>

            {/* Data Usage and Disclosure Section */}
            <h2 style={{ marginTop: '20px' }}>Use and Disclosure of Data</h2>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              The information collected is used for data analysis, generating reports, and informing
              road safety measures. We may share data with government entities or law enforcement
              agencies when required by law. We assure you that we do not sell your data to third
              parties for marketing or advertising purposes.
            </p>

            {/* Data Security Section */}
            <h2 style={{ marginTop: '20px' }}>Data Security and Storage</h2>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              We are committed to ensuring the security of your data. We employ advanced security
              measures to protect your information from unauthorized access, alteration, disclosure,
              or destruction. Your data is stored securely and is accessible only to authorized
              personnel.
            </p>

            {/* User Rights Section */}
            <h2 style={{ marginTop: '20px' }}>Your Rights and Choices</h2>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              You have the right to access your personal data, request corrections, or ask for deletion,
              subject to certain legal and operational limitations. If you wish to exercise these rights
              or have any questions about our data handling practices, please contact our Data Protection
              Officer.
            </p>

            {/* Privacy Policy Updates Section */}
            <h2 style={{ marginTop: '20px' }}>Changes to this Notice</h2>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              We may update this notice to reflect changes in our data privacy practices. We encourage
              you to periodically review this notice for the latest information on our privacy
              commitments.
            </p>

            {/* Contact Information Section */}
            <h2 style={{ marginTop: '20px' }}>Contact Information</h2>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              If you have any concerns or questions about how we handle your data, please contact us
              at [contact information].
            </p>

            {/* User Consent Section */}
            <h2 style={{ marginTop: '20px' }}>Consent</h2>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              By using DRIVER Philippines, you consent to the collection, use, and sharing of your
              data as described in this notice.
              <br />
              Please visit our <a href="#">Full Data Privacy Policy</a> for more detailed information.
            </p>

            {/* Separator */}
            <p style={{ marginTop: '20px', fontSize: '14px' }}>---------</p>

            {/* Summary Statement */}
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              This comprehensive Data Privacy Notice provides clear information about data handling,
              user rights, and the security measures in place, ensuring transparency and building
              trust among users.
            </p>
          </div>

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ backgroundColor: '#0D6EFD', color: 'white' }}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PrivacyDialog;
