"use client";
import "@ant-design/v5-patch-for-react-19";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Form,
  Input,
  Row,
  Divider,
  Modal,
  Space,
  Table,
  message,
  Flex,
  Tooltip,
  Radio,
  Select,
  Col,
} from "antd";
import CustomEditor from "./CustomEditor";

const MCQEditModal = ({ data, ModalOpen, setModalOpen }) => {
  const user = useSelector((user) => user.loginSlice.login);
  const [editForm] = Form.useForm();
  const [editItem, setEditItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [qaList, setQAList] = useState([]);
  const [questionVal, setQuestionVal] = useState(editItem?.question);
  const [optA, setOptA] = useState(editItem?.options[0]);
  const [optB, setOptB] = useState(editItem?.options[1]);
  const [optC, setOptC] = useState(editItem?.options[2]);
  const [optD, setOptD] = useState(editItem?.options[3]);
  const [catList, setCatList] = useState([]);
  const [subjList, setSubjList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [tagnName, setTagName] = useState([]);
  const inputRef = useRef(null);

  // Edit Modal Handler
  const handleOk = (values) => {
    console.log("prev", editItem);
    console.log("edit", values);
    // setModalOpen(false);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  // Get Category List
  const getCategory = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/category/view`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    const tableData = [];
    data?.view?.map((item) => {
      item.status === "approve" &&
        tableData.push({
          label: item?.name,
          value: item?._id,
        });
      setCatList(tableData);
    });
  };
  // Get Topics List
  const getTopics = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/topic/view`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    const tableData = [];
    data?.view?.map((item) => {
      item.status === "approve" &&
        tableData.push({
          label: item?.name,
          value: item?._id,
        });
      setSubjList(tableData);
    });
  };
  // Get Tag List
  const getTag = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/tag/view`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    const tableData = [];
    data?.view?.map((item) => {
      tableData.push({
        label: item?.name,
        value: item?._id,
      });
      setTagList(tableData);
    });
  };
  if (ModalOpen) {
    getCategory();
    getTopics();
    getTag();
    setEditItem(data);
    editForm.setFieldsValue({
      id: data?._id,
      question: data?.question,
      optA: data?.options[0],
      optB: data?.options[1],
      optC: data?.options[2],
      optD: data?.options[3],
      answer: data?.ans,
      topic: data?.topic._id,
      category: data?.category._id,
      tag: data?.tag.map((item) => item._id),
      status: data?.status,
    });
  }
  return (
    <>
      <div>
        <Modal
          title="Edit Q&A"
          open={ModalOpen}
          width="80%"
          onCancel={handleCancel}
          footer=""
        >
          <Form form={editForm} layout="vertical" onFinish={handleOk}>
            <Form.Item hidden name="id"></Form.Item>
            <div>
              <Form.Item
                name="question"
                label="Question"
                rules={[{ required: true, message: "Please input Question!" }]}
              >
                <CustomEditor
                  onChange={setQuestionVal}
                  defaultData={editItem?.question}
                />
              </Form.Item>
              <Form.Item hidden>
                <Input type="hidden" name="question" value={questionVal} />
              </Form.Item>
            </div>
            <Row gutter={10}>
              <Col md={6}>
                <Form.Item
                  name="optA"
                  label="Option A"
                  rules={[
                    { required: true, message: "Please input Option A!" },
                  ]}
                >
                  <CustomEditor
                    onChange={setOptA}
                    defaultData={editItem?.options[0]}
                  />
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
                  ]}
                >
                  <CustomEditor
                    onChange={setOptB}
                    defaultData={editItem?.options[1]}
                  />
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
                  ]}
                >
                  <CustomEditor
                    onChange={setOptC}
                    defaultData={editItem?.options[2]}
                  />
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
                  ]}
                >
                  <CustomEditor
                    onChange={setOptD}
                    defaultData={editItem?.options[3]}
                  />
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
                  rules={[{ required: true, message: "Slect Correct Ans!" }]}
                >
                  <Select
                    showSearch
                    placeholder="Select Answer"
                    optionFilterProp="label"
                    options={[
                      {
                        value: 0,
                        label: "A",
                      },
                      {
                        value: 1,
                        label: "B",
                      },
                      {
                        value: 2,
                        label: "C",
                      },
                      {
                        value: 3,
                        label: "D",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="category"
                  label="Category"
                  style={{
                    width: 300,
                  }}
                  rules={[{ required: true, message: "Slect Category!" }]}
                >
                  <Select
                    showSearch
                    placeholder="Select Category"
                    optionFilterProp="label"
                    options={catList}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="topic"
                  label="Related Subject"
                  style={{
                    width: 300,
                  }}
                  rules={[
                    { required: true, message: "Slect Related Subject!" },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Subject"
                    optionFilterProp="label"
                    options={subjList}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item name="tag" label="Tag/Referance">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{
                      minWidth: 300,
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
                          }}
                        >
                          <Input
                            placeholder="Please enter item"
                            ref={inputRef}
                            value={tagnName}
                            onChange={(e) => setTagName(e.target.value)}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={addItem}
                          >
                            Add item
                          </Button>
                        </Space>
                      </>
                    )}
                    options={tagList}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Radio.Group
                options={[
                  {
                    label: "Approve",
                    value: "approve",
                  },
                  {
                    label: "Waiting",
                    value: "waiting",
                  },
                  {
                    label: "Hold",
                    value: "hold",
                  },
                  {
                    label: "Delete",
                    value: "delete",
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  loading={loading}
                  disabled={loading}
                  type="primary"
                  htmlType="submit"
                >
                  Q&A Update
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default MCQEditModal;
