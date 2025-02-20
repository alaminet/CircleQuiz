"use client";
import "@ant-design/v5-patch-for-react-19";
import React, { useState } from "react";
import { Avatar, Button, Flex, Menu, Switch, Tooltip } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MoonOutlined,
  MoonFilled,
  HomeOutlined,
  CopyOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  SnippetsOutlined,
  AimOutlined,
  SolutionOutlined,
  ReadOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
const url =
  "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

const TopNavBar = () => {
  const router = useRouter();

  const [current, setCurrent] = useState("mail");
  const handleMenu = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    router.push(e.key);
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
      key: "subjects",
      icon: <SnippetsOutlined />,
      children: [
        {
          label: "All Subjects",
          key: "subject",
        },
        {
          label: "Bangla",
          key: "subject/bangla",
        },
      ],
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
      <Flex gap={5}>
        <Tooltip title="search">
          <Button shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
        <Tooltip title="Add Q&A">
          <Button
            onClick={() => router.push("/addmcq")}
            type="primary"
            shape="round"
            icon={<PlusCircleOutlined />}>
            Add Q&A
          </Button>
        </Tooltip>

        <Avatar src={url} />
      </Flex>
    </>
  );
};

export default TopNavBar;
