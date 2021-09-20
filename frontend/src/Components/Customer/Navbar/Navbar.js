import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Profile from "../../ReusableFunction/Profile/Profile";

//redux actions
import {
  showCartActions,
  clearCartOnLogout,
  clearCartMessage,
} from "../../../Redux/Actions/products_Actions";

import {
  removeUserTokenActions,
  clearUserHistoryActions,
} from "../../../Redux/Actions/user_Actions";

//component
import Cart from "../Shop/Cart/Cart";
import verifyToken from "../../ReusableFunction/VerifyToken/Verify_Token";

//images
import navbarMenu from "../../PublicImages/navbarmenu.png";

//css
import "./Navbar.css";

// PC view
const UserNavbarModal = ({ id, logout, user_image, fullname }) => {
  return (
    <div className="user_navbar_modal">
      <section className="user_navbar_modal_profile">
        <Profile image={user_image} fullname={fullname} />
      </section>
      <section className="view_profile">
        <Link to={"/viewprofile/" + id}>Account</Link>
      </section>
      <section className="user_history">
        <Link to="/purchasedhistory">Purchased</Link>
      </section>
      <section className="logout">
        <button type="button" onClick={() => logout()}>
          Logout
        </button>
      </section>
    </div>
  );
};

//Mobile View

const MobileUserNavbarModal = ({
  id,
  logout,
  user_image,
  fullname,
  setShowMobileMenu,
}) => {
  return (
    <div className="user_navbar_modal">
      <section className="user_navbar_modal_profile">
        <Profile image={user_image} fullname={fullname} />
      </section>
      <section
        className="view_profile"
        onClick={() => setShowMobileMenu((prev) => !prev)}
      >
        <Link to={"/viewprofile/" + id}>Account</Link>
      </section>
      <section
        className="user_history"
        onClick={() => setShowMobileMenu((prev) => !prev)}
      >
        <Link to="/purchasedhistory">Purchased</Link>
      </section>
      <section className="logout">
        <button type="button" onClick={() => logout()}>
          Logout
        </button>
      </section>
    </div>
  );
};

const SeachBar = ({ product_list, setShowSearchBar }) => {
  const [searchVal, setSearchVal] = useState("");

  const handleSearchOnFocus = (e) => {
    const target = e.target.parentElement;
    target.children[0].className = "search_OnFocus";
  };

  const handleSearchOnBlur = (e) => {
    const target = e.target.parentElement;
    if (target.children[1].value) {
      target.children[0].className = "search_OnFocus";
      return;
    }
    target.children[0].className = "label";
  };

  return (
    <div className="search_bar_container">
      <section className="close_search_bar">
        <i className="fas fa-times" onClick={() => setShowSearchBar(false)}></i>
      </section>
      <section className="search_bar_input">
        <label htmlFor="search" className="label">
          Search
        </label>
        <input
          type="text"
          id="search"
          onFocus={handleSearchOnFocus}
          onBlur={handleSearchOnBlur}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </section>
      <section className="search_results">
        {searchVal &&
          product_list
            .filter((pl) =>
              pl.product_name.toLowerCase().includes(searchVal.toLowerCase())
            )
            .map((p) => {
              return (
                <section key={p._id} className="searched_product">
                  <Link
                    to={"/viewproduct/" + p._id}
                    onClick={() => setShowSearchBar(false)}
                  >
                    {p.product_name}
                  </Link>
                </section>
              );
            })}
      </section>
    </div>
  );
};

const Navbar = () => {
  const [user, setUser] = useState({
    id: "",
    fullname: "",
    user_image: "",
    username: "",
  });

  const [toggleProductCart, setToggleProductCart] = useState(false);
  const [showUserNavbarModal, setShowUserNavbarModal] = useState(false);
  const [productOnAddMessage, setProductOnAddMessage] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  //Mobile menu
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const dispatch = useDispatch();
  const { toggleCart, cart, resMessage, numberOfProducts } = useSelector(
    (state) => state.Cart
  );

  const { successCheckout } = useSelector((state) => state.Checkout);

  const { userToken } = useSelector((state) => state.User);

  const { product_list } = useSelector((state) => state.Products);

  useEffect(() => {
    dispatch(showCartActions(toggleProductCart));
  }, [dispatch, toggleProductCart]);

  useEffect(() => {
    setProductOnAddMessage(
      <span className="text-success">
        {resMessage}
        <i className="fas fa-check-circle mx-2"></i>
      </span>
    );
    if (resMessage) {
      setTimeout(() => {
        dispatch(clearCartMessage(""));
        setProductOnAddMessage("");
      }, 3000);
    }
    return () => {
      setProductOnAddMessage("");
    };
  }, [resMessage, dispatch]);

  useEffect(() => {
    if (userToken) {
      const user = verifyToken(userToken);
      user.then((res) => {
        setUser((prev) => ({
          ...prev,
          id: res.data._id,
          fullname: res.data.fullname,
          user_image: res.data.user_image,
          username: res.data.username,
        }));
      });
    }
  }, [userToken]);

  const handleLogout = async () => {
    dispatch(removeUserTokenActions());
    dispatch(clearCartOnLogout());
    dispatch(clearUserHistoryActions());
  };

  // Mobile
  const handleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };

  return (
    <div className="navbar">
      {showSearchBar && (
        <SeachBar
          product_list={product_list}
          setShowSearchBar={setShowSearchBar}
        />
      )}
      {successCheckout && (
        <section className="cart_OnEmailSend_Message">
          Receipt has been sent to your email
          <i className="fas fa-check-circle mx-2"></i>
        </section>
      )}
      {resMessage && (
        <section className="cart_OnAdd_Message">{productOnAddMessage}</section>
      )}
      {toggleCart && <Cart setToggleProductCart={setToggleProductCart} />}
      <header>
        {/* Logo */}
        <section className="logo">
          <span>Pag's</span>
        </section>

        {/* Mobile menu */}
        <section className="mobile_navbar">
          <section
            className="mobile_search"
            onClick={() => setShowSearchBar(true)}
          >
            <i className="fas fa-search"></i>
          </section>
          <section className="mobile_menu" onClick={handleMobileMenu}>
            <img src={navbarMenu} alt="" />
          </section>
        </section>

        {/* Mobile links */}
        <section
          className={showMobileMenu ? "show_mobile_menu" : "mobile_links"}
        >
          <section className="close_mobile_menu">
            <i className="fas fa-times" onClick={handleMobileMenu}></i>
          </section>
          <section className="mobile_navbar_links_container">
            <ul>
              <li>
                <Link to="/">
                  <section
                    className="mobile_navbar_link"
                    onClick={() => setShowMobileMenu((prev) => !prev)}
                  >
                    Home
                  </section>
                </Link>
              </li>
              <li>
                <Link to="/shop">
                  <section
                    className="mobile_navbar_link"
                    onClick={() => setShowMobileMenu((prev) => !prev)}
                  >
                    Shop
                  </section>
                </Link>
              </li>
              <li>
                <button onClick={() => setToggleProductCart(true)}>
                  <section
                    className="mobile_navbar_link"
                    onClick={() => setShowMobileMenu((prev) => !prev)}
                  >
                    Cart
                  </section>
                  {cart.length !== 0 && (
                    <section className="mobile_cart_length">
                      {numberOfProducts}
                    </section>
                  )}
                </button>
              </li>
              {!userToken ? (
                <li className="signin">
                  <Link to="/login" className="signin">
                    <section
                      className="mobile_navbar_link"
                      onClick={() => setShowMobileMenu((prev) => !prev)}
                    >
                      Sign in
                    </section>
                  </Link>
                </li>
              ) : (
                <section
                  className="btnToggle_profile"
                  onClick={() => setShowUserNavbarModal((prev) => !prev)}
                >
                  <section className="user_profile">
                    <Profile image={user.user_image} fullname={user.fullname} />
                  </section>
                  {showUserNavbarModal && (
                    <MobileUserNavbarModal
                      id={user.id}
                      logout={handleLogout}
                      user_image={user.user_image}
                      fullname={user.fullname}
                      setShowMobileMenu={setShowMobileMenu}
                    />
                  )}
                </section>
              )}
            </ul>
          </section>
        </section>

        {/* Links */}
        <section className="links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <button onClick={() => setToggleProductCart(true)}>
                Cart
                {cart.length !== 0 && (
                  <section className="cart_length">{numberOfProducts}</section>
                )}
              </button>
            </li>
            <li>
              <button
                type="button"
                className="search_btn"
                onClick={() => setShowSearchBar(true)}
              >
                <i className="fas fa-search"></i>
              </button>
            </li>
            {!userToken ? (
              <li className="signin">
                <Link to="/login" className="signin">
                  Sign in
                </Link>
              </li>
            ) : (
              <section
                className="btnToggle_profile"
                onClick={() => setShowUserNavbarModal((prev) => !prev)}
              >
                <section className="user_profile">
                  <Profile image={user.user_image} fullname={user.fullname} />
                </section>
                {showUserNavbarModal && (
                  <UserNavbarModal
                    id={user.id}
                    logout={handleLogout}
                    user_image={user.user_image}
                    fullname={user.fullname}
                  />
                )}
              </section>
            )}
          </ul>
        </section>
      </header>
    </div>
  );
};

export default Navbar;
