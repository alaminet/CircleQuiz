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
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

const AddQA = () => {
  const { Text } = Typography;
  const { TextArea } = Input;
  const user = useSelector((user) => user.loginSlice.login);
  const [newForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editItem, setEditItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [topicList, setTopicList] = useState([]);
  const [editStatus, setEditStatus] = useState(null);

  // Add new Topic
  const onFinishNew = async (values) => {
    // console.log(values);
    setLoading(true);
    try {
      // question, options, ans, topic,
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/mcq/add`,
        {
          question: values.question.trim(),
          options: [
            values.A.trim(),
            values.B.trim(),
            values.C.trim(),
            values.D.trim(),
          ],
          ans: values.ans,
          topic: values.topic,
          des: values.des.trim(),
        }
      );
      setLoading(false);
      newForm.resetFields();
      message.success(data.data.message);
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.message);
    }
  };
  const onFinishNewFailed = (errorInfo) => {
    setLoading(false);
    console.log("Failed:", errorInfo);
  };

  // edit table data
  const handleEdit = (values) => {
    setIsModalOpen(true);
    setEditItem(values);
    setEditStatus(values.status);
    editForm.setFieldsValue({
      id: values._id,
      topics: values.name,
      iconUrl: values.iconUrl,
      status: values.status,
    });
  };

  const onFinishEdit = async (values) => {
    setLoading(true);
    if (
      editItem.topics !== values.topics ||
      editItem.iconUrl !== values.iconUrl
    ) {
      try {
        const update = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/api/topic/edit`,
          {
            id: values.id,
            topics: values.topics,
            iconUrl: values.iconUrl,
            status: editStatus,
          }
        );
        message.success(update.data.message);
        setLoading(false);
        setIsModalOpen(false);
      } catch (error) {
        setLoading(false);
        message.error(error.response.data.message);
      }
    }
  };
  const handleCancel = () => {
    setLoading(false);
    setIsModalOpen(false);
  };

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

  // Topics Info
  useEffect(() => {
    getTopicData();
  }, [onFinishNew, onFinishEdit]);

  // table arrangment
  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
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
    },
    {
      title: "Option A",
      dataIndex: "optA",
      key: "optA",
    },
    {
      title: "Option B",
      dataIndex: "optB",
      key: "optB",
    },
    {
      title: "Option C",
      dataIndex: "optC",
      key: "optAC",
    },
    {
      title: "Option D",
      dataIndex: "optD",
      key: "optD",
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
  // console.log(editItem);

  return (
    <>
      <div>
        <Row>
          <Form
            form={newForm}
            name="newForm"
            layout="horizontal"
            style={{ width: "100%" }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishNew}
            onFinishFailed={onFinishNewFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Topics"
              name="topic"
              rules={[
                {
                  required: true,
                  message: "Please input Question!",
                },
              ]}
            >
              <Select
                showSearch
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
              label="Question"
              name="question"
              rules={[
                {
                  required: true,
                  message: "Please input Question!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Row justify="space-between">
              <Form.Item
                label="Options A"
                name="A"
                // style={{ width: "40%" }}
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
                label="Options B"
                name="B"
                // style={{ width: "40%" }}
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
                label="Options C"
                name="C"
                // style={{ width: "40%" }}
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
                label="Options D"
                name="D"
                // style={{ width: "40%" }}
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
              // style={{ width: "40%" }}
              rules={[
                {
                  required: true,
                  message: "Please input Correct Option!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select Correct Option"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: 0,
                    label: "Option A",
                  },
                  {
                    value: 1,
                    label: "Option B",
                  },
                  {
                    value: 2,
                    label: "Option C",
                  },
                  {
                    value: 3,
                    label: "Option D",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Details" name="des">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                Add Q&A
              </Button>
            </Form.Item>
          </Form>
        </Row>
        <Row>
          {/* {tbllist.length > 0 && ( */}
          {/* <>
            <Divider>Topics Details Table</Divider>
            <div>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find by Name"
                variant="filled"
                style={{ marginBottom: "15px" }}
              />
              <Table
                columns={columns}
                tableLayout="fixed"
                dataSource={
                  tbllist !== "" &&
                  tbllist.filter((item) =>
                    item.topics.toLowerCase().includes(search.toLowerCase())
                  )
                }
                pagination={false}
                bordered
              />
            </div>
          </> */}
          {/* )} */}
          <div>
            <Modal
              title="Edit Category"
              open={isModalOpen}
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
                  name="topics"
                  label="Topics"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Topics" />
                </Form.Item>
                <Form.Item
                  name="iconUrl"
                  label="Icon URL"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Icon URL" />
                </Form.Item>
                <Form.Item
                  // name="status"
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
                    onChange={(e) => setEditStatus(e.target.value)}
                    value={editStatus}
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
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </Row>
      </div>
    </>
  );
};
export default AddQA;
