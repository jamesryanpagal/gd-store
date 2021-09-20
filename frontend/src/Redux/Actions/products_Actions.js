export const getProductsActions = (product) => (dispatch) => {
  dispatch({
    type: "GET_DATABASE_PRODUCTS",
    payload: {
      _id: product._id,
      product_image: product.product_image,
      product_name: product.product_name,
      product_brand: product.product_brand,
      product_specs: product.product_specs,
      product_price: product.product_price,
      product_stock: product.product_stock,
      product_category: product.product_category,
      product_description: product.product_description,
    },
  });
};

export const editProductActions = (updates, id) => (dispatch) => {
  dispatch({
    type: "EDIT_PRODUCT",
    payload: {
      updates,
      id,
    },
  });
};

export const deleteProductActions = (productId) => async (dispatch) => {
  dispatch({
    type: "DELETE_PRODUCT",
    payload: {
      productId,
    },
  });
};

export const addToCartActions = (addToCartProduct) => (dispatch) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: {
      _id: addToCartProduct._id,
      product_image: addToCartProduct.product_image,
      product_name: addToCartProduct.product_name,
      product_brand: addToCartProduct.product_brand,
      product_specs: addToCartProduct.product_specs,
      product_price: addToCartProduct.product_price,
      product_stock: addToCartProduct.product_stock,
      product_category: addToCartProduct.product_category,
      product_description: addToCartProduct.product_description,
      product_quantity: 1,
      product_total: null,
    },
  });
};

export const clearCartMessage = (message) => (dispatch) => {
  dispatch({
    type: "CLEAR_CART_MESSAGE",
    payload: {
      message,
    },
  });
};

export const showCartActions = (toggle) => (dispatch) => {
  dispatch({
    type: "TOGGLE_CART",
    payload: {
      toggle,
    },
  });
};

export const productQtyIncrementActions = (qty, id) => (dispatch) => {
  dispatch({
    type: "QTY_INCREMENT",
    payload: {
      productCartQtyIncrement: qty,
      productCartQtyIncrementId: id,
    },
  });
};

export const productQtyDecrementActions = (qty, id) => (dispatch) => {
  dispatch({
    type: "QTY_DECREMENT",
    payload: {
      productCartQtyDecrement: qty,
      productCartQtyDecrementId: id,
    },
  });
};

export const removeCartProduct = (id) => (dispatch) => {
  dispatch({
    type: "REMOVE_CART_PRODUCT",
    payload: {
      removeCartProductId: id,
    },
  });
};

export const clearCartOnLogout = () => (dispatch) => {
  dispatch({
    type: "CLEAR_CART_ON_LOGOUT",
  });
};

export const getProductCategoriesActions = (categories) => (dispatch) => {
  dispatch({
    type: "GET_CATEGORIES",
    payload: {
      _id: categories._id,
      category: categories.category,
    },
  });
};

export const updateProductsStockActions =
  (newProductsStock, productsStockId) => (dispatch) => {
    dispatch({
      type: "UPDATE_PRODUCTS_STOCK",
      payload: {
        newProductsStock,
        productsStockId,
      },
    });
  };

export const updateProductStockActions =
  (newProductStock, productStockId) => (dispatch) => {
    dispatch({
      type: "UPDATE_PRODUCT_STOCK",
      payload: {
        newProductStock,
        productStockId,
      },
    });
  };
