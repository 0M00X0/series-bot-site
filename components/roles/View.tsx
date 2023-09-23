"use client"
import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import Abort from "@/components/errors/Abort";

interface LayoutProps {
  children: ReactNode;
  RolesView: any;
}
const ViewPage = ({ RolesView, children }: LayoutProps) => {
  const { data: session } = useSession();

  const yourRole = session?.user?.role;

  if (RolesView.includes(yourRole)) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <Abort
      statusCode={403}
      message={`You don't have permission to access this page.`}
    />
  );
};

export default ViewPage;
