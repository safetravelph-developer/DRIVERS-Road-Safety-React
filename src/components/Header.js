import Navbar from "./NavBar_";
import MobileNav from "./MobileNav"
import '../App.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';


const Header = () => {


  useEffect(() => {
    const disableBackButton = () => {
      window.history.pushState(null, null, window.location.pathname);
      window.addEventListener('popstate', function () {
        window.history.pushState(null, null, window.location.pathname);
      });
    };

    disableBackButton(); // Call the function to disable the back button

    return () => {
      // Clean up event listener if the component unmounts
      window.removeEventListener('popstate', disableBackButton);
    };
  }, []);


  const navigate = useNavigate();

  const todriver = (e) => {

    navigate('/driver');
    window.location.reload();
    sessionStorage.setItem("selected_menu", "Map");
    sessionStorage.setItem("selected_menu1", "Map");
  }
  return (
    <header>
      <div className="nav-area">

        <button className="logo" onClick={todriver}>DRIVER</button>
        <Navbar></Navbar>
        <MobileNav></MobileNav>

      </div>
    </header>
  );
};

export default Header;
