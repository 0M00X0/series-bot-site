import { useState } from "react";
import Link from "next/link";
import LayoutError from "@/components/layouts/error";
export default function Abort({ statusCode = 404 }) {
  const [message, setMessage] = useState("This page could not be found");

  if (statusCode === 500) {
    setMessage("Internal Server Error");
  } else if (statusCode === 404) {
    setMessage("This page could not be found");
  } else if (statusCode === 403) {
    setMessage("Forbidden");
  } else if (statusCode === 401) {
    setMessage("Unauthorized");
  } else if (statusCode === 400) {
    setMessage("Bad Request");
  } else if (statusCode === 503) {
    setMessage("Service Unavailable");
  } else if (statusCode === 502) {
    setMessage("Bad Gateway");
  } else if (statusCode === 501) {
    setMessage("Not Implemented");
  } else if (statusCode === 408) {
    setMessage("Request Timeout");
  } else if (statusCode === 407) {
    setMessage("Proxy Authentication Required");
  } else if (statusCode === 406) {
    setMessage("Not Acceptable");
  } else if (statusCode === 405) {
    setMessage("Method Not Allowed");
  }

  return (
    <LayoutError
      content={
        <Link
          href="/"
          className="dark:text-white p-2 px-4 rounded-lg duration-300 animate-pulse text-center"
        >
          Go Home
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
