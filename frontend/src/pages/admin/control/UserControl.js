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
    const response = await axios.post(apiEndpoint + "/delete", { id });

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

export { addUser, userDelete, userUpdate };
