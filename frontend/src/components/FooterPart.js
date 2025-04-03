import React from "react";
import { Footer } from "antd/es/layout/layout";

const FooterPart = () => {
  return (
    <>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Circle Academy ©{new Date().getFullYear()} Created by CircleThemeBD
      </Footer>
    </>
  );
};

export default FooterPart;
