import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//customer components
import Navbar from "../Navbar/Navbar";
import Signup from "../../Signup/Signup";
import Dashboard from "../Home/Dashboard";
import Login from "../../Login/Login";
import Shop from "../Shop/Shop";
import ViewProfile from "../ViewProfile/ViewProfile";
import ViewProduct from "../Shop/View/ViewProduct";
import CheckOutSuccess from "../../SuccessPage/CheckOutSuccess";
import CheckOutSuccessProduct from "../../SuccessPage/CheckOutSuccessProduct";
import CheckOutCancel from "../../CancelPage/CheckOutCancel";
import PurchasedHistory from "../Purchased/PurchasedHistory";

//component not found
import UsersPageNotFound from "../../UsersPageNotFound/UsersPageNotFound";

//css
import "./CustomerParent.css";

function CustomerParent() {
  return (
    <div className="customerParent_container">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/shop" component={Shop} />
          <Route path="/viewprofile/:id" component={ViewProfile} />
          <Route path="/viewproduct/:id" component={ViewProduct} />
          <Route path="/checkoutsuccess" component={CheckOutSuccess} />
          <Route
            path="/checkoutsuccessproduct/:id"
            component={CheckOutSuccessProduct}
          />
          <Route path="/checkoutcancel" component={CheckOutCancel} />
          <Route path="/purchasedHistory" component={PurchasedHistory} />
          <Route component={UsersPageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default CustomerParent;
