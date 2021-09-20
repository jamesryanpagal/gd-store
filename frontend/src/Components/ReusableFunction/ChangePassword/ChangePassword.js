import React, { useState } from "react";
import { axiosConfig } from "../AxiosConfig/AxiosConfig";

//function
import Spinner from "../../SmallSpinner/Spinner";

//css
import "./ChangePassword.css";

const ChangePassword = ({ id, setToggleChangePassword }) => {
  const [updates, setUpdates] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [resMessage, setResMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdates((prev) => ({ ...prev, [name]: value }));
  };

  const handleCpOnFocus = (e) => {
    const target = e.target.parentElement;
    target.children[0].className = "Cp_inputFocus";
  };

  const handleCpOnBlur = (e) => {
    const target = e.target.parentElement;
    if (target.children[1].value) {
      target.children[0].className = "Cp_inputFocus";
      return;
    }
    target.children[0].className = "input_label";
  };

  const handleUpdateChangePassword = async () => {
    const reqData = {
      old_password: updates.old_password,
      new_password: updates.new_password,
      confirm_password: updates.confirm_password,
      id,
    };

    try {
      setLoading(true);
      const { data } = await axiosConfig.post("/users/changePassword", reqData);

      if (data.error) {
        setResMessage(
          <section className="Cp_res_error">
            <span className="text-danger">
              {data.Message}
              <i className="fas fa-exclamation-circle px-1"></i>
            </span>
          </section>
        );
        setLoading(false);
        return;
      }
      setResMessage(
        <section className="Cp_res_success">
          <span className="text-success">
            {data.Message}
            <i className="fas fa-check px-1"></i>
          </span>
        </section>
      );
      setLoading(false);
      window.location.reload();
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="change_password_container">
      <section className="change_password_form">
        <section className="show_change_password_error">{resMessage}</section>

        <section className="title">
          <span>Change Password</span>
        </section>

        <section className="Cp_input_container">
          <label htmlFor="old_password" className="input_label">
            Old Password
          </label>
          <input
            value={updates.old_password}
            type="password"
            name="old_password"
            id="old_password"
            onChange={handleChangePassword}
            onFocus={handleCpOnFocus}
            onBlur={handleCpOnBlur}
          />
        </section>

        <section className="Cp_input_container">
          <label htmlFor="new_password" className="input_label">
            New Password
          </label>
          <input
            value={updates.new_password}
            type="password"
            name="new_password"
            id="new_password"
            onChange={handleChangePassword}
            onFocus={handleCpOnFocus}
            onBlur={handleCpOnBlur}
          />
        </section>

        <section className="Cp_input_container">
          <label htmlFor="confirm_password" className="input_label">
            Confirm Password
          </label>
          <input
            value={updates.confirm_password}
            type="password"
            name="confirm_password"
            id="confirm_password"
            onChange={handleChangePassword}
            onFocus={handleCpOnFocus}
            onBlur={handleCpOnBlur}
          />
        </section>

        <section
          className={
            loading ? "displable_change_password" : "submit_change_password"
          }
        >
          <button
            className="change_password_back"
            type="button"
            onClick={() => setToggleChangePassword((prev) => !prev)}
          >
            Back
          </button>
          <button
            className="update_change_password"
            onClick={handleUpdateChangePassword}
            type="button"
          >
            {loading ? <Spinner /> : "Update"}
          </button>
        </section>
      </section>
    </div>
  );
};

export default ChangePassword;
