"use client";
import "@ant-design/v5-patch-for-react-19";
import React, { useState } from "react";
import {
  CaretRightOutlined,
  CopyFilled,
  EditFilled,
  EyeFilled,
  LikeFilled,
  PlusSquareFilled,
  ShareAltOutlined,
  BorderOutlined,
  CheckSquareFilled,
  LikeOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Radio,
  Tooltip,
  Divider,
  Menu,
  Row,
  Col,
  Typography,
} from "antd";

import { useSelector } from "react-redux";
import MCQDescCard from "./MCQDescCard";
const {  Title, } = Typography;

const MCQCard = ({ data }) => {
  const user = useSelector((user) => user.loginSlice.login);
  const [showDes, setShowDes] = useState(false);
  const likeExist = data?.like?.some((l) => l == user?._id);
  const [liked, setLiked] = useState(likeExist);
  const [likeCount, setLikeCount] = useState(data?.like.length);

  // Card Menu
  const onClick = (e) => {
    console.log("click ", e);
  };
  const menutItem = [
    {
      key: "discription",
      icon: (
        <Tooltip title="ডিস্ক্রিপশন যুক্ত করুন">
          <PlusSquareFilled style={{ marginRight: "5px" }} /> Dis.
        </Tooltip>
      ),
    },
    {
      key: "edit",
      icon: (
        <Tooltip title="সংশোধন">
          <EditFilled style={{ marginRight: "5px" }} /> Edit
        </Tooltip>
      ),
    },
    {
      key: "copy",
      icon: (
        <Tooltip title="কপি">
          <CopyFilled style={{ marginRight: "5px" }} />
          Copy
        </Tooltip>
      ),
    },
  ];
  // like server enviroment
  const postLike = async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/mcq/mcqlike`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    console.log(likeData);

    try {
      likeData && (await postLike(likeData));
      setLiked(true);
      setLikeCount(likeCount + 1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Card style={{ marginBottom: "10px" }}>
        <div>
          <Row justify="space-between">
            <Col xs={24} md={18}>
              <div>
                <Title level={5} style={{ margin: "0" }}>
                  <span
                    dangerouslySetInnerHTML={{ __html: data?.question }}></span>
                </Title>
              </div>
            </Col>
            <Col xs={24} md={6}>
              <Menu
                onClick={onClick}
                mode="horizontal"
                items={menutItem}
                style={{ justifyContent: "flex-end" }}
              />
            </Col>
          </Row>
        </div>
        <Divider style={{ margin: "10px 0" }} />
        <div>
          <Row>
            {data?.options.map((opt, k) => (
              <Col
                key={k}
                span={12}
                style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                {k === data?.ans ? (
                  <CheckSquareFilled style={{ color: "green" }} />
                ) : (
                  <BorderOutlined />
                )}
                <span
                  dangerouslySetInnerHTML={{
                    __html: opt,
                  }}
                />
              </Col>
            ))}
          </Row>
          <div style={{ marginTop: "20px", display: "flex", gap: "5px" }}>
            {data?.tag.map((tag, j) => (
              <Button key={j} color="cyan" variant="outlined" size="small">
                <span dangerouslySetInnerHTML={{ __html: tag?.name }} />
              </Button>
            ))}
          </div>
          <Divider style={{ margin: "20px 0" }} />
          <div>
            <Flex justify="space-between">
              <div>
                <Button
                  color="primary"
                  variant="link"
                  size="small"
                  onClick={() => setShowDes(!showDes)}>
                  <strong>Des.</strong>
                  <CaretRightOutlined />
                </Button>
              </div>
              <Flex gap={10}>
                <span style={{ gap: "2px" }}>
                  <EyeFilled /> <strong>{data?.views}</strong>
                </span>
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
                    style={{ gap: "2px", alignItems: "baseline" }}>
                    <LikeOutlined /> {likeCount}
                  </Button>
                )}
                <Button
                  color="default"
                  variant="link"
                  size="small"
                  style={{ gap: "2px" }}>
                  <ShareAltOutlined />
                </Button>
              </Flex>
            </Flex>
          </div>
          {showDes && (
            <>
              <div>
                <Card type="inner" style={{ backgroundColor: "#fafafa" }}>
                  {data?.des?.map((desc, d) => (
                    <div key={d}>
                      <MCQDescCard data={desc} />
                    </div>
                  ))}
                </Card>
              </div>
            </>
          )}
        </div>
      </Card>
    </>
  );
};

export default MCQCard;
