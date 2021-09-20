import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//images
import noProducts from "../../PublicImages/noProducts.png";

//css
import "./Shop.css";

const Products = ({ product }) => {
  return (
    <div className="product_container">
      <Link to={"/viewproduct/" + product._id} className="shop_product">
        <section className="product_name_container">
          <span>{product.product_name}</span>
        </section>
        <section className="product_image_container">
          <section className="bg_circle"></section>
          <img src={product.product_image} alt=" " />
        </section>
      </Link>
    </div>
  );
};

const Shop = () => {
  const [shopProducts, setShopProducts] = useState([]);

  const { product_list, categories } = useSelector((state) => state.Products);

  useEffect(() => {
    setShopProducts([...product_list]);
  }, [product_list]);

  const handleShow = (e) => {
    const btnValue = e.target.value;
    if (btnValue === "All") {
      setShopProducts([...product_list]);
      return;
    }

    setShopProducts(
      product_list.filter((p) => btnValue === p.product_category)
    );
  };

  return (
    <div className="shop_container">
      <section className="shop_navbar_container">
        <section className="shop_product_category">
          <span>Category</span>
          <button type="button" onClick={handleShow} value="All">
            ALL
          </button>
          {categories.map((p) => {
            return (
              <button
                key={p._id}
                type="button"
                onClick={handleShow}
                value={p.category}
              >
                {p.category}
              </button>
            );
          })}
        </section>
      </section>
      {shopProducts.length === 0 ? (
        <section className="no_product_container">
          <span>No Available Product !</span>
          <img src={noProducts} alt="" />
        </section>
      ) : (
        <section className="product_row">
          {shopProducts.map((product) => (
            <Products key={product._id} product={product} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Shop;
