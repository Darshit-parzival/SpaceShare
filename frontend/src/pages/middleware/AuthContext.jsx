/* eslint-disable react/prop-types */
import { useEffect, useState, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  async function getLoggedIn() {
    try {
      const loggedInRes = await axios.get("http://localhost:5000/user/loggedIn");
      setLoggedIn(loggedInRes.data);
    } catch (error) {
      console.error("Error checking logged-in status:", error);
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
