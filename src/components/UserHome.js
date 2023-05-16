import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function UserHome() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate=useNavigate();

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
            <Nav.Link href="/deals">Deals Overview</Nav.Link>
             <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link onClick={signOutHandler}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default UserHome;
