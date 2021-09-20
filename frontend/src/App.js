import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "./Components/ReusableFunction/AxiosConfig/AxiosConfig";

//redux
import { getProductsActions } from "./Redux/Actions/products_Actions";

//components
import CustomerParent from "./Components/Customer/CustomerParent/CustomerParent";
import AdminParent from "./Components/Admin/AdminParent/AdminParent";
import RiderPage from "./Components/RiderPage/RiderPage";

//redux actions
import { getProductCategoriesActions } from "../src/Redux/Actions/products_Actions";

//loader
import Loader from "./Components/Loader/Loader";

//css
import "./App.css";

function App() {
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.User);

  // Get product categories

  useEffect(() => {
    const getProductCategories = async () => {
      const { data } = await axiosConfig.get("/products/getProducts");

      data.map((p) =>
        dispatch(
          getProductCategoriesActions({
            _id: p._id,
            category: p.product_category,
          })
        )
      );
    };

    getProductCategories();
  }, [dispatch]);

  // Get products

  useEffect(() => {
    let mounted = true;
    const get_Products = async () => {
      try {
        if (mounted) {
          const { data } = await axiosConfig.get("/products/getProducts");

          data.map((product) => dispatch(getProductsActions(product)));
        }
      } catch (error) {
        console.log(error);
      }
    };

    get_Products();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  // Check user type

  useEffect(() => {
    const checkUser = async () => {
      const token = userToken;

      if (!token) {
        setUserType("Viewer");
        return;
      }

      const verifyToken = {
        headers: {
          key: token,
        },
      };

      try {
        setLoading(true);
        const { data } = await axiosConfig.get("/tokenVerifier", verifyToken);

        if (data.user_type === "Customer") {
          setUserType(data.user_type);
          setLoading(false);
          return;
        }

        if (data.user_type === "Admin") {
          setUserType(data.user_type);
          setLoading(false);
          return;
        }

        if (data.user_type === "GUser") {
          setUserType(data.user_type);
          setLoading(false);
          return;
        }

        if (data.user_type === "Rider") {
          setUserType(data.user_type);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log({ error: true, message: error });
      }
    };

    checkUser();
  }, [userToken]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {userType && (
            <div className="App">
              <>{userType === "Viewer" && <CustomerParent />}</>
              <>{userType === "Customer" && <CustomerParent />}</>
              <>{userType === "GUser" && <CustomerParent />}</>
              <>{userType === "Admin" && <AdminParent />}</>
              <>{userType === "Rider" && <RiderPage />} </>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
