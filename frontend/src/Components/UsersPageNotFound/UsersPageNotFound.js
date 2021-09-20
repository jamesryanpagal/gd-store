import React, { useEffect } from "react";

//loader
import Loader from "../Loader/Loader";

//css
import "./UsersPageNotFound.css";

const UsersPageNotFound = ({ history }) => {
  useEffect(() => {
    history.push("/");
  }, [history]);

  return (
    <div className="PageNotFound_container">
      <Loader />
    </div>
  );
};

export default UsersPageNotFound;
