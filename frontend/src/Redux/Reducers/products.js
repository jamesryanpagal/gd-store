export const productsReducers = (
  state = { product_list: [], categories: [] },
  action
) => {
  switch (action.type) {
    //Get and insert the data to redux store
    case "GET_DATABASE_PRODUCTS":
      const product = action.payload;

      const productExist = state.product_list.find(
        (p) => p._id === product._id
      );

      if (!productExist) {
        return {
          ...state,
          product_list: [...state.product_list, product],
        };
      }

      return {
        ...state,
        product_list: [...state.product_list],
      };

    //Remove product from the product list
    case "DELETE_PRODUCT":
      const { productId } = action.payload;

      return {
        ...state,
        product_list: state.product_list.filter((p) => p._id !== productId),
      };

    // Edit product

    case "EDIT_PRODUCT":
      const {
        product_image,
        product_name,
        product_brand,
        product_specs,
        product_price,
        product_stock,
        product_category,
        product_description,
      } = action.payload.updates;
      const productEditId = action.payload.id;

      const productIndex = state.product_list.findIndex(
        (obj) => obj._id === productEditId
      );

      const editProductListIndex = state.product_list[productIndex];

      editProductListIndex.product_image = product_image;
      editProductListIndex.product_name = product_name;
      editProductListIndex.product_brand = product_brand;
      editProductListIndex.product_specs = product_specs;
      editProductListIndex.product_price = product_price;
      editProductListIndex.product_category = product_category;
      editProductListIndex.product_stock = product_stock;
      editProductListIndex.product_description = product_description;

      return {
        ...state,
        product_list: [...state.product_list],
      };

    case "GET_CATEGORIES":
      const productCategories = action.payload;

      const categoryExist = state.categories.find(
        (p) => p.category === productCategories.category
      );

      if (!categoryExist) {
        return {
          ...state,
          categories: [...state.categories, productCategories],
        };
      }

      return {
        ...state,
        categories: [...state.categories],
      };

    case "UPDATE_PRODUCTS_STOCK":
      const { newProductsStock, productsStockId } = action.payload;

      const udpateProductsIdIndex = state.product_list.findIndex(
        (p) => p._id === productsStockId
      );

      const updateProductsIdObj = state.product_list[udpateProductsIdIndex];

      updateProductsIdObj.product_stock = newProductsStock;

      return {
        ...state,
        product_list: [...state.product_list],
      };

    case "UPDATE_PRODUCT_STOCK":
      const { newProductStock, productStockId } = action.payload;

      const updateProductIdIndex = state.product_list.findIndex(
        (p) => p._id === productStockId
      );

      const updateProductIdObj = state.product_list[updateProductIdIndex];

      updateProductIdObj.product_stock = newProductStock;

      return {
        ...state,
        product_list: [...state.product_list],
      };

    default:
      return state;
  }
};
