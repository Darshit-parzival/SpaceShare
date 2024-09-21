// src/context/AdminContext.js
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create the context
export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.post('http://localhost:5000/admin/fetch'); // Replace with your API endpoint
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <AdminContext.Provider value={{ admins, loading }}>
      {children}
    </AdminContext.Provider>
  );
};
