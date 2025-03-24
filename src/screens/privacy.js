import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Privacy = () => {

  return (
    <div>
      {/* Header component containing the website's navigation and branding */}
      <Header></Header>

      <div className="content">
        {/* Data Privacy Notice Section */}
        {/* This section informs users about how their personal data is collected, used, stored, and protected */}
        
        <h1 style={{ marginLeft: '20px', marginTop: '20px' }}>
          Data Privacy Notice for DRIVER Philippines
        </h1>

        {/* Introduction to Data Privacy Notice */}
        <h2 style={{ marginLeft: '20px', marginTop: '20px' }}>Introduction</h2>
        <p style={{ marginLeft: '20px', marginTop: '10px', fontSize: '14px' }}>
          Welcome to DRIVER Philippines. Protecting your privacy is of utmost importance to us. 
          This Data Privacy Notice outlines our practices regarding the collection, use, and 
          protection of your personal data.
        </p>

        {/* Information Collection Policy */}
        <h2 style={{ marginLeft: '20px', marginTop: '20px' }}>Collection of Information</h2>
        <p style={{ marginLeft: '20px', marginTop: '10px', fontSize: '14px' }}>
          We collect information related to road incidents, including personal details such as 
          name, age, gender, and contact information, as well as incident specifics like 
          location, time, and nature of the incident. This data is essential for analyzing 
          road safety and developing effective traffic management strategies.
        </p>

        {/* How the collected data is used */}
        <h2 style={{ marginLeft: '20px', marginTop: '20px' }}>Use and Disclosure of Data</h2>
        <p style={{ marginLeft: '20px', marginTop: '10px', fontSize: '14px' }}>
          The information collected is used for data analysis, generating reports, and 
          informing road safety measures. We may share data with government entities or 
          law enforcement agencies when required by law. We assure you that we do not sell 
          your data to third parties for marketing or advertising purposes.
        </p>

        {/* Security and Storage of User Data */}
        <h2 style={{ marginLeft: '20px', marginTop: '20px' }}>Data Security and Storage</h2>
        <p style={{ marginLeft: '20px', marginTop: '10px', fontSize: '14px' }}>
          We are committed to ensuring the security of your data. We employ advanced 
          security measures to protect your information from unauthorized access, 
          alteration, disclosure, or destruction. Your data is stored securely and is 
          accessible only to authorized personnel.
        </p>

        {/* User Rights and Options */}
        <h2 style={{ marginLeft: '20px', marginTop: '20px' }}>Your Rights and Choices</h2>
        <p style={{ marginLeft: '20px', marginTop: '10px', fontSize: '14px' }}>
          You have the right to access your personal data, request corrections, or 
          ask for deletion, subject to certain legal and operational limitations. 
          If you wish to exercise these rights or have any questions about our data 
          handling practices, please contact our Data Protection Officer.
        </p>

        {/* Notification about Policy Changes */}
        <h2 style={{ marginLeft: '20px', marginTop: '20px' }}>Changes to this Notice</h2>
        <p style={{ marginLeft: '20px', marginTop: '10px', fontSize: '14px' }}>
          We may update this notice to reflect changes in our data privacy practices. 
          We encourage you to periodically review this notice for the latest 
          information on our privacy commitments.
        </p>

        {/* Contact Details for Privacy Concerns */}
        <h2 style={{ marginLeft: '20px', marginTop: '20px' }}>Contact Information</h2>
        <p style={{ marginLeft: '20px', marginTop: '10px', fontSize: '14px' }}>
          If you have any concerns or questions about how we handle your data, 
          please contact us at [contact information].
        </p>

        {/* Consent Statement */}
        <h2 style={{ marginLeft: '20px', marginTop: '20px' }}>Consent</h2>
        <p style={{ marginLeft: '20px', marginTop: '10px', fontSize: '14px' }}>
          By using DRIVER Philippines, you consent to the collection, use, and 
          sharing of your data as described in this notice.
          <br /><br />
          Please visit our <a href="#">Full Data Privacy Policy</a> for more 
          detailed information.
        </p>

        {/* Closing Remarks */}
        <p style={{ marginLeft: '20px', marginTop: '20px', fontSize: '14px' }}>
          ---------
        </p>
        <p style={{ marginLeft: '20px', marginTop: '10px', fontSize: '14px' }}>
          This comprehensive Data Privacy Notice provides clear information about 
          data handling, user rights, and the security measures in place, ensuring 
          transparency and building trust among users.
        </p>
      </div>

      {/* Outlet for rendering child components */}
      <Outlet></Outlet>
    </div>
  );
};

export default Privacy;
