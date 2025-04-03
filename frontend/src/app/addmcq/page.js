"use client";
import "@ant-design/v5-patch-for-react-19";
import React, { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
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
const CustomEditor = dynamic(() => import("@/components/CustomEditor"), {
  ssr: false,
});
import { useSelector } from "react-redux";
import Loading from "../loading";

const Addmcq = () => {
  const user = useSelector((user) => user?.loginSlice?.login);
  const [ckForm] = Form.useForm();
  const [error, setError] = useState(null);
  const [loadings, setLoadings] = useState(false);
  const [questionVal, setQuestionVal] = useState("");
  const [optA, setOptA] = useState("");
  const [optB, setOptB] = useState("");
  const [optC, setOptC] = useState("");
  const [optD, setOptD] = useState("");
  const [details, setDetails] = useState("");
  const [catList, setCatList] = useState([]);
  const [subCatList, setSubCatList] = useState([]);
  const [subjList, setSubjList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [tagName, setTagName] = useState([]);
  const inputRef = useRef(null);
  const [slugVal, setSlugVal] = useState("");
  const [subCatFlt, setSubCatFlt] = useState("");

  // slug change
  const handleTitleChange = (e) => {
    try {
      const titleVal = e.target.value;
      setTagName(titleVal);
      setSlugVal(titleVal.split(" ").join("-").toLowerCase());
    } catch (error) {
      console.log(error);
    }
  };

  // Sub-Category filter
  const handlCatCng = (e) => {
    try {
      const subCatFilter = subCatList.filter((item) =>
        e.some((key) => item.cat.includes(key))
      );
      setSubCatFlt(subCatFilter);
    } catch (error) {
      console.log(error);
    }
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
        `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/mcq/add`,
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
    try {
      e.preventDefault();
      await postData({ name: tagName, slug: slugVal });
      getTag();
      setTagName("");
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

    let completeValues = { ...values, createdBy: user?._id };

    // console.log("Success:", user);
    try {
      setError(null);
      const result = await postMCQData({ data: completeValues });
      message.success(result.message);
      ckForm.resetFields();
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

  useEffect(() => {
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
                Add MCQ
              </Title>
              <Suspense fallback={<Loading />}>
                <div>
                  <Form
                    form={ckForm}
                    name="ckForm"
                    initialValues={{
                      remember: true,
                    }}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <div>
                      <Form.Item
                        name="question"
                        label="Question"
                        rules={[
                          { required: true, message: "Please input Question!" },
                        ]}
                      >
                        <CustomEditor onChange={setQuestionVal} />
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
                          rules={[
                            {
                              required: true,
                              message: "Please input Option A!",
                            },
                          ]}
                        >
                          <CustomEditor onChange={setOptA} />
                        </Form.Item>
                        <Form.Item hidden>
                          <Input type="hidden" name="optA" value={optA} />
                        </Form.Item>
                      </Col>
                      <Col md={6}>
                        <Form.Item
                          name="optB"
                          label="Option B"
                          rules={[
                            {
                              required: true,
                              message: "Please input Option B!",
                            },
                          ]}
                        >
                          <CustomEditor onChange={setOptB} />
                        </Form.Item>
                        <Form.Item hidden>
                          <Input type="hidden" name="optB" value={optB} />
                        </Form.Item>
                      </Col>
                      <Col md={6}>
                        <Form.Item
                          name="optC"
                          label="Option C"
                          rules={[
                            {
                              required: true,
                              message: "Please input Option C!",
                            },
                          ]}
                        >
                          <CustomEditor onChange={setOptC} />
                        </Form.Item>
                        <Form.Item hidden>
                          <Input type="hidden" name="optC" value={optC} />
                        </Form.Item>
                      </Col>
                      <Col md={6}>
                        <Form.Item
                          name="optD"
                          label="Option D"
                          rules={[
                            {
                              required: true,
                              message: "Please input Option D!",
                            },
                          ]}
                        >
                          <CustomEditor onChange={setOptD} />
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
                          style={{
                            width: 300,
                          }}
                          rules={[
                            { required: true, message: "Slect Sub-Category!" },
                          ]}
                        >
                          <Select
                            mode="multiple"
                            allowClear
                            showSearch
                            placeholder="Select Sub-Category"
                            optionFilterProp="label"
                            // options={
                            //   subCatList !== "" &&
                            //   subCatList?.filter((item) =>
                            //     item?.cat.includes(catCng)
                            //   )
                            // }
                            options={subCatFlt}
                          />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          name="subject"
                          label="Related Subject"
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
                        <Form.Item name="tag" label="Tag/Referance">
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
                    <div>
                      <Form.Item name="details" label="Details">
                        <CustomEditor onChange={setDetails} />
                      </Form.Item>
                      <Form.Item hidden>
                        <Input type="hidden" name="details" value={details} />
                      </Form.Item>
                    </div>
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
              </Suspense>
            </div>
          </Col>
          {/* <Col md={6}>3</Col> */}
        </Row>
      </div>
    </>
  );
};

export default Addmcq;
