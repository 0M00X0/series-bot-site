import { useState } from "react";

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex text-center items-center space-x-2">
        <h1 className="text-4xl border-r-2 border-gray-300 pr-4 inline-block font-medium">
          {statusCode}
        </h1>
        <div className="inline-block">
          <h2 className="text-lg font-normal">{message}</h2>
        </div>
      </div>
    </div>
  );
}
