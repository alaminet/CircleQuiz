"use client";
import React from "react";
import { Button, Col, Flex, Row, Typography } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import {
  InfoCircleFilled,
  InfoCircleTwoTone,
  PrinterFilled,
  PrinterTwoTone,
  ShareAltOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";

const SubjectHeading = ({ title, search }) => {
  // Search Bar
  const onSearch = (value, _e, info) => search(value);
  return (
    <>
      <div
        style={{
          textAlign: "center",
          padding: "20px 24px",
          backgroundColor: "#EFF3EA",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}>
        <Title level={2} style={{ textTransform: "uppercase" }}>
          {title}
        </Title>
        <Text>All MCQ Question - (20230)</Text>
      </div>
      <div>
        <Row justify="space-between" style={{ margin: "10px auto" }}>
          <Col>
            <div>
              <Flex justify="space-between" gap={10}>
                <div>
                  <Button type="primary" size="small">
                    <InfoCircleFilled /> Info
                  </Button>
                </div>
                <div>
                  <Button type="primary" size="small">
                    <PrinterFilled /> Print
                  </Button>
                </div>
                <div>
                  <Button type="primary" size="small">
                    <ShareAltOutlined /> Share
                  </Button>
                </div>
              </Flex>
            </div>
          </Col>
          <Col>
            <div>
              <Search
                enterButton
                placeholder="সার্চ করুন"
                onSearch={onSearch}
                style={{
                  width: 300,
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SubjectHeading;
