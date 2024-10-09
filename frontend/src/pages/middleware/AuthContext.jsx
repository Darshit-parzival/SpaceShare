/* eslint-disable react/prop-types */
import { useEffect, useState, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  async function getLoggedIn() {
    try {
      const loggedInRes = await axios.get(
        "http://localhost:5000/user/loggedIn"
      );
      setLoggedIn(loggedInRes.data);
    } catch (error) {
      console.error("Error checking logged-in status:", error);
      setLoggedIn(false);
    }
  }
  async function getAdminLoggedIn() {
    try {
      const loggedInRes = await axios.get("http://localhost:5000/admin/loggedIn");
      setAdminLoggedIn(loggedInRes.data);
    } catch (error) {
      console.error("Error checking logged-in status:", error);
      setAdminLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getLoggedIn();
    getAdminLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        getLoggedIn,
        adminLoggedIn,
        setAdminLoggedIn,
        getAdminLoggedIn,
        loading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
