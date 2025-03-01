"use client";
// import "@ant-design/v5-patch-for-react-19";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, Button, Flex, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Loginuser } from "@/lib/features/slice/userSlice";
import { useRouter } from "next/navigation";
import { PlusCircleOutlined } from "@ant-design/icons";
const url =
  "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

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
              ...feedback?.dataExist,
              userImg: session?.user?.image,
            })
          );
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...feedback?.dataExist,
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
          <Button type="primary" onClick={handleLogout}>
            Log out
          </Button>
          <Avatar src={user?.userImg || url} alt="avater" />
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
