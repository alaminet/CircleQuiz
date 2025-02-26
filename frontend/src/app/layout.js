import "@ant-design/v5-patch-for-react-19";
import "ckeditor5/ckeditor5.css";
import "./globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Noto_Serif_Bengali } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NavLayout from "@/components/NavLayout";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-bengali",
});

export const metadata = {
  title: "Circle Academy",
  description: "Where Learning Comes Full Circle",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${notoSerifBengali.variable} `}>
        <AntdRegistry>
          <SessionProvider>
            <NavLayout>{children}</NavLayout>
          </SessionProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
