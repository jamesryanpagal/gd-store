const checkAddProduct = (req, res, next) => {
  const {
    product_image,
    product_name,
    product_brand,
    product_specs,
    product_price,
    product_stock,
    product_category,
    product_description,
  } = req.body;

  const error = { error: true, Message: "" };

  if (
    !product_name ||
    !product_brand ||
    !product_specs ||
    !product_price ||
    !product_stock ||
    !product_category ||
    !product_description
  ) {
    error.Message = "Please fill out all the input fields";
    res.json(error);
    return;
  }

  if (!product_image) {
    error.Message = "Please provide some image";
    res.json(error);
    return;
  }

  req.products = {
    product_image,
    product_name,
    product_brand,
    product_specs,
    product_price,
    product_stock,
    product_category,
    product_description,
  };

  next();
};

module.exports = { checkAddProduct };
