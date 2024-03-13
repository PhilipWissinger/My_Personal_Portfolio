import { relative } from 'path';
import React from 'react';
import { Button } from 'react-bootstrap';

const notificationButton = {
  marginLeft: '20px', 
  backgroundColor: '#5ebdf7', 
  color: 'white', 
  padding: '5px 20px', 
  border: 'none', 
  borderRadius: '15px', 
  fontSize: '16px', 
  cursor: 'pointer', 
  transition: 'background-color 0.3s', 
  };

const notificationText = {
  fontSize: '20px',
  flex: 1 
  };

const notificationItemStyle = {
  display: 'flex', 
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px' 
};

const Notification = () => {
  return (
    <div style={{
      position: 'absolute', 
      top: '100%', 
      right: '7%', 
      backgroundColor: 'white', 
      boxShadow: '0px 0px 5px rgba(0,0,0,0.2)', 
      padding: '20px', 
      borderRadius: '20px', 
      zIndex: 3,
      justifyContent: 'space-between' 
      }}>
      
      <h1 style={{ fontSize: '32px', textAlign:'center'}}>NOTISER</h1>
      <div style={notificationItemStyle}>
        <span style={notificationText}>Du har lagts till i ett nytt förbättringsarbete.</span>
        <button style={notificationButton}>VISA</button>
      </div>
      <div style={notificationItemStyle}>
        <span style={notificationText}>Ett nytt förbättringsarbete har lagt till på din klinik.</span>
        <button style={notificationButton}>VISA</button>
      </div>
      <div style={notificationItemStyle}>
        <span style={notificationText}>"Köp in nya arbetskläder" har bytt fas till Göra.</span>
        <button style={notificationButton}>VISA</button>
      </div>
    </div>
  );
};
export default Notification;