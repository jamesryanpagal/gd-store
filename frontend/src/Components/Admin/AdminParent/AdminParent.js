import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//admin component
import AdminNavbar from "../Navbar/AdminNavbar";
import Admin from "../Dashboard/Admin";
import AdminProducts from "../Products/AdminProducts";
import EditAdmin from "../EditAdmin/EditAdmin";
import AddProducts from "../Products/AddProducts/AddProducts";
import EditProducts from "../Products/EditProducts";

//component not found
import UsersPageNotFound from "../../UsersPageNotFound/UsersPageNotFound";

//css
import "./AdminParent.css";

function AdminParent() {
  return (
    <div className="admin_panel_container">
      <Router>
        <AdminNavbar />
        <Switch>
          <Route exact path="/" component={Admin} />
          <Route path="/adminproducts" component={AdminProducts} />
          <Route path="/editadmin/:id" component={EditAdmin} />
          <Route path="/addproducts" component={AddProducts} />
          <Route path="/editproduct/:id" component={EditProducts} />
          <Route component={UsersPageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default AdminParent;
