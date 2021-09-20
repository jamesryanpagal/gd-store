export const checkoutReducer = (
  state = {
    successCheckout: false,
    checkoutOnProcess: false,
  },
  action
) => {
  switch (action.type) {
    case "CHECKOUT_SUCCESS":
      const { success } = action.payload;
      return {
        ...state,
        successCheckout: success,
      };

    case "CHECKOUT_ONPROCESS":
      const { onProcess } = action.payload;
      return {
        ...state,
        checkoutOnProcess: onProcess,
      };

    default:
      return state;
  }
};
