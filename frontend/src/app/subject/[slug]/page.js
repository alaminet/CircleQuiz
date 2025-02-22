"use client";
import React, { useEffect, use, useState } from "react";
import MCQCard from "@/components/MCQCard";
import SubjectHeading from "@/components/SubjectHeading";
import { Col, Row } from "antd";
import SideListWBadge from "@/components/SideListWBadge";
import CardBasicWMore from "@/components/CardBasicWMore";
import { Pagination } from "antd";

const Page = ({ params }) => {
  const { slug } = use(params);
  const [mcqList, setMcqList] = useState();
  const [search, setSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Set page size

  const mcqListFiler = mcqList?.filter((item) => {
    if (!search && typeSearch) {
      const typeCat = typeSearch[1];
      const typeVal = typeSearch[0];
      if (typeCat == "category") {
        return item?.category?.slug
          .toLowerCase()
          .includes(typeVal.toLowerCase());
      } else if (typeCat == "tag") {
        return item?.tag?.some((tags) => tags.slug == typeVal);
      } else {
        return item?.question?.toLowerCase().includes(search.toLowerCase());
      }
    } else {
      return item?.question?.toLowerCase().includes(search.toLowerCase());
    }
  });

  // Handel pagination
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  const paginatedData = mcqListFiler?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Get Tag List
  const getMCQ = async () => {
    try {
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
      const MCQAppArr = [];
      data?.view.map((item) => {
        item.status === "approve" && MCQAppArr.push(item);
      });
      setMcqList(MCQAppArr);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMCQ();
  }, []);

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col md={6}>
          <SideListWBadge data={mcqList} search={setTypeSearch} />
        </Col>
        <Col md={12}>
          <div>
            <SubjectHeading title={slug} search={setSearch} />
            {paginatedData?.map((item, i) => (
              <MCQCard key={i} data={item} />
            ))}
            <Pagination
              align="end"
              current={currentPage}
              pageSize={pageSize}
              total={mcqListFiler?.length}
              onChange={handlePageChange}
              showSizeChanger
            />
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
