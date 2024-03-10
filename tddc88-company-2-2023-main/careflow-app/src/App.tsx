import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Start from './components/Start';
import Login from './components/Login'
import Projects from './components/Projects';
import Archive from './components/Archive';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Notification from './components/Notification'; 


function App() {

  const { isAuthenticated, isLoading, logout, user} = useAuth0();
  let timeoutId: number | undefined;
  const inactivityTimeout = 60 * 60 * 1000; // 1 hour in milliseconds
  const location = useLocation();

  // updates activity by user
  const updateActivity = () => {
    if (isAuthenticated && location.pathname !== '/login') {
      localStorage.setItem('lastActivity', Date.now().toString());

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(logoutUserAfterInactivity, inactivityTimeout);
    }
  };

  const logoutUserAfterInactivity = () => {
    if (isAuthenticated) {
      const lastActivity = localStorage.getItem('lastActivity');
      if (lastActivity) {
        const timeSinceLastActivity = Date.now() - parseInt(lastActivity);

        if (timeSinceLastActivity >= inactivityTimeout) {
          logout();
        }
      }
    }
  };

  function loggedInNow(){
    if (user && user.updated_at) {
      const loginTime = new Date(user.updated_at);
      if (Date.now() - loginTime.getTime() < 5000) return true
    }
    return false
  }

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isAuthenticated) {
      if (loggedInNow()) {
        updateActivity()
      } else {
        logoutUserAfterInactivity()
      }
    }

    // Attach event listeners to track user activity
    window.addEventListener('click', updateActivity);
    window.addEventListener('keypress', updateActivity);

    return () => {
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('keypress', updateActivity);
    };
  }, [isLoading, isAuthenticated]);

  return (
    <>
      {isAuthenticated && <NavigationBar />}
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/start" element={<Start />} />
          <Route path="/forandringsarbeten" element={<Projects />} />
          <Route path="/arkiv" element={<Archive />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
