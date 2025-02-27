"use client";
import React from "react";
import { Layout, theme } from "antd";
import TopNavBar from "./topNavBar";
import FooterPart from "./FooterPart";
import { Provider } from "react-redux";
import store from "@/lib/store";
const { Header, Content, Footer } = Layout;

const NavLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Provider store={store}>
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
            }}>
            <TopNavBar />
          </Header>
          <Content>
            <div
              style={{
                padding: 24,
                minHeight: 380,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}>
              {children}
            </div>
          </Content>
          <FooterPart />
        </Layout>
      </Provider>
    </>
  );
};

export default NavLayout;
