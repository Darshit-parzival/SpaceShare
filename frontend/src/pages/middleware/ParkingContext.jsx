import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ParkingContext = createContext();

// eslint-disable-next-line react/prop-types
export const ParkingContextProvider = ({ children }) => {
  const [ownerName, setOwnerName] = useState(
    sessionStorage.getItem("ownerName") || ""
  );
  const [ownerId, setOwnerId] = useState(
    sessionStorage.getItem("ownerId") || ""
  );
  const [owners, setOwners] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOwnersAndSpaces = async () => {
    setLoading(true);
    setError(null);
    try {
      const ownersResponse = await axios.get(
        "http://localhost:5000/parkingOwner/fetch"
      );
      const spacesResponse = await axios.get(
        "http://localhost:5000/parkingSpace/fetch"
      );

      setOwners(ownersResponse.data);
      setSpaces(spacesResponse.data);
    } catch (error) {
      console.error("Error fetching parking data:", error);
      setError("Failed to fetch parking data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnersAndSpaces();
  }, []);

  return (
    <ParkingContext.Provider
      value={{
        owners,
        spaces,
        loading,
        fetchOwnersAndSpaces,
        error,
        setError,
        ownerName,
        setOwnerName,
        ownerId,
        setOwnerId,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};
