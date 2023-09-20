
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex text-center items-center space-x-2">
        <h1 className="text-4xl border-r-2 border-gray-300 pr-4 inline-block font-medium">
          404
        </h1>
        <div className="inline-block">
          <h2 className="text-lg font-normal">
            This page could not be found.
          </h2>
        </div>
      </div>
    </div>
  );
}
