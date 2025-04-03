import React from "react";
import { Flex, Skeleton, Spin } from "antd";
const loading = () => {
  return (
    <>
      <Flex gap="middle" vertical>
        <Spin size="large" />
        {/* <p>loading...</p>
        <Skeleton active /> */}
      </Flex>
    </>
  );
};

export default loading;
