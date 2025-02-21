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
const { Text, Title, Paragraph } = Typography;
const { Group } = Radio;

const MCQCard = ({ data }) => {
  console.log(data);

  const [showDes, setShowDes] = useState(false);
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
  // Radio Value
  const [value, setValue] = useState(null);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Card>
        <div>
          <Row justify="space-between">
            <Col xs={24} md={20}>
              <div>
                <Title level={5} style={{ margin: "0" }}>
                  <span
                    dangerouslySetInnerHTML={{ __html: data?.question }}
                  ></span>
                </Title>
              </div>
            </Col>
            <Col xs={24} md={4}>
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
          <Radio.Group
            buttonStyle="solid"
            onChange={onChange}
            value={value}
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
            options={[
              {
                value: 0,
                label: (
                  <Flex gap="small" justify="center" align="center" vertical>
                    <span
                      dangerouslySetInnerHTML={{ __html: data?.options[0] }}
                    ></span>
                  </Flex>
                ),
              },
              {
                value: 1,
                label: (
                  <Flex gap="small" justify="center" align="center" vertical>
                    <span
                      dangerouslySetInnerHTML={{ __html: data?.options[1] }}
                    ></span>
                  </Flex>
                ),
              },
              {
                value: 2,
                label: (
                  <Flex gap="small" justify="center" align="center" vertical>
                    <span
                      dangerouslySetInnerHTML={{ __html: data?.options[2] }}
                    ></span>
                  </Flex>
                ),
              },
              {
                value: 3,
                label: (
                  <Flex gap="small" justify="center" align="center" vertical>
                    <span
                      dangerouslySetInnerHTML={{ __html: data?.options[3] }}
                    ></span>
                  </Flex>
                ),
              },
            ]}
          />
          <div style={{ marginTop: "20px", display: "flex", gap: "5px" }}>
            {data?.tag.map((tag, j) => (
              <>
                <Button key={j} color="cyan" variant="outlined" size="small">
                  <span dangerouslySetInnerHTML={{ __html: tag?.name }}></span>
                </Button>
              </>
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
                  onClick={() => setShowDes(!showDes)}
                >
                  <strong>Des.</strong>
                  <CaretRightOutlined />
                </Button>
              </div>
              <div>
                <Button
                  color="default"
                  variant="link"
                  size="small"
                  style={{ gap: "2px" }}
                >
                  <EyeFilled /> <strong>1M</strong>
                </Button>
                <Button
                  color="primary"
                  variant="link"
                  size="small"
                  style={{ gap: "2px" }}
                >
                  <LikeFilled /> 120.5K
                </Button>
                <Button
                  color="default"
                  variant="link"
                  size="small"
                  style={{ gap: "2px" }}
                >
                  <ShareAltOutlined />
                </Button>
              </div>
            </Flex>
          </div>
          {showDes && (
            <>
              <div>
                <Card type="inner" style={{ backgroundColor: "#fafafa" }}>
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
                              icon={<AntDesignOutlined />}
                            />
                            <Flex justify="space-between" align="center">
                              <Text>Comment Name |</Text>
                              <Text
                                style={{
                                  display: "block",
                                  fontSize: "12px",
                                  color: "gray",
                                }}
                              >
                                1Y Ago
                              </Text>
                            </Flex>
                          </Flex>
                        </div>
                        <div>
                          In the process of internal desktop applications
                          development, many different design specs and
                          implementations would be involved, which might cause
                          designers and developers difficulties and duplication
                          and reduce the efficiency of development.
                        </div>
                        <Row>
                          <Col>
                            <Button
                              color="primary"
                              variant="link"
                              size="small"
                              style={{ gap: "2px" }}
                            >
                              <small>
                                <LikeFilled /> 120.5K
                              </small>
                            </Button>
                            <Button
                              color="primary"
                              variant="link"
                              size="small"
                              style={{ gap: "2px" }}
                            >
                              <small>
                                <DislikeOutlined /> 120.5K
                              </small>
                            </Button>
                          </Col>
                        </Row>
                      </blockquote>
                    </Paragraph>
                  </div>
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
