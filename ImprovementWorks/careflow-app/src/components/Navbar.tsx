import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAuth0 } from "@auth0/auth0-react";
import { BsBell } from "react-icons/bs";
import Notification from "./Notification";

function NavigationBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { pathname } = useLocation();
  const { logout } = useAuth0();

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    logout();
  };

  const linkStyle = {
    color: "white",
    fontSize: "17px",
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
    fontFamily: "Avenir",
    padding: "10px 15px", // Adjust padding for better control
  };

  const activeLinkStyle = {
    borderBottom: "3px solid white",
  };

  const isActiveLink = (path:string) => pathname === path;

  return (
    <Navbar
      expand="lg"
      variant="dark"
      className="d-flex"
      style={{
        backgroundColor: "#0a206a",
        paddingLeft: "23px",
        height: "75px",
      }}
    >
      <Link to="/start" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          alt="CareFlow Logo"
          src="CareFlow_Vit.png"
          width="140"
          height="30"
          className=""
        />
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="d-flex align-items-center justify-content-between" style={{ width: '100%' }}>
          <div className="d-flex align-items-center">
            <Link 
              to="/start" 
              style={isActiveLink("/start") ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
            >
              Hem
            </Link>
            <Link 
              to="/forandringsarbeten" 
              style={isActiveLink("/forandringsarbeten") ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
            >
              Mina förbättringsarbeten
            </Link>
            <Link 
              to="/arkiv" 
              style={isActiveLink("/arkiv") ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
            >
              Alla förbättringsarbeten
            </Link>
          </div>
          <div className="d-flex align-items-center">
            {showNotifications && <Notification />}
            <BsBell
              style={{ color: "white", fontSize: "22px", cursor: "pointer" }}
              onClick={toggleNotifications}
            />
            <a style={{ ...linkStyle, marginLeft: '20px', cursor: 'pointer' }} onClick={handleLogout}>
              Logga ut
            </a>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
