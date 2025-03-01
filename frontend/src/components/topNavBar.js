"use client";
import "@ant-design/v5-patch-for-react-19";
import React, { useEffect, useState } from "react";
import { Button, Flex, Menu, Tooltip } from "antd";
import {
  AppstoreOutlined,
  HomeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  SnippetsOutlined,
  AimOutlined,
  SolutionOutlined,
  ReadOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import LoginBtn from "./LoginBtn";

const TopNavBar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("/");
  const [subList, setSubjList] = useState([]);

  // Get Topics List
  const getTopics = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/topic/view`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    const tableData = [];
    data?.view?.map((item) => {
      item.status === "approve" &&
        tableData.push({
          label: item?.name,
          key: item?.slug,
        });
      setSubjList(tableData);
    });
  };

  useEffect(() => {
    getTopics();
  }, []);

  // Login Drawer

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // Handle Nav Menu
  const handleMenu = (e) => {
    let path = e?.keyPath.reverse().join("/");
    setCurrent(`/${path}`);
    router.push(`/${path}`);
  };

  const items = [
    {
      label: "Home",
      key: "/",
      icon: <HomeOutlined />,
    },
    {
      label: "Job Assistant",
      key: "job",
      icon: <AppstoreOutlined />,
      //   disabled: true,
    },
    {
      label: "Subjects",
      key: "subject",
      icon: <SnippetsOutlined />,
      children: subList?.sort((a, b) => a.label.localeCompare(b.label)),
    },
    {
      label: "Academy",
      key: "academy",
      icon: <AimOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            {
              label: "Option 1",
              key: "setting:21",
            },
            {
              label: "Option 2",
              key: "setting:22",
            },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            {
              label: "Option 3",
              key: "setting:23",
            },
            {
              label: "Option 4",
              key: "setting:24",
            },
          ],
        },
      ],
    },
    {
      label: "Admission",
      key: "admission",
      icon: <SolutionOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            {
              label: "Option 1",
              key: "setting:31",
            },
            {
              label: "Option 2",
              key: "setting:32",
            },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            {
              label: "Option 3",
              key: "setting:33",
            },
            {
              label: "Option 4",
              key: "setting:34",
            },
          ],
        },
      ],
    },
    {
      label: "Books",
      key: "books",
      icon: <ReadOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            {
              label: "Option 1",
              key: "setting:41",
            },
            {
              label: "Option 2",
              key: "setting:42",
            },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            {
              label: "Option 3",
              key: "setting:43",
            },
            {
              label: "Option 4",
              key: "setting:44",
            },
          ],
        },
      ],
    },
    {
      key: "pricing",
      icon: <ApiOutlined />,
      label: (
        <a href="#" target="_blank" rel="noopener noreferrer">
          Pricing
        </a>
      ),
    },
  ];

  return (
    <>
      <div>Logo</div>
      <Menu
        // theme="dark"
        onClick={handleMenu}
        mode="horizontal"
        defaultSelectedKeys={["mail"]}
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
          justifyContent: "center",
        }}
      />
      <Flex gap={10} align="center">
        <Tooltip title="search">
          <Button shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
        
        <LoginBtn />
      </Flex>
    </>
  );
};

export default TopNavBar;
