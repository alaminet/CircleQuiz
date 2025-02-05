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
} from "antd";
import { useSelector } from "react-redux";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import moment from "moment";

const AddTopic = () => {
  const { Text } = Typography;
  const user = useSelector((user) => user.loginSlice.login);
  const [editForm] = Form.useForm();
  const [editItem, setEditItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [findpartdlts] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [tbllist, setTbllist] = useState([]);
  const [itemlist, setitemlist] = useState([]);

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // Add new Topic
  const onFinishNewTopic = (values) => {
    console.log("Success:", values);
  };
  const onFinishNewTopicFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // form controll
  const onFinish = async (values) => {
    // console.log("Success:", values);
    setLoading(true);
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/tnx/partstock`,
        {
          code: values.code.toUpperCase().trim(),
        }
      );
      //   console.log(data?.data.receive);
      const recArr = [];
      let y = 1;
      data?.data.receive.map((receive, i) => {
        receive.receList.map((reclist, j) => {
          if (reclist.codeID == data.data.itemMatch._id) {
            recArr.push({
              sl: y++,
              recDate: moment(receive?.date).format("DD-MMM-YY"),
              tnxID: receive?.tnxID,
              code: data?.data?.itemMatch?.code,
              name: data?.data?.itemMatch?.itemname,
              loc: reclist?.locID?.loc,
              lot: receive?.lotID?.lot,
              recqty: reclist?.qty,
              issqty: reclist?.issue,
              onhand: reclist?.qty - reclist?.issue,
              action: reclist,
            });
          }
          setTbllist(recArr);
        });
      });
      setLoading(false);
      //   console.log(tbllist);
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.message);
    }

    // findpartdlts.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoading(false);
  };

  // edit table data
  const handleEdit = (values) => {
    // console.log(values);
    setIsModalOpen(true);
    setEditItem(values);
    editForm.setFieldsValue({
      id: values._id,
      loc: values.locID.loc,
      issue: values.issue,
      qty: values.qty,
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
        `${import.meta.env.VITE_API_URL}/v1/api/item/viewitemlist`
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({
          label: item.code + "_" + item.itemname,
          value: item.code,
        });
        setitemlist(tableData);
      });
    }
    getData();
  }, []);

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
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (item, record) =>
        (user.role === "admin" || user.role === "LM") && (
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
            name="basic"
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
              <Input style={{ maxWidth: "350px" }} />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
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
              {/* <Table
                style={{ width: "100%" }}
                dataSource={tbllist}
                columns={columns}
              /> */}
              <Table
                columns={columns}
                tableLayout="fixed"
                dataSource={
                  tbllist !== "" &&
                  tbllist.filter((item) =>
                    item.lot.toLowerCase().includes(search.toLowerCase())
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
                  name="loc"
                  label="Location"
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
                  <Input placeholder="Location" />
                </Form.Item>
                <Form.Item
                  name="qty"
                  label="Rec. Qty"
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
                  <InputNumber disabled placeholder="Receive Qty" />
                </Form.Item>
                <Form.Item
                  name="issue"
                  label="Issue Qty"
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
                  <InputNumber placeholder="Issue Qty" />
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
