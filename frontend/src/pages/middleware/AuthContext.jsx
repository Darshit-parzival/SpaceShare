/* eslint-disable react/prop-types */
import { useEffect, useState, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [ownerLoggedIn, setOwnerLoggedIn] = useState(false);

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
      const loggedInRes = await axios.get(
        "http://localhost:5000/admin/loggedIn"
      );
      setAdminLoggedIn(loggedInRes.data);
    } catch (error) {
      console.error("Error checking logged-in status:", error);
      setAdminLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }
  async function getOwnerLoggedIn() {
    try {
      const loggedInRes = await axios.get(
        "http://localhost:5000/parkingOwner/loggedIn"
      );
      setOwnerLoggedIn(loggedInRes.data);
    } catch (error) {
      console.error("Error checking logged-in status:", error);
      setOwnerLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getLoggedIn();
    getAdminLoggedIn();
    getOwnerLoggedIn();
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
        ownerLoggedIn,
        setOwnerLoggedIn,
        getOwnerLoggedIn,
        loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
