export const userReducer = (
  state = { userToken: "", user_history: [], customer_address: "" },
  action
) => {
  switch (action.type) {
    case "USER_TOKEN":
      const token = action.payload.token;
      return {
        ...state,
        userToken: token,
      };

    case "REMOVE_USER_TOKEN":
      return {
        ...state,
        userToken: "",
      };

    case "CREATE_USER_HISTORY":
      const { products } = action.payload;
      const productExist = state.user_history.find(
        (p) => p.product_id === products.product_id
      );

      if (!productExist) {
        return {
          ...state,
          user_history: [...state.user_history, products],
        };
      }

      return {
        ...state,
        user_history: [...state.user_history],
      };

    case "CLEAR_USER_HISTORY":
      return {
        ...state,
        user_history: [],
      };

    case "SET_USERT_ADDRESS":
      const { address } = action.payload;
      return {
        ...state,
        customer_address: address,
      };

    default:
      return state;
  }
};
