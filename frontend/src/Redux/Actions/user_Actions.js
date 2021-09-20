export const userTokenActions = (token) => (dispatch) => {
  dispatch({
    type: "USER_TOKEN",
    payload: {
      token,
    },
  });
};

export const removeUserTokenActions = () => (dispatch) => {
  dispatch({
    type: "REMOVE_USER_TOKEN",
  });
};

export const userHistoryActions = (products) => (dispatch) => {
  dispatch({
    type: "CREATE_USER_HISTORY",
    payload: {
      products,
    },
  });
};

export const clearUserHistoryActions = () => (dispatch) => {
  dispatch({
    type: "CLEAR_USER_HISTORY",
  });
};

export const setUserAddressActions = (address) => (dispatch) => {
  dispatch({
    type: "SET_USERT_ADDRESS",
    payload: {
      address,
    },
  });
};
