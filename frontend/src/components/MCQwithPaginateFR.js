"use client";
import React, { Suspense, useState } from "react";
import NotFound from "./NotFound";
import Loading from "@/app/loading";
import MCQCard from "./MCQCard";
import { Pagination } from "antd";
import LoginModal from "./LoginModal";
import { useSelector } from "react-redux";

const MCQwithPaginateFR = ({ data }) => {
  const user = useSelector((user) => user?.loginSlice?.login);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Set page size
  // Handel pagination
  const handlePageChange = (page, pageSize) => {
    !user ? setIsModalOpen(true) : setCurrentPage(page);
    setPageSize(pageSize);
  };
  const paginatedData = data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      <div>
        {!paginatedData?.length > 0 ? (
          <NotFound />
        ) : (
          <>
            <Suspense fallback={<Loading />}>
              {paginatedData
                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item, i) => (
                  <div key={i}>
                    <MCQCard data={item} index={++i} />
                  </div>
                ))}
            </Suspense>
            <Pagination
              align="end"
              current={currentPage}
              pageSize={pageSize}
              total={data?.length}
              onChange={handlePageChange}
              showSizeChanger
            />
          </>
        )}
        <LoginModal open={isModalOpen} setOpen={setIsModalOpen} />
      </div>
    </>
  );
};

export default MCQwithPaginateFR;
