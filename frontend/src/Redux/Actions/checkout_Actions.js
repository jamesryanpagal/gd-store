export const checkoutSuccessActions = (success) => (dispatch) => {
  dispatch({
    type: "CHECKOUT_SUCCESS",
    payload: {
      success,
    },
  });
};

export const checkoutOnProcessActions = (onProcess) => (dispatch) => {
  dispatch({
    type: "CHECKOUT_ONPROCESS",
    payload: {
      onProcess,
    },
  });
};
