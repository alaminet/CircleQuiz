"use client";
import React, { useState } from "react";
import {
  Col,
  Row,
  Avatar,
  Card,
  Badge,
  Typography,
  message,
  Tag,
  Popconfirm,
  Button,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DeleteTwoTone } from "@ant-design/icons";
import { Loginuser } from "@/lib/features/slice/userSlice";
const { Meta } = Card;
const { Title, Paragraph } = Typography;

const Page = () => {
  const user = useSelector((user) => user?.loginSlice?.login);
  const dispatch = useDispatch();
  const [editName, setEditName] = useState(user?.name);
  const deviceID = localStorage?.getItem("device-id");

  const handleName = async (e) => {
    try {
      if (user?.name !== e) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/auth/edit`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
            },
            body: JSON.stringify({
              userID: user?._id,
              field: "name",
              value: e,
            }),
          }
        );
        const data = await res.json();
        if (data.message === "User Updated") {
          message.success(data?.message);
          setEditName(e);
          localStorage?.setItem("user", JSON.stringify(data?.updateUser));
          dispatch(Loginuser(data?.updateUser));
        } else {
          message.error("Logout Failed");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Device Delete
  const handleDltConfirm = async (vlaue) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
          },
          body: JSON.stringify({ deviceID: vlaue.deviceID, userID: user?._id }),
        }
      );
      const feedback = await res.json();

      if (feedback.message === "Logged Out Successfully") {
        message.warning("Device Deleted");
        localStorage?.setItem("user", JSON.stringify(feedback?.updateUser));
        dispatch(Loginuser(feedback?.updateUser));
      } else {
        message.error("Logout Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancel = (e) => {
    message.error("Click on No");
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
          <Row style={{ alignItems: "center", marginBottom: "5px" }}>
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
          <Row style={{ alignItems: "center", marginBottom: "5px" }}>
            <Col span={3}>Email</Col>
            <Col span={1}>:</Col>
            <Col span={8}>
              <Paragraph style={{ margin: "0" }}>{user?.email}</Paragraph>
            </Col>
          </Row>
          <Row style={{ alignItems: "center", marginBottom: "5px" }}>
            <Col span={3}>Active Device</Col>
            <Col span={1}>:</Col>
            <Col span={8}>
              <Row>
                {user?.device.map((item, i) =>
                  item.deviceID == deviceID ? (
                    <Col span={24} key={i}>
                      <Paragraph style={{ margin: "0" }}>
                        <Tag color="orange">Native Device</Tag>
                      </Paragraph>
                    </Col>
                  ) : (
                    <Col span={24} key={i}>
                      <Paragraph key={i} style={{ margin: "0" }}>
                        {`${item?.userAgent.slice(0, 10)} at ${moment(
                          item?.loginAt
                        ).fromNow()} `}
                        <Popconfirm
                          title="Delete this device"
                          description="Are you sure to delete this device?"
                          onConfirm={() => handleDltConfirm(item)}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No">
                          <DeleteTwoTone twoToneColor="#eb2f96" />
                        </Popconfirm>
                      </Paragraph>
                    </Col>
                  )
                )}
              </Row>
            </Col>
          </Row>
          <Row style={{ alignItems: "center", marginBottom: "5px" }}>
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
