import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosConfig from "../ReusableFunction/AxiosConfig/AxiosConfig";

//redux actions
import {
  checkoutOnProcessActions,
  checkoutSuccessActions,
} from "../../Redux/Actions/checkout_Actions";
import { incomeActions } from "../../Redux/Actions/sales_Actions";
import { updateProductStockActions } from "../../Redux/Actions/products_Actions";

//functions
import verifyToken from "../ReusableFunction/VerifyToken/Verify_Token";
import Spinner from "../SmallSpinner/Spinner";

//images
import successimage from "../PublicImages/success.png";

//css
import "./CheckOutSuccessProduct.css";

const CheckOutSuccessProduct = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { product_list } = useSelector((state) => state.Products);
  const { checkoutOnProcess } = useSelector((state) => state.Checkout);
  const { userToken, customer_address } = useSelector((state) => state.User);

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

  const handleSendReceipt = async () => {
    try {
      //update stock
      setLoading(true);
      const getStock = await product_list.find((p) => p._id === id);
      const updateData = {
        productUpdateStock_id: id,
        totalStock: getStock.product_stock - 1,
      };
      await axiosConfig.patch("/products/updateProductStock", updateData);
      dispatch(
        updateProductStockActions(
          updateData.totalStock,
          updateData.productUpdateStock_id
        )
      );
      const verifyUser = await verifyToken(userToken);

      const product = await product_list.find((p) => p._id === id);

      const reqData = {
        product,
        date,
        name: verifyUser.data.fullname,
        email: verifyUser.data.email,
      };

      const { data } = await axiosConfig.post(
        "/checkout/sendProductEmail",
        reqData
      );

      //add to sales
      await axiosConfig.post("/sales/productsales", {
        cart: [
          {
            ...reqData.product,
            product_quantity: 1,
            product_total: reqData.product.product_price,
          },
        ],
        user: {
          name: reqData.name,
          email: reqData.email,
          address: customer_address,
        },
      });

      //add to income
      dispatch(incomeActions(reqData.product.product_price));

      //create purchase history
      await axiosConfig.post("/usershistory/createUserHistory", {
        cart: [
          {
            ...reqData.product,
            product_quantity: 1,
            product_total: reqData.product.product_price,
          },
        ],
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
          <button type="button" disabled={loading} onClick={handleSendReceipt}>
            {loading ? <Spinner /> : "Send receipt"}
          </button>
        </section>
      </section>
    </div>
  );
};

export default CheckOutSuccessProduct;
