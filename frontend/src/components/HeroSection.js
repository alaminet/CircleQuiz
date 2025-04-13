import React from "react";
import { Carousel, Col, Flex, Row } from "antd";
import heroBanner1 from "../../public/hero/hero_banner_1.jpg";
import Image from "next/image";
import SectionTitle from "./SectionTitle";

const HeroSection = () => {
  return (
    <>
      <div>
        <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Image
                width={0}
                height={0}
                src={heroBanner1}
                alt="Banner Image"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Image
                width={0}
                height={0}
                src={heroBanner1}
                alt="Banner Image"
                style={{ width: "100%", height: "auto", objectFit: "fill" }}
              />
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default HeroSection;
