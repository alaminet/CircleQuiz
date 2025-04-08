"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Button, Modal, Result } from "antd";

const LoginModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      signIn();
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        title="Not Authorized"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}>
            Sign in
          </Button>,
          // <Button
          //   key="link"
          //   href="https://google.com"
          //   target="_blank"
          //   type="primary"
          //   loading={loading}
          //   onClick={handleOk}>
          //   Search on Google
          // </Button>,
        ]}>
        <Result
          status="403"
          title="Need Access !"
          subTitle="Sorry, you are not authorized to access this page."
          // extra={<Button type="primary">Back Home</Button>}
        />
      </Modal>
    </>
  );
};

export default LoginModal;
