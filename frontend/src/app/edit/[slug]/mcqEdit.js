"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Form,
  Col,
  Row,
  Input,
  Select,
  Divider,
  Space,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import CustomEditor from "@/components/CustomEditor";

const MCQEdit = ({ id }) => {
  const user = useSelector((user) => user?.loginSlice?.login);
  const [ckform] = Form.useForm();
  const [editItem, setEditItem] = useState();
  const [error, setError] = useState(null);
  const [loadings, setLoadings] = useState(false);
  const [questionVal, setQuestionVal] = useState("");
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");
  const [catList, setCatList] = useState([]);
  const [subjList, setSubjList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [tagName, setTagName] = useState([]);
  const inputRef = useRef(null);
  const [slugVal, setSlugVal] = useState("");
  const [subCatList, setSubCatList] = useState([]);
  const [subCatFlt, setSubCatFlt] = useState();

  // slug change
  const handleTitleChange = (e) => {
    let titleVal = e.target.value;
    setTagName(titleVal);
    setSlugVal(titleVal.split(" ").join("-").toLowerCase());
  };

  // Sub-Category filter
  const handlCatCng = (e) => {
    const subCatFilter = subCatList?.filter((item) =>
      e.some((key) => item.cat.includes(key))
    );
    setSubCatFlt(subCatFilter);
  };

  // New Tag Added server enviroment
  const postData = async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/tag/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  };

  // New MCQ add Environment
  const postMCQData = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/mcq/editid`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      await postData({ name: tagName, slug: slugVal });
      getTag();
      setName("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Form Submit
  const onFinish = async (values) => {
    setLoadings(true);
    try {
      setError(null);
      const result = await postMCQData(values);
      console.log(result);

      message.success(result.message);
      setLoadings(false);
    } catch (error) {
      setError(error.message);
      message.error(error.message);
      setLoadings(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoadings(false);
  };

  // Get Category List
  const getCategory = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/category/view`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    const tableData = [];
    data?.view?.map((item) => {
      item.status === "approved" &&
        tableData.push({
          label: item?.name,
          value: item?._id,
        });
      setCatList(tableData?.sort((a, b) => a.label.localeCompare(b.label)));
    });
  };

  // Get Sub-Category List

  const getSubCategory = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/subcategory/view`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    const tableData = [];
    data?.view?.map((item) => {
      item.status === "approved" &&
        tableData.push({
          label: item?.name,
          value: item?._id,
          cat: item?.category?._id,
        });
      setSubCatList(tableData?.sort((a, b) => a.label.localeCompare(b.label)));
      setSubCatFlt(tableData?.sort((a, b) => a.label.localeCompare(b.label)));
    });
  };

  // Get Topics List
  const getTopics = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/topic/view`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    const tableData = [];
    data?.view?.map((item) => {
      item.status === "approved" &&
        tableData.push({
          label: item?.name,
          value: item?._id,
        });
      setSubjList(tableData?.sort((a, b) => a.label.localeCompare(b.label)));
    });
  };
  // Get Tag List
  const getTag = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/tag/view`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    const tableData = [];
    data?.view?.map((item) => {
      tableData.push({
        label: item?.name,
        value: item?._id,
      });
      setTagList(tableData?.sort((a, b) => a.label.localeCompare(b.label)));
    });
  };

  // Get MCQ List
  const getMCQ = async (slug) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/mcq/viewid/${slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setEditItem(data?.view);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMCQ(id);
    getCategory();
    getSubCategory();
    getTopics();
    getTag();
  }, []);

  return (
    <>
      <div>
        <Row>
          {/* <Col md={6}>1</Col> */}
          <Col md={24}>
            <div>
              <Title style={{ textAlign: "center" }} level={3}>
                Edit MCQ
              </Title>
              {editItem && (
                <>
                  <div>
                    <Form
                      form={ckform}
                      name="ckFormField"
                      initialValues={{
                        remember: true,
                      }}
                      layout="vertical"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <Form.Item name="id" hidden initialValue={editItem?._id}>
                        <Input />
                      </Form.Item>
                      <div>
                        <Form.Item
                          name="question"
                          label="Question"
                          initialValue={editItem?.question}
                          rules={[
                            {
                              required: true,
                              message: "Please input Question!",
                            },
                          ]}
                        >
                          <CustomEditor
                            onChange={setQuestionVal}
                            defaultData={editItem?.question}
                          />
                        </Form.Item>

                        <Form.Item hidden>
                          <Input
                            type="hidden"
                            name="question"
                            value={questionVal}
                          />
                        </Form.Item>
                      </div>
                      <Row gutter={10}>
                        <Col md={6}>
                          <Form.Item
                            name="optA"
                            label="Option A"
                            initialValue={editItem?.options[0]}
                            rules={[
                              {
                                required: true,
                                message: "Please input Option A!",
                              },
                            ]}
                          >
                            <CustomEditor
                              onChange={setOptA}
                              defaultData={editItem?.options[0]}
                            />
                          </Form.Item>
                          <Form.Item hidden>
                            <Input type="hidden" name="optA" value={optA} />
                          </Form.Item>
                        </Col>
                        <Col md={6}>
                          <Form.Item
                            name="optB"
                            label="Option B"
                            initialValue={editItem?.options[1]}
                            rules={[
                              {
                                required: true,
                                message: "Please input Option B!",
                              },
                            ]}
                          >
                            <CustomEditor
                              onChange={setOptB}
                              defaultData={editItem?.options[1]}
                            />
                          </Form.Item>
                          <Form.Item hidden>
                            <Input type="hidden" name="optB" value={optB} />
                          </Form.Item>
                        </Col>
                        <Col md={6}>
                          <Form.Item
                            name="optC"
                            label="Option C"
                            initialValue={editItem?.options[2]}
                            rules={[
                              {
                                required: true,
                                message: "Please input Option C!",
                              },
                            ]}
                          >
                            <CustomEditor
                              onChange={setOptC}
                              defaultData={editItem?.options[2]}
                            />
                          </Form.Item>
                          <Form.Item hidden>
                            <Input type="hidden" name="optC" value={optC} />
                          </Form.Item>
                        </Col>
                        <Col md={6}>
                          <Form.Item
                            name="optD"
                            label="Option D"
                            initialValue={editItem?.options[3]}
                            rules={[
                              {
                                required: true,
                                message: "Please input Option D!",
                              },
                            ]}
                          >
                            <CustomEditor
                              onChange={setOptD}
                              defaultData={editItem?.options[3]}
                            />
                          </Form.Item>
                          <Form.Item hidden>
                            <Input type="hidden" name="optD" value={optD} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={10}>
                        <Col>
                          <Form.Item
                            name="answer"
                            label="Correct Answer"
                            initialValue={editItem?.ans}
                            rules={[
                              { required: true, message: "Slect Correct Ans!" },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Select Answer"
                              optionFilterProp="label"
                              options={[
                                {
                                  value: 0,
                                  label: "A",
                                },
                                {
                                  value: 1,
                                  label: "B",
                                },
                                {
                                  value: 2,
                                  label: "C",
                                },
                                {
                                  value: 3,
                                  label: "D",
                                },
                              ]}
                            />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            name="category"
                            label="Category"
                            initialValue={editItem?.category?.map(
                              (item) => item._id
                            )}
                            style={{
                              width: 300,
                            }}
                            rules={[
                              { required: true, message: "Slect Category!" },
                            ]}
                          >
                            <Select
                              mode="multiple"
                              allowClear
                              showSearch
                              onChange={handlCatCng}
                              placeholder="Select Category"
                              optionFilterProp="label"
                              options={catList}
                            />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            name="subcategory"
                            label="Sub Category"
                            initialValue={editItem?.subcategory?.map(
                              (item) => item._id
                            )}
                            style={{
                              width: 300,
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Slect Sub-Category!",
                              },
                            ]}
                          >
                            <Select
                              mode="multiple"
                              allowClear
                              showSearch
                              placeholder="Select Sub-Category"
                              optionFilterProp="label"
                              options={subCatFlt}
                            />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            name="subject"
                            label="Related Subject"
                            initialValue={editItem?.topic?.map(
                              (item) => item._id
                            )}
                            style={{
                              width: 300,
                            }}
                            rules={[
                              {
                                required: true,
                                message: "Slect Related Subject!",
                              },
                            ]}
                          >
                            <Select
                              mode="multiple"
                              allowClear
                              showSearch
                              placeholder="Select Subject"
                              optionFilterProp="label"
                              options={subjList}
                            />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            name="tag"
                            label="Tag/Referance"
                            initialValue={editItem?.tag?.map(
                              (item) => item._id
                            )}
                          >
                            <Select
                              mode="multiple"
                              allowClear
                              style={{
                                minWidth: 300,
                              }}
                              placeholder="Tag/Ref"
                              dropdownRender={(menu) => (
                                <>
                                  {menu}
                                  <Divider
                                    style={{
                                      margin: "8px 0",
                                    }}
                                  />
                                  <Space
                                    style={{
                                      padding: "0 8px 4px",
                                    }}
                                  >
                                    <Input
                                      placeholder="Please enter item"
                                      ref={inputRef}
                                      value={tagName}
                                      onChange={handleTitleChange}
                                      onKeyDown={(e) => e.stopPropagation()}
                                    />
                                    <Button
                                      type="text"
                                      icon={<PlusOutlined />}
                                      onClick={addItem}
                                    >
                                      Add item
                                    </Button>
                                  </Space>
                                </>
                              )}
                              options={tagList}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loadings}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </>
              )}
            </div>
          </Col>
          {/* <Col md={6}>3</Col> */}
        </Row>
      </div>
    </>
  );
};

export default MCQEdit;
