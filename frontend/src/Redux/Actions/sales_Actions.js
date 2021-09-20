export const productSalesActions = (productSales) => (dispatch) => {
  dispatch({
    type: "PRODUCT_SALES",
    payload: {
      productSales: { ...productSales, status: "Pending" },
    },
  });
};

export const deliveringSalesStatus =
  (deliveringStatus, deliveringId) => (dispatch) => {
    dispatch({
      type: "ITEM_DELIVERING",
      payload: {
        deliveringStatus,
        deliveringId,
      },
    });
  };

export const deliveredSalesStatus =
  (deliveredStatus, deliveredId) => (dispatch) => {
    dispatch({
      type: "ITEM_DELIVERED",
      payload: {
        deliveredStatus,
        deliveredId,
      },
    });
  };

export const cancelSalesStatus = (cancelItemId) => (dispatch) => {
  dispatch({
    type: "ITEM_CANCEL",
    payload: {
      cancelItemId,
    },
  });
};

export const incomeActions = (productIncome) => (dispatch) => {
  dispatch({
    type: "INCOME",
    payload: {
      productIncome,
    },
  });
};
