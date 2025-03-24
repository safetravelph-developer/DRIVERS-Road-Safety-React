import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Map from "./map.js"
import * as React from 'react';
import WelcomeDialog from "../components/WelcomeDialog";

export default function Root() {

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Header />
      <WelcomeDialog open={open} onClose={handleClose}></WelcomeDialog>
      <div className="content">
      <Map></Map>
        <Outlet />
      </div>
    </div>
  );
}
