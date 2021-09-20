import React from "react";

//css
import "./Profile.css";

const Profile = ({ image, fullname, preview }) => {
  return (
    <div className="profile_container">
      {image && (
        <>
          {image === "No Image" ? (
            <>
              {preview ? (
                <img src={preview} alt=" " />
              ) : (
                <span>{fullname[0]}</span>
              )}
            </>
          ) : (
            <img src={preview ? preview : image} alt=" " />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
