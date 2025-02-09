import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Card, Col, Divider, Flex, Row, Typography } from "antd";
const { Title, Text } = Typography;
import trophyImg from "../assets/images/trophy.png";
import coinImg from "../assets/images/coin.png";

const Home = () => {
  return (
    <>
      <Row justify="start" align="middle">
        <Col span={24}>
          <Flex
            justify="space-between"
            wrap
            gap="small"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.09) 0px 5px 12px 4px",
              borderRadius: "14px",
            }}
          >
            <Card bordered={false}>
              <Flex justify="center" align="center" gap="small">
                <div>
                  <img src={trophyImg} alt="" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      margin: "0",
                      lineHeight: "17px",
                    }}
                  >
                    Ranking
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      margin: "0",
                      fontWeight: "bold",
                      color: "#3EB8D4",
                    }}
                  >
                    1200
                  </p>
                </div>
              </Flex>
            </Card>
            <Divider type="vertical" style={{ height: "auto" }} />
            <Card bordered={false}>
              <Flex justify="center" align="center" gap="small">
                <div>
                  <img src={coinImg} alt="" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      margin: "0",
                      lineHeight: "17px",
                    }}
                  >
                    Points
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      margin: "0",
                      fontWeight: "bold",
                      color: "#3EB8D4",
                    }}
                  >
                    12000
                  </p>
                </div>
              </Flex>
            </Card>
          </Flex>
        </Col>
      </Row>
      <Divider
        style={{
          borderColor: "#1C1C1C",
          color: "#1C1C1C",
          fontSize: "20px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Topics
      </Divider>
    </>
  );
};

export default Home;
