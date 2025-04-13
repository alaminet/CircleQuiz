import React from "react";
import { Col, Row } from "antd";
import catOnePic from "../../public/hero/catOne.jpg";
import catLogoOne from "../../public/hero/catLogoOne.png";
import Image from "next/image";
import Link from "next/link";

const HomeCategoryCard = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <div className="home-cat-card">
            <div className="card-img">
              <Image
                width={270}
                height={370}
                src={catOnePic}
                alt=""
                style={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              />
            </div>
            <div
              className="card-body"
              style={{
                background: "rgba(30,192,255,0.9)",
                textAlign: "center",
                position: "absolute",
                width: "140%",
                zIndex: "1",
                bottom: "-50px",
                left: "-20%",
                paddingTop: "50px",
                borderTopLeftRadius: "100%",
                borderTopRightRadius: "100%",
                transition: "all 300ms ease",
              }}>
              <div>
                <Image width={50} height={60} src={catLogoOne} alt="" />
              </div>
              <h3
                style={{
                  padding: "0 19%",
                  paddingBottom: "19px",
                  transition: "all 300ms ease",
                  color: "#fff",
                  textTransform: "uppercase",
                  fontSize: "26px",
                }}>
                Jobs
              </h3>
              <Link href="#" style={{ color: "#fff" }}>
                Read More
              </Link>
            </div>
          </div>
        </Col>
        <Col span={6}>2</Col>
        <Col span={6}>3</Col>
        <Col span={6}>4</Col>
      </Row>
    </>
  );
};

export default HomeCategoryCard;
