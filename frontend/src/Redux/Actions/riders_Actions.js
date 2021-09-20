export const ridersActions = (riders) => (dispatch) => {
  dispatch({
    type: "RIDERS",
    payload: {
      ...riders,
      deliverItem: [],
    },
  });
};

export const addDeliveritem = (itemId, riderIdItem) => (dispatch) => {
  dispatch({
    type: "ADD_DELIVER_ITEM",
    payload: {
      itemId,
      riderIdItem,
    },
  });
};

export const removeDeliverItem =
  (deliveredId, riderDeliveredId) => (dispatch) => {
    dispatch({
      type: "REMOVE_DELIVERITEM",
      payload: {
        deliveredId,
        riderDeliveredId,
      },
    });
  };

export const clearResMessage = () => (dispatch) => {
  dispatch({
    type: "CLEAR_RESMESSAGE",
  });
};
