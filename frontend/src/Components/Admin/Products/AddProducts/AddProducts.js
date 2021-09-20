import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosConfig } from "../../../ReusableFunction/AxiosConfig/AxiosConfig";

//images
import uploadlogo from "../../../PublicImages/upload.png";

//Loader
import Spinner from "../../../SmallSpinner/Spinner";

//css
import "./AddProducts.css";

const AddProducts = ({ history }) => {
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

  const [imagePreview, setImagePreview] = useState("");
  const [resMessage, setResMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [addNewCategory, setAddNewCategory] = useState(false);

  const { categories } = useSelector((state) => state.Products);

  useEffect(() => {
    if (addNewCategory) {
      setProduct((prev) => ({ ...prev, product_category: "" }));
    }
  }, [addNewCategory]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductImageChange = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setProduct((prev) => ({ ...prev, product_image: e.target.files[0] }));
      }
    };
  };

  const handleAddProductOnFocus = (e) => {
    const target = e.target.parentElement;
    target.children[0].className = "add_inputFocus";
    setResMessage("");
  };

  const handleAddProductOnBlur = (e) => {
    const target = e.target.parentElement;
    if (target.children[1].value) {
      target.children[0].className = "add_inputFocus";
      return;
    }
    target.children[0].className = "input_label";
  };

  const handleToggleCategory = () => {
    setProduct((prev) => ({ ...prev, product_category: "" }));
    setAddNewCategory((prev) => !prev);
  };

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();

    let reqData = {
      product_image: product.product_image,
      product_name: product.product_name,
      product_brand: product.product_brand,
      product_specs: product.product_specs,
      product_price: product.product_price,
      product_stock: product.product_stock,
      product_category: product.product_category.toUpperCase(),
      product_description: product.product_description,
    };

    try {
      setLoading(true);
      if (product.product_image.name) {
        const formData = new FormData();
        formData.append("file", product.product_image);
        formData.append("upload_preset", "Ecommerce_Products");

        const uploadProduct = await axiosConfig.post(
          "https://api.cloudinary.com/v1_1/dfwa3kop9/image/upload",
          formData
        );

        reqData = { ...reqData, product_image: uploadProduct.data.url };
      }

      const { data } = await axiosConfig.post("/admin/addproduct", reqData);

      if (data.error) {
        setResMessage(
          <section className="text-danger">
            {data.Message}
            <i className="fas fa-exclamation-circle px-2"></i>
          </section>
        );
        setLoading(false);
        return;
      }

      setResMessage(
        <section className="text-success">
          {data.Message}
          <i className="fas fa-check-circle px-2"></i>
        </section>
      );

      setImagePreview("");
      setLoading(false);
      await history.push("/adminproducts");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addproducts_container">
      <form onSubmit={handleAddProductSubmit} className="addproducts_form">
        <section className="addproduct_Message">{resMessage}</section>

        {/* Image */}
        <section className="add_product_image">
          <section className="image">
            <img src={imagePreview} alt="" />
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

        {/* Add Product Details */}
        <section className="add_product_details">
          {/* Group 1 */}
          <section className="input_group">
            {/* Name */}
            <section className="add_input_container">
              <label htmlFor="name" className="input_label">
                Name
              </label>
              <input
                value={product.product_name}
                type="text"
                name="product_name"
                id="name"
                onChange={handleChange}
                onFocus={handleAddProductOnFocus}
                onBlur={handleAddProductOnBlur}
              />
            </section>

            {/* Brand */}
            <section className="add_input_container">
              <label htmlFor="brand" className="input_label">
                Brand
              </label>
              <input
                value={product.product_brand}
                type="text"
                name="product_brand"
                id="brand"
                onChange={handleChange}
                onFocus={handleAddProductOnFocus}
                onBlur={handleAddProductOnBlur}
              />
            </section>
          </section>

          {/* Group 2 */}

          <section className="input_group">
            {/* Specs */}
            <section className="add_input_container">
              <label htmlFor="specs" className="input_label">
                Specifications
              </label>
              <input
                value={product.product_specs}
                type="text"
                name="product_specs"
                id="specs"
                onChange={handleChange}
                onFocus={handleAddProductOnFocus}
                onBlur={handleAddProductOnBlur}
              />
            </section>
            {/* Category */}
            <section className="add_input_container">
              {addNewCategory ? (
                <>
                  <label htmlFor="category" className="input_label">
                    Category
                  </label>
                  {/* New Category */}
                  <input
                    value={product.product_category}
                    type="text"
                    name="product_category"
                    id="category"
                    onChange={handleChange}
                    onFocus={handleAddProductOnFocus}
                    onBlur={handleAddProductOnBlur}
                  />
                  {/* add or select category */}
                  <section
                    className="add_category"
                    onClick={handleToggleCategory}
                  >
                    {addNewCategory ? (
                      <i className="fas fa-times-circle text-danger"></i>
                    ) : (
                      <i className="fas fa-plus-circle text-success"></i>
                    )}
                  </section>
                </>
              ) : (
                <>
                  {/* add or select category */}
                  <section
                    className="add_category"
                    onClick={handleToggleCategory}
                  >
                    {addNewCategory ? (
                      <i className="fas fa-times-circle text-danger"></i>
                    ) : (
                      <i className="fas fa-plus-circle text-success"></i>
                    )}
                  </section>
                  {/* Select category */}
                  <select
                    name="product_category"
                    className="category"
                    onChange={handleChange}
                  >
                    <option value="">--Select category--</option>
                    {categories.map((p) => {
                      return (
                        <option key={p._id} value={p.category}>
                          {p.category}
                        </option>
                      );
                    })}
                  </select>
                </>
              )}
            </section>
          </section>

          {/* Group 3 */}

          <section className="input_group">
            {/* Price */}
            <section className="add_input_container">
              <label htmlFor="price" className="input_label">
                Price
              </label>
              <input
                value={product.product_price}
                type="number"
                name="product_price"
                id="price"
                onChange={handleChange}
                onFocus={handleAddProductOnFocus}
                onBlur={handleAddProductOnBlur}
              />
            </section>

            {/* Stock */}
            <section className="add_input_container">
              <label htmlFor="stock" className="input_label">
                Stock
              </label>
              <input
                value={product.product_stock}
                type="number"
                name="product_stock"
                id="stock"
                onChange={handleChange}
                onFocus={handleAddProductOnFocus}
                onBlur={handleAddProductOnBlur}
              />
            </section>
          </section>

          {/* Group 4 */}

          <section className="input_group">
            {/* Description */}
            <section className="add_text_area_container">
              <label htmlFor="description" className="input_label">
                Decription
              </label>
              <textarea
                value={product.product_description}
                name="product_description"
                id="description"
                onChange={handleChange}
                onFocus={handleAddProductOnFocus}
                onBlur={handleAddProductOnBlur}
              />
            </section>
          </section>

          <section className={loading ? "disableOnAdd" : "product_btn"}>
            <button
              disabled={loading}
              type="button"
              onClick={() => history.go(-1)}
            >
              Back
            </button>
            <button type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Add"}
            </button>
          </section>
        </section>
      </form>
    </div>
  );
};

export default AddProducts;
