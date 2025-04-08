import React from "react";
import { Footer } from "antd/es/layout/layout";

const FooterPart = () => {
  return (
    <>
      <Footer
        style={{
          textAlign: "center",
        }}>
        Circle Academy ©{new Date().getFullYear()} Developed by CircleThemeBD
      </Footer>
    </>
  );
};

export default FooterPart;
