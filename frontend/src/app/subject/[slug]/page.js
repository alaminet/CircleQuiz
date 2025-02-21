"use client";
import React, { useEffect, use, useState } from "react";
import MCQCard from "@/components/MCQCard";
import SubjectHeading from "@/components/SubjectHeading";
import { Col, Row } from "antd";
import SideListWBadge from "@/components/SideListWBadge";
import CardBasicWMore from "@/components/CardBasicWMore";
import { useRouter } from "next/router";
const Page = ({ params }) => {
  const { slug } = use(params);
  const [mcqList, setMcqList] = useState();
  // Get Tag List
  const getMCQ = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/mcq/view/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setMcqList(data?.view);
  };
  useEffect(() => {
    getMCQ();
  }, []);
  console.log(mcqList);

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col md={6}>
          <SideListWBadge />
        </Col>
        <Col md={12}>
          <div>
            <SubjectHeading title={slug} />
            {mcqList?.map(
              (item, i) =>
                item?.status === "approve" && (
                  <>
                    <MCQCard data={item} key={i} />
                  </>
                )
            )}
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
