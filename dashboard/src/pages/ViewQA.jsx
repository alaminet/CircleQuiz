import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Divider,
  Table,
  message,
  Flex,
  Tooltip,
  Radio,
  Select,
} from "antd";
import { useSelector } from "react-redux";
import { DeleteTwoTone } from "@ant-design/icons";

// Fixed header And colum in table
import { createStyles } from "antd-style";
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
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [qaList, setQAList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [subCatList, setSubCatList] = useState([]);
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
      title: "Question",
      dataIndex: "question",
      key: "question",
      width: 150,
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
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category, item) => (
        <Select
          mode="multiple"
          showSearch
          placeholder="Category"
          optionFilterProp="label"
          defaultValue={category}
          style={{ width: "220px" }}
          onChange={(e) => handleCatCng(e, item.action._id)}
          // onSearch={onSearch}
          options={catList}
        />
      ),
    },
    {
      title: "Sub Category",
      dataIndex: "subcategory",
      key: "subcategory",
      render: (subcategory, item) => (
        <Select
          mode="multiple"
          showSearch
          placeholder="Sub Category"
          optionFilterProp="label"
          defaultValue={subcategory}
          style={{ width: "220px" }}
          onChange={(e) => handleSubCatCng(e, item.action._id)}
          // onSearch={onSearch}
          options={subCatList}
        />
      ),
    },
    {
      title: "Topics",
      dataIndex: "topics",
      key: "topics",
      render: (topic, item) => (
        <Select
          mode="multiple"
          showSearch
          placeholder="Topics"
          optionFilterProp="label"
          defaultValue={topic}
          style={{ width: "220px" }}
          onChange={(e) => handleTopicCng(e, item.action._id)}
          // onSearch={onSearch}
          options={subjList}
        />
      ),
    },
    {
      title: "Ref/Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags, item) => (
        <Select
          mode="multiple"
          showSearch
          placeholder="Ref/Tags"
          optionFilterProp="label"
          defaultValue={tags}
          style={{ width: "220px" }}
          onChange={(e) => handleTagCng(e, item.action._id)}
          // onSearch={onSearch}
          options={tagList}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      fixed: "right",
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
          defaultValue={status}
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
      fixed: "right",
      render: (item, record) =>
        user.role === "admin" && (
          <>
            <Flex gap={4}>
              {/* <Tooltip title="Edit">
                <Button
                  onClick={() => handleEdit(item)}
                  icon={<EditTwoTone />}
                />
              </Tooltip> */}
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

  // View Status wise Details
  const handleFind = async (values) => {
    setLoading(true);
    setQAList(null);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/mcq/statusview`,
        {
          type: values?.QType,
          status: values?.status,
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_SECURE_API_KEY,
          },
        }
      );
      setLoading(false);
      message.success(res.data.message);
      // viewMCQ
      const tableData = [];
      let y = 1;
      res?.data?.viewMCQ?.map((item, i) => {
        tableData.push({
          dataIndex: i,
          sl: y++,
          topics: item?.topic?.map((item) => item._id),
          category: item?.category?.map((item) => item._id),
          subcategory: item?.subcategory?.map((item) => item._id),
          tags: item?.tag?.map((item) => item._id),
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
    } catch (error) {
      setLoading(false);
      message.error(error.code);
    }
  };
  const handleFindFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Category Change
  // field, value, postID
  const handleCatCng = async (values, post) => {
    // console.log(values, post);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/api/mcq/editfield`,
      {
        field: "category",
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

  // Sub Category Change
  const handleSubCatCng = async (values, post) => {
    // console.log(values, post);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/api/mcq/editfield`,
      {
        field: "subcategory",
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
  // Topic Change
  const handleTopicCng = async (values, post) => {
    // console.log(values, post);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/api/mcq/editfield`,
      {
        field: "topic",
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
  const handleTagCng = async (values, post) => {
    // console.log(values, post);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/api/mcq/editfield`,
      {
        field: "tag",
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
  // Status Change
  const handleStatusCng = async (values, post) => {
    // console.log(values, post);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/api/mcq/editfield`,
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
  // MCQ Delete
  const handleDelete = async (values) => {
    // console.log(values);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/api/mcq/editfield`,
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

  // Add new Tag
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/tag/add`,
        {
          name: tagnName,
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_SECURE_API_KEY,
          },
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

  // Get Category List
  const getCategory = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/api/category/view`,
      {
        headers: {
          Authorization: import.meta.env.VITE_SECURE_API_KEY,
        },
      }
    );
    const tableData = [];
    res?.data?.view?.map((item) => {
      item.status === "approved" &&
        tableData.push({
          label: item?.name,
          value: item?._id,
        });
      setCatList(tableData);
    });
  };
  // Get Category List
  const getSubCategory = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/api/subcategory/view`,
      {
        headers: {
          Authorization: import.meta.env.VITE_SECURE_API_KEY,
        },
      }
    );
    const tableData = [];
    res?.data?.view?.map((item) => {
      item.status === "approved" &&
        tableData.push({
          label: item?.name,
          value: item?._id,
        });
      setSubCatList(tableData);
    });
  };
  // Get Topics List
  const getTopics = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/api/topic/view`,
      {
        headers: {
          Authorization: import.meta.env.VITE_SECURE_API_KEY,
        },
      }
    );
    const tableData = [];
    res?.data?.view?.map((item) => {
      item.status === "approved" &&
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
      `${import.meta.env.VITE_API_URL}/v1/api/tag/view`,
      {
        headers: {
          Authorization: import.meta.env.VITE_SECURE_API_KEY,
        },
      }
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
    getCategory();
    getTag();
    getTopics();
    getSubCategory();
  }, []);
  return (
    <>
      <div>
        <Form
          layout="inline"
          form={form}
          name="form"
          autoComplete="off"
          onFinish={handleFind}
          onFinishFailed={handleFindFailed}>
          <Form.Item name="QType" label="">
            <Radio.Group
              block
              options={[
                {
                  label: "MCQ",
                  value: "MCQ",
                },
                {
                  label: "Written",
                  value: "written",
                },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>

          <Form.Item name="status" label="">
            <Radio.Group
              block
              options={[
                {
                  label: "Waiting",
                  value: "waiting",
                },
                {
                  label: "Approved",
                  value: "approved",
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
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}>
              Find
            </Button>
          </Form.Item>
        </Form>
      </div>
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
              qaList?.filter((item) =>
                item.question.toLowerCase().includes(search.toLowerCase())
              )
            }
            pagination={true}
            bordered
            scroll={{
              x: "max-content",
              // y: 55 * 5,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ViewQA;
