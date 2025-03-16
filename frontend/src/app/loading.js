import { Flex, Skeleton, Spin } from "antd";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <Flex gap="middle" vertical>
        <Spin size="large" />
        {/* <p>loading...</p>
        <Skeleton active /> */}
      </Flex>
    </>
  );
}
