import { menuItemsData } from "../MenuItemsData";
import MenuItems from "./MenuItems";
import { CiFilter } from "react-icons/ci";
import { BsFillPinMapFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { BsListNested } from "react-icons/bs";
import * as React from 'react';
import FilterDialog from './FilterDialog'
import DateFilter from './DateFilter'
import ReportDialog from './ReportDialog'
import { List } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { gql, useQuery } from '@apollo/client';

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


function Navbar() {

  var item_value = sessionStorage.getItem("login_user");
  var selected_menu = sessionStorage.getItem("selected_menu");

  const navigate = useNavigate();

  const [openhelp, setOpen] = React.useState(false);

  // Execute both queries with their own variables
  const { data: data1, loading: loading1, error: error1, refetch: refetch1 } = useQuery(GET_LOCATIONS, {
  });
  const { data: data2, loading: loading2, error: error2, refetch: refetch2 } = useQuery(GET_LOCATIONS_1, {
  });


  const handleClickOpen = () => {
    refetch1();
    refetch2();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange_privacy = (e) => {
    sessionStorage.setItem("selected_menu", "Privacy");
    navigate('/privacy');
  }

  const handleChange_stph = (e) => {
    sessionStorage.setItem("selected_menu", "Data-review");
    navigate('/data-review');
  }

  const [dialogIsOpen, setDialogIsOpen] = React.useState(false)
  const openDialog = () => setDialogIsOpen(true)
  const closeDialog = () => setDialogIsOpen(false)

  const openDialog1 = (e) => {
    sessionStorage.setItem("record-button", "clicked");
  }

  const [dialogIsOpen2, setDialogIsOpen2] = React.useState(false)
  const openDialog2 = () => setDialogIsOpen2(true)
  const closeDialog2 = () => setDialogIsOpen2(false)

  var value;
  var value1;
  var value2;
  var value3;

  if (item_value === 'false') {
    value = false;
  } else {
    value = true;
  }


  if (selected_menu === 'List' || selected_menu === 'Reports' || selected_menu === 'Charts' || selected_menu === 'Privacy') {
    value1 = true;
  } else {
    value1 = false;
  }

  if (selected_menu === 'Reports') {
    value2 = false;
  } else {
    value2 = true;
  }


  if (selected_menu === 'Data-review') {
    value3 = false;
  } else {
    value3 = true;
  }

  const depthLevel = 0;

  // Handle loading and error states
  if (loading1 || loading2) return console.log('Loading ..');
  if (error1 || error2) return console.log("error");


  var totalCount_validated = data1.incident_findAllByFilterWithPagination.paginationDetails.totalCount;
  var totalCount_not_validated = data2.incident_findAllByFilterWithPagination.paginationDetails.totalCount;

  return (
    <nav className="desktop-nav">
      <ul className="menus">
        {menuItemsData.map((menu, index) => {
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}

        <List>
          <button className="filter-box" onClick={openDialog}>
            <div style={{ marginTop: '5px' }}>
              <CiFilter />
            </div>
          </button>
          <DateFilter open={dialogIsOpen} onClose={closeDialog}></DateFilter>
        </List>

        <List>
          <button className="record-box" onClick={openDialog1} hidden={value ? true : false} >
            <div style={{ marginTop: '5px' }}>
              <BsFillPinMapFill />
            </div>
          </button>
        </List>

        <List>
          <button className="report-box" onClick={openDialog2} hidden={value2 ? true : false} >
            <div style={{ marginTop: '5px' }}>
              <BsListNested />
            </div>
          </button>
          <ReportDialog open={dialogIsOpen2} onClose={closeDialog2}></ReportDialog>
        </List>


        <button className="privacy-box" onClick={handleChange_privacy}>
          <p>Privacy</p>
        </button>
        <button className="stph-box" onClick={handleChange_stph} hidden={value ? true : false} >
          <p>Data Review</p></button>

        <button className="privacy-box" onClick={handleClickOpen} hidden={value3 ? true : false} >
          <p>Summary</p></button>

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



      </ul>
    </nav>
  );
};

export default Navbar;



