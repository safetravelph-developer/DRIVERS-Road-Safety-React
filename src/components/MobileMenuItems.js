import { useState } from "react";
import { Link } from "react-router-dom";
import MobileDropdown from "./MobileDropdown";
import { useNavigate } from 'react-router-dom';

const MobileMenuItems = ({ items, depthLevel, showMenu, setShowMenu }) => {
  const [dropdown, setDropdown] = useState(false);

  const navigate = useNavigate();
  const handleChange = event => {
    // 👇️ access input value
    console.log(event.target.name);

    if(event.target.name === "Map"){

      sessionStorage.setItem("selected_menu", "Map");
      sessionStorage.setItem("selected_menu1", "Map");

      window.location.reload();
      navigate('/driver');
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

  var selected_menu = sessionStorage.getItem("selected_menu1");
  var selected_menu2 = sessionStorage.getItem("selected_menu2");
  var selected_menu3 = sessionStorage.getItem("selected_menu3");


  const closeDropdown = () => {
    dropdown && setDropdown(false);
    showMenu && setShowMenu(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdown((prev) => !prev);
  };

  return (
    <li className="menu-items" onClick={closeDropdown}>
      {items.url && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}>
            {/* <Link to={items.url} onClick={closeDropdown}>
              {items.title}
            </Link> */}

            {selected_menu}
            <div onClick={(e) => toggleDropdown(e)}>
              {dropdown ? (
                <span className="arrow-close" />
              ) : (
                <span className="arrow" />
              )}
            </div>
          </button>
          <MobileDropdown
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
            {selected_menu2}{" "}
            <div onClick={(e) => toggleDropdown(e)}>
              {dropdown ? (
                <span className="arrow-close" />
              ) : (
                <span className="arrow" />
              )}
            </div>
          </button>
          <MobileDropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : !items.url && items.submenu1 ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}>
            {selected_menu3}{" "}
            <div onClick={(e) => toggleDropdown(e)}>
              {dropdown ? (
                <span className="arrow-close" />
              ) : (
                <span className="arrow" />
              )}
            </div>
          </button>
          <MobileDropdown
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

export default MobileMenuItems;
