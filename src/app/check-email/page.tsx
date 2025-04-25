import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md p-6 sm:p-8 lg:p-10 bg-white rounded-xl shadow-lg text-center space-y-6">
        {/* Icon Container */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full">
          {" "}
          {/* Removed bg-indigo-100 */}
          <Link href="/">
            <svg
              className="h-10 w-10 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              {" "}
              {/* Adjusted size slightly */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Check Your Inbox!
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          We&apos;ve sent a verification link to your email address. Please
          click the link in the email{" "}
          <span className="text-indigo-500">
            from noreply@mail.app.supabase.io
          </span>{" "}
          to complete your signup process.
        </p>

        {/* Additional Info */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500">
            Didn&apos;t receive the email? Check your spam folder or Open an{" "}
            {""}
            <Link
              href="https://github.com/MVAodhan/opengeminiui"
              target="_blank"
              className="text-indigo-500"
            >
              Issue on Github.
            </Link>
          </p>
        </div>

        {/* Optional: Placeholder for a resend button or link */}
        {/* <button className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                 Resend Email (Placeholder)
               </button> */}
      </div>
    </div>
  );
};

export default page;
