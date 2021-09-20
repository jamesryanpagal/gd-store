import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosConfig } from "../../ReusableFunction/AxiosConfig/AxiosConfig";

//redux actions
import { removeUserTokenActions } from "../../../Redux/Actions/user_Actions";

//images
import DashBoardIcon from "../../PublicImages/dashboard.png";
import ProductsIcon from "../../PublicImages/productsIcon.png";

//loader
import Loader from "../../Loader/Loader";

//css
import "./AdminNavbar.css";
import Profile from "../../ReusableFunction/Profile/Profile";

const AdminNavbar = () => {
  const [id, setId] = useState("");
  const [admin, setAdmin] = useState({
    username: "",
    profileImage: "",
    fullname: "",
  });
  const [loading, setLoading] = useState(false);

  const { userToken } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAdminData = async () => {
      const config = {
        headers: {
          key: userToken,
        },
      };

      try {
        setLoading(true);
        const { data } = await axiosConfig.get("/tokenVerifier", config);

        setId(data._id);
        setAdmin((prev) => ({
          ...prev,
          username: data.username,
          profileImage: data.user_image,
          fullname: data.fullname,
        }));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getAdminData();

    return () => {
      setId("");
      setAdmin("");
    };
  }, [userToken]);

  const handleAdminSignout = () => {
    dispatch(removeUserTokenActions());
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="admin_navbar">
          {/* Profile */}
          <section className="admin_profile">
            <section className="adminIcon_Container">
              <Profile image={admin.profileImage} fullname={admin.fullname} />
            </section>

            <section className="viewAdmin">
              <Link to={"/editadmin/" + id}>
                <i className="fas fa-user-edit"></i>
              </Link>
            </section>

            <h5>{admin.username}</h5>
            <section className="admin_signout" onClick={handleAdminSignout}>
              Signout
            </section>
          </section>
          {/* Admin Links */}
          <section className="admin_Links">
            <section className="admin_dashboard">
              <section className="admin_dashboard_link">
                <Link to="/">
                  <img
                    src={DashBoardIcon}
                    alt="dashboardicon"
                    className="icon"
                  />
                  <span>Dashboard</span>
                </Link>
              </section>
            </section>

            <section className="admin_products">
              <section className="admin_products_link">
                <Link to="/adminproducts">
                  <img
                    src={ProductsIcon}
                    alt="dashboardicon"
                    className="icon"
                  />
                  <span>Products</span>
                </Link>
              </section>
            </section>
          </section>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
