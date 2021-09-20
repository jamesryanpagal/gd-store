import React from "react";

//css
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loading_container">
      <section className="line_Container">
        <section className="first_Line"></section>
        <section className="under_Line"></section>
      </section>
    </div>
  );
};

export default Loader;
