import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../ReusableFunction/AxiosConfig/AxiosConfig";

//redux actions
import { userTokenActions } from "../../Redux/Actions/user_Actions";

//component
import Spinner from "../SmallSpinner/Spinner";

//css
import "./Login.css";

const Login = ({ history }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [proccessing, setProccessing] = useState(false);

  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.User); //Fix login token

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

  const handleGoogleSuccess = async (res) => {
    const { profileObj, tokenId } = res;

    try {
      const { data } = await axiosConfig.post("/users/googleLogin", {
        tokenId,
        profileObj,
      });
      dispatch(userTokenActions(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoogleFailed = (res) => {
    console.log(res);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      setProccessing(true);
      const { data } = await axiosConfig.post("/users/login", user, config);

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
    <div className="login_form_container">
      <form className="form" onSubmit={handleSubmit}>
        <section className="name">
          <span>Login</span>
        </section>

        <Link to="/" className="btn_exit rounded-circle">
          <i className="fas fa-times"></i>
        </Link>

        {error && <section className="error_msg">{error}</section>}

        <section className="google_login_container">
          <GoogleLogin
            clientId="93702015471-21t26mneagpneevhg0spjnot5b0pk04n.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailed}
            cookiePolicy={"single_host_origin"}
          />
        </section>

        <section className="input_container">
          <label htmlFor="email" className="input_label">
            <span>Email address</span>
          </label>
          <input
            id="email"
            type="text"
            name="email"
            onChange={handleChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </section>

        <section className="input_container">
          <label htmlFor="password" className="input_label">
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

        <section className="input_container">
          <button
            type="submit"
            className={proccessing ? "disabled_login_btn" : "login_btn"}
          >
            {proccessing ? <Spinner /> : "Login"}
          </button>
        </section>
        <section className="dont_have_account">
          Don't have an account? <Link to="/Signup">Signin</Link>
        </section>
      </form>
    </div>
  );
};

export default Login;
