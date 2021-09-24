export const salesReducers = (state = { sales: [], income: 0 }, action) => {
  switch (action.type) {
    case "PRODUCT_SALES":
      const { productSales } = action.payload;

      const salesExist = state.sales.find((p) => p._id === productSales._id);

      if (!salesExist) {
        return {
          ...state,
          sales: [...state.sales, productSales],
        };
      }

      return {
        ...state,
        sales: [...state.sales],
      };

    case "ITEM_DELIVERING":
      const { deliveringStatus, deliveringId } = action.payload;

      const deliveringIndex = state.sales.findIndex(
        (s) => s.sales_id === deliveringId
      );

      const deliveringObj = state.sales[deliveringIndex];

      deliveringObj.status = deliveringStatus;

      return {
        ...state,
        sales: [...state.sales],
      };

    case "ITEM_DELIVERED":
      const { deliveredStatus, deliveredId } = action.payload;

      const deliveredIndex = state.sales.findIndex(
        (s) => s.sales_id === deliveredId
      );

      const deliveredObj = state.sales[deliveredIndex];

      deliveredObj.status = deliveredStatus;

      return {
        ...state,
        sales: [...state.sales],
      };

    case "ITEM_CANCEL":
      const { cancelItemId } = action.payload;

      const cancelItemIdIndex = state.sales.findIndex(
        (s) => s.sales_id === cancelItemId
      );

      const cancelItemObj = state.sales[cancelItemIdIndex];

      cancelItemObj.status = "Pending";

      return {
        ...state,
        sales: [...state.sales],
      };

    case "INCOME":
      const { purchasedTotal } = action.payload;

      return {
        ...state,
        income: purchasedTotal,
      };

    default:
      return state;
  }
};
