import React, { useContext } from "react";
import AuthProvider, { AuthContext } from "./context/Context";
import Main from "./components/Main/Main";
import SideBar from "./components/sideBar/SideBar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
// import './App.css';

function App() {
  const { isAuthenticated, isRegistering, setIsRegistering } = useContext(AuthContext);

  return (
    <AuthProvider>
      <div className="App">
        {isRegistering ? (
          <Register />
        ) : !isAuthenticated ? (
          <Login />
        ) : (
          <>
            <SideBar />
            <Main />
          </>
        )}
        {!isAuthenticated && !isRegistering && (
          <div className="footer">
            <p>Don't have an account? <button onClick={() => setIsRegistering(true)}>Register</button></p>
          </div>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
