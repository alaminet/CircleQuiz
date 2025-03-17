import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Popover, Tooltip, Input } from "antd";
import { useRouter } from "next/navigation";
const { Search } = Input;

const SearchBtn = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // Popover content
  const onSearch = (value) => {
    const path = `/search?q=${value.trim()}`;
    value !== "" && router.push(path);
    setOpen(false);
  };
  const content = (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </div>
  );
  return (
    <>
      <Tooltip title="search">
        <Popover
          placement="bottomRight"
          content={content}
          trigger="click"
          open={open}
          onOpenChange={() => setOpen(!open)}>
          <Button shape="circle" icon={<SearchOutlined />} />
        </Popover>
      </Tooltip>
    </>
  );
};

export default SearchBtn;
