import React from "react";
import {
  FacebookOutlined,
  GoogleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";

const LoginModal = () => {
  return (
    <>
      <Flex gap={20} justify="center" align="center">
        <Tooltip title="Google">
          <Button type="primary" icon={<GoogleOutlined />}>
            Google
          </Button>
        </Tooltip>
        <Tooltip title="Facebook">
          <Button type="primary" icon={<FacebookOutlined />}>
            Facebook
          </Button>
        </Tooltip>
      </Flex>
    </>
  );
};

export default LoginModal;
