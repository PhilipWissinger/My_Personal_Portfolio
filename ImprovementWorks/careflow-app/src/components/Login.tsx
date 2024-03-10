import LoginModal from "./LoginModal";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import "../styles/LoadingSpinner.css";

function Login() {

  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuth0();

  function Spinner() {
    return (
      <div className="spinner-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isAuthenticated){ 
      navigate("/start")
    };
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {isLoading ? (
        <Spinner />
        ) : (
        <LoginModal />
      )}
    </div>
  );
}

export default Login;
