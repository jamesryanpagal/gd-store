import React from "react";
import { Link } from "react-router-dom";

//image
import dashboardImage from "../../PublicImages/homepageimg.png";

//css
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard_container">
      <section className="dashboard_text">
        <p className="first_text">
          Welcome to <span>Pag's</span>
        </p>
        <p className="first_text">Gadget Store!</p>
        <p className="second_text">Shop for our best and latest</p>
        <p className="second_text">Gadgets at the best price</p>
        <Link to="/shop">Shop now</Link>
      </section>
      <section className="dashboard_image">
        <svg
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="100%"
          id="blobSvg"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "rgb(219, 0, 255)" }}
              ></stop>
              <stop
                offset="100%"
                style={{ stopColor: "rgb(198, 135, 135)" }}
              ></stop>
            </linearGradient>
          </defs>
          <path
            id="blob"
            d="M399,293.5Q354,337,313.5,358.5Q273,380,200.5,420.5Q128,461,100,388Q72,315,44.5,240Q17,165,86.5,126.5Q156,88,215,101Q274,114,328,126.5Q382,139,413,194.5Q444,250,399,293.5Z"
            fill="url(#gradient)"
          ></path>
        </svg>
        <img src={dashboardImage} alt=" " />
        {/* Mobile View */}
        <section className="dashboard_image_text">
          <p>Shop for our best and latest</p>
          <p>Gadgets at the best price</p>
          <Link to="/shop">Shop now</Link>
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
