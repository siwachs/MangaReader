import Link from "next/link";

const ErrorComponent = ({ statusCode, message }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-red-500">Error {statusCode}</h1>
      <p className="text-lg text-gray-800 dark:text-white">{message}</p>
      <Link href="/">
        <span className="mt-4 text-blue-500 hover:underline">
          Go back to the homepage
        </span>
      </Link>
    </div>
  );
};

export default ErrorComponent;
