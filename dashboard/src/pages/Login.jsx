import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, Row, Col, message } from "antd";
import { useDispatch } from "react-redux";
import { Loginuser } from "../features/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    try {
      // const userData = await axios.post(
      //   `${import.meta.env.VITE_API_URL}/v1/api/auth/login`,
      //   {
      //     userID: values.userID,
      //     password: values.password,
      //   },
      //   {
      //     headers: {
      //       Authorization: import.meta.env.VITE_SECURE_API_KEY,
      //     },
      //   }
      // );
      const userData = {
        username: values.username,
        password: values.password,
      };
      message.success("Successfully Login");
      dispatch(Loginuser(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      setLoadings(false);
    } catch (error) {
      message.error(error.response.data.error);
      setLoadings(false);
    }
  };
  return (
    <>
      <Row justify="center" style={{ paddingTop: "100px" }}>
        <Col span={20}>
          <h1 style={{ textAlign: "center" }}>Login Your Account</h1>
          <Form
            name="login"
            initialValues={{
              remember: true,
            }}
            style={{
              maxWidth: 360,
              margin: "0 auto",
            }}
            onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}>
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}>
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              or <a href="">Register now!</a>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
