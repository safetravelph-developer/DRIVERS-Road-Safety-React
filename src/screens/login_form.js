import { GoogleLogin } from '@react-oauth/google';
import * as React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PrivacyDialog from "../components/PrivacyDialog";
import classes from "./login.module.css";

function LoginForm() {
  // State to control the Privacy dialog visibility
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
  const openDialog = () => setDialogIsOpen(true);
  const closeDialog = () => setDialogIsOpen(false);

  // State to store user input for login
  const [userNameInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const navigate = useNavigate();

  // Handles username input change
  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  // Handles password input change
  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  // Handles login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Fetch stored credentials from environment variables
    let Account1 = {
      username: process.env.REACT_APP_ACCOUNT_1_USERNAME,
      password: process.env.REACT_APP_ACCOUNT_1_PASSWORD
    };
    let Account2 = {
      username: process.env.REACT_APP_ACCOUNT_2_USERNAME,
      password: process.env.REACT_APP_ACCOUNT_2_PASSWORD
    };
    let Account3 = {
      username: process.env.REACT_APP_ACCOUNT_3_USERNAME,
      password: process.env.REACT_APP_ACCOUNT_3_PASSWORD
    };
    let Account4 = {
      username: process.env.REACT_APP_ACCOUNT_4_USERNAME,
      password: process.env.REACT_APP_ACCOUNT_4_PASSWORD
    };
    let Account5 = {
      username: process.env.REACT_APP_ACCOUNT_5_USERNAME,
      password: process.env.REACT_APP_ACCOUNT_5_PASSWORD
    };
    
    // Validate input credentials against stored accounts
    if (
      (userNameInput === Account1.username || userNameInput === Account2.username || userNameInput === Account3.username || userNameInput === Account4.username || userNameInput === Account5.username) &&
      (passwordInput === Account1.password || passwordInput === Account2.password || passwordInput === Account3.password || passwordInput === Account4.password || passwordInput === Account5.password)
    ) {
      alert('Login Successful!!');

      // Store session data
      sessionStorage.setItem("login_user", "false");
      sessionStorage.setItem("selected_menu1", "Map");
      sessionStorage.setItem("selected_menu2", "City/Provinces");
      sessionStorage.setItem("selected_menu3", "All");
      sessionStorage.setItem("start-date-filter", "2015-01-01 00:00:00");
      sessionStorage.setItem("end-date-filter", "2025-01-01 23:59:59");
      sessionStorage.setItem('childFilter', "false");

      navigate('driver');
      window.location.reload();
    } else {
      alert('Invalid username or password!!');
    }
  };

  return (
    <div className={classes.div}>
      {/* Privacy Policy Button */}
      <button className="button_privacy" onClick={openDialog}>Privacy</button>
      <PrivacyDialog open={dialogIsOpen} onClose={closeDialog} />
      
      {/* Login Form */}
      <form autoComplete="off" onSubmit={handleLoginSubmit}>
        <div>
          <h2>DRIVER</h2>
          <p style={{ fontSize: "13px", marginTop: "20px", marginBottom: "-10px" }}>Username</p>
          <input
            className={classes.input}
            type="text"
            id="user-name"
            name="user-name"
            autoComplete="on"
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <p style={{ fontSize: "13px", marginTop: "20px", marginBottom: "-10px" }}>Password</p>
          <input
            className={classes.input}
            type="password"
            id="user-password"
            name="user-password"
            autoComplete="off"
            onChange={handlePasswordChange}
          />
        </div>
        <button className={classes.loginBtn}>Log in</button>
      </form>
      
      {/* Google Login Button */}
      <div className={classes.loginBtn1}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            // Store session data on successful Google login
            sessionStorage.setItem("login_user", "true");
            sessionStorage.setItem("selected_menu1", "Map");
            sessionStorage.setItem("selected_menu2", "City/Provinces");
            sessionStorage.setItem("selected_menu3", "All");
            sessionStorage.setItem("start-date-filter", "2015-01-01 00:00:00");
            sessionStorage.setItem("end-date-filter", "2025-01-01 23:59:59");
            sessionStorage.setItem('childFilter', "false");
            
            navigate('driver');
            window.location.reload();
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </div>
  );
}

export default LoginForm;

/*
  NOTE:
  - The username and password values are stored in the .env file.
  - Users can edit the .env file to change the login credentials.
  - Environment variables:
    - REACT_APP_ACCOUNT_1_USERNAME, REACT_APP_ACCOUNT_1_PASSWORD
    - REACT_APP_ACCOUNT_2_USERNAME, REACT_APP_ACCOUNT_2_PASSWORD
    - REACT_APP_ACCOUNT_3_USERNAME, REACT_APP_ACCOUNT_3_PASSWORD
    - REACT_APP_ACCOUNT_4_USERNAME, REACT_APP_ACCOUNT_4_PASSWORD
    - REACT_APP_ACCOUNT_5_USERNAME, REACT_APP_ACCOUNT_5_PASSWORD
  - Google OAuth login uses the client ID stored in:
    - REACT_APP_GOOGLE_CLIENT_ID
  - To update credentials, modify the .env file accordingly.
*/