import React from "react";
import MCQCard from "@/components/MCQCard";
import SubjectHeading from "@/components/SubjectHeading";
import { Col, Row } from "antd";
import SideListWBadge from "@/components/SideListWBadge";
import CardBasicWMore from "@/components/CardBasicWMore";

const Page = ({ params }) => {
  return (
    <>
      <Row gutter={[8, 8]}>
        <Col md={6}>
          <SideListWBadge />
        </Col>
        <Col md={12}>
          <div>
            <SubjectHeading title={params.slug} />
            <MCQCard />
          </div>
        </Col>
        <Col md={6}>
          <CardBasicWMore />
          <CardBasicWMore />
        </Col>
      </Row>
    </>
  );
};

export default Page;
