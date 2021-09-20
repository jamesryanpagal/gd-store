import axiosConfig from "../AxiosConfig/AxiosConfig";

const getId = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data } = await axiosConfig.post("/users/user", { id }, config);
  return data;
};

export default getId;
