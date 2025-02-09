import React, { useEffect, useState } from "react";
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
  Typography,
  message,
  Flex,
  Tooltip,
  Image,
  Radio,
  Select,
} from "antd";
import { useSelector } from "react-redux";
import { EditTwoTone, DeleteTwoTone,SearchOutlined  } from "@ant-design/icons";

const ViewQA = () => {
  const { Text } = Typography;
  const { TextArea } = Input;
  const user = useSelector((user) => user.loginSlice.login);
  const [editForm] = Form.useForm();
  const [editItem, setEditItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [qaList, setQAList] = useState([]);
  const [topicList, setTopicList] = useState([]);

  // table arrangment
  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
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
    },
    {
      title: "Opt-A",
      dataIndex: "optA",
      key: "optA",
    },
    {
      title: "Opt-B",
      dataIndex: "optB",
      key: "optB",
    },
    {
      title: "Opt-C",
      dataIndex: "optC",
      key: "optC",
    },
    {
      title: "Opt-D",
      dataIndex: "optD",
      key: "optD",
    },
    {
      title: "Ans",
      dataIndex: "ans",
      key: "ans",
    },
    {
      title: "Details",
      dataIndex: "des",
      key: "des",
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
    getTopicData();
    setIsModalOpen(true);
    setEditItem(values);
    editForm.setFieldsValue({
      id: values?._id,
      question: values?.question,
      A: values?.options[0],
      B: values?.options[1],
      C: values?.options[2],
      D: values?.options[3],
      ans: values?.ans,
      des: values?.des,
      topic: values?.topic?._id,
      status: values?.status,
    });
  };

  const onFinishEdit = async (values) => {
    setLoading(true);
    if (
      editItem.question !== values.question ||
      editItem.options[0] !== values.A ||
      editItem.options[1] !== values.B ||
      editItem.options[2] !== values.C ||
      editItem.options[3] !== values.D ||
      editItem.ans !== values.ans ||
      editItem.des !== values.des ||
      editItem.topic?._id !== values.topic ||
      editItem.status !== values.status
    ) {
      try {
        const update = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/api/mcq/edit`,
          {
            id: values.id,
            question: values.question.trim(),
            options: [
              values.A.trim(),
              values.B.trim(),
              values.C.trim(),
              values.D.trim(),
            ],
            ans: values.ans,
            des: values.des?.trim(),
            topic: values.topic,
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
        des: item?.des,
        status: item?.status,
        action: item,
      });
      setQAList(tableData);
    });
  }

  // Get Topics List
  async function getTopicData() {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/api/topic/view`
    );

    const tableData = [];
    data?.data?.view?.map((item, i) => {
      tableData.push({
        label: item?.name,
        value: item?._id,
      });
      setTopicList(tableData);
    });
  }

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
            <Form
              form={editForm}
              // layout="vertical"
              onFinish={onFinishEdit}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item hidden name="id"></Form.Item>
              <Form.Item
                name="topic"
                label="Topic"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  showSearch
                  labelInValue
                  placeholder="Select Topics"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={topicList}
                />
              </Form.Item>
              <Form.Item
                name="question"
                label="Question"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Question" />
              </Form.Item>
              <Row justify="space-between">
                <Form.Item
                  label="Opt-A"
                  name="A"
                  rules={[
                    {
                      required: true,
                      message: "Please input Options!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Opt-B"
                  name="B"
                  rules={[
                    {
                      required: true,
                      message: "Please input Options!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Opt-C"
                  name="C"
                  rules={[
                    {
                      required: true,
                      message: "Please input Options!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Opt-D"
                  name="D"
                  rules={[
                    {
                      required: true,
                      message: "Please input Options!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Row>
              <Form.Item
                label="Ans"
                name="ans"
                rules={[
                  {
                    required: true,
                    message: "Please input Correct Option!",
                  },
                ]}
              >
                <Select
                  showSearch
                  labelInValue
                  placeholder="Select Correct Option"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
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
              <Form.Item label="Details" name="des">
                <TextArea rows={4} />
              </Form.Item>
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
