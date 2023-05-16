import User from "./components/User";
import Login from "./components/Login";
 import AdminHome from "./components/AdminHome";
import UserProfile from "./components/UserProfile";
import { UserContext, isAuthContext, userRoleContext } from "./components/utils/UserContext";
import UserDealView from "./components/UserDealsOverView"
import { useCookies } from "react-cookie";

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import UserHome from "./components/UserHome";
import ClaimedDeals from './components/ClaimedDeals'
import DealList from "./components/DealList"
import UserList from "./components/User";
 function App() {



  // https://www.youtube.com/watch?v=nnUw0GQnxMI&t=196s


  const [isAuth, setIsAuth] = useState(false)
  const [userRole, setUserRole] = useState('')

  const [cookie, setCookie, removeCookie] = useCookies();


 
  return (
    <div className="App">
       {
        !cookie.token ?
          <Router>
            <Routes>
              <Route path="/" exact element={<Login />} />
              <Route path="/Login" exact element={<Login />} />
              <Route path="/signup" exact element={<SignUp />} />
              <Route path="*" exact element={<Login />} />
            </Routes>
          </Router>
          : cookie.userRole === 'admin' ?
            <Router>
              <Routes>
                
                    <Route path="/claimed_deals" element={<ClaimedDeals />} />
                  <Route path="/deal_list" element={<DealList />} />
                   <Route path="*" exact element={<UserList />} />

               </Routes>
            </Router>
            : cookie.userRole === "user" ?
              <Router>
                <Routes>
                   <Route path="/profile" element={<UserProfile />} />
                  <Route path="*" exact element={<UserDealView />} />

                </Routes>
              </Router>
              : <></>

      }


    </div>
  );
}

export default App;
