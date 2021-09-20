import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

//functions
import CustomerAddressCart from "./CustomerAddress_cart/CustomerAddress";

//images
import emptycart from "../../../PublicImages/emptycart.png";

//redux actions
import {
  productQtyIncrementActions,
  productQtyDecrementActions,
  removeCartProduct,
} from "../../../../Redux/Actions/products_Actions";

//css
import "./Cart.css";

const ProductCart = ({ product, dispatch }) => {
  return (
    <tr>
      {/* Products image and name */}
      <td className="td_product">
        <section className="cart_product_container">
          <section className="cart_product_image">
            <img src={product.product_image} alt="" />
          </section>
          <section className="cart_product_name">
            {product.product_name}
          </section>
        </section>
      </td>

      {/* Price */}
      <td className="td_price">
        <section className="cart_price_container">
          <section className="cart_price_dollar">
            <i className="fas fa-dollar-sign"></i>
          </section>
          <NumberFormat
            value={product.product_price}
            thousandSeparator={true}
            displayType={"text"}
          />
        </section>
      </td>

      {/* Quantity */}
      <td className="td_qty">
        <section className="cart_qty_container">
          <button
            type="button"
            onClick={() => dispatch(productQtyDecrementActions(1, product._id))}
          >
            <i className="fas fa-minus"></i>
          </button>
          <section className="cart_qty">{product.product_quantity}</section>
          <button
            type="button"
            onClick={() => dispatch(productQtyIncrementActions(1, product._id))}
          >
            <i className="fas fa-plus"></i>
          </button>
        </section>
      </td>

      {/* total */}
      <td className="td_total">
        <section className="cart_total_container">
          <section className="cart_total_dollar">
            <i className="fas fa-dollar-sign"></i>
          </section>
          <NumberFormat
            value={product.product_total}
            thousandSeparator={true}
            displayType={"text"}
          />
        </section>
      </td>

      {/* Actions */}
      <td className="td_actions">
        <section className="cart_actions_container">
          <button
            type="button"
            onClick={() => dispatch(removeCartProduct(product._id))}
          >
            Remove
          </button>
        </section>
      </td>
    </tr>
  );
};

// Mobile View

const MobileProductCart = ({ product, dispatch }) => {
  return (
    <div className="table_mobile_view">
      {/* Product */}
      <section className="product_container">
        <section className="product_image">
          <img src={product.product_image} alt="" />
        </section>
        <section className="product_name">{product.product_name}</section>
      </section>
      {/* Total */}
      <section className="product_price_total_container">
        <i className="fas fa-dollar-sign"></i>
        {product.product_total}
      </section>
      {/* Quantity */}
      <section className="product_qty_container">
        <button
          type="button"
          onClick={() => dispatch(productQtyDecrementActions(1, product._id))}
        >
          <i className="fas fa-minus"></i>
        </button>
        <section className="cart_qty">{product.product_quantity}</section>
        <button
          type="button"
          onClick={() => dispatch(productQtyIncrementActions(1, product._id))}
        >
          <i className="fas fa-plus"></i>
        </button>
      </section>
      {/* Actions */}
      <section className="product_actions_container">
        <button
          type="button"
          onClick={() => dispatch(removeCartProduct(product._id))}
        >
          Remove
        </button>
      </section>
    </div>
  );
};

const Cart = ({ setToggleProductCart }) => {
  const [isloggedIn, setIsLoggedIn] = useState(true);
  const [toggleCustomerAddress, setToggleCustomerAddress] = useState(false);

  const [disablePayBtn, setDisablePayBtn] = useState(false);

  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => state.Cart);
  const { userToken } = useSelector((state) => state.User);

  //check if qty is > stock
  useEffect(() => {
    const checkProductStock = cart.filter(
      (p) => p.product_quantity > p.product_stock
    );
    if (checkProductStock.length > 0) {
      setDisablePayBtn(true);
      return;
    }
    setDisablePayBtn(false);
  }, [cart]);

  useEffect(() => {
    if (!userToken) {
      setIsLoggedIn(false);
    }
  }, [userToken]);

  const handleInputAddress = () => {
    setToggleCustomerAddress(true);
  };

  return (
    <div className="cart_container">
      {!isloggedIn ? (
        <section className="cart_user_not_loggedIn_container">
          <section
            className="close_cart_user_not_loggedIn"
            onClick={() => setToggleProductCart(false)}
          >
            <i className="fas fa-times"></i>
          </section>
          <p>
            <span>You are not logged in. </span>make sure to login first to
            access this page
          </p>
          <section className="cart_login_link">
            <Link to="/login" onClick={() => setToggleProductCart(false)}>
              Login
            </Link>
          </section>
        </section>
      ) : cart.length === 0 ? (
        <section className="empty_cart_container">
          <section className="empty_cart_text">
            <span>Cart is empty !</span>
          </section>
          <section className="empty_cart_image">
            <img src={emptycart} alt="" />
          </section>
          <section className="empty_cart_button">
            <button type="button" onClick={() => setToggleProductCart(false)}>
              Shop now
            </button>
          </section>
        </section>
      ) : (
        <section className="cart_list">
          {/* Customer Address */}
          {toggleCustomerAddress && (
            <CustomerAddressCart
              setToggleCustomerAddress={setToggleCustomerAddress}
            />
          )}
          <section
            className="close_cart"
            onClick={() => setToggleProductCart(false)}
          >
            <i className="fas fa-times"></i>
          </section>
          {/* PC view */}
          <table className="table_pc_view">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <ProductCart
                  key={product._id}
                  product={product}
                  dispatch={dispatch}
                />
              ))}
            </tbody>
          </table>
          {/* Mobile view */}
          <section className="table_mobile_view_container">
            {cart.map((product) => (
              <MobileProductCart
                key={product._id}
                product={product}
                dispatch={dispatch}
              />
            ))}
          </section>
          <button
            className={
              disablePayBtn ? "disabled_cart_checkout" : "cart_checkout"
            }
            onClick={handleInputAddress}
          >
            <span>Pay :</span>
            <section className="cart_dollar_icon">
              <i className="fas fa-dollar-sign"></i>
            </section>
            <NumberFormat
              value={total}
              thousandSeparator={true}
              displayType={"text"}
              className="cart_product_total"
            />
          </button>
        </section>
      )}
    </div>
  );
};

export default Cart;
