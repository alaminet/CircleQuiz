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
  Modal,
  Select,
} from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import CKEditorInput from "../components/CKEditorInput";

const ViewDetails = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [queryData, setQueryData] = useState([]);
  const [isPostModal, setIsPostModal] = useState(false);
  const [editItem, setEditItem] = useState();
  const [editDtls, setEditDtls] = useState(editItem?.post);

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
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ minWidth: "100px" }}
          onChange={(e) => handleStatus(e, record.action._id)}
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
              <Tooltip title="Edit">
                <Button
                  onClick={() => handleEdit(item)}
                  icon={<EditTwoTone />}
                />
              </Tooltip>
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

  // Add new Topic
  const handleFind = async (values) => {
    setLoading(true);
    setQueryData(null);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/mcq/viewdesstatus`,
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
      let tableArr = [];
      let y = 1;
      res?.data?.viewArr?.map((item) => {
        tableArr.push({
          sl: y++,
          question: item?.qn,
          details: item?.details.post,
          status: item?.details.status,
          action: item?.details,
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

  // Edit Post Handler
  const handleEdit = (values) => {
    setIsPostModal(true);
    setEditItem(values);
    setEditDtls(values.post);
  };
  const handlePostOk = async () => {
    try {
      if (editItem?.post !== editDtls) {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/api/mcq/desupdate`,
          {
            postID: editItem?._id,
            post: editDtls,
          },
          {
            headers: {
              Authorization: import.meta.env.VITE_SECURE_API_KEY,
            },
          }
        );
        res && message.success(res?.data?.message);
      }
      setIsPostModal(false);
    } catch (error) {
      console.log(error);
      setIsPostModal(false);
    }
  };
  const handlePostCancel = () => {
    setEditItem(null);
    setIsPostModal(false);
  };

  // Post Status updated
  const handleStatus = async (status, postID) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/api/mcq/desupdate`,
      {
        postID: postID,
        status: status,
      },
      {
        headers: {
          Authorization: import.meta.env.VITE_SECURE_API_KEY,
        },
      }
    );
    res && message.success(res?.data?.message);
  };

  // Post Deleted
  const handleDelete = async (data) => {
    // postdlt
    console.log(data);
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v1/api/mcq/postdlt`,
      {
        postID: data,
      },
      {
        headers: {
          Authorization: import.meta.env.VITE_SECURE_API_KEY,
        },
      }
    );
    res && message.success(res?.data?.message);
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
            placeholder="Find by Post"
            variant="filled"
            style={{ marginBottom: "15px" }}
          />
          <Table
            columns={columns}
            tableLayout="auto"
            // dataSource={queryData}
            dataSource={
              queryData !== "" &&
              queryData?.filter((item) =>
                item?.details?.toLowerCase().includes(search?.toLowerCase())
              )
            }
            pagination={true}
            bordered
          />
        </div>
      </div>
      <div>
        <Modal
          title="Edit Details"
          open={isPostModal}
          onOk={handlePostOk}
          onCancel={handlePostCancel}
        >
          <CKEditorInput defaultData={editDtls} onChange={setEditDtls} />
        </Modal>
      </div>
    </>
  );
};

export default ViewDetails;
