import axios from "axios";

const apiEndpoint = "http://localhost:5000/user";

const addUser = async (userData) => {
  try {
    const response = await axios.post(apiEndpoint + "/register", userData);

    if (response.status === 201) {
      return {
        status: response.status,
        name: response.data.name,
        message: response.data.message,
      };
    } else return response.status;
  } catch (error) {
    console.error(error);
  }
};

const userDelete = async (id) => {
  try {
    const response = await axios.post(apiEndpoint + "/delete", { id }); // Send id as is

    if (response.status === 200) {
      return {
        status: response.status,
        message: response.data.message,
      };
    } else return response.status;
  } catch (error) {
    console.error(error);
  }
};


const userUpdate = async (id, updateData) => {
  try {
    const response = await axios.post(apiEndpoint + "/update", {
      id,
      updateData,
    });

    return {
      status: response.status,
      message: response.data.message || 'Update successful',
      data: response.data
    };
  } catch (error) {
    console.error(error);
    return {
      status: error.response?.status || 500,
      message: error.response?.data || 'Internal server error',
    };
  }
};


export { addUser, userDelete, userUpdate };
