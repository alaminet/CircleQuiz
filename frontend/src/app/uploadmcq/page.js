"use client";
import React, { useState } from "react";
import { Button, Form, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import CustomEditor from "@/components/CustomEditor";

const Uploadmcq = () => {
  const [ckForm] = Form.useForm();
  const [loadings, setLoadings] = useState(false);

  // Form Submit
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div>
        <Row>
          <Col md={6}>1</Col>
          <Col md={12}>
            <div>
              <Title style={{ textAlign: "center" }} level={3}>
                Add MCQ
              </Title>
              <div>
                <Form
                  name="ckForm"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off">
                  <Form.Item
                    label="Question"
                    name="question"
                    rules={[
                      {
                        required: true,
                        message: "Please input Questions!",
                      },
                    ]}>
                    <CustomEditor/>
                  </Form.Item>

                  <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
          <Col md={6}>3</Col>
        </Row>
      </div>
    </>
  );
};

export default Uploadmcq;
