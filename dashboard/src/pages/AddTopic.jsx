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
} from "antd";
import { useSelector } from "react-redux";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

const AddTopic = () => {
  const { Text } = Typography;
  const user = useSelector((user) => user.loginSlice.login);
  const [newForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editItem, setEditItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [tbllist, setTbllist] = useState([]);
  const [editStatus, setEditStatus] = useState(null);

  // Add new Topic
  const onFinishNewTopic = async (values) => {
    setLoading(true);
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/topic/add`,
        {
          name: values.topics.trim(),
          iconUrl: values.iconUrl.trim(),
        }
      );
      setLoading(false);
      newForm.resetFields();
      message.success(data.data.message);
    } catch (error) {
      setLoading(false);
      message.error(error.code);
    }
  };
  const onFinishNewTopicFailed = (errorInfo) => {
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

  // Topics Info
  useEffect(() => {
    async function getData() {
      const data = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/api/topic/view`
      );

      const tableData = [];
      data?.data?.view?.map((item, i) => {
        tableData.push({
          sl: ++i,
          topics: item?.name,
          icon: item?.iconUrl,
          status: item?.status,
          action: item,
        });
        setTbllist(tableData);
      });
    }
    getData();
  }, [onFinishNewTopic, onFinishEdit]);

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
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (icon) => <Image src={icon} width={50} height={50} />,
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
            layout="inline"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishNewTopic}
            onFinishFailed={onFinishNewTopicFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Topics Name"
              name="topics"
              rules={[
                {
                  required: true,
                  message: "Please input Topics Name !",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Icon URL"
              name="iconUrl"
              rules={[
                {
                  required: true,
                  message: "Please input Icon URL !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                Add Topics
              </Button>
            </Form.Item>
          </Form>
        </Row>
        <Row>
          {/* {tbllist.length > 0 && ( */}
          <>
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
          </>
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

export default AddTopic;
