"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Col, Layout, Pagination, Result, Row, theme, Input } from "antd";
import SideListWBadge from "@/components/SideListWBadge";
import SubjectHeading from "@/components/SubjectHeading";
import Loading from "../loading";
import MCQCard from "@/components/MCQCard";
import CardBasicWMore from "@/components/CardBasicWMore";
const { Content, Sider } = Layout;
const { Search } = Input;

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // Extract the 'q' parameter
  const [dataList, setDataList] = useState();
  const [search, setSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Set page size

  // Search Q&A
  const onSearch = (e) => {
    try {
      const path = `/search?q=${e.trim()}`;
      if (e !== "") router.push(path);
    } catch (error) {
      console.log(error);
    }
  };

  // MCQ List Filter
  const dataListFiler = dataList?.filter((item) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  });

  // Handel pagination
  const handlePageChange = (page, pageSize) => {
    try {
      setCurrentPage(page);
      setPageSize(pageSize);
    } catch (error) {
      console.log(error);
    }
  };
  const paginatedData = dataListFiler?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Get MCQ List
  const getData = async (qdata) => {
    try {
      setDataList([]);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/mcq/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
          },
          body: JSON.stringify(qdata),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();

      // Removing duplicates based on 'id'
      const uniqueArray = data?.uniqueArray.filter(
        (obj, index, self) => index === self.findIndex((o) => o._id === obj._id)
      );
      setDataList(uniqueArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData({ value: query, status: "approved" });
  }, [searchParams]);

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
          }}
        >
          <SideListWBadge data={dataList} search={setTypeSearch} />
        </Sider>
        <Content>
          <Row gutter={[8, 8]}>
            {dataList?.length > 0 ? (
              <Col md={18}>
                <div>
                  <SubjectHeading
                    title={<p>"{query}" লেবেল থাকা প্রশ্ন গুলো দেখানো হচ্ছে</p>}
                    search={setSearch}
                    count={dataList?.length}
                  />
                  <Suspense fallback={<Loading />}>
                    {paginatedData?.map((item, i) => (
                      <div key={i}>
                        <MCQCard data={item} />
                      </div>
                    ))}
                  </Suspense>
                  <Pagination
                    align="end"
                    current={currentPage}
                    pageSize={pageSize}
                    total={dataListFiler?.length}
                    onChange={handlePageChange}
                    showSizeChanger
                  />
                </div>
              </Col>
            ) : (
              <Col md={18}>
                <div>
                  <Result
                    status="404"
                    title="Find Your Questions !"
                    subTitle="Sorry, We couldn't find anything to search for."
                    extra={
                      <Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                      />
                    }
                  />
                </div>
              </Col>
            )}

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
