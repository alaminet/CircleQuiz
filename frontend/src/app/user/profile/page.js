"use client";
import React, { useState } from "react";
import { Col, Row, Avatar, Card, Badge, Typography, message } from "antd";
import { useSelector } from "react-redux";
const { Meta } = Card;
const { Title, Paragraph } = Typography;

const Page = () => {
  const user = useSelector((user) => user?.loginSlice?.login);
  const [editName, setEditName] = useState(user?.name);

  const handleName = async (e) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/auth/edit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
          },
          body: JSON.stringify({ userID: user?._id, field: "name", value: e }),
        }
      );
      const data = await res.json();

      message.success(data?.message);
      setEditName(e);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="space-between">
        <Col span={10}>
          <Card
            style={{
              width: 300,
              margin: "0 auto",
            }}
            cover={
              <>
                <Badge.Ribbon text="Free" color="pink">
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt="user Img"
                    src={user?.userImg || user?.name.charAt(0)}
                  />
                </Badge.Ribbon>
              </>
            }>
            <Meta
              avatar={<Avatar src={user?.userImg || user?.name.charAt(0)} />}
              title={user?.name}
              description={
                <>
                  <p style={{ margin: 0 }}>{user?.email}</p>
                  <p style={{ margin: 0 }}>{user?.role}</p>
                </>
              }
            />
          </Card>
        </Col>
        <Col span={14}>
          <Title level={4}>General Information</Title>
          <Row style={{ alignItems: "center" }}>
            <Col span={3}>Name</Col>
            <Col span={1}>:</Col>
            <Col span={8}>
              <Paragraph
                style={{ margin: "0" }}
                editable={{
                  onChange: handleName,
                }}>
                {editName}
              </Paragraph>
            </Col>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <Col span={3}>Email</Col>
            <Col span={1}>:</Col>
            <Col span={8}>
              <Paragraph style={{ margin: "0" }}>{user?.email}</Paragraph>
            </Col>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <Col span={3}>Current Plan</Col>
            <Col span={1}>:</Col>
            <Col span={8}>
              <Paragraph style={{ margin: "0" }}>Free</Paragraph>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Page;
