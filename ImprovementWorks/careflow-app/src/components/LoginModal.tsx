import React, { useEffect }from "react";
import Button from 'react-bootstrap/Button';
import { useAuth0 } from '@auth0/auth0-react';
import TermsModal from "./TermsModal";
import PrivacyModal from "./PrivacyModal";

const styles = {
  body: {
    overflow: 'hidden',
  },
  logInContainer: {
    position: 'fixed',
    backgroundColor: '#fff',
    width: '100%',
   // height: '64rem', Causing ROG-icon to be not visable
   height: '100vh',
    overflow: 'hidden',
    textAlign: 'left',
    fontSize: '1.38rem',
    color: '#051f6e',
    fontFamily: 'Avenir',
  },
  backgroundGradient: {
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
  },
  careflowIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -150%)', //changed from -250% to 150%
    width: '30rem',
    height: '10rem',
    objectFit: 'cover',
  },
  rogIcon: {
    position: 'absolute',
    top: '1rem',
    left:'1rem',
    width: '13rem',
    height: '3.0rem',
    objectFit: 'cover',
  },
  logInComponent: {
    position: 'absolute',
    top: '50%',
    left: '50.5%',
    transform: 'translate(-50%, -40%)', // changed from -140% to -40% so it is visable
    borderRadius: '21px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    border: '1px solid #d4d4d4',
    boxSizing: 'border-box' as 'border-box',
    width: '30rem',
    height: '10rem',
  },
  formGroup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#051f6e',
    fontFamily: 'Avenir',
  },
  customButton: {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, 30%)',
    width: '150px', // Adjust the width as needed
    height: '40px', // Adjust the height as needed
    fontSize: '1.2rem',
    backgroundColor: '#051f6e',
  },
  formLinks: {
    paddingTop: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    fontSize: '1rem',
  }

};


function LoginModal() {
  const { loginWithRedirect } = useAuth0();

  


  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginWithRedirect();
  }

  return (
   
    <div style={styles.body && styles.logInContainer as React.CSSProperties} className="log-in">
      
      <img style={styles.backgroundGradient as React.CSSProperties} alt="" src="./background-gradient.png" />
      <img style={styles.careflowIcon as React.CSSProperties} alt="" src="./CareFlow_Vit.png" />
      <img style={styles.rogIcon as React.CSSProperties} alt="" src="/ROG-login.png" />
      <div style={styles.logInComponent as React.CSSProperties}>
        <form style={styles.formGroup as React.CSSProperties} onSubmit={handleLogin}>
        <Button style={styles.customButton as React.CSSProperties} size="lg" type="submit">
            Logga in
          </Button>
          <div style={styles.formLinks as React.CSSProperties}>
            <TermsModal />
            <PrivacyModal />
          </div>
        </form>
      </div>
     
    </div>
 
  );
}

export default LoginModal;
