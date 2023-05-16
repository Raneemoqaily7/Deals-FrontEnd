import User from "./components/User";
import Login from "./components/Login";
 import AdminHome from "./components/AdminHome";
import UserProfile from "./components/UserProfile";
import { UserContext, isAuthContext, userRoleContext } from "./components/utils/UserContext";
import UserDealView from "./components/UserDealsOverView"
import { useCookies } from "react-cookie";

import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import UserHome from "./components/UserHome";
import ClaimedDeals from './components/ClaimedDeals'
import DealList from "./components/DealList"
import UserList from "./components/User";
import translationEN from './locale/en.json';
import translationAR from './locale/ar.json';
import "./i18n"
import i18n from "./i18n";
import { useTranslation } from "react-i18next";
 function App() {


  const [t,i18n] = useTranslation();



  // https://www.youtube.com/watch?v=nnUw0GQnxMI&t=196s


  const [isAuth, setIsAuth] = useState(false)
  const [userRole, setUserRole] = useState('')

  const [cookie, setCookie, removeCookie] = useCookies();

const changeToArabic =()=>{i18n.changeLanguage("ar")}
const changeToEnglish =()=>{i18n.changeLanguage("en")}
useEffect(() => {
  if (i18n.language === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.style.textAlign = 'right'
    document.documentElement.style.marginRight = '0';
    document.documentElement.style.marginLeft = 'auto';
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.style.textAlign = 'left'
    document.documentElement.style.marginRight = 'auto';
    document.documentElement.style.marginLeft = '0';
  }
}, [i18n.language]);



  return (
    <div className="App">
      <button onClick={changeToArabic}>ar</button>
      <button onClick={changeToEnglish}>en</button>
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
