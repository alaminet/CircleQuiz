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
const AddTag = () => {
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
  const [slugVal, setSlugVal] = useState("");

  // slug change
  const handleTitleChange = (e) => {
    let titleVal = e.target.value;
    setSlugVal(titleVal.split(" ").join("-").toLowerCase());
  };

  // Add new Topic
  const onFinishNewTopic = async (values) => {
    setLoading(true);
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/tag/add`,
        {
          name: values?.tag.trim(),
          slug: slugVal,
        }
      );
      setLoading(false);
      newForm.resetFields();
      message.success(data.data.message);
      setSlugVal("");
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
    setSlugVal(values?.slug);
    editForm.setFieldsValue({
      id: values?._id,
      tag: values?.name,
      slug: values?.slug,
      status: values?.status,
    });
  };

  const onFinishEdit = async (values) => {
    setLoading(true);
    if (editItem?.tag !== values?.tag || editItem?.slug !== values?.slug) {
      try {
        const update = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/api/tag/edit`,
          {
            id: values?.id,
            tag: values?.tag,
            slug: slugVal,
            status: editStatus,
          }
        );
        message.success(update.data.message);
        setLoading(false);
        setIsModalOpen(false);
        setSlugVal("");
      } catch (error) {
        setLoading(false);
        message.error(error.response.data.message);
      }
    }
  };
  const handleCancel = () => {
    setLoading(false);
    setIsModalOpen(false);
    setSlugVal("");
  };

  // Topics Info
  useEffect(() => {
    async function getData() {
      const data = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/api/tag/view`
      );

      const tableData = [];
      data?.data?.view?.map((item, i) => {
        tableData.push({
          sl: ++i,
          tag: item?.name,
          slug: item?.slug,
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
      title: "Tag Name",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
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
            autoComplete="off">
            <Form.Item
              label="Tag Name"
              onChange={handleTitleChange}
              name="tag"
              rules={[
                {
                  required: true,
                  message: "Please input Tag Name !",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item label="Slug" name="slug">
              <Input disabled placeholder={slugVal} />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}>
                Add Tag
              </Button>
            </Form.Item>
          </Form>
        </Row>
        <Row>
          {/* {tbllist.length > 0 && ( */}
          <>
            <Divider>Tag Details Table</Divider>
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
                    item.tag.toLowerCase().includes(search.toLowerCase())
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
              title="Edit Tag"
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
                  name="tag"
                  label="Tag"
                  onChange={handleTitleChange}
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
                  <Input placeholder="Tag" />
                </Form.Item>
                <Form.Item label="Slug" name="slug">
                  <Input disabled placeholder={slugVal} />
                </Form.Item>
                <Form.Item
                  // name="status"
                  label="Status"
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
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
                      htmlType="submit">
                      Update
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

export default AddTag;
