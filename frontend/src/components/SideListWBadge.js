"use client";
import React from "react";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const SideListWBadge = ({ data, search }) => {
  // Unique Category sorting
  let catArr = [];
  data?.map((item) => {
    item?.category?.map((cat) => {
      catArr.push({
        key: cat.slug,
        label: cat.name,
      });
    });
  });
  const uniqueCat = [
    ...new Map(catArr?.map((item) => [item.key, item])).values(),
  ];

  // Unique subCategory sorting
  let subcatArr = [];
  data?.map((item) => {
    item?.subcategory?.map((cat) => {
      subcatArr.push({
        key: cat.slug,
        label: cat.name,
      });
    });
  });
  const uniqueSubCat = [
    ...new Map(subcatArr?.map((item) => [item.key, item])).values(),
  ];

  // Unique Tag sorting
  let tArr = [];
  data?.map((item) => {
    item?.tag?.map((t) => {
      tArr.push({
        key: t.slug,
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
      key: "subcategory",
      label: "Sub Category",
      icon: <MailOutlined />,
      children: uniqueSubCat,
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
  return (
    <>
      <Menu
        onClick={handleMenu}
        mode="inline"
        items={items}
        // defaultSelectedKeys={["category"]}
        // defaultOpenKeys={["category"]}
      />
    </>
  );
};

export default SideListWBadge;
