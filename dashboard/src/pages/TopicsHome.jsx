import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Card, Col, Divider, Flex, Row, Typography } from "antd";
const { Title, Text } = Typography;

const TopicsHome = () => {
  const [tbllist, setTbllist] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/api/topic/view`
      );

      const tableData = [];
      data?.data?.view?.map((item, i) => {
        if (item?.status === "approve") {
          tableData.push({
            sl: ++i,
            topics: item?.name,
            icon: item?.iconUrl,
            action: item,
          });
          setTbllist(tableData);
        }
      });
    }
    getData();
  }, []);
  return (
    <>
      <div>
        <Row gutter={[16, 16]} justify="start" align="middle">
          {tbllist?.map((item, i) => (
            <Col key={i} xs={12} lg={6}>
              <Flex
                justify="space-between"
                wrap
                gap="small"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.09) 0px 5px 12px 4px",
                  borderRadius: "14px",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <Card style={{ width: "100%" }} bordered={false}>
                  <div>
                    <div>
                      <img src={item?.icon} alt={item?.topics} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "16px",
                          margin: "0",
                          lineHeight: "17px",
                          fontWeight: "500",
                          textTransform: "uppercase",
                        }}
                      >
                        {item?.topics}
                      </p>
                      {/* <p
                    style={{
                      fontSize: "18px",
                      margin: "0",
                      fontWeight: "bold",
                      color: "#3EB8D4",
                    }}
                  >
                    {item?.topic} topics
                  </p> */}
                    </div>
                  </div>
                </Card>
              </Flex>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default TopicsHome;
