import React from "react";
import Head from "next/head";
import { ConnectionProvider } from "@/context/ConnectContext";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title = "ShardZ" }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ConnectionProvider>
        <main>{children}</main>
      </ConnectionProvider>
    </>
  );
};

export default Layout;
