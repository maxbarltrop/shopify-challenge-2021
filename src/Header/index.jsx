import React from "react";
import SPOTLIGHT_ICON from "../assets/spotlight.svg";
import RESUME from "../assets/BarltropMaxwellResume.pdf";
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
    <div className="page-header">
      {icon()}The Shoppies{icon()}
      <div className="page-sub-header">
        Shopify Fall Internship Challenge - Frontend Developer
        <br />
        <a
          href={RESUME}
          alt="Resume Download"
          download
          className="resume-download"
        >
          Maxwell Barltrop
        </a>
      </div>
    </div>
  );
};

export default Header;
