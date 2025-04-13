import React from "react";

const SectionTitle = ({ subTitle, titleOne, titleTwo }) => {
  return (
    <>
      <div>
        <p style={{ fontSize: "18px", margin: "0" }}>{subTitle}</p>
        <h2 style={{ fontSize: "48px" }}>
          {titleOne} <span style={{ color: "#f05c5c" }}>{titleTwo}</span>
        </h2>
      </div>
    </>
  );
};

export default SectionTitle;
