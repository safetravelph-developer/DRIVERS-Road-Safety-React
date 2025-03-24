import Dropdown from "./Dropdown";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
// import {useRef } from 'react';

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  const navigate = useNavigate();

  // const [selected, setSelected] = useState("Map");

  const handleChange = event => {
    // 👇️ access input value
    console.log(event.target.name);

    if(event.target.name === "Map"){

      sessionStorage.setItem("selected_menu", "Map");
      sessionStorage.setItem("selected_menu1", "Map");

      
      navigate('/driver');
      window.location.reload();
     
    } 

    if(event.target.name === "List"){

      sessionStorage.setItem("selected_menu", "List");
      sessionStorage.setItem("selected_menu1", "List");

      navigate('/list');
    } 

    if(event.target.name === "Reports"){
      sessionStorage.setItem("selected_menu", "Reports");
      sessionStorage.setItem("selected_menu1", "Reports");
      navigate('/reports');
    } 

    if(event.target.name === "Charts"){
      sessionStorage.setItem("selected_menu", "Charts");
      sessionStorage.setItem("selected_menu1", "Charts");
      navigate('/charts');
    } 

    if(event.target.name === "Exit"){
      navigate('/exit');
    } 


    if(event.target.name === "City/Provinces" || event.target.name === "Barangay" || event.target.name === "Cities" || event.target.name === "Regions" ){

      sessionStorage.setItem("selected_menu2", event.target.name);
    }

    if(event.target.name === "All" || event.target.name === "Manila" || event.target.name === "Navotas" || event.target.name === "Caloocan" || event.target.name === "Malabon" || event.target.name === "Valenzuela" || event.target.name === "Quezon City" || event.target.name === "Zamboanga City" || event.target.name === "Angeles City" || event.target.name === "Cagayan De Oro City"){

      sessionStorage.setItem("selected_menu3", event.target.name);
    }
  }

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  var selected_menu = sessionStorage.getItem("selected_menu1");
  var selected_menu2 = sessionStorage.getItem("selected_menu2");
  var selected_menu3 = sessionStorage.getItem("selected_menu3");

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}>
      {items.url && items.submenu ? (
        <>
        <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => toggleDropdown()}> 
            {selected_menu}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
         ) : !items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}>
            {selected_menu2}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ): !items.url && items.submenu1 ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}>
             {selected_menu3}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu1}
            dropdown={dropdown}
          />
        </>
      ): (
          
          <button name={items.title} onClick={handleChange}>{items.title}</button>
      )}
    </li>
  );
};

export default MenuItems;
