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
const AddSubCategory = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [newForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editItem, setEditItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [tbllist, setTbllist] = useState([]);
  const [catlist, setCatllist] = useState([]);
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
        `${import.meta.env.VITE_API_URL}/v1/api/subcategory/add`,
        {
          name: values.subcategory.trim(),
          slug: slugVal,
          iconUrl: values.iconUrl.trim(),
          category: values.category,
        }
      );
      setLoading(false);
      setSlugVal("");
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
    setSlugVal(values?.slug);
    setEditStatus(values.status);
    editForm.setFieldsValue({
      id: values?._id,
      subcategory: values?.name,
      category: values?.category?._id,
      slug: values?.slug,
      iconUrl: values?.iconUrl,
      status: values?.status,
    });
  };

  const onFinishEdit = async (values) => {
    setLoading(true);
    if (
      editItem?.subcategory !== values?.subcategory ||
      editItem?.slug !== slugVal ||
      editItem?.category !== values?.category ||
      editItem?.iconUrl !== values?.iconUrl
    ) {
      try {
        const update = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/api/subcategory/edit`,
          {
            id: values?.id,
            subcategory: values?.subcategory,
            category: values?.category,
            slug: slugVal,
            iconUrl: values?.iconUrl,
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

  // Sub Category Info
  async function getSubCagegory() {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/api/subcategory/view`
    );
    const tableData = [];
    data?.data?.view?.map((item, i) => {
      tableData.push({
        sl: ++i,
        subcategory: item?.name,
        category: item?.category?.name,
        slug: item?.slug,
        icon: item?.iconUrl,
        status: item?.status,
        action: item,
      });
      setTbllist(tableData);
    });
  }

  // Category Info
  async function getCategory() {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/api/category/view`
    );
    const tableData = [];
    data?.data?.view?.map((item, i) => {
      tableData.push({
        value: item?._id,
        label: item?.name,
      });
      setCatllist(tableData);
    });
  }

  useEffect(() => {
    getCategory();
    getSubCagegory();
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
      title: "Sub Category",
      dataIndex: "subcategory",
      key: "subcategory",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
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
            autoComplete="off">
            <Form.Item
              //   label="Sub Category"
              name="subcategory"
              onChange={handleTitleChange}
              rules={[
                {
                  required: true,
                  message: "Please input Category Name !",
                },
              ]}>
              <Input placeholder="Sub Category" />
            </Form.Item>
            <Form.Item name="slug">
              <Input disabled placeholder={slugVal} />
            </Form.Item>
            <Form.Item
              //   label="Icon URL"
              name="iconUrl"
              rules={[
                {
                  required: true,
                  message: "Please input Icon URL !",
                },
              ]}>
              <Input placeholder="ICON URL" />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please input Category Name !",
                },
              ]}>
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="label"
                options={catlist}
              />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}>
                Add Sub Category
              </Button>
            </Form.Item>
          </Form>
        </Row>
        <Row>
          {/* {tbllist.length > 0 && ( */}
          <>
            <Divider>Category Details Table</Divider>
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
                    item.subcategory
                      .toLowerCase()
                      .includes(search.toLowerCase())
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
              title="Edit Sub-Category"
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
                  name="subcategory"
                  label="Sub-Category"
                  onChange={handleTitleChange}
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Slug">
                  <Input disabled placeholder={slugVal} />
                </Form.Item>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Please input Category Name !",
                    },
                  ]}>
                  <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="label"
                    options={catlist}
                  />
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
                        value: "approved",
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

export default AddSubCategory;
