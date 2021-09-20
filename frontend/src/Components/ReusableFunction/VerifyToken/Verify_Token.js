import axiosConfig from "../AxiosConfig/AxiosConfig";

const verifyToken = async (token) => {
  const config = {
    headers: {
      key: token,
    },
  };

  try {
    const { data } = await axiosConfig.get("/tokenVerifier", config);

    const resData = { data };
    return resData;
  } catch (error) {
    console.log(error.message);
  }
};

export default verifyToken;
