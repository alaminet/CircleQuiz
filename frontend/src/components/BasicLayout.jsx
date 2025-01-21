import React, { useState } from "react";
import {
  AntDesignOutlined,
  FileSearchOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import moment from "moment";
import {
  Avatar,
  Col,
  Layout,
  Menu,
  message,
  Row,
  theme,
  Typography,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loginuser } from "../features/userSlice";
const { Title, Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const items = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "result",
    icon: <FileSearchOutlined />,
    label: "Result",
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Logout",
  },
];
const BasicLayout = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("");
  const handleMenu = (e) => {
    if (e.key === "logout") {
      message.warning("logout");
      localStorage.removeItem("user");
      dispatch(Loginuser(null));
      navigate("/");
    } else {
      setCurrent(e.key);
      navigate(e.key);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        className="no-print"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}>
        {/* <div>
          <p style={{ color: "white" }}>logo</p>
        </div> */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[current]}
          defaultSelectedKeys={["/"]}
          items={items}
          onClick={handleMenu}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}>
          <Row
            justify="space-between"
            align="middle"
            style={{ padding: "0 10px" }}>
            <Col xs={20} style={{ overflow: "hidden" }}>
              <Typography>
                <Title
                  level={3}
                  style={{
                    margin: 0,
                    color: "#1C1C1C",
                  }}>
                  Hello; {user.username}
                </Title>
                <Text type="secondary" style={{ textWrap: "nowrap" }}>
                  {moment(new Date()).format("[Today is] dddd, MMMM Do YYYY")}
                </Text>
              </Typography>
            </Col>
            <Col xs={4} style={{ textAlign: "right" }}>
              <Avatar
                size={{
                  xs: 40,
                  lg: 48,
                  xl: 50,
                }}
                icon={<AntDesignOutlined />}
              />
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}>
          CircleQuiz ©{new Date().getFullYear()} Created by CircleThemeBD
        </Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
