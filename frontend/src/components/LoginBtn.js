"use client";
// import "@ant-design/v5-patch-for-react-19";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, Button, Divider, Flex, Menu, Popover, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Loginuser } from "@/lib/features/slice/userSlice";
import { useRouter } from "next/navigation";
import {
  AppstoreOutlined,
  AuditOutlined,
  FileProtectOutlined,
  HeartOutlined,
  LogoutOutlined,
  MailOutlined,
  NodeIndexOutlined,
  PlusCircleOutlined,
  PushpinOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const LoginBtn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((user) => user.loginSlice.login);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && !user) {
      const sendLoginDetails = async (data) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/auth/add`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ data: data }),
            }
          );
          const feedback = await response.json();
          // console.log("Server response:", feedback.dataExist);

          dispatch(
            Loginuser({
              ...feedback?.userExist,
              userImg: session?.user?.image,
            })
          );
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...feedback?.userExist,
              userImg: session?.user?.image,
            })
          );
        } catch (error) {
          console.error("Error sending login details:", error);
        }
      };
      sendLoginDetails(session);
    }
  }, [session]);

  // Logout Handeller
  const handleLogout = async () => {
    signOut();
    localStorage.removeItem("user");
    dispatch(Loginuser(null));
  };

  const handleMenu = (e) => {
    if ((e = "logout")) {
      handleLogout();
    }
  };

  const content = (
    <div>
      <p>Balance 0.00 BDT</p>
      <Menu
        onClick={handleMenu}
        // style={{
        //   width: 256,
        // }}
        mode="inline"
        items={[
          {
            type: "divider",
          },
          {
            key: "profile",
            label: "Profile",
            icon: <UserOutlined />,
          },
          {
            key: "course",
            label: "Learning Courses",
            icon: <FileProtectOutlined />,
          },
          {
            key: "exam",
            label: "Attend Exams",
            icon: <AuditOutlined />,
          },
          {
            key: "contributions",
            label: "Contributions",
            icon: <NodeIndexOutlined />,
          },
          {
            key: "favorite",
            label: "Favorites",
            icon: <HeartOutlined />,
          },
          {
            key: "bookmark",
            label: "Bookmarks",
            icon: <PushpinOutlined />,
          },
          {
            key: "settings",
            label: "Settings",
            icon: <SettingOutlined />,
          },
          {
            type: "divider",
          },
          {
            key: "logout",
            label: "Logout",
            icon: <LogoutOutlined />,
          },
        ]}
      />
    </div>
  );

  return (
    <>
      {status === "authenticated" ? (
        <Flex gap={10}>
          <Tooltip title="Add Q&A">
            <Button
              onClick={() => router.push("/addmcq")}
              type="primary"
              shape="round"
              icon={<PlusCircleOutlined />}>
              Add Q&A
            </Button>
          </Tooltip>

          <Popover
            placement="bottomRight"
            title={user?.name}
            content={content}
            trigger="click">
            <Avatar src={user?.userImg || user?.name.charAt(0)} alt="avater" />
          </Popover>
          {/* <Avatar src={user?.userImg || user?.name.charAt(0)} alt="avater" /> */}
        </Flex>
      ) : (
        <Flex>
          <Button type="primary" onClick={() => signIn()}>
            Login
          </Button>
        </Flex>
      )}
    </>
  );
};

export default LoginBtn;
