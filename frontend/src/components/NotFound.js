import React from "react";
import { useRouter } from "next/navigation";
import { Input, Result } from "antd";
const { Search } = Input;

const NotFound = () => {
  const router = useRouter();
  // Search Q&A
  const onSearch = (e) => {
    try {
      const path = `/search?q=${e.trim()}`;
      if (e !== "") router.push(path);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
    </>
  );
};

export default NotFound;
