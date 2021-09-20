import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://gd-store-mern.herokuapp.com/",
});

export default axiosConfig;
