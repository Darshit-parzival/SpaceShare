import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const BookingContext = createContext();

// eslint-disable-next-line react/prop-types
export const BookingContextProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [bookingStatus, setBookingStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/bookParking/fetch"
      );
      setBookings(response.data);
      setBookingStatus(response.status);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        setBookings,
        bookingStatus,
        setBookingStatus,
        loading,
        fetchBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
