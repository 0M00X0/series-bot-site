import Sidebar from "@/components/core/Sidebar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  classSidebar?: string;
}

export default function Layout({ children, classSidebar }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <Sidebar classGrid={classSidebar}>
          {children}
          </Sidebar>
      </div>
    </>
  );
}
