import React from "react";
import { Flex, Spin } from "antd";
const Loading = () => {
  return (
    <>
      <Flex gap="middle" vertical>
        <Spin size="large" />
      </Flex>
    </>
  );
};

export default Loading;
