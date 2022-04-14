import React from "react";
import SPOTLIGHT_ICON from "../assets/spotlight.svg";
const Header = () => {
  const icon = () => {
    return (
      <img
        src={SPOTLIGHT_ICON}
        alt={"Spotlight Icon"}
        className="page-header__icon"
      />
    );
  };

  return (
    <React.Fragment>
      <div className="page-header">
        {icon()}The Shoppies{icon()}
      </div>
      <div className="page-sub-header">
        Shopify Fall Internship Challenge - Frontend Developer
        <br />
        <span>
          Maxwell Barltrop
        </span>
      </div>
    </React.Fragment>
  );
};

export default Header;
