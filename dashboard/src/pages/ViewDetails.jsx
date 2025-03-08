import React, { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Radio,
  Table,
  Tooltip,
  Flex,
} from "antd";
import { EditTwoTone, PlusOutlined, DeleteTwoTone } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewDetails = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [queryData, setQueryData] = useState([]);

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
      render: (question) => (
        <div dangerouslySetInnerHTML={{ __html: question }} />
      ),
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (details) => (
        <div dangerouslySetInnerHTML={{ __html: details }} />
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
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

  // Add new Topic
  const handleFind = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/mcq/viewdesstatus`,
        {
          type: values?.QType,
          status: values?.status,
        }
      );

      setLoading(false);
      form.resetFields();
      message.success(res.data.message);
      let tableArr = [];
      let y = 1;
      //   console.log(res?.data);

      res?.data?.viewArr?.map((item) => {
        item.map((q) => {
          console.log(q);
          tableArr.push({
            sl: y++,
            question: q?.qn,
            details: q?.details.post,
            status: q?.details.status,
            action: q?.details,
          });
        });

        setQueryData(tableArr);
      });
    } catch (error) {
      setLoading(false);
      message.error(error.code);
    }
  };
  const handleFindFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div>
        <Form
          layout="inline"
          form={form}
          name="form"
          autoComplete="off"
          onFinish={handleFind}
          onFinishFailed={handleFindFailed}
        >
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
              disabled={loading}
            >
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
            columns={columns}
            tableLayout="auto"
            dataSource={queryData}
            // dataSource={
            //     queryData !== "" &&
            //     queryData.filter((item) =>
            //     item.post.toLowerCase().includes(search.toLowerCase())
            //   )
            // }
            pagination={true}
            bordered
          />
        </div>
      </div>
    </>
  );
};

export default ViewDetails;
