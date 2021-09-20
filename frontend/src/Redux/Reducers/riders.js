export const ridersReducers = (
  state = { riders: [], resMessage: "" },
  action
) => {
  switch (action.type) {
    case "RIDERS":
      const ridersList = action.payload;

      const riderExist = state.riders.find((r) => r._id === ridersList._id);

      if (!riderExist) {
        return {
          ...state,
          riders: [...state.riders, ridersList],
        };
      }

      return {
        ...state,
        riders: [...state.riders],
      };

    case "ADD_DELIVER_ITEM":
      const { itemId, riderIdItem } = action.payload;

      const riderIndexItem = state.riders.findIndex(
        (r) => r._id === riderIdItem
      );

      const riderItemObj = state.riders[riderIndexItem];

      const riderItemIndexExist = riderItemObj.deliverItem.find(
        (i) => i === itemId
      );

      if (!riderItemIndexExist) {
        riderItemObj.deliverItem = [...riderItemObj.deliverItem, itemId];
        return {
          ...state,
          riders: [...state.riders],
          resMessage: "Item assigned",
        };
      }

      return {
        ...state,
        riders: [...state.riders],
      };

    case "REMOVE_DELIVERITEM":
      const { deliveredId, riderDeliveredId } = action.payload;

      const riderDeliveredIndex = state.riders.findIndex(
        (r) => r._id === riderDeliveredId
      );

      const riderDeliveredObj = state.riders[riderDeliveredIndex];

      riderDeliveredObj.deliverItem = riderDeliveredObj.deliverItem.filter(
        (i) => i !== deliveredId
      );

      return {
        ...state,
        riders: [...state.riders],
      };

    case "CLEAR_RESMESSAGE":
      return {
        ...state,
        resMessage: "",
      };

    default:
      return state;
  }
};
