import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//functions
import CustomerAddressProduct from "./CustomerAddress_product/CustomerAddress";

//redux actions
import { addToCartActions } from "../../../../Redux/Actions/products_Actions";

//css
import "./ViewProduct.css";

const ViewProduct = ({ history }) => {
  const [product, setProduct] = useState({});
  const [productAlreadyAdded, setProductAlreadyAdded] = useState(false);
  const [disableCheckout, setDisableCheckout] = useState(false);
  const [isEmptyStock, setIsEmptyStock] = useState(false);
  const [toggleCustomerAddress, setToggleCustomerAddress] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { product_list } = useSelector((state) => state.Products);
  const { cart } = useSelector((state) => state.Cart);
  const { userToken } = useSelector((state) => state.User);

  useEffect(() => {
    if (product) {
      if (product.product_stock < 1) {
        setIsEmptyStock(true);
        return;
      }
      setIsEmptyStock(false);
    }
    setIsEmptyStock(false);
  }, [product]);

  useEffect(() => {
    if (!userToken) {
      setDisableCheckout(true);
    }
  }, [userToken]);

  useEffect(() => {
    const product_product_list = product_list.find((p) => p._id === id);
    setProduct({ ...product_product_list });
  }, [id, product_list]);

  useEffect(() => {
    if (cart.find((p) => p._id === id)) {
      setProductAlreadyAdded(true);
      return;
    }

    setProductAlreadyAdded(false);
  }, [cart, id]);

  const handleAddToCart = () => {
    if (disableCheckout) {
      history.push("/login");
      return;
    }
    dispatch(addToCartActions(product));
  };

  const handleCheckout = async () => {
    if (disableCheckout) {
      history.push("/login");
      return;
    }

    setToggleCustomerAddress(true);
  };

  return (
    <>
      {toggleCustomerAddress ? (
        <CustomerAddressProduct
          setToggleCustomerAddress={setToggleCustomerAddress}
          product={product}
        />
      ) : (
        <div className="viewproduct_container">
          {/* Image */}
          <section className="product_image_container">
            <section className="product_name">
              <span>{product.product_name}</span>
            </section>
            <section className="product_image">
              <section className="viewProduct_bg_circle"></section>
              <img src={product.product_image} alt="" />
            </section>
          </section>

          {/* Details */}
          <section className="product_details_container">
            <section className="product_price">
              Price: <i className="fas fa-dollar-sign mx-2"></i>
              {product.product_price}.00
            </section>
            <section className="product_available">
              <span>{product.product_stock} </span>
              Piece available
            </section>
            <section className="product_brand">
              <span>Brand</span>
              <p>{product.product_brand}</p>
            </section>
            <section className="product_specs">
              <span>Specification</span>
              <p>{product.product_specs}</p>
            </section>
            <section className="product_description">
              <span>Description</span>
              <p>{product.product_description}</p>
            </section>
            <section
              className={productAlreadyAdded ? "disableOnAdded" : "product_btn"}
            >
              <button
                type="button"
                className="product_add_to_cart"
                onClick={handleAddToCart}
              >
                {productAlreadyAdded ? (
                  <>
                    Added<i className="fas fa-check-circle mx-2"></i>
                  </>
                ) : (
                  "Add to cart"
                )}
              </button>
              <button
                type="button"
                className={
                  isEmptyStock ? "disable_product_checkout" : "product_checkout"
                }
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </section>
          </section>
        </div>
      )}
    </>
  );
};

export default ViewProduct;
