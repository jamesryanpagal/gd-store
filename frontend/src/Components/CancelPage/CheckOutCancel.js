import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux actions
import { checkoutOnProcessActions } from "../../Redux/Actions/checkout_Actions";

//image
import cancelpage from "../PublicImages/cancel.png";

//css
import "./CheckOutCancel.css";

const CheckOutCancel = ({ history }) => {
  const { checkoutOnProcess } = useSelector((state) => state.Checkout);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!checkoutOnProcess) {
      history.push("/");
    }

    return () => {
      dispatch(checkoutOnProcessActions(false));
    };
  }, [checkoutOnProcess, history, dispatch]);

  return (
    <div className="check_out_cancel_container">
      <section className="check_out_cancel">
        <section className="check_out_cancel_image_container">
          <img src={cancelpage} alt="" />
        </section>
        <section className="check_out_cancel_text_container">
          <span className="text-danger">
            You've cancel your order <i className="fas fa-ban mx-1"></i>
          </span>
        </section>
        <section className="check_out_cancel_link_container">
          <button type="button" onClick={() => history.push("/")}>
            Go back to homepage
          </button>
        </section>
      </section>
    </div>
  );
};

export default CheckOutCancel;
