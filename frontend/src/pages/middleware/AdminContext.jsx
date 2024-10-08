import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AdminContext = createContext();

// eslint-disable-next-line react/prop-types
export const AdminContextProvider = ({ children }) => {
  const [adminName, setAdminName] = useState(sessionStorage.getItem("adminName") || "");
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/admin/fetch"); 
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <AdminContext.Provider value={{ adminName, setAdminName, admins, loading, fetchAdmins }}>
      {children}
    </AdminContext.Provider>
  );
};
