import React, { useState } from "react";
import { axiosConfig } from "../AxiosConfig/AxiosConfig";

//loader
import Spinner from "../../SmallSpinner/Spinner";

//css
import "./ChangeDetails.css";

const ChangeDetails = ({
  id,
  fullname,
  email,
  username,
  setToggleChangeDetails,
}) => {
  const [userDetails, setUserDetails] = useState({
    id,
    fullname,
    email,
    username,
  });

  const [resMessage, setResMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeDetails = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axiosConfig.patch(
        "/users/editUserProfileDetails/" + id,
        {
          fullname: userDetails.fullname,
          email: userDetails.email,
          username: userDetails.username,
        }
      );

      if (data.error) {
        setResMessage(
          <section className="res_error">
            <span className="text-danger">
              {data.Message}
              <i className="fas fa-exclamation-circle mx-2"></i>
            </span>
          </section>
        );
        setLoading(false);
        return;
      }

      if (data.codeName === "DuplicateKey" && data.keyPattern.email === 1) {
        setResMessage(
          <section className="res_error">
            <span className="text-danger">
              Email address already been taken
              <i className="fas fa-exclamation-circle mx-2"></i>
            </span>
          </section>
        );
        setLoading(false);
        return;
      }

      if (data.codeName === "DuplicateKey" && data.keyPattern.username === 1) {
        setResMessage(
          <section className="res_error">
            <span className="text-danger">
              Username already been taken
              <i className="fas fa-exclamation-circle mx-2"></i>
            </span>
          </section>
        );
        setLoading(false);
        return;
      }
      setResMessage(
        <section className="res_success">
          <span className="text-success">
            {data.Message}
            <i className="fas fa-check-circle mx-2"></i>
          </span>
        </section>
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="change_details_container">
      <form className="form" onSubmit={handleSubmitDetails}>
        {/* Response Message */}
        <section className="res_message">{resMessage}</section>

        {/* Tittle */}
        <section className="details_title">
          <span>Change Details</span>
        </section>

        {/* Fullname */}
        <section className="details_input_container">
          <label htmlFor="fullname" className="change_details_label">
            Fullname
          </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={userDetails.fullname}
            onChange={handleChangeDetails}
          />
        </section>

        {/* Email */}
        <section className="details_input_container">
          <label htmlFor="email" className="change_details_label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={userDetails.email}
            onChange={handleChangeDetails}
          />
        </section>

        {/* Username */}
        <section className="details_input_container">
          <label htmlFor="username" className="change_details_label">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={userDetails.username}
            onChange={handleChangeDetails}
          />
        </section>

        {/* Button */}
        <section
          className={
            loading ? "disable_update_details" : "details_btn_container"
          }
        >
          <button
            type="button"
            onClick={() => setToggleChangeDetails((prev) => !prev)}
          >
            Back
          </button>
          <button type="submit">{loading ? <Spinner /> : "Update"}</button>
        </section>
      </form>
    </div>
  );
};

export default ChangeDetails;
