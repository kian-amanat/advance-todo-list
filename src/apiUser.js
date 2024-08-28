import axios from "axios";
const API_URL = "http://localhost:3001/";

const getUserData = async () => {
  try {
    const res = await axios.get(`${API_URL}get/user/2`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const createUserData = async () => {
  try {
    const res = await axios.get(`${API_URL}create/user`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { getUserData, createUserData };
