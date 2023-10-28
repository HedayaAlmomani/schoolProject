import React from "react";
import "./style.scss";
import { sectionIcon, arrowRight } from "../../icons";
import SVG from "react-inlinesvg";

const LandingPage = () => {
  const sections = [
    { sectionName: "section A" },
    { sectionName: "section B" },
    { sectionName: "section C" },
    { sectionName: "section D" },
    { sectionName: "section E" },
    { sectionName: "section F" },
  ];
  return (
    <div className="landing-page-container">
      <div className="sections-container">
        {sections?.map((item) => {
          return (
            <div className="section-name">
              <SVG
                className="section-icon"
                height={50}
                width={50}
                src={sectionIcon}
              />
              <span>{item.sectionName}</span>
              <SVG
                className="arrow-right"
                height={30}
                width={30}
                src={arrowRight}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;
