import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

//functions
import Profile from "../../ReusableFunction/Profile/Profile";
import getId from "../../ReusableFunction/GetUserId/GetUserId";
import ChangePassword from "../../ReusableFunction/ChangePassword/ChangePassword";
import ChangeProfileImage from "../../ReusableFunction/ChangeProfileImage/ChangeProfileImage";
import ChangeDetails from "../../ReusableFunction/ChangeDetails/ChangeDetails";

//css
import "./EditAdmin.css";

const Options = ({
  setToggleChangePassword,
  setDropDownOptions,
  setToggleChangeProfileImage,
  setToggleChangeDetails,
  userType,
}) => {
  const handleShowChangePassword = () => {
    setToggleChangePassword((prev) => !prev);
    setDropDownOptions((prev) => !prev);
  };

  const handleShowChangeProfile = () => {
    setToggleChangeProfileImage((prev) => !prev);
    setDropDownOptions((prev) => !prev);
  };

  const handleShowChangeDetails = () => {
    setToggleChangeDetails((prev) => !prev);
    setDropDownOptions((prev) => !prev);
  };

  return (
    <div className="options_container">
      <button type="button" onClick={handleShowChangeDetails}>
        Change details
      </button>
      <button type="button" onClick={handleShowChangeProfile}>
        Change profile
      </button>
      {userType !== "GUser" ? (
        <button type="button" onClick={handleShowChangePassword}>
          Change password
        </button>
      ) : null}
    </div>
  );
};

//Main

const EditAdmin = ({ history }) => {
  // admin state
  const [admin, setAdmin] = useState({});

  //toggle options
  const [dropDownOptions, setDropDownOptions] = useState(false);

  //toggle changepassword
  const [toggleChangePassword, setToggleChangePassword] = useState(false);

  //toggle changeprofleimage
  const [toggleChangeProfileImage, setToggleChangeProfileImage] =
    useState(false);

  //toggle changedetails
  const [toggleChanageDetails, setToggleChangeDetails] = useState(false);

  const { userToken } = useSelector((state) => state.User);

  const { id } = useParams();

  useEffect(() => {
    if (!userToken) {
      history.go(-1);
    }
  }, [history, userToken]);

  useEffect(() => {
    const getUser = () => {
      const admin = getId(id);
      admin.then((res) => {
        setAdmin({ ...res });
      });
    };
    getUser();
  }, [id]);

  return (
    <div className="admin_profile_container">
      {/* Change Password */}
      {toggleChangePassword && (
        <ChangePassword
          id={id}
          setToggleChangePassword={setToggleChangePassword}
        />
      )}
      {/* Change Profile */}
      {toggleChangeProfileImage && (
        <ChangeProfileImage
          id={id}
          image={admin.user_image}
          fullname={admin.fullname}
          setToggleChangeProfileImage={setToggleChangeProfileImage}
        />
      )}
      {/* Change Details */}
      {toggleChanageDetails && (
        <ChangeDetails
          id={id}
          fullname={admin.fullname}
          email={admin.email}
          username={admin.username}
          setToggleChangeDetails={setToggleChangeDetails}
        />
      )}

      {/* Admin Profile Image */}
      <section className="admin_profile_image_container">
        <section className="profile_image">
          <Profile image={admin.user_image} fullname={admin.fullname} />
          <section className="admin_username">{admin.username}</section>
        </section>
      </section>
      {/* Admin details */}
      <form className="admin_details_form">
        {/* Options */}
        <section className="options">
          <button type="button" onClick={() => history.go(-1)}>
            <i className="fas fa-times"></i>
          </button>
          <button
            type="button"
            onClick={() => setDropDownOptions((prev) => !prev)}
          >
            <i className="fas fa-cog"></i>
          </button>
        </section>
        {dropDownOptions && (
          <Options
            setDropDownOptions={setDropDownOptions}
            setToggleChangePassword={setToggleChangePassword}
            setToggleChangeProfileImage={setToggleChangeProfileImage}
            setToggleChangeDetails={setToggleChangeDetails}
            userType={admin.user_type}
          />
        )}
        {/* Fullname */}
        <section className="admin_details_container">
          <span className="label">Fullname</span>
          <span className="details">{admin.fullname}</span>
        </section>

        {/* Email */}
        <section className="admin_details_container">
          <span className="label">Email</span>
          <span className="details">{admin.email}</span>
        </section>

        {/* Username */}
        <section className="admin_details_container">
          <span className="label">Username</span>
          <span className="details">{admin.username}</span>
        </section>

        {/* UserType */}
        <section className="admin_details_container">
          <span className="label">Type</span>
          <span className="details">{admin.user_type}</span>
        </section>
      </form>
    </div>
  );
};

export default EditAdmin;
