export const productsCartReducer = (
  state = {
    cart: [],
    numberOfProducts: 0,
    total: 0,
    toggleCart: false,
    resMessage: "",
  },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const product = action.payload;

      const productExist = state.cart.find((p) => p._id === product._id);

      product.product_total = product.product_price * product.product_quantity;

      //find if product already exist
      if (!productExist) {
        return {
          ...state,
          cart: [...state.cart, product],
          resMessage: "Added",
          total: (state.total += product.product_price),
          numberOfProducts: (state.numberOfProducts +=
            product.product_quantity),
        };
      }

      // return default previous value if product exist
      return {
        ...state,
        cart: [...state.cart],
      };

    case "CLEAR_CART_MESSAGE":
      const { message } = action.payload;

      //clear message in resMessage after the given time
      return {
        ...state,
        resMessage: message,
      };

    case "TOGGLE_CART":
      const { toggle } = action.payload;

      // toggle cart
      return {
        ...state,
        toggleCart: toggle,
      };

    case "QTY_INCREMENT": // Increment
      const { productCartQtyIncrement, productCartQtyIncrementId } =
        action.payload;

      // find the index of the product in the array
      const cartProductIndexIncrement = state.cart.findIndex(
        (p) => p._id === productCartQtyIncrementId
      );

      // after finding put the product in variable
      const productTargetIncrement = state.cart[cartProductIndexIncrement];

      // change quantity
      productTargetIncrement.product_quantity += productCartQtyIncrement;

      if (
        productTargetIncrement.product_quantity >
        productTargetIncrement.product_stock
      ) {
        productTargetIncrement.product_quantity -= 1;
        return {
          ...state,
          cart: [...state.cart],
          total: state.total,
        };
      }

      // set product total
      productTargetIncrement.product_total =
        productTargetIncrement.product_price *
        productTargetIncrement.product_quantity;

      return {
        ...state,
        cart: [...state.cart],
        total: (state.total +=
          state.cart[cartProductIndexIncrement].product_price),
        numberOfProducts: (state.numberOfProducts += productCartQtyIncrement),
      };

    case "QTY_DECREMENT": // Decrement
      const { productCartQtyDecrement, productCartQtyDecrementId } =
        action.payload;

      // find the index of the product in the array
      const cartProductIndexDecrement = state.cart.findIndex(
        (p) => p._id === productCartQtyDecrementId
      );

      // after finding put the product in variable
      const productTargetDecrement = state.cart[cartProductIndexDecrement];

      // change quantity
      productTargetDecrement.product_quantity -= productCartQtyDecrement;

      if (productTargetDecrement.product_quantity < 1) {
        productTargetDecrement.product_quantity = 1;
        return {
          ...state,
          total: state.total,
        };
      }

      // set product total
      productTargetDecrement.product_total =
        productTargetDecrement.product_price *
        productTargetDecrement.product_quantity;

      return {
        ...state,
        cart: [...state.cart],
        total: (state.total -=
          state.cart[cartProductIndexDecrement].product_price),
        numberOfProducts: (state.numberOfProducts -= productCartQtyDecrement),
      };

    case "REMOVE_CART_PRODUCT":
      const { removeCartProductId } = action.payload;

      const productCartRemoveIndex = state.cart.findIndex(
        (p) => p._id === removeCartProductId
      );

      state.total -= state.cart[productCartRemoveIndex].product_total;
      state.numberOfProducts -=
        state.cart[productCartRemoveIndex].product_quantity;

      return {
        ...state,
        cart: state.cart.filter((p) => p._id !== removeCartProductId),
      };

    case "CLEAR_CART_ON_LOGOUT":
      return {
        ...state,
        cart: [],
        total: 0,
        numberOfProducts: 0,
      };

    case "UPDATE_PRODUCTS_STOCK":
      const { newProductsStock, productsStockId } = action.payload;

      const productStockIdIndex = state.cart.findIndex(
        (p) => p._id === productsStockId
      );

      const productStockIdObj = state.cart[productStockIdIndex];

      productStockIdObj.product_stock = newProductsStock;

      return {
        ...state,
        cart: [...state.cart],
      };

    default:
      return state;
  }
};
