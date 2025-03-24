import React, { useEffect, useRef, useState } from "react";
import { menuItemsData } from "../MenuItemsData";
import MobileMenuItems from "./MobileMenuItems";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiFilter } from "react-icons/ci";
import { BsFillPinMapFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import FilterDialog from './FilterDialog'
import DateFilter from './DateFilter'
import { IoClose } from "react-icons/io5";
import ReportDialog from './ReportDialog'
import { BsListNested } from "react-icons/bs";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {gql, useQuery} from '@apollo/client';

const GET_LOCATIONS = gql`
query sampleFindAll {
    incident_findAllByFilterWithPagination(filters: {
      isVerified: true
    }, options: {
      paginationOption: {
        page: 1
        resultsPerPage: 30
      }
    }) {
      paginationDetails {
        page
        resultsPerPage
        totalCount
      }
      paginationDetails {
        page
        resultsPerPage
      }
    }
}`;

const GET_LOCATIONS_1 = gql`
query sampleFindAll {
    incident_findAllByFilterWithPagination(filters: {
      isVerified: false
    }, options: {
      paginationOption: {
        page: 1
        resultsPerPage: 30
      }
    }) {
      paginationDetails {
        page
        resultsPerPage
        totalCount
      }
      paginationDetails {
        page
        resultsPerPage
      }
    }
}`;

const MobileNav = () => {

  // const depthLevel = 0;
  const [showMenu, setShowMenu] = useState(false);
  let ref = useRef();

  var item_value = sessionStorage.getItem("login_user");
  var selected_menu = sessionStorage.getItem("selected_menu");

  const [openhelp, setOpen] = React.useState(false);

      // Execute both queries with their own variables
      const { data: data1, loading: loading1, error: error1, refetch: refetch1  } = useQuery(GET_LOCATIONS, {
      });
      const { data: data2, loading: loading2, error: error2, refetch: refetch2  } = useQuery(GET_LOCATIONS_1, {
      });
  
  
    const handleClickOpen = () => {
      refetch1();
      refetch2();
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  const navigate = useNavigate();
  const handleChange_privacy = (e) => {
    navigate('/privacy');

  }

  const handleChange_stph = (e) => {
    navigate('/data-review');
  }

  const depthLevel = 0;


  const [dialogIsOpen, setDialogIsOpen] = React.useState(false)
  const [filterC, setFilterC] = React.useState(false);
  
  const [openC, setOpenC] = React.useState(true)
  const [closeC, setCloseC] = React.useState(false);



  const closeDialog = () => {
    setDialogIsOpen(false);
    setFilterC(false);

  }

  const openDialog = () => {
    setDialogIsOpen(true);
    setFilterC(true);
  }

  const [dialogIsOpen2, setDialogIsOpen2] = React.useState(false)
  const openDialog2 = () => setDialogIsOpen2(true)
  const closeDialog2 = () => setDialogIsOpen2(false)


  var value;
  var value1;
  var value2;
  var value3;


  if(item_value === 'false'){
    value = false;
  } else {
    value = true;
  }

  if(selected_menu === 'List' || selected_menu === 'Reports' || selected_menu === 'Charts' || selected_menu === 'Privacy'){
    value1 = true;
  } else {
    value1 = false;
  }

  if(selected_menu === 'Reports'){
    value2 = false;
  } else {
    value2 = true;
  }


  if(selected_menu === 'Data-review'){
    value3 = false;
  } else {
    value3 = true;
  }

  const openDialog1 = (e) => {
    sessionStorage.setItem("record-button", "clicked");
    setFilterC(true);
    setCloseC(false);
    setOpenC(true);
  }


  const opemButton = (event) => {
        setFilterC(false);
        setShowMenu(true);
        setOpenC(false);
        setCloseC(true);
    }

    const closeButton = (event) => {
      setShowMenu(false);
      setCloseC(false);
      setOpenC(true);
    }


        // Handle loading and error states
        if (loading1 || loading2) return console.log('Loading ..');
        if (error1 || error2) return console.log("error");
    
    
      var totalCount_validated = data1.incident_findAllByFilterWithPagination.paginationDetails.totalCount;
      var totalCount_not_validated = data2.incident_findAllByFilterWithPagination.paginationDetails.totalCount;
    


  return (
    <nav className="mobile-nav">
      <button
        className="mobile-nav__menu-button"
        type="button"
        onClick={opemButton}
        hidden={closeC}
        >
        <div>
        <GiHamburgerMenu hidden={closeC}/>
        </div>
        </button>


        <button
        className="mobile-nav__menu-button"
        type="button"
        onClick={closeButton}
        hidden={openC}
        >
        <div>
        <IoClose hidden={openC} />
        </div>
      </button>

      {showMenu && (
        <ul className="menus" ref={ref} hidden={filterC}>
          {menuItemsData.map((menu, index) => {
            return (
              <MobileMenuItems
                items={menu}
                key={index}
                depthLevel={depthLevel}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
              />
            );
          })}

        <button className="privacy-box"  onClick={handleChange_privacy}>
        <p style={{fontSize: "13px", marginTop: "5px"}}>Privacy</p>
        </button>
        <br></br>
        <br></br>
        <button className="stph-box" onClick={handleChange_stph} hidden={value? true : false}>
        <p style={{fontSize: "13px", marginLeft: '2px'}}>Data Review</p></button>
        <br></br>
        <br></br>
        <button className="stph-box" onClick={handleClickOpen} hidden={value3? true : false}>
        <p style={{fontSize: "13px", marginLeft: '2px'}}>Summary</p></button>
        <br></br>
        <br></br>


        <Dialog open={openhelp} onClose={handleClose} 
          PaperProps={{
            sx: { width: '500px', height: '250px' }  // Custom width and height
          }}
        >
        <DialogContent>
          <h3>Data Summary</h3>
          <br />
          <br />
          <div>
            <h4 style={{ display: 'inline' }}>Validated Data: </h4>
            <p style={{ display: 'inline' }}>&nbsp;&nbsp;{totalCount_validated}</p>
          </div>
          <br />
          <div>
            <h4 style={{ display: 'inline' }}>Unvalidated Data: </h4>
            <p style={{ display: 'inline' }}>&nbsp;&nbsp;{totalCount_not_validated}</p>
          </div>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        </DialogActions>
        </Dialog>


        <button className="filter-box" style={{marginLeft: '15px'}} onClick={openDialog}>
        <div style={{marginTop: '5px'}}>
          <CiFilter/>
          </div>
        </button>
        <DateFilter open={dialogIsOpen} onClose={closeDialog}></DateFilter>


        <button className="record-box" onClick={openDialog1} hidden={value? true : false}> 
        <div style={{marginTop: '5px'}}>
          <BsFillPinMapFill/>
          </div>
        </button>

   
        <button className="report-box" onClick={openDialog2} hidden={value2? true : false} > 
        <div style={{marginTop: '5px'}}>
          <BsListNested/>
        </div>
        </button>
        <ReportDialog open={dialogIsOpen2} onClose={closeDialog2}></ReportDialog>
    
        {/* <RecordDialog open={dialogIsOpen1} onClose={closeDialog1}></RecordDialog> */}
        

        </ul>
      )}
    </nav>
  );
};

export default MobileNav;
