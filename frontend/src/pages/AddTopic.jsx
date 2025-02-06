import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Row,
  Divider,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Typography,
  message,
  Flex,
  Tooltip,
  Image,
} from "antd";
import { useSelector } from "react-redux";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import moment from "moment";

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
  const [itemlist, setitemlist] = useState([]);

  // Add new Topic
  const onFinishNewTopic = async (values) => {
    setLoading(true);
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/topic/add`,
        {
          name: values.name.trim(),
          iconUrl: values.iconUrl.trim(),
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
  const onFinishNewTopicFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // edit table data
  const handleEdit = (values) => {
    // console.log(values);
    setIsModalOpen(true);
    setEditItem(values);
    editForm.setFieldsValue({
      id: values._id,
      name: values.name,
      iconUrl: values.iconUrl,
    });
  };
  const onFinishEdit = async (values) => {
    // console.log(editItem);
    // console.log(values);
    setLoading(true);
    if (editItem.locID.loc !== values.loc && editItem.issue !== values.issue) {
      message.warning("Single Edit can be done");
    } else {
      if (editItem.locID.loc !== values.loc) {
        try {
          const update = await axios.post(
            `${import.meta.env.VITE_API_URL}/v1/api/tnx/receiveupdate`,
            {
              id: values.id,
              field: "locID",
              value: values.loc,
            }
          );
          message.success(update.data.message);
          setLoading(false);
          setIsModalOpen(false);
        } catch (error) {
          setLoading(false);
          message.error(error.response.data.message);
          // console.log(error.response.data.message);
        }
      }
      if (editItem.issue !== values.issue) {
        try {
          const update = await axios.post(
            `${import.meta.env.VITE_API_URL}/v1/api/tnx/receiveupdate`,
            {
              id: values.id,
              field: "issue",
              value: values.issue,
            }
          );
          message.success(update.data.message);
          setLoading(false);
          setIsModalOpen(false);
        } catch (error) {
          setLoading(false);
          message.error(error.response.data.message);
          // console.log(error.response.data.message);
        }
      }
    }
  };
  const handleCancel = () => {
    setLoading(false);
    setIsModalOpen(false);
  };

  // Part Info
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
        });
        setTbllist(tableData);
      });
    }
    getData();
  }, [onFinishNewTopic]);

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
      key: "totpics",
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (icon) => (
        <Image
          src={
            icon || "https://cdn-icons-png.flaticon.com/128/1041/1041168.png"
          }
          width={50}
          height={50}
        />
      ),
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
              <Tooltip title="Delete">
                <Button
                  // onClick={() => handleDelete(record)}
                  icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
                />
              </Tooltip>
            </Flex>
          </>
        ),
    },
  ];
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
            autoComplete="off">
            <Form.Item
              label="Topics Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input Topics Name !",
                },
              ]}>
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
              ]}>
              <Input />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}>
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
              footer="">
              <Form
                form={editForm}
                // layout="vertical"
                onFinish={onFinishEdit}
                // onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Form.Item hidden name="id"></Form.Item>
                <Form.Item
                  name="name"
                  label="Topics"
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
                  <Input placeholder="Topics" />
                </Form.Item>
                <Form.Item
                  name="iconUrl"
                  label="Icon URL"
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
                  <Input placeholder="Icon URL" />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button
                      loading={loading}
                      disabled={loading}
                      type="primary"
                      htmlType="submit">
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
