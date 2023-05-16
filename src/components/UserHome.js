import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function UserHome() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate=useNavigate();
  const [t, i18n] = useTranslation();

  function signOutHandler(){
    removeCookie('token')
    removeCookie('user')
    removeCookie('userRole')
    navigate("/")
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
           <Nav className="me-auto">
            <Nav.Link href="/deals">{t("dealsoverview")}</Nav.Link>
             <Nav.Link href="/profile">{t("profile")}</Nav.Link>
            <Nav.Link onClick={signOutHandler}>{t("logout")}</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default UserHome;
