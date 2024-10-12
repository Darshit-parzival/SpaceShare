import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [userName, setUserName] = useState(
    sessionStorage.getItem("userName") || ""
  );
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || "");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/user/fetch");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userName,
        userId,
        setUserName,
        setUserId,
        users,
        loading,
        fetchUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
