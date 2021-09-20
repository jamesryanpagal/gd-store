import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { axiosConfig } from "../../ReusableFunction/AxiosConfig/AxiosConfig";

//redux actions
import { editProductActions } from "../../../Redux/Actions/products_Actions";

//images
import uploadlogo from "../../PublicImages/upload.png";

//functions
import getProduct from "../../ReusableFunction/GetProduct/GetProduct";

//Loader
import Spinner from "../../SmallSpinner/Spinner";

//css
import "./EditProducts.css";

const EditProducts = ({ history }) => {
  const [product, setProduct] = useState({
    product_image: "",
    product_name: "",
    product_brand: "",
    product_specs: "",
    product_price: "",
    product_stock: "",
    product_category: "",
    product_description: "",
  });
  const [preview, setPreview] = useState("");
  const [resMessage, setResMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const resData = getProduct(id);
      resData.then((res) => {
        setProduct((prev) => ({
          ...prev,
          product_image: res.product_image,
          product_name: res.product_name,
          product_brand: res.product_brand,
          product_specs: res.product_specs,
          product_price: res.product_price,
          product_stock: res.product_stock,
          product_category: res.product_category,
          product_description: res.product_description,
        }));
      });
    }
    return () => {
      mounted = false;
      setResMessage("");
    };
  }, [id]);

  const handleProductImageChange = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
        setProduct((prev) => ({ ...prev, product_image: e.target.files[0] }));
      }
    };
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    let reqData = {
      product_image: product.product_image,
      product_name: product.product_name,
      product_brand: product.product_brand,
      product_specs: product.product_specs,
      product_price: parseInt(product.product_price),
      product_stock: parseInt(product.product_stock),
      product_category: product.product_category,
      product_description: product.product_description,
    };

    try {
      setLoading(true);
      if (product.product_image.name) {
        const formData = new FormData();
        formData.append("file", product.product_image);
        formData.append("upload_preset", "Ecommerce_Products");

        const uploadProducts = await axiosConfig.post(
          "https://api.cloudinary.com/v1_1/dfwa3kop9/image/upload",
          formData
        );

        reqData = { ...reqData, product_image: uploadProducts.data.url };
      }

      const { data } = await axiosConfig.patch(
        "/products/updateProduct/" + id,
        reqData
      );

      if (data.error) {
        setResMessage(
          <section className="text-danger">
            {data.Message}
            <i className="fas fa-exclamation-circle mx-2"></i>
          </section>
        );
        setLoading(false);
        return;
      }
      setResMessage(
        <section className="text-success">
          {data.Message}
          <i className="fas fa-check-circle mx-2"></i>
        </section>
      );
      setTimeout(() => {
        setResMessage("");
      }, 5000);
      dispatch(editProductActions(reqData, id));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="editproducts_container">
      <form onSubmit={handleUpdateProduct} className="editproducts_form">
        <section className="editproduct_Message">{resMessage}</section>

        {/* Image */}
        <section className="product_image">
          <section className="image">
            <img
              src={
                preview
                  ? preview
                  : product.product_image && product.product_image
              }
              alt="_Upload_image"
            />
          </section>
          <label htmlFor="product_image">
            <img src={uploadlogo} alt="" />
          </label>
          <input
            type="file"
            id="product_image"
            onChange={handleProductImageChange}
            accept="image/png, image/jpeg"
          />
        </section>

        {/* Details */}
        <section className="edit_product_details">
          {/* Group 1 */}
          <section className="edit_input_group">
            {/* Name */}
            <section className="edit_input_container">
              <label htmlFor="name" className="edit_input_label">
                Name
              </label>
              <input
                value={product.product_name}
                type="text"
                name="product_name"
                id="name"
                onChange={handleChange}
              />
            </section>

            {/* Brand */}
            <section className="edit_input_container">
              <label htmlFor="brand" className="edit_input_label">
                Brand
              </label>
              <input
                value={product.product_brand}
                type="text"
                name="product_brand"
                id="brand"
                onChange={handleChange}
              />
            </section>
          </section>

          {/* Group 2 */}
          <section className="edit_input_group">
            {/* Specs */}
            <section className="edit_input_container">
              <label htmlFor="specs" className="edit_input_label">
                Specifications
              </label>
              <input
                value={product.product_specs}
                type="text"
                name="product_specs"
                id="specs"
                onChange={handleChange}
              />
            </section>

            {/* Category */}
            <section className="edit_input_container">
              <select
                name="product_category"
                className="category"
                onChange={handleChange}
              >
                <option value={product.product_category}>
                  {product.product_category}
                </option>
                <option value="Mobile">Mobile</option>
                <option value="Computer">Computer</option>
                <option value="Headphone">Headphone</option>
                <option value="Speaker">Speaker</option>
              </select>
            </section>
          </section>

          {/* Group 3 */}
          <section className="edit_input_group">
            {/* Price */}
            <section className="edit_input_container">
              <label htmlFor="price" className="edit_input_label">
                Price
              </label>
              <input
                value={product.product_price}
                type="number"
                name="product_price"
                id="price"
                onChange={handleChange}
              />
            </section>

            {/* Stock */}
            <section className="edit_input_container">
              <label htmlFor="stock" className="edit_input_label">
                Stock
              </label>
              <input
                value={product.product_stock}
                type="number"
                name="product_stock"
                id="stock"
                onChange={handleChange}
              />
            </section>
          </section>

          {/* Group 4 */}
          <section className="edit_input_group">
            {/* Description */}
            <section className="edit_text_area_container">
              <label htmlFor="description" className="edit_input_label">
                Decription
              </label>
              <textarea
                value={product.product_description}
                name="product_description"
                id="description"
                onChange={handleChange}
              />
            </section>
          </section>

          <section
            className={
              loading ? "edit_product_btn_disable" : "edit_product_btn"
            }
          >
            <button
              type="button"
              disabled={loading}
              onClick={() => history.go(-1)}
            >
              Back
            </button>
            <button type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Update"}
            </button>
          </section>
        </section>
      </form>
    </div>
  );
};

export default EditProducts;
