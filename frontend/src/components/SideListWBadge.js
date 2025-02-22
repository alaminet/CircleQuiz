"use client";
import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const SideListWBadge = ({ data, search }) => {
  const dataArr = data;

  // Unique Data sorting
  const itemCat = dataArr?.map((item) => {
    return {
      key: item.category.name.toLowerCase(),
      label: item.category.name,
    };
  });
  const uniqueCat = [
    ...new Map(itemCat?.map((item) => [item.key, item])).values(),
  ];
  let tArr = [];
  const itemTag = dataArr?.map((item) => {
    item?.tag?.map((t) => {
      tArr.push({
        key: t.name,
        label: t.name,
      });
    });
  });
  const uniqueTag = [
    ...new Map(tArr?.map((item) => [item.key, item])).values(),
  ];

  const handleMenu = (e) => {
    search(e.keyPath);
  };
  // Menu List
  const items = [
    {
      key: "category",
      label: "Category",
      icon: <MailOutlined />,
      children: uniqueCat,
    },
    {
      key: "tag",
      label: "Tag/Referance",
      icon: <AppstoreOutlined />,
      children: uniqueTag,
    },
    {
      type: "divider",
    },

    {
      key: "",
      label: "Clear Filter",
    },
  ];
  return <Menu onClick={handleMenu} mode="inline" items={items} />;
};

export default SideListWBadge;
