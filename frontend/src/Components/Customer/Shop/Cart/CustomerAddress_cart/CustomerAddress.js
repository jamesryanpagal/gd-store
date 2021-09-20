import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosConfig } from "../../../../ReusableFunction/AxiosConfig/AxiosConfig";

//redux actions
import { setUserAddressActions } from "../../../../../Redux/Actions/user_Actions";
import { checkoutOnProcessActions } from "../../../../../Redux/Actions/checkout_Actions";

//css
import "./CustomerAddress.css";

const CustomerAddress = ({ setToggleCustomerAddress }) => {
  const [customerAddress, setCustomerAddress] = useState("");

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.Cart);

  const handleProceesToCheckout = async () => {
    dispatch(setUserAddressActions(customerAddress));
    try {
      const { data } = await axiosConfig.post("/checkout/productsCheckout", {
        CheckoutProducts: [...cart],
      });
      dispatch(checkoutOnProcessActions(true));
      window.location = data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="provide_Address">
      <section
        className="close_provide_address"
        onClick={() => setToggleCustomerAddress(false)}
      >
        <i className="fas fa-times"></i>
      </section>
      <section className="product_address_text">
        Please enter recipient's complete address !
      </section>
      <section className="input_address">
        <input
          type="text"
          placeholder="Customer complete address"
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
      </section>
      <section className="procees_btn">
        <button type="button" onClick={handleProceesToCheckout}>
          Proceed
        </button>
      </section>
    </div>
  );
};

export default CustomerAddress;
