const checkUpdateProduct = (req, res, next) => {
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
    !product_description
  ) {
    error.Message = "Please fill out all the inputs";
    res.json(error);
    return;
  }

  req.product = {
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

module.exports = { checkUpdateProduct };
