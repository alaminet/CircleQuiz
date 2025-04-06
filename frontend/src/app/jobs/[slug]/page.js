"use client";
import React, { useEffect, use, useState, Suspense } from "react";
import MCQCard from "@/components/MCQCard";
import SubjectHeading from "@/components/SubjectHeading";
import { Col, Layout, Row, theme } from "antd";
import SideListWBadge from "@/components/SideListWBadge";
import CardBasicWMore from "@/components/CardBasicWMore";
import { Pagination } from "antd";
import Loading from "@/app/loading";
import NotFound from "@/components/NotFound";
const { Content, Sider } = Layout;

const Page = ({ params }) => {
  const { slug } = use(params);
  const [mcqList, setMcqList] = useState();
  const [search, setSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Set page size

  // MCQ List Filter
  const mcqListFiler = mcqList?.filter((item) => {
    if (!search && typeSearch) {
      const typeCat = typeSearch[1];
      const typeVal = typeSearch[0];
      if (typeCat == "category") {
        return item?.category?.some((cat) => cat.slug == typeVal);
      } else if (typeCat == "tag") {
        return item?.tag?.some((tags) => tags.slug == typeVal);
      } else if (typeCat == "subcategory") {
        return item?.subcategory?.some((subcat) => subcat.slug == typeVal);
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

  // Get MCQ List
  const getMCQ = async (getData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/mcq/viewfield`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
          },
          body: JSON.stringify(getData),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      const MCQAppArr = [];
      data?.view.map((item) => {
        item.status === "approved" && MCQAppArr.push(item);
      });
      setMcqList(MCQAppArr);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMCQ({ field: "subcategory", value: slug, status: "approved" });
  }, []);

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
          <SideListWBadge data={mcqList} search={setTypeSearch} />
        </Sider>
        <Content>
          <Row gutter={[8, 8]}>
            <Col md={18}>
              <div>
                <SubjectHeading
                  title={slug}
                  search={setSearch}
                  count={mcqList?.length}
                />
                {!paginatedData?.length > 0 ? (
                  <NotFound />
                ) : (
                  <>
                    <Suspense fallback={<Loading />}>
                      {paginatedData
                        ?.sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        .map((item, i) => (
                          <div key={i}>
                            <MCQCard data={item} index={++i}/>
                          </div>
                        ))}
                    </Suspense>
                    <Pagination
                      align="end"
                      current={currentPage}
                      pageSize={pageSize}
                      total={mcqListFiler?.length}
                      onChange={handlePageChange}
                      showSizeChanger
                    />
                  </>
                )}
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

export default Page;
