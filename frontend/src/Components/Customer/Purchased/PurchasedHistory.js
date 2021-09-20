import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosConfig } from "../../ReusableFunction/AxiosConfig/AxiosConfig";

//redux actions
import { userHistoryActions } from "../../../Redux/Actions/user_Actions";

//function
import verifyToken from "../../ReusableFunction/VerifyToken/Verify_Token";

//images
import historyImage from "../../PublicImages/history.png";

//css
import "./PurchasedHistory.css";

//PC view
const History = ({ products }) => {
  return (
    <tr>
      <td>
        <section className="product_history_container">
          <section className="product_history_image_container">
            <img src={products.product_image} alt="" />
          </section>
          <section className="product_history_name_container">
            {products.product_name}
          </section>
        </section>
      </td>
      <td className="text-center">
        <i className="fas fa-dollar-sign"></i>
        {products.product_price}
      </td>
      <td className="text-center">{products.product_quantity}</td>
      <td className="text-center">
        <i className="fas fa-dollar-sign"></i>
        {products.product_total}
      </td>
    </tr>
  );
};

//Mobile view
const MobileViewHistory = ({ products }) => {
  return (
    <div className="mobile_view_history_container">
      {/* Product */}
      <section className="product_container">
        {/* Product image */}
        <section className="product_image">
          <img src={products.product_image} alt="" />
        </section>
        {/* Product name */}
        <section className="product_name">{products.product_name}</section>
      </section>
      {/* Price */}
      <section className="product_price">
        Price: <i className="fas fa-dollar-sign"></i>
        {products.product_price}
      </section>
      {/* Quantity */}
      <section className="product_quantity">
        Quantity: {products.product_quantity}
      </section>
      {/* Total */}
      <section className="product_total">
        Total: <i className="fas fa-dollar-sign"></i>
        {products.product_total}
      </section>
    </div>
  );
};

const PurchasedHistory = ({ history }) => {
  const dispatch = useDispatch();
  const { userToken, user_history } = useSelector((state) => state.User);

  useEffect(() => {
    if (!userToken) {
      history.push("/");
    }
  }, [userToken, history]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userId = await verifyToken(userToken);
        const { data } = await axiosConfig.get(
          "/usershistory/getUserHistory/" + userId.data._id
        );
        data.history.map((p) => dispatch(userHistoryActions(p)));
      } catch (error) {}
    };
    getUser();
  }, [userToken, dispatch]);

  return (
    <div className="purchased_History_Container">
      <section className="text">Purchased history</section>
      {user_history.length === 0 ? (
        <section className="empty_history">
          <section className="empty_history_text">No history !</section>
          <img src={historyImage} alt="" />
        </section>
      ) : (
        <>
          {/* Pc view */}
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {user_history.map((p) => (
                <History key={p.product_id} products={p} />
              ))}
            </tbody>
          </table>
          {/* Mobile view */}
          <section className="history_mobile_view">
            {user_history.map((p) => (
              <MobileViewHistory key={p.product_id} products={p} />
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default PurchasedHistory;
