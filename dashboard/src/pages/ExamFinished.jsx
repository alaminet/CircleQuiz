import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Radio, Result } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const ExamFinished = () => {
  const [view, setView] = useState(false);
  const examResult = useSelector(
    (ExamResult) => ExamResult?.examResult?.results
  );
  const scroes = examResult?.filter(
    (value) => value?.ansCorrect === value?.ansSelect
  ).length;

  return (
    <>
      <div>
        <Result
          status="success"
          title={`Your Score is ${Math.round(
            (scroes / examResult?.length) * 100
          )}%`}
          subTitle="Your test has been completed successfully!"
          extra={[
            <Button
              className="no-print"
              type="primary"
              key="console"
              onClick={() => setView(true)}
            >
              View Results
            </Button>,
            <Button
              disabled={!view}
              onClick={() => window.print()}
              className="no-print"
              style={{ margin: "10px auto" }}
            >
              Print this Result
            </Button>,
          ]}
        />
      </div>
      {view && (
        <>
          <div>
            {examResult?.map((item, i) => (
              <div key={i}>
                <p style={{ display: "flex", gap: "10px" }}>
                  <span>{i + 1 + ". "}</span>
                  <span>{item?.content}</span>
                </p>
                <p style={{ display: "flex", gap: "10px", margin: "0" }}>
                  <span style={{ fontWeight: "bold" }}>Options:</span>
                  {item?.options?.map((opt, j) => (
                    <div key={j} style={{ display: "flex", gap: "5px" }}>
                      <span>{j + 1 + ". "}</span>

                      {/* <Radio.Group
                      buttonSolidCheckedActiveBg="#fff"
                      type="select"
                      value={item.ansSelect}
                      options={[opt]}
                    /> */}
                      <div>
                        <span>{opt?.label} </span>
                        {item?.ansSelect === opt?.value && (
                          <CheckOutlined style={{ fontWeight: "bold" }} />
                        )}
                      </div>
                    </div>
                  ))}
                </p>
                <p style={{ marginTop: "0", display: "flex", gap: "5px" }}>
                  <span style={{ fontWeight: "bold" }}>Ans:</span>
                  <span
                    style={{
                      color:
                        item?.ansCorrect === item?.ansSelect ? "green" : "red",
                    }}
                  >
                    {item?.options[item?.ansCorrect - 1].label}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ExamFinished;
