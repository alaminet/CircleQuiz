"use client";
import React from "react";
import { Layout, theme } from "antd";
import TopNavBar from "./topNavBar";
import FooterPart from "./FooterPart";
const { Header, Content, Footer } = Layout;

const NavLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            background: "white",
          }}
        >
          <TopNavBar />
        </Header>
        <Content
          
        >
          <div
            style={{
              padding: 24,
              minHeight: 380,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <FooterPart/>
      </Layout>
    </>
  );
};

export default NavLayout;
