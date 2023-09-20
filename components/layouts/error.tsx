export interface LayoutErrorProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export default function LayoutError({ children, content }: LayoutErrorProps) {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center flex-col space-y-4">
          <div className="flex text-center items-center space-x-2 flex-col sm:flex-row">
            {children}
          </div>
        {!content ? null : (
          <div className="flex justify-center items-center flex-col space-y-4">
            {content}
          </div>
        )}
      </div>
    </>
  );
}
