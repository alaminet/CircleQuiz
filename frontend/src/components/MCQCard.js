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
  AntDesignOutlined,
  DislikeOutlined,
  BorderOutlined,
  CheckCircleTwoTone,
  CheckCircleFilled,
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
import {
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useSelector } from "react-redux";
const { Text, Title, Paragraph } = Typography;
const { Group } = Radio;

const MCQCard = ({ data }) => {
  const user = useSelector((user) => user.loginSlice.login);
  const [showDes, setShowDes] = useState(false);
  const likeExist = data?.like?.some((l) => l == user?._id);

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
              <div>
                <Button
                  color="default"
                  variant="link"
                  size="small"
                  style={{ gap: "2px" }}>
                  <EyeFilled /> <strong>{data?.views}</strong>
                </Button>
                {likeExist ? (
                  <Button
                    color="primary"
                    variant="link"
                    size="small"
                    style={{ gap: "2px" }}>
                    <LikeFilled /> {data?.like.length}
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="link"
                    size="small"
                    onClick={handleMCQLike}
                    style={{ gap: "2px" }}>
                    <LikeOutlined /> {data?.like.length}
                  </Button>
                )}

                <Button
                  color="default"
                  variant="link"
                  size="small"
                  style={{ gap: "2px" }}>
                  <ShareAltOutlined />
                </Button>
              </div>
            </Flex>
          </div>
          {showDes && (
            <>
              <div>
                <Card type="inner" style={{ backgroundColor: "#fafafa" }}>
                  {data?.des?.map((desc, d) => (
                    <div key={d}>
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
                                {desc?.posted?.name.charAt(0)}
                              </Avatar>
                              <Flex justify="space-between" align="center">
                                <Text>{desc?.posted?.name} |</Text>
                                <Text
                                  style={{
                                    display: "block",
                                    fontSize: "12px",
                                    color: "gray",
                                  }}>
                                  {moment(desc?.createdAt).fromNow()}
                                </Text>
                              </Flex>
                            </Flex>
                          </div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: desc?.post,
                            }}
                          />
                          <Row>
                            <Col>
                              <Button
                                color="primary"
                                variant="link"
                                size="small"
                                style={{ gap: "2px" }}>
                                <small>
                                  <LikeFilled /> 120.5K
                                </small>
                              </Button>
                              <Button
                                color="primary"
                                variant="link"
                                size="small"
                                style={{ gap: "2px" }}>
                                <small>
                                  <DislikeOutlined /> 120.5K
                                </small>
                              </Button>
                            </Col>
                          </Row>
                        </blockquote>
                      </Paragraph>
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
