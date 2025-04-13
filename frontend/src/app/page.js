import HeroSection from "@/components/HeroSection";
import HomeCategoryCard from "@/components/HomeCategoryCard";
import SectionTitle from "@/components/SectionTitle";
import { Col, Row } from "antd";
import { Color } from "antd/es/color-picker";
import React from "react";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Row align="middle" justify="center" style={{ margin: "50px 0" }}>
        <Col span={10} style={{ textAlign: "center" }}>
          <SectionTitle subTitle="Sub Title" titleOne="Main" titleTwo="Title" />
          <HomeCategoryCard />
        </Col>
      </Row>
    </>
  );
};

export default Home;
