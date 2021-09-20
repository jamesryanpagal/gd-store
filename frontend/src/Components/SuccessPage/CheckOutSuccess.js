import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosConfig } from "../ReusableFunction/AxiosConfig/AxiosConfig";

//redux actions
import {
  checkoutSuccessActions,
  checkoutOnProcessActions,
} from "../../Redux/Actions/checkout_Actions";
import { updateProductsStockActions } from "../../Redux/Actions/products_Actions";
import { incomeActions } from "../../Redux/Actions/sales_Actions";

//functions
import verifyToken from "../ReusableFunction/VerifyToken/Verify_Token";

//images
import successimage from "../PublicImages/success.png";

//loader
import Spinner from "../SmallSpinner/Spinner";

//css
import "./CheckOutSuccess.css";

const CheckOutSuccess = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const { cart, total } = useSelector((state) => state.Cart);
  const { checkoutOnProcess } = useSelector((state) => state.Checkout);
  const { userToken, customer_address } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  const currentDate = new Date();
  const date = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  useEffect(() => {
    if (!checkoutOnProcess) {
      history.go(-1);
    }

    return () => {
      dispatch(checkoutOnProcessActions(false));
    };
  }, [checkoutOnProcess, history, dispatch]);

  const handleSendEmail = async () => {
    try {
      //update product stock
      setLoading(true);
      await cart.map(async (p) => {
        const updateData = {
          productUpdateStock_id: p._id,
          totalStock: p.product_stock - p.product_quantity,
        };
        await axiosConfig.patch("/products/updateProductStock", updateData);
        dispatch(
          updateProductsStockActions(
            updateData.totalStock,
            updateData.productUpdateStock_id
          )
        );
      });
      const verifyUser = await verifyToken(userToken);
      const reqData = {
        cart,
        total,
        date,
        name: verifyUser.data.fullname,
        email: verifyUser.data.email,
      };
      const { data } = await axiosConfig.post(
        "/checkout/sendProductsEmail",
        reqData
      );
      //add to sales
      await axiosConfig.post("/sales/productsales", {
        cart: reqData.cart,
        user: {
          name: reqData.name,
          email: reqData.email,
          address: customer_address,
        },
      });
      //add to income
      dispatch(incomeActions(total));
      //create purchase history
      await axiosConfig.post("/usershistory/createUserHistory", {
        cart: reqData.cart,
        id: verifyUser.data._id,
      });
      setLoading(false);
      history.push("/");
      dispatch(checkoutSuccessActions(data));
      setTimeout(() => {
        dispatch(checkoutSuccessActions(false));
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="success_page_container">
      <section className="success_page">
        <section className="success_page_img_container">
          <img src={successimage} alt="" />
        </section>
        <section
          className={loading ? "disableOnSendEmail" : "success_page_button"}
        >
          <button type="button" disabled={loading} onClick={handleSendEmail}>
            {loading ? <Spinner /> : "Send receipt"}
          </button>
        </section>
      </section>
    </div>
  );
};

export default CheckOutSuccess;
