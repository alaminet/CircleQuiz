"use client";
import "@ant-design/v5-patch-for-react-19";
import React, { useEffect, useState } from "react";
import { Button, Flex, Menu, Tooltip } from "antd";
import {
  AppstoreOutlined,
  HomeOutlined,
  SearchOutlined,
  SnippetsOutlined,
  AimOutlined,
  SolutionOutlined,
  ReadOutlined,
  ApiOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import LoginBtn from "./LoginBtn";
import SearchBtn from "./SearchBtn";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";

const TopNavBar = () => {
  const router = useRouter();
  const [current, setCurrent] = useState("/");
  const [subList, setSubjList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [addmList, setAddmList] = useState([]);
  const [accadList, setAccadList] = useState([]);
  const [bookList, setBookList] = useState([]);

  // Get Topics List
  const getTopics = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/topic/view`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
        },
      }
    );
    const data = await res.json();
    const tableData = [];
    data?.view?.map((item) => {
      item.status === "approved" &&
        tableData.push({
          label: item?.name,
          key: item?.slug,
        });
      setSubjList(tableData);
    });
  };
  // Get Category List
  const getCategory = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/subcategory/view`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
        },
      }
    );
    const data = await res.json();
    const JobArr = [];
    const AccdArr = [];
    const AddmArr = [];
    const BookArr = [];
    data?.view?.map((item) => {
      if (item.status === "approved") {
        item.category.name === "Job" &&
          JobArr.push({
            label: item?.name,
            key: item?.slug,
          });
        item.category.name === "Academy" &&
          AccdArr.push({
            label: item?.name,
            key: item?.slug,
          });
        item.category.name === "Admission" &&
          AddmArr.push({
            label: item?.name,
            key: item?.slug,
          });
        item.category.name === "Book" &&
          BookArr.push({
            label: item?.name,
            key: item?.slug,
          });
      }
      // setJobList setAddmList setAccadList setBookList
      setJobList(JobArr);
      setAddmList(AddmArr);
      setAccadList(AccdArr);
      setBookList(BookArr);
    });
  };

  useEffect(() => {
    getTopics();
    getCategory();
  }, []);

  // Handle Nav Menu
  const handleMenu = (e) => {
    // const id = data?._id;
    // const type = "mcq";
    // const path = `/edit/id=${id}&type=${type}`;
    const subjArray = e?.keyPath.filter((item) => item !== "rc-menu-more");
    let path = subjArray?.reverse().join("/");
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
      label: (
        <Link style={{ color: "#000000e0" }} href="/jobs">
          Job Assistant
        </Link>
      ),
      key: "jobs",
      icon: <AppstoreOutlined />,
      children: jobList?.sort((a, b) => a.label.localeCompare(b.label)),
    },
    {
      label: (
        <Link style={{ color: "#000000e0" }} href="/subject">
          Subjects
        </Link>
      ),
      key: "subject",
      icon: <SnippetsOutlined />,
      children: subList?.sort((a, b) => a.label.localeCompare(b.label)),
    },
    {
      label: (
        <Link style={{ color: "#000000e0" }} href="/academic">
          Academy
        </Link>
      ),
      key: "academic",
      icon: <AimOutlined />,
      children: accadList?.sort((a, b) => a.label.localeCompare(b.label)),
    },
    {
      label: (
        <Link style={{ color: "#000000e0" }} href="/admissions">
          Admission
        </Link>
      ),
      key: "admissions",
      icon: <SolutionOutlined />,
      children: addmList?.sort((a, b) => a.label.localeCompare(b.label)),
    },
    {
      label: (
        <Link style={{ color: "#000000e0" }} href="/books">
          Books
        </Link>
      ),
      key: "books",
      icon: <ReadOutlined />,
      children: bookList?.sort((a, b) => a.label.localeCompare(b.label)),
    },
    {
      key: "pricing",
      icon: <ApiOutlined />,
      label: (
        <Link href="#" target="_blank" rel="noopener noreferrer">
          Pricing
        </Link>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src={logo} alt="CA" width={50} height={50} />
      </div>
      <Menu
        // theme="dark"
        onClick={handleMenu}
        mode="horizontal"
        overflowedIndicator={<MenuOutlined />}
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
          justifyContent: "center",
        }}
      />
      <Flex gap={10} align="center">
        <SearchBtn />
        <LoginBtn />
      </Flex>
    </>
  );
};

export default TopNavBar;
