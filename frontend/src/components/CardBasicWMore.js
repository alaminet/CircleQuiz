import { Card } from "antd";
import React from "react";

const CardBasicWMore = ({ bgColor }) => {
  return (
    <>
      <Card
        title="Default size card"
        extra={
          <a href="#" style={{ color: "#C62300" }}>
            More
          </a>
        }
        style={{
          width: 300,
          backgroundColor: "#FFFDF0",
          color: "#1D1616",
          margin: "10px 0",
        }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </>
  );
};

export default CardBasicWMore;
