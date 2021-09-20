import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosConfig } from "../../ReusableFunction/AxiosConfig/AxiosConfig";

//images
import noProducts from "../../PublicImages/noProducts.png";

//Redux hooks
import { useDispatch, useSelector } from "react-redux";

//Redux actions
import { deleteProductActions } from "../../../Redux/Actions/products_Actions";

//loader
import Spinner from "../../SmallSpinner/Spinner";

//Functions
import Product from "./Product";

//css
import "./AdminProducts.css";

const DeleteConfirmation = ({
  setDeleteConfirmation,
  dispatch,
  deleteProductActions,
  productId,
  setActionMessage,
  loading,
  setLoading,
}) => {
  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      dispatch(deleteProductActions(productId));
      await axiosConfig.delete("/products/deleteProduct/" + productId);
      setLoading(false);
      setDeleteConfirmation((prev) => !prev);
      setActionMessage(
        <span className="product_On_delete_message">
          Product Deleted Successfully
          <i className="fas fa-check-circle mx-2"></i>
        </span>
      );
      setTimeout(() => {
        setActionMessage("");
      }, 5000);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <div className="deleteConfirmation_container">
      <section className="confirmation">
        <p>Are you sure you want to delete this ?</p>
        <section className="confirmation_btn">
          <button
            type="button"
            className={loading ? "disable_yes" : "yes"}
            disabled={loading}
            onClick={handleConfirmDelete}
          >
            {loading ? <Spinner /> : "Yes"}
          </button>
          <button
            type="button"
            className={loading ? "disable_no" : "no"}
            disabled={loading}
            onClick={() => setDeleteConfirmation((prev) => !prev)}
          >
            No
          </button>
        </section>
      </section>
    </div>
  );
};

const AdminProducts = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [productId, setProductId] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { product_list, categories } = useSelector((state) => state.Products);

  useEffect(() => {
    setProductList([...product_list]);

    return () => {
      setProductList([]);
      setActionMessage("");
    };
  }, [product_list]);

  const handleChangeProductCategory = (e) => {
    const value = e.target.value;

    if (value === "All") {
      setProductList([...product_list]);
      return;
    }

    setProductList(product_list.filter((p) => p.product_category === value));
  };

  const handleDeleteProduct = (id) => {
    setDeleteConfirmation((prev) => !prev);
    setProductId(id);
  };

  return (
    <div className="adminProducts_container">
      {deleteConfirmation && (
        <DeleteConfirmation
          productId={productId}
          setDeleteConfirmation={setDeleteConfirmation}
          dispatch={dispatch}
          deleteProductActions={deleteProductActions}
          setActionMessage={setActionMessage}
          loading={loading}
          setLoading={setLoading}
        />
      )}
      <section className="action_message">{actionMessage}</section>
      <section className="products">
        <section className="products_btn_container">
          <select className="category" onChange={handleChangeProductCategory}>
            <option value="All">ALL</option>
            {categories.map((p) => {
              return (
                <option key={p._id} value={p.category}>
                  {p.category}
                </option>
              );
            })}
          </select>
          <section className="add_products">
            <Link to="/addproducts">Add</Link>
          </section>
        </section>

        <section className="product_list">
          {productList.length === 0 ? (
            <section className="no_products">
              <section className="no_products_text">
                <span>Empty Product List !</span>
              </section>
              <img src={noProducts} alt=" " />
            </section>
          ) : (
            <table className="product_table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <Product
                    product={product}
                    key={product._id}
                    handleDeleteProduct={handleDeleteProduct}
                  />
                ))}
              </tbody>
            </table>
          )}
        </section>
      </section>
    </div>
  );
};

export default AdminProducts;
