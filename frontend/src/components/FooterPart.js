import { Footer } from "antd/es/layout/layout";
import React from "react";

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
