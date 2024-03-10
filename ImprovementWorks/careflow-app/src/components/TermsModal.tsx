import Modal from 'react-bootstrap/Modal';
import { useState } from 'react'

const styles = {
  termsOfUse: {
    color:'#051f6e',
    cursor: 'pointer',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
};

function TermsModal() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        {/* temporarily inactive based on analyst feedback
        <a style = {styles.termsOfUse} onClick={handleShow}>
          Användarvillkor
        </a>
    */}
        <Modal show={show} onHide={handleClose}>
          {/* Modal content for terms */}
          <Modal.Header closeButton>
            <Modal.Title>Användarvillkor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                <p>2. Duis aute 
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                 pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.</p>
                  <p>3. </p>
                  <p>4. </p>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  export default TermsModal;