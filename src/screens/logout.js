import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('login_user');
    sessionStorage.setItem("selected_menu", "Map");
    navigate('/');  


  });
  return <h1>Exit Page</h1>;
};

export default Logout;
