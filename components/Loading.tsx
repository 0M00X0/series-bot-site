export default function Loading() {
  return (
    <div className="flex justify-center items-center space-x-2 h-[100vh] sm:flex-row flex-col">
      <svg
        className="animate-spin -ml-1 mr-3 h-[2.25rem] w-[2.25rem] dark:text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12z"
        ></path>
      </svg>
      <h1 className="text-black dark:text-white text-3xl font-semibold animate-pulse">
        Loading...
      </h1>
    </div>
  );
}
