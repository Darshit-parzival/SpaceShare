import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const TestimonialContext = createContext();

// eslint-disable-next-line react/prop-types
export const TestimonialProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/testimonial/fetch"
      );
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTestimonial = async (testimonial, userId, userName) => {
    try {
      await axios.post("http://localhost:5000/testimonial/add", {
        testimonial: testimonial,
        userId: userId,
        userName: userName,
      });
      fetchTestimonials();
    } catch (error) {
      console.error("Error adding testimonial:", error);
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/testimonial/delete/${id}`);
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <TestimonialContext.Provider
      value={{ testimonials, loading, addTestimonial, deleteTestimonial }}
    >
      {children}
    </TestimonialContext.Provider>
  );
};
