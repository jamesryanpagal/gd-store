import axiosConfig from "../AxiosConfig/AxiosConfig";

const getProduct = async (id) => {
  try {
    const config = {
      headers: {
        id,
      },
    };
    const { data } = await axiosConfig.get("/products/getProduct", config);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default getProduct;
