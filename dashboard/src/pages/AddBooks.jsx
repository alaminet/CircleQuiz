import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Row,
  Divider,
  Table,
  message,
  Flex,
  Tooltip,
  Image,
  Radio,
  Select,
  Typography,
  Tag,
  theme,
  Popover,
} from "antd";
import { useSelector } from "react-redux";
import { EditTwoTone, DeleteTwoTone, PlusOutlined } from "@ant-design/icons";

const AddBooks = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [newForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [tbllist, setTbllist] = useState([]);
  const [subCatlist, setSubCatllist] = useState([]);
  const [lessonSlug, setLessonSlug] = useState("");
  const { Title, Paragraph } = Typography;

  // slug change
  const handleLessonCng = (e) => {
    let titleVal = e.target.value;
    setLessonSlug(titleVal.split(" ").join("-").toLowerCase());
  };

  // Add new Topic
  const onFinishNewTopic = async (values) => {
    setLoading(true);
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/book/add`,
        {
          name: values.name.trim(),
          slug: lessonSlug,
          iconUrl: values.iconUrl.trim(),
          subCategory: values.subCategory,
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_SECURE_API_KEY,
          },
        }
      );
      setLoading(false);
      setSlugVal("");
      newForm.resetFields();
      message.success(data?.data.message);
    } catch (error) {
      setLoading(false);
      message.warning(error.response.data.message);
    }
  };
  const onFinishNewTopicFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Books Info
  async function getBooks() {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/api/book/view`,
      {
        headers: {
          Authorization: import.meta.env.VITE_SECURE_API_KEY,
        },
      }
    );
    const tableData = [];
    data?.data?.view?.map((item, i) => {
      tableData.push({
        sl: ++i,
        subcategory: item?.subCategory?.name,
        book: item?.name,
        slug: item?.slug,
        icon: item?.iconUrl,
        lesson: item?.lesson,
        status: item?.status,
        action: item,
      });
      setTbllist(tableData);
    });
  }

  // SubCategory Info
  async function getSubCagegory() {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/api/subcategory/view`,
      {
        headers: {
          Authorization: import.meta.env.VITE_SECURE_API_KEY,
        },
      }
    );
    const tableData = [];
    data?.data?.view?.map((item, i) => {
      tableData.push({
        value: item?._id,
        label: item?.name,
      });
      setSubCatllist(tableData);
    });
  }

  useEffect(() => {
    getSubCagegory();
    getBooks();
  }, [onFinishNewTopic]);

  // Lesson Tag Function
  const tagInputStyle = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
  };
  const { token } = theme.useToken();
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleClose = async (post, lesson, removedTag) => {
    const newTags = lesson.filter((tag) => tag !== removedTag);
    setTags(newTags);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/api/book/editfield`,
      {
        field: "lesson",
        postID: post,
        value: newTags,
      },
      {
        headers: {
          Authorization: import.meta.env.VITE_SECURE_API_KEY,
        },
      }
    );
    message.success(res?.data.message);
  };

  const handleInputConfirm = async (post, lesson) => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...lesson, inputValue]);
      // postID, newLesson
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/book/lessonadd`,
        {
          postID: post,
          newLesson: inputValue.trim(),
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_SECURE_API_KEY,
          },
        }
      );
      message.success(res?.data.message);
    }
    setInputValue("");
  };

  const tagPlusStyle = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  // Lesson Tag Function End

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
      width: 100,
    },
    {
      title: "Book",
      dataIndex: "book",
      key: "book",
      render: (book, record) => (
        <Paragraph
          style={{ margin: "0" }}
          editable={{
            onChange: (e) => handleBookCng(e, record.action._id),
          }}>
          {book}
        </Paragraph>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (slug, record) => (
        <Paragraph
          style={{ margin: "0" }}
          editable={{
            onChange: (e) => handleSlugCng(e, record.action._id),
          }}>
          {slug}
        </Paragraph>
      ),
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (icon, record) => (
        <div>
          <Image src={icon} width={50} height={50} />
          <Paragraph
            style={{ margin: "0" }}
            editable={{
              onChange: (e) => handleIconCng(e, record.action._id),
            }}>
            {icon}
          </Paragraph>
        </div>
      ),
    },
    {
      title: "Lesson",
      dataIndex: "lesson",
      key: "lesson",
      render: (lesson, record) => (
        <Flex gap="4px 0" wrap>
          {lesson.map((tag, index) => {
            return (
              <Tag
                key={index}
                closable
                style={{ userSelect: "none" }}
                onClose={() => handleClose(record.action._id, lesson, tag)}>
                <Paragraph
                  style={{ margin: "0", display: "inline" }}
                  editable={{
                    onChange: (e) =>
                      handleLessEdit(e, record.action._id, index, lesson),
                  }}>
                  {tag}
                </Paragraph>
              </Tag>
            );
          })}
          <Popover
            content={
              <div>
                <Input
                  type="text"
                  size="middle"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onBlur={() => handleInputConfirm(record.action._id, lesson)}
                  onPressEnter={() =>
                    handleInputConfirm(record.action._id, lesson)
                  }
                />
              </div>
            }
            trigger="click">
            <Tag style={tagPlusStyle} icon={<PlusOutlined />}>
              New Lesson
            </Tag>
          </Popover>
        </Flex>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 130,
      filters: [
        {
          text: "Approve",
          value: "approved",
        },
        {
          text: "Waiting",
          value: "waiting",
        },
        {
          text: "Hold",
          value: "hold",
        },
        {
          text: "Delete",
          value: "delete",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status, record) => (
        <Select
          optionFilterProp="label"
          value={status}
          style={{ minWidth: "100px" }}
          onChange={(e) => handleStatusCng(e, record.action._id)}
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
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 80,
      render: (record) =>
        user.role === "admin" && (
          <>
            <Flex gap={4}>
              <Tooltip title="Delete">
                <Button
                  onClick={() => handleDelete(record.action._id)}
                  icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
                />
              </Tooltip>
            </Flex>
          </>
        ),
    },
  ];

  // Status Change
  const handleStatusCng = async (values, post) => {
    // console.log(values, post);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/api/book/editfield`,
      {
        field: "status",
        postID: post,
        value: values,
      },
      {
        headers: {
          Authorization: import.meta.env.VITE_SECURE_API_KEY,
        },
      }
    );
    message.success(res?.data.message);
  };

  // Book Name Change
  const handleBookCng = async (values, post) => {
    // console.log(values, post);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/api/book/editfield`,
      {
        field: "name",
        postID: post,
        value: values,
      },
      {
        headers: {
          Authorization: import.meta.env.VITE_SECURE_API_KEY,
        },
      }
    );
    message.success(res?.data.message);
  };

  // Book Slug Change
  const handleSlugCng = async (values, post) => {
    // console.log(values, post);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/api/book/editfield`,
      {
        field: "slug",
        postID: post,
        value: values,
      },
      {
        headers: {
          Authorization: import.meta.env.VITE_SECURE_API_KEY,
        },
      }
    );
    message.success(res?.data.message);
  };

  // Book Icon Change
  const handleIconCng = async (values, post) => {
    // console.log(values, post);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/api/book/editfield`,
      {
        field: "iconUrl",
        postID: post,
        value: values,
      },
      {
        headers: {
          Authorization: import.meta.env.VITE_SECURE_API_KEY,
        },
      }
    );
    message.success(res?.data.message);
  };

  // Lesson Edit Change
  const handleLessEdit = async (values, post, index, lesson) => {
    // console.log(values, post, index, lesson);
    const newTags = [...lesson];
    newTags[index] = values;
    if (values && !lesson.includes(values)) {
      setTags(newTags);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/book/editfield`,
        {
          field: "lesson",
          postID: post,
          value: newTags,
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_SECURE_API_KEY,
          },
        }
      );
      message.success(res?.data.message);
    }
  };

  // MCQ Delete
  const handleDelete = async (values) => {
    // console.log(values);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/api/book/editfield`,
      {
        field: "delete",
        postID: values,
      },
      {
        headers: {
          Authorization: import.meta.env.VITE_SECURE_API_KEY,
        },
      }
    );
    message.success(res?.data.message);
  };
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
              style={{ width: "200px" }}
              name="subCategory"
              rules={[
                {
                  required: true,
                  message: "Please select Sub-Category !",
                },
              ]}>
              <Select
                showSearch
                allowClear
                placeholder="Select Sub-Category"
                optionFilterProp="label"
                options={subCatlist}
              />
            </Form.Item>
            <Form.Item
              style={{ width: "200px" }}
              name="name"
              rules={[
                {
                  required: true,
                  message: "Input Book Name",
                },
              ]}>
              <Input onChange={handleLessonCng} placeholder="Book Name" />
            </Form.Item>
            <Form.Item name="slug">
              <Input
                disabled
                defaultValue={lessonSlug}
                placeholder={lessonSlug}
              />
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
              <Input placeholder="Icon URL" />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}>
                Add Book
              </Button>
            </Form.Item>
          </Form>
        </Row>
        <Row>
          {/* {tbllist.length > 0 && ( */}
          <>
            <Divider>Book & Lesson Details Table</Divider>
            <div>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find by Sub-Category"
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
                pagination={true}
                bordered
              />
            </div>
          </>
        </Row>
      </div>
    </>
  );
};

export default AddBooks;
