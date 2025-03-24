"use client";
import React, { Suspense, use, useEffect, useState } from "react";

import { Col, Row, Skeleton } from "antd";
import Loading from "@/app/loading";
import McqView from "./McqView";

const Page = ({ params }) => {
  const [qaType, setQAType] = useState();
  const [qid, setQid] = useState();

  // Slug ID & Type Define
  const { slug } = use(params);
  const parseSlug = (value) => {
    const decodedSlug = decodeURIComponent(value);
    const par = new URLSearchParams(decodedSlug);
    const id = par.get("id");
    const type = par.get("type");
    return { id, type };
  };

  useEffect(() => {
    const { id, type } = parseSlug(slug);
    setQAType(type);
    setQid(id);
  }, []);

  return (
    <>
      <div>
        <Row>
          {/* <Col md={6}>1</Col> */}
          <Col md={24}>
            {qaType == "mcq" ? (
              <Suspense fallback={<Loading />}>
                <McqView id={qid} />
              </Suspense>
            ) : qaType == "written" ? (
              "written"
            ) : (
              <Skeleton />
            )}
          </Col>
          {/* <Col md={6}>3</Col> */}
        </Row>
      </div>
    </>
  );
};

export default Page;
