import Sidebar from "@/components/core/Sidebar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  classSidebar?: string;
}

export default function TableLayout({ children, classSidebar }: LayoutProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <Sidebar classGrid={classSidebar}>
          <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
              <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                {children}
              </div>
            </div>
          </section>
        </Sidebar>
      </div>
    </>
  );
}
