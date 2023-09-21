"use client"; // Error components must be Client Components

import { useEffect } from "react";
import LayoutError from "@/components/layouts/Error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  

  return (
    <LayoutError
      content={
        <>
          <button
            className="bg-red-500 p-2 px-4 rounded-lg text-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out shadow-red-500/75 hover:shadow-red-500/100 w-[120px] h-[40px] hover:bg-red-600 animate-bounce"
            onClick={reset}
          >
            Reset
          </button>
        </>
      }
    >
      <h1 className="text-3xl sm:border-r-2 dark:border-gray-300 sm:pr-4 inline-block font-medium border-b-2 pb-2 sm:border-b-0 sm:pb-0 border-black">
        {error.name}
      </h1>
      <div className="inline-block">
        <h2 className="text-lg font-normal">{error.message}</h2>
      </div>
    </LayoutError>
  );
}
