"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Layout, Row, theme } from "antd";
import Loading from "@/app/loading";
import CardBasicWMore from "@/components/CardBasicWMore";
import MCQCard from "@/components/MCQCard";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
const { Content, Sider } = Layout;

const McqView = ({ id }) => {
  const user = useSelector((user) => user?.loginSlice?.login);
  const router = useRouter();
  const [viewItem, setViewItem] = useState();
  // Get MCQ List
  const getMCQ = async (slug) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/mcq/viewid/${slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
          },
        }
      );
      !res.ok && router.push("/search?q");
      const data = await res.json();
      setViewItem(data?.view);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMCQ(id);
  }, []);

  // Theme Token
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            background: colorBgContainer,
          }}>
          Side Bar
        </Sider>
        <Content>
          <Row gutter={[8, 8]}>
            <Col md={18}>
              <div>
                <Suspense fallback={<Loading />}>
                  <div>{viewItem && <MCQCard data={viewItem} />}</div>
                </Suspense>
              </div>
            </Col>
            <Col md={6}>
              <CardBasicWMore />
              <CardBasicWMore />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default McqView;
