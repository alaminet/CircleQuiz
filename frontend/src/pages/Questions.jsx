import React, { useEffect, useState } from "react";
import { green, red } from "@ant-design/colors";
import { CloseCircleOutlined, createFromIconfontCN } from "@ant-design/icons";
import {
  Button,
  Flex,
  message,
  Progress,
  Steps,
  theme,
  Input,
  Radio,
  Space,
} from "antd";
import BasicLayout from "../components/BasicLayout";
import { shuffleArray } from "../helper/numberSuff";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ExamResult } from "../features/resultSlice";
const steps = [
  {
    _id: "1",
    title: "1",
    content:
      "কোনো একটি শ্রেণিতে ১১ জন শিক্ষার্থীর বয়সের গড় ১৩ বছর। ৩ শিক্ষার্থী নতুন ভর্তি হওয়ায় বয়সের গড় হলো ১২বছর। নতুন ৩ জন শিক্ষার্থীর বয়সের সমষ্টি কত বছর?",
    options: [
      {
        value: 1,
        label: "25",
      },
      {
        value: 2,
        label: "30",
      },
      {
        value: 3,
        label: "35",
      },
      {
        value: 4,
        label: "40",
      },
    ],
    ans: 1,
  },
  {
    _id: "2",
    title: "2",
    content:
      "দুইটি সংখ্যার অনুপাত ৪ঃ৫ এবং তাদের ল.সা.গু ১৬০ হলে ক্ষুদ্রতর সংখ্যাটি কত?",
    options: [
      {
        value: 1,
        label: "৩২",
      },
      {
        value: 2,
        label: "৪০",
      },
      {
        value: 3,
        label: "৪২",
      },
      {
        value: 4,
        label: "৪৫",
      },
    ],
    ans: 2,
  },
  {
    _id: "3",
    title: "3",
    content:
      "২৪০ টাকায় ১২টি কমলা ক্রয় করে ২০০ টাকায় ৮টি কমলা বিক্রয় করলে শতকরা কত লাভ বা ক্ষতি হবে?",
    options: [
      {
        value: 1,
        label: "২৫% লাভ",
      },
      {
        value: 2,
        label: "২৫% ক্ষতি",
      },
      {
        value: 3,
        label: "২০% লাভ",
      },
      {
        value: 4,
        label: "২০% ক্ষতি",
      },
    ],
    ans: 1,
  },
];

const Questions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [finished, setFinished] = useState(false);

  // Random Radio Number
  const numbers = [0, 1, 2, 3];
  const shuffledNumbers = shuffleArray(numbers);

  const next = () => {
    setCurrent(current + 1);
    const obj = answer.find((obj) => obj.qID === steps[current]._id);
    if (obj) {
      obj.ansSelect = value;
      setValue(answer[current + 1]?.ansSelect);
    } else {
      let ansArry = [];
      ansArry.push({
        qID: steps[current]._id,
        content: steps[current].content,
        options: steps[current].options,
        ansSelect: value,
        ansCorrect: steps[current].ans,
      });
      setAnswer((pre) => [...pre, ...ansArry]);
      setValue(null);
    }
  };
  const prev = () => {
    setCurrent(current - 1);
    setValue(answer[current - 1]?.ansSelect);
  };

  const fini = () => {
    const obj = answer.find((obj) => obj.qID === steps[current]._id);
    if (obj) {
      obj.ansSelect = value;
    } else {
      let ansArry = [];
      ansArry.push({
        qID: steps[current]._id,
        content: steps[current].content,
        options: steps[current].options,
        ansSelect: value,
        ansCorrect: steps[current].ans,
      });
      setAnswer((pre) => [...pre, ...ansArry]);
      setValue(null);
    }
    setFinished(true);
    message.success("Exam Submitted");
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    color: "#1C1C1C",
    backgroundColor: "#DCF8FF",
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: "10px",
    lineHeight: "22px",
  };

  // radio selection
  const [value, setValue] = useState(null);
  const onChangeRadio = (e) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  useEffect(() => {
    if (finished) {
      dispatch(ExamResult(answer));
      localStorage.setItem("ExamResult", JSON.stringify(answer));
      navigate("/result");
    }
  }, [fini]);

  return (
    <>
      <BasicLayout>
        <Flex gap={16} justify="space-between" align="center">
          <div>
            <CloseCircleOutlined style={{ fontSize: "30px" }} />
          </div>
          <div>
            <Progress percent={50} size={[220, 10]} strokeColor="#FF9F41" />
          </div>
          <div>
            <Progress
              type="circle"
              percent={90}
              format={(percent) => `${percent}`}
              size="small"
              strokeColor={{
                "0%": "#87d068",
                "50%": "#ffe58f",
                "100%": "#ffccc7",
              }}
            />
          </div>
        </Flex>
        {/* <Steps current={current} items={items} /> */}
        <div>
          <div style={contentStyle}>{steps[current].content}</div>
          <div>
            <Radio.Group
              onChange={onChangeRadio}
              value={value}
              className="question-radio-group"
              style={{ width: "100%" }}>
              <Space direction="vertical">
                {/* {steps[current]?.options?.map((opt, j) => (
                  <>
                    <Radio
                      key={j}
                      value={opt?.value}
                      style={{
                        color: "#1C1C1C",
                        backgroundColor: "#EFEFEF",
                        borderRadius: token.borderRadiusLG,
                        border: `1px dashed ${token.colorBorder}`,
                        marginTop: 15,
                        padding: "10px",
                        width: "100%",
                        fontWeight: "bold",
                      }}>
                      {opt?.label}
                    </Radio>
                  </>
                ))} */}
                <Radio
                  value={steps[current]?.options[shuffledNumbers[0]]?.value}
                  style={{
                    color: "#1C1C1C",
                    backgroundColor: "#EFEFEF",
                    borderRadius: token.borderRadiusLG,
                    border: `1px dashed ${token.colorBorder}`,
                    marginTop: 15,
                    padding: "10px",
                    width: "100%",
                    fontWeight: "bold",
                  }}>
                  {steps[current]?.options[shuffledNumbers[0]]?.label}
                </Radio>
                <Radio
                  value={steps[current]?.options[shuffledNumbers[1]]?.value}
                  style={{
                    color: "#1C1C1C",
                    backgroundColor: "#EFEFEF",
                    borderRadius: token.borderRadiusLG,
                    border: `1px dashed ${token.colorBorder}`,
                    marginTop: 15,
                    padding: "10px",
                    width: "100%",
                    fontWeight: "bold",
                  }}>
                  {steps[current]?.options[shuffledNumbers[1]]?.label}
                </Radio>
                <Radio
                  value={steps[current]?.options[shuffledNumbers[2]]?.value}
                  style={{
                    color: "#1C1C1C",
                    backgroundColor: "#EFEFEF",
                    borderRadius: token.borderRadiusLG,
                    border: `1px dashed ${token.colorBorder}`,
                    marginTop: 15,
                    padding: "10px",
                    width: "100%",
                    fontWeight: "bold",
                  }}>
                  {steps[current]?.options[shuffledNumbers[2]]?.label}
                </Radio>
                <Radio
                  value={steps[current]?.options[shuffledNumbers[3]]?.value}
                  style={{
                    color: "#1C1C1C",
                    backgroundColor: "#EFEFEF",
                    borderRadius: token.borderRadiusLG,
                    border: `1px dashed ${token.colorBorder}`,
                    marginTop: 15,
                    padding: "10px",
                    width: "100%",
                    fontWeight: "bold",
                  }}>
                  {steps[current]?.options[shuffledNumbers[3]]?.label}
                </Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>

        <div
          style={{
            marginTop: 24,
          }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => fini()}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </BasicLayout>
    </>
  );
};

export default Questions;
