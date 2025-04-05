"use client";
// import "@ant-design/v5-patch-for-react-19";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Menu,
  message,
  Popover,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Loginuser } from "@/lib/features/slice/userSlice";
import { useRouter } from "next/navigation";
import {
  AuditOutlined,
  FileProtectOutlined,
  HeartOutlined,
  LogoutOutlined,
  NodeIndexOutlined,
  PlusCircleOutlined,
  PushpinOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const LoginBtn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((user) => user.loginSlice.login);
  const { data: session, status } = useSession();
  const isServer = typeof window === "undefined";

  // Logout Handeller
  const handleLogout = async () => {
    // logout
    const userAgent = navigator.userAgent;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
        },
        body: JSON.stringify({ userAgent: userAgent, userID: user?._id }),
      }
    );
    const feedback = await res.json();
    message.info(feedback?.message);
    if (feedback?.message === "Logged Out Successfully") {
      signOut();
      !isServer && localStorage.removeItem("user");
      dispatch(Loginuser(null));
    } else {
      message.warning("Logout Failed");
    }
  };

  const handleMenu = (e) => {
    userExistCk();
    if (e.key === "logout") {
      handleLogout();
    } else {
      router.push(`/user/${e.key}`);
      // console.log(e.key);
    }
  };

  const userContent = (
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

  const userExistCk = async () => {
    try {
      // userExist
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/auth/userExist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
          },
          body: JSON.stringify({
            userID: user?._id,
          }),
        }
      );
      const feedback = await res?.json();
      const userAgent = navigator.userAgent;
      const isDevice = feedback?.userExist?.device?.filter(
        (item) => item?.userAgent === userAgent
      );
      if (isDevice?.length == 0) {
        signOut();
        !isServer && localStorage.removeItem("user");
        dispatch(Loginuser(null));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Loging Functionality
  const sendLoginDetails = async (data) => {
    try {
      const userAgent = navigator.userAgent;

      if (session && !user) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: process.env.NEXT_PUBLIC_SECURE_API_KEY,
            },
            body: JSON.stringify({
              data: data,
              userAgent: userAgent,
            }),
          }
        );
        const feedback = await response.json();

        !isServer &&
          localStorage.setItem("user", JSON.stringify(feedback?.userExist));
        dispatch(Loginuser(feedback?.userExist));
        // message.info(feedback?.message);
      }
    } catch (error) {
      console.error("Error sending login details:", error);
    }
  };

  useEffect(() => {
    sendLoginDetails(session);
    userExistCk();
  }, [session, handleMenu]);

  return (
    <>
      {status === "authenticated" ? (
        <Flex gap={10}>
          <Tooltip title="Add Q&A">
            <Button
              onClick={() => router.push("/addmcq")}
              type="primary"
              shape="round"
              icon={<PlusCircleOutlined />}
            >
              Add Q&A
            </Button>
          </Tooltip>

          <Popover
            placement="bottomRight"
            title={user?.name}
            content={userContent}
            trigger="click"
          >
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
