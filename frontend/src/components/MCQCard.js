"use client";
import "@ant-design/v5-patch-for-react-19";
import React, { useEffect, useRef, useState } from "react";
import {
  CaretRightOutlined,
  EyeFilled,
  LikeFilled,
  ShareAltOutlined,
  BorderOutlined,
  CheckSquareFilled,
  LikeOutlined,
  EditTwoTone,
  PlusSquareOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Flex,
  Tooltip,
  Divider,
  Menu,
  Row,
  Col,
  Typography,
  Modal,
  message,
} from "antd";

import { useSelector } from "react-redux";
import MCQDescCard from "./MCQDescCard";
import MCQEditModal from "./MCQEditModal";
import { useRouter } from "next/navigation";
import CustomEditor from "./CustomEditor";
const { Title, Text } = Typography;

const MCQCard = ({ data }) => {
  const user = useSelector((user) => user.loginSlice.login);
  const contentRef = useRef(null);
  const router = useRouter();
  const [showDes, setShowDes] = useState(false);
  const likeExist = data?.like?.some((l) => l == user?._id);
  const [liked, setLiked] = useState(likeExist);
  const [likeCount, setLikeCount] = useState(data?.like.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModal, setIsPostModal] = useState(false);
  const [details, setDetails] = useState();
  const permalink = window.location.href;

  // Card Menu
  const onClick = async (e) => {
    console.log("click ", e);
    if (e.key === "edit") {
      // setIsModalOpen(true);
      const id = data?._id;
      const type = "mcq";
      const path = `/edit/id=${id}&type=${type}`;
      router.push(path);
    }
    if (e.key === "addDes") {
      setIsPostModal(true);
    }
  };
  const menutItem = [
    {
      key: "addDes",
      icon: (
        <Tooltip title="বিস্তারিত">
          <PlusSquareOutlined />
        </Tooltip>
      ),
    },
    {
      key: "edit",
      icon: (
        <Tooltip title="সংশোধন">
          <EditTwoTone />
        </Tooltip>
      ),
    },
    {
      key: "copy",
      icon: (
        <Tooltip title="কপি">
          <Text
            copyable={{
              tooltips: false,
              text: async () =>
                new Promise((resolve) => {
                  const CopyText = `Qn: ${data?.question}\nA) ${
                    data?.options[0]
                  }\nB) ${data?.options[1]}\nC) ${data?.options[2]}\nD) ${
                    data?.options[3]
                  }\n\nAns: ${
                    data?.options[data?.ans]
                  }\n\nTag: #Circle_Academy\nSource: ${permalink}`;
                  let cleanText = CopyText.replace(/<[^>]*>?|&nbsp;/gm, "");
                  setTimeout(() => {
                    resolve(`${cleanText}`);
                  }, 500);
                }),
            }}
          />
        </Tooltip>
      ),
    },
  ];
  // Add Des. server enviroment
  const addDesPost = async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/mcq/adddes`,
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
  // New Post Handler
  const handlePostOk = async () => {
    const newData = { postID: data?._id, posted: user?._id, post: details };
    const res = await addDesPost(newData);
    setIsPostModal(false);
    res && message.success(res?.message);
  };
  const handlePostCancel = () => {
    setIsPostModal(false);
  };
  // like server enviroment
  const postLike = async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/mcq/mcqlike`,
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
    console.log(likeData);

    try {
      likeData && (await postLike(likeData));
      setLiked(true);
      setLikeCount(likeCount + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleCopy = (e) => {
      const selectedText = window.getSelection().toString();
      const fullContent = `${selectedText}\nSource: ${permalink}`;

      e.preventDefault();
      e.clipboardData.setData("text/html", fullContent);
      e.clipboardData.setData("text/plain", fullContent);
    };

    const contentElement = contentRef.current;
    contentElement.addEventListener("copy", handleCopy);

    // Cleanup event listener on component unmount
    return () => {
      contentElement.removeEventListener("copy", handleCopy);
    };
  }, []);
  return (
    <>
      <Card style={{ marginBottom: "10px" }} ref={contentRef}>
        <div>
          <Row justify="space-between">
            <Col xs={24} md={16}>
              <div>
                <Title level={5} style={{ margin: "0" }}>
                  <span
                    dangerouslySetInnerHTML={{ __html: data?.question }}></span>
                </Title>
              </div>
            </Col>
            <Col xs={24} md={8}>
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
                  {data?.des?.map(
                    (desc, d) =>
                      desc?.status === "approved" && (
                        <div key={d}>
                          <MCQDescCard data={desc} />
                        </div>
                      )
                  )}
                </Card>
              </div>
            </>
          )}
        </div>
      </Card>
      <MCQEditModal
        ModalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        data={data}
      />
      <div>
        <Modal
          title="Add Details"
          open={isPostModal}
          onOk={handlePostOk}
          onCancel={handlePostCancel}>
          <CustomEditor onChange={setDetails} />
        </Modal>
      </div>
    </>
  );
};

export default MCQCard;
