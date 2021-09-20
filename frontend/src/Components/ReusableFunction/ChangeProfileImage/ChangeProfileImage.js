import React, { useState } from "react";
import axiosConfig from "../AxiosConfig/AxiosConfig";

//functions
import Profile from "../Profile/Profile";
import Spinner from "../../SmallSpinner/Spinner";

//css
import "./ChangeProfileImage.css";

const ChangeProfileImage = ({
  id,
  image,
  fullname,
  setToggleChangeProfileImage,
}) => {
  const [file, setFile] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUploadFile = (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setFilePreview(fileReader.result);
        setFile(e.target.files[0]);
      }
    };
  };

  const handleProfileUpdate = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Ecommerce_Users");

    try {
      setLoading(true);
      const uploadImage = await axiosConfig.post(
        "https://api.cloudinary.com/v1_1/dfwa3kop9/image/upload",
        formData
      );

      await axiosConfig.patch("/users/updateUserProfileImage/" + id, {
        user_image: uploadImage.data.url,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="change_profile_container">
      <section className="change_profile_image_container">
        <section
          className="change_profile_image_exit"
          onClick={() => setToggleChangeProfileImage((prev) => !prev)}
        >
          <i className="fas fa-times"></i>
        </section>
        <Profile image={image} fullname={fullname} preview={filePreview} />
        <section className="change_profile_icon">
          <label htmlFor="change_profile">
            Change Profile
            <i className="fas fa-upload mx-2"></i>
          </label>
          <input type="file" id="change_profile" onChange={handleUploadFile} />
          <section
            className={
              !file
                ? "disable_On_Update"
                : loading
                ? "disable_On_Update"
                : "update_profile"
            }
          >
            <button type="button" onClick={handleProfileUpdate}>
              {loading ? <Spinner /> : "Upload Image"}
            </button>
          </section>
        </section>
      </section>
    </div>
  );
};

export default ChangeProfileImage;
