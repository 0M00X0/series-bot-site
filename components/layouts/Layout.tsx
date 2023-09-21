import Sidebar from "@/components/core/Sidebar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <Sidebar>{children}</Sidebar>
      </div>
    </>
  );
}
