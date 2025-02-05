import React from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Divider, Flex, Row, Typography } from "antd";
const { Title, Text } = Typography;
import trophyImg from "../assets/images/trophy.png";
import coinImg from "../assets/images/coin.png";
import sportsImg from "../assets/images/basketball.png";
import mathImg from "../assets/images/calculator.png";
import historyImg from "../assets/images/calendar.png";
import chemistryImg from "../assets/images/chemistry.png";
import bilogyImg from "../assets/images/dna.png";
import geographyImg from "../assets/images/map.png";
import BasicLayout from "../components/BasicLayout";

const Home = () => {
  const topics = [
    {
      title: "Math",
      icon: mathImg,
      topic: 24,
    },
    {
      title: "General",
      icon: sportsImg,
      topic: 20,
    },
    {
      title: "Chemistry",
      icon: chemistryImg,
      topic: 20,
    },
    {
      title: "History",
      icon: historyImg,
      topic: 20,
    },
    {
      title: "Biological",
      icon: bilogyImg,
      topic: 20,
    },
    {
      title: "Geography",
      icon: geographyImg,
      topic: 20,
    },
  ];
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
            }}>
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
                    }}>
                    Ranking
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      margin: "0",
                      fontWeight: "bold",
                      color: "#3EB8D4",
                    }}>
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
                    }}>
                    Points
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      margin: "0",
                      fontWeight: "bold",
                      color: "#3EB8D4",
                    }}>
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
        }}>
        Topics
      </Divider>
      <Row gutter={[16, 16]} justify="start" align="middle">
        {topics?.map((item, i) => (
          <>
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
                }}>
                <Card style={{ width: "100%" }} bordered={false}>
                  <div>
                    <div>
                      <img src={item?.icon} alt={item?.title} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "16px",
                          margin: "0",
                          lineHeight: "17px",
                          fontWeight: "500",
                          textTransform: "uppercase",
                        }}>
                        {item?.title}
                      </p>
                      <p
                        style={{
                          fontSize: "18px",
                          margin: "0",
                          fontWeight: "bold",
                          color: "#3EB8D4",
                        }}>
                        {item?.topic} topics
                      </p>
                    </div>
                  </div>
                </Card>
              </Flex>
            </Col>
          </>
        ))}
      </Row>
    </>
  );
};

export default Home;
