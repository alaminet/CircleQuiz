import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
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
import { useSelector } from "react-redux";
import { EditTwoTone, PlusOutlined } from "@ant-design/icons";

// Fixed header And colum in table
import { createStyles } from "antd-style";
import CKEditorInput from "../components/CKEditorInput";
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const ViewQA = () => {
  const { styles } = useStyle();
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
  // table arrangment
  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      fixed: "left",
      width: 50,
    },
    {
      title: "Topics Name",
      dataIndex: "topics",
      key: "topics",
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (question) => (
        <div dangerouslySetInnerHTML={{ __html: question }} />
      ),
    },
    {
      title: "Opt-A",
      dataIndex: "optA",
      key: "optA",
      render: (optA) => <div dangerouslySetInnerHTML={{ __html: optA }} />,
    },
    {
      title: "Opt-B",
      dataIndex: "optB",
      key: "optB",
      render: (optB) => <div dangerouslySetInnerHTML={{ __html: optB }} />,
    },
    {
      title: "Opt-C",
      dataIndex: "optC",
      key: "optC",
      render: (optC) => <div dangerouslySetInnerHTML={{ __html: optC }} />,
    },
    {
      title: "Opt-D",
      dataIndex: "optD",
      key: "optD",
      render: (optD) => <div dangerouslySetInnerHTML={{ __html: optD }} />,
    },
    {
      title: "Ans",
      dataIndex: "ans",
      key: "ans",
      render: (ans) => <div dangerouslySetInnerHTML={{ __html: ans }} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 80,
      fixed: "right",
      render: (item, record) =>
        user.role === "admin" && (
          <>
            <Flex gap={4}>
              <Tooltip title="Edit">
                <Button
                  onClick={() => handleEdit(item)}
                  icon={<EditTwoTone />}
                />
              </Tooltip>
              {/* <Tooltip title="Delete">
                  <Button
                    // onClick={() => handleDelete(record)}
                    icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
                  />
                </Tooltip> */}
            </Flex>
          </>
        ),
    },
  ];

  // edit table data
  const handleEdit = (values) => {
    getCategory();
    getTopics();
    getTag();
    setIsModalOpen(true);
    setEditItem(values);
    editForm.setFieldsValue({
      id: values?._id,
      question: values?.question,
      optA: values?.options[0],
      optB: values?.options[1],
      optC: values?.options[2],
      optD: values?.options[3],
      answer: values?.ans,
      topic: values?.topic._id,
      category: values?.category._id,
      tag: values?.tag.map((item) => item._id),
      status: values?.status,
    });
  };

  const onFinishEdit = async (values) => {
    console.log("prev", editItem);
    console.log("edit", values);
    setLoading(true);
    if (
      editItem.ans !== values.answer ||
      editItem.category._id !== values.category ||
      editItem.options[0] !== values.optA ||
      editItem.options[1] !== values.optB ||
      editItem.options[2] !== values.optC ||
      editItem.options[3] !== values.optD ||
      editItem.question !== values.question ||
      editItem.status !== values.status ||
      editItem.tag.map((item) => item._id) !== values.tag ||
      editItem.topic?._id !== values.topic
    ) {
      try {
        // id, question, options, ans, des, topic, status,category,tag
        const update = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/api/mcq/edit`,
          {
            id: values.id,
            question: values.question.trim(),
            options: [
              values.optA.trim(),
              values.optB.trim(),
              values.optC.trim(),
              values.optD.trim(),
            ],
            ans: values.answer,
            topic: values.topic,
            category: values.category,
            tag: values.tag,
            status: values.status,
          }
        );
        message.success(update.data.message);
        setLoading(false);
        setIsModalOpen(false);
      } catch (error) {
        setLoading(false);
        message.error(error.response.data.message);
      }
    } else {
      setLoading(false);
      setIsModalOpen(false);
    }
  };
  const handleCancel = () => {
    setLoading(false);
    setIsModalOpen(false);
  };

  // Add new Tag
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/tag/add`,
        {
          name: tagnName,
        }
      );
      getTag();
      setTagName("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Get Q&A List
  async function getQAData() {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/api/mcq/viewall`
    );
    const tableData = [];
    let y = 1;
    data?.data?.view?.map((item, i) => {
      tableData.push({
        dataIndex: i,
        sl: y++,
        topics: item?.topic?.name,
        question: item?.question,
        optA: item?.options[0],
        optB: item?.options[1],
        optC: item?.options[2],
        optD: item?.options[3],
        ans: item?.options[item?.ans],
        status: item?.status,
        action: item,
      });
      setQAList(tableData);
    });
  }
  // console.log(qaList);

  // Get Category List
  const getCategory = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/api/category/view`
    );
    const tableData = [];
    res?.data?.view?.map((item) => {
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
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/api/topic/view`
    );
    const tableData = [];
    res?.data?.view?.map((item) => {
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
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/api/tag/view`
    );

    const tableData = [];
    res?.data?.view?.map((item) => {
      tableData.push({
        label: item?.name,
        value: item?._id,
      });
      setTagList(tableData);
    });
  };

  // Q&A Info
  useEffect(() => {
    getQAData();
  }, [onFinishEdit]);
  return (
    <>
      <div>
        <Divider>Q&A Details Table</Divider>
        <div>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find by Q&A"
            variant="filled"
            style={{ marginBottom: "15px" }}
          />
          <Table
            className={styles.customTable}
            columns={columns}
            tableLayout="auto"
            dataSource={
              qaList !== "" &&
              qaList.filter((item) =>
                item.question.toLowerCase().includes(search.toLowerCase())
              )
            }
            pagination={false}
            bordered
            scroll={{
              x: "max-content",
              y: 55 * 5,
            }}
          />
        </div>
        <div>
          <Modal
            title="Edit Q&A"
            open={isModalOpen}
            width="80%"
            onCancel={handleCancel}
            footer=""
          >
            <Form form={editForm} layout="vertical" onFinish={onFinishEdit}>
              <Form.Item hidden name="id"></Form.Item>
              <div>
                <Form.Item
                  name="question"
                  label="Question"
                  rules={[
                    { required: true, message: "Please input Question!" },
                  ]}
                >
                  <CKEditorInput
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
                    <CKEditorInput
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
                    <CKEditorInput
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
                    <CKEditorInput
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
                    <CKEditorInput
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
      </div>
    </>
  );
};

export default ViewQA;
