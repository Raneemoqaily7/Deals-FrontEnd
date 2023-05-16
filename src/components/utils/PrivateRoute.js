import React, { useContext } from "react"; 
import { Route  ,Navigate } from "react-router-dom";
import { UserContext } from './UserContext';
import Home from "../AdminHome";



   
    function PrivateRoute({ element: Element, ...rest }) {
        const { isAuth } = useContext(UserContext);
        return isAuth ?  <Home /> : <Navigate to="/login" />;
     
      }




export default PrivateRoute

  