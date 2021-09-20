import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosConfig } from "../ReusableFunction/AxiosConfig/AxiosConfig";

//redux actions
import { userTokenActions } from "../../Redux/Actions/user_Actions";

//component
import Spinner from "../SmallSpinner/Spinner";

//css
import "./Signup.css";

const Signup = ({ history }) => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    username: "",
    user_type: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [processing, setProccessing] = useState(false);

  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.User);

  useEffect(() => {
    let mounted = true;
    if (userToken) {
      if (mounted) {
        history.push("/");
      }
    }

    return () => {
      mounted = false;
    };
  }, [history, userToken]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleInputFocus = (e) => {
    const target = e.target.parentElement;
    target.children[0].className = "inputFocus";
  };

  const handleInputBlur = (e) => {
    const target = e.target.parentElement;

    if (target.children[1].value) {
      target.children[0].className = "inputFocus";
      return;
    }

    target.children[0].className = "input_label";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.username.includes("Admin_")) {
      if (user.username.indexOf("Admin_") !== 0) {
        user.user_type = "Customer";
      } else {
        user.user_type = "Admin";
      }
    } else if (user.username.includes("Rider_")) {
      if (user.username.indexOf("Rider_") !== 0) {
        user.user_type = "Customer";
      } else {
        user.user_type = "Rider";
      }
    } else {
      user.user_type = "Customer";
    }

    try {
      setProccessing(true);
      const { data } = await axiosConfig.post("/users/signup", user);

      if (data.error) {
        setError(
          <span className="text-danger">
            {data.message}
            <i className="fas fa-exclamation-circle mx-2"></i>
          </span>
        );
        setProccessing(false);
        return;
      }

      dispatch(userTokenActions(data));
      setError("");
      setProccessing(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signin_form_container">
      <form className="form" onSubmit={handleSubmit}>
        <section className="name">
          <span>Signin</span>
        </section>

        <Link to="/" className="btn_exit rounded-circle">
          <i className="fas fa-times"></i>
        </Link>

        {error && <section className="error_msg">{error}</section>}

        <section className="input_Group">
          {/* Fullname */}
          <section className="input_container">
            <label className="input_label" htmlFor="fullname">
              <span>Fullname</span>
            </label>
            <input
              id="fullname"
              type="text"
              name="fullname"
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </section>

          {/* Username */}
          <section className="input_container">
            <label className="input_label" htmlFor="username">
              <span>Username</span>
            </label>
            <input
              id="username"
              type="text"
              name="username"
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </section>
        </section>

        <section className="input_Group">
          {/* Email address */}
          <section className="input_container">
            <label className="input_label" htmlFor="email">
              <span>Email address</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </section>
        </section>

        <section className="input_Group">
          {/* Password */}
          <section className="input_container">
            <label className="input_label" htmlFor="password">
              <span>Password</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </section>

          {/* Confirm Password */}
          <section className="input_container">
            <label className="input_label" htmlFor="confirm_password">
              <span>Confirm password</span>
            </label>
            <input
              id="confirm_password"
              type="password"
              name="confirm_password"
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </section>
        </section>

        <section className="input_container">
          <button
            className={processing ? "disabled_sign_up" : "signup_btn"}
            type="submit"
          >
            {processing ? <Spinner /> : "Register"}
          </button>
        </section>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
