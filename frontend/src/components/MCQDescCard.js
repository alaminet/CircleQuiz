"use client";
import "@ant-design/v5-patch-for-react-19";
import React, { useState } from "react";
import { EditTwoTone, LikeFilled, LikeOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Flex,
  Row,
  Col,
  Typography,
  Tooltip,
  Modal,
  message,
} from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
const CustomEditor = dynamic(() => import("@/components/CustomEditor"), {
  ssr: false,
});
const { Text, Paragraph } = Typography;

const MCQDescCard = ({ data }) => {
  const user = useSelector((user) => user.loginSlice.login);
  const likeExist = data?.like?.some((l) => l == user?._id);
  const [liked, setLiked] = useState(likeExist);
  const [likeCount, setLikeCount] = useState(data?.like.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState(data?.post);
  // like server enviroment
  const postLike = async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/mcq/desclike`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  };

  // MCQ like Handeller
  const handleMCQLike = async () => {
    const likeData = { postID: data._id, likedID: user._id };

    try {
      const res = likeData && (await postLike(likeData));
      console.log(res);
      setLiked(true);
      setLikeCount(likeCount + 1);
    } catch (error) {
      console.log(error);
    }
  };

  // like server enviroment
  const postUpdate = async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/mcq/desupdate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const updateData = { postID: data?._id, post: details };
    const res = await postUpdate(updateData);
    setIsModalOpen(false);
    res && message.success(res?.message);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div>
        <Paragraph>
          <blockquote>
            <div>
              <Flex align="center" gap={10}>
                <Avatar
                  size={{
                    xs: 24,
                    sm: 24,
                  }}
                  style={{
                    backgroundColor: "#fde3cf",
                    color: "#f56a00",
                  }}
                  // icon={<AntDesignOutlined />}
                >
                  {data.posted?.userImg || data.posted?.name.charAt(0)}
                </Avatar>
                <Flex justify="space-between" align="center">
                  <Text>{data.posted?.name} |</Text>
                  <Text
                    style={{
                      display: "block",
                      fontSize: "12px",
                      color: "gray",
                    }}
                  >
                    {moment(data.createdAt).fromNow()}
                  </Text>
                  {user._id === data.posted?._id && (
                    <Tooltip title="সংশোধন" onClick={handleEdit}>
                      <EditTwoTone style={{ marginLeft: "5px" }} />
                    </Tooltip>
                  )}
                </Flex>
              </Flex>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: details || data.post,
              }}
            />
            <Row>
              <Col>
                <Flex gap={10}>
                  {liked ? (
                    <span style={{ color: "#1677ff" }}>
                      <LikeFilled /> {likeCount}
                    </span>
                  ) : (
                    <Button
                      color="primary"
                      variant="link"
                      size="small"
                      onClick={handleMCQLike}
                      style={{ gap: "2px", alignItems: "baseline" }}
                    >
                      <LikeOutlined /> {likeCount}
                    </Button>
                  )}
                </Flex>
              </Col>
            </Row>
          </blockquote>
        </Paragraph>
      </div>
      <div>
        <Modal
          title="Edit Details"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <CustomEditor defaultData={data?.post} onChange={setDetails} />
        </Modal>
      </div>
    </>
  );
};

export default MCQDescCard;
