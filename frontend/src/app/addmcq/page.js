"use client";
import "@ant-design/v5-patch-for-react-19";
import React, { useRef, useState } from "react";
import { Button, Form, Col, Row, Input, Select, Divider, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import CustomEditor from "@/components/CustomEditor";

const Addmcq = () => {
  const [ckForm] = Form.useForm();
  const [loadings, setLoadings] = useState(false);
  const [questionVal, setQuestionVal] = useState("");
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");
  const [details, setDetails] = useState("");

  // select with new tag
  let index = 0;
  const [items, setItems] = useState(["jack", "lucy"]);
  const [name, setName] = useState([]);
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Form Submit
  const onFinish = (values) => {
    setLoadings(true);
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div>
        <Row>
          {/* <Col md={6}>1</Col> */}
          <Col md={24}>
            <div>
              <Title style={{ textAlign: "center" }} level={3}>
                Add MCQ
              </Title>
              <div>
                <Form
                  name="ckForm"
                  // labelCol={{
                  //   span: 8,
                  // }}
                  // wrapperCol={{
                  //   span: 16,
                  // }}
                  style={
                    {
                      // maxWidth: 600,
                    }
                  }
                  initialValues={{
                    remember: true,
                  }}
                  layout="vertical"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off">
                  <div>
                    <Form.Item
                      name="question"
                      label="Question"
                      rules={[
                        { required: true, message: "Please input Question!" },
                      ]}>
                      <CustomEditor onChange={setQuestionVal} />
                    </Form.Item>
                    <Form.Item hidden>
                      <Input
                        type="hidden"
                        name="question"
                        value={questionVal}
                      />
                    </Form.Item>
                  </div>
                  <Row gutter={10}>
                    <Col md={6}>
                      <Form.Item
                        name="optA"
                        label="Option A"
                        rules={[
                          { required: true, message: "Please input Option A!" },
                        ]}>
                        <CustomEditor onChange={setOptA} />
                      </Form.Item>
                      <Form.Item hidden>
                        <Input type="hidden" name="optA" value={optA} />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="optB"
                        label="Option B"
                        rules={[
                          { required: true, message: "Please input Option B!" },
                        ]}>
                        <CustomEditor onChange={setOptB} />
                      </Form.Item>
                      <Form.Item hidden>
                        <Input type="hidden" name="optB" value={optB} />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="optC"
                        label="Option C"
                        rules={[
                          { required: true, message: "Please input Option C!" },
                        ]}>
                        <CustomEditor onChange={setOptC} />
                      </Form.Item>
                      <Form.Item hidden>
                        <Input type="hidden" name="optC" value={optC} />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="optD"
                        label="Option D"
                        rules={[
                          { required: true, message: "Please input Option D!" },
                        ]}>
                        <CustomEditor onChange={setOptD} />
                      </Form.Item>
                      <Form.Item hidden>
                        <Input type="hidden" name="optD" value={optD} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col>
                      <Form.Item
                        name="answer"
                        label="Correct Answer"
                        rules={[
                          { required: true, message: "Slect Correct Ans!" },
                        ]}>
                        <Select
                          showSearch
                          placeholder="Select Answer"
                          optionFilterProp="label"
                          // onChange={onChange}
                          // onSearch={onSearch}
                          options={[
                            {
                              value: 1,
                              label: "A",
                            },
                            {
                              value: 2,
                              label: "B",
                            },
                            {
                              value: 3,
                              label: "C",
                            },
                            {
                              value: 4,
                              label: "D",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        name="Subject"
                        label="Related Subject"
                        style={{
                          width: 300,
                        }}
                        rules={[
                          { required: true, message: "Slect Related Subject!" },
                        ]}>
                        <Select
                          showSearch
                          placeholder="Select Subject"
                          optionFilterProp="label"
                          // onChange={onChange}
                          // onSearch={onSearch}
                          options={[
                            {
                              value: 1,
                              label: "A",
                            },
                            {
                              value: 2,
                              label: "B",
                            },
                            {
                              value: 3,
                              label: "C",
                            },
                            {
                              value: 4,
                              label: "D",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item name="tag" label="Tag/Referance">
                        <Select
                          mode="multiple"
                          allowClear
                          style={{
                            width: 300,
                          }}
                          placeholder="Tag/Ref"
                          dropdownRender={(menu) => (
                            <>
                              {menu}
                              <Divider
                                style={{
                                  margin: "8px 0",
                                }}
                              />
                              <Space
                                style={{
                                  padding: "0 8px 4px",
                                }}>
                                <Input
                                  placeholder="Please enter item"
                                  ref={inputRef}
                                  value={name}
                                  onChange={onNameChange}
                                  onKeyDown={(e) => e.stopPropagation()}
                                />
                                <Button
                                  type="text"
                                  icon={<PlusOutlined />}
                                  onClick={addItem}>
                                  Add item
                                </Button>
                              </Space>
                            </>
                          )}
                          options={items.map((item) => ({
                            label: item,
                            value: item,
                          }))}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div>
                    <Form.Item name="details" label="Details">
                      <CustomEditor onChange={setDetails} />
                    </Form.Item>
                    <Form.Item hidden>
                      <Input type="hidden" name="details" value={details} />
                    </Form.Item>
                  </div>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loadings}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
          {/* <Col md={6}>3</Col> */}
        </Row>
      </div>
    </>
  );
};

export default Addmcq;
