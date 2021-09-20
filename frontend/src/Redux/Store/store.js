import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//Reducer
import { productsReducers } from "../Reducers/products";
import { productsCartReducer } from "../Reducers/cart";
import { checkoutReducer } from "../Reducers/checkout";
import { userReducer } from "../Reducers/user";
import { salesReducers } from "../Reducers/sales";
import { ridersReducers } from "../Reducers/riders";

const reducer = combineReducers({
  Products: productsReducers,
  Cart: productsCartReducer,
  Checkout: checkoutReducer,
  User: userReducer,
  Sales: salesReducers,
  Riders: ridersReducers,
});

const persistConfig = {
  key: "persistRootReducer",
  storage,
};

const persistreducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];

export const store = createStore(
  persistreducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persiststore = persistStore(store);
