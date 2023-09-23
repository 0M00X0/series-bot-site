import { useState } from "react";
import Link from "next/link";
import LayoutError from "@/components/layouts/Error";
export default function Abort({
  statusCode = 404,
  message = "This page could not be found",
  link = "/",
  messageLink = "Go Home",
}) {
  
  return (
    <LayoutError
      content={
        <Link
          href={link}
          className="dark:text-white p-2 px-4 rounded-lg duration-300 animate-pulse text-center"
        >
          {messageLink}
        </Link>
      }
    >
      <h1 className="text-3xl sm:border-r-2 dark:border-gray-300 sm:pr-4 inline-block font-medium border-b-2 pb-2 sm:border-b-0 sm:pb-0 border-black">
        {statusCode}
      </h1>
      <div className="inline-block">
        <h2 className="text-lg font-normal">{message}</h2>
      </div>
    </LayoutError>
  );
}
