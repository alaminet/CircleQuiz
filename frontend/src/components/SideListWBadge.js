"use client";
import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const SideListWBadge = ({ data, search }) => {
  const handleMenu = (e) => {
    search(e.keyPath);
  };
  // Menu List
  const items = [
    {
      key: "category",
      label: "Category",
      icon: <MailOutlined />,
      children: [
        {
          key: "job",
          label: "Job",
        },
        {
          key: "2",
          label: "Option 2",
        },
      ],
    },
    {
      key: "tag",
      label: "Tag/Referance",
      icon: <AppstoreOutlined />,
      children: [
        {
          key: "১৩তম বিসিএস প্রিলিমিনারি",
          label: "১৩তম বিসিএস প্রিলিমিনারি",
        },
        {
          key: "বাংলা সাহিত্য",
          label: "বাংলা সাহিত্য",
        },
      ],
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
