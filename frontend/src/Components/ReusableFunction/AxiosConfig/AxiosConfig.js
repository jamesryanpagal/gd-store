import axios from "axios";

const axiosConfig = axios.create({
  baseURL: `http://localhost:${process.env.PORT}/`,
});

export default axiosConfig;
