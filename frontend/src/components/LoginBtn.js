"use client";
// import "@ant-design/v5-patch-for-react-19";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, Button, Flex } from "antd";
const url =
  "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

// function getFirstTwoCapitalLetters(str?: string | null) {
//     const match = (str ?? "").match(/[A-Z]/g);
//     return match ? match.slice(0, 2).join("") : "GT";
// }

const LoginBtn = () => {
  const { data: session, status } = useSession();
  const [users, SetUsers] = useState();

  // user add data fetch
  const userData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/v1/api/auth/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: session }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (session) {
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
          console.log("Server response:", feedback.dataExist);
        } catch (error) {
          console.error("Error sending login details:", error);
        }
      };
      sendLoginDetails(session);
    }
  }, [session]);

  return (
    <>
      {status === "authenticated" ? (
        <Flex gap={10}>
          <Button
            type="primary"
            onClick={() => {
              signOut();
            }}>
            Log out
          </Button>
          <Avatar src={session?.user?.image || url} alt="avater" />
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
