import React from "react";
import { Link } from "react-router-dom";

//css
import "./Product.css";

const Product = ({ product, handleDeleteProduct }) => {
  return (
    <tr className="data_container">
      <td className="id">
        <section className="id_container">{product._id}</section>
      </td>
      <td className="product">
        <div className="product_container">
          <section className="product_image">
            <img src={product.product_image} alt=" " />
          </section>
          <section className="product_name">
            <span>{product.product_name}</span>
          </section>
        </div>
      </td>
      <td className="price">
        <section className="price_container">{product.product_price}</section>
      </td>
      <td className="stock">
        <section className="stock_container">{product.product_stock}</section>
      </td>
      <td className="description">
        <section className="description_container">
          {product.product_description}
        </section>
      </td>
      <td className="actions">
        <section className="actions_container">
          <Link to={"/editproduct/" + product._id}>Edit</Link>
          <button
            type="button"
            onClick={() => handleDeleteProduct(product._id)}
          >
            Delete
          </button>
        </section>
      </td>
    </tr>
  );
};

export default Product;
