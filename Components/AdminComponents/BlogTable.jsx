import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const BlogTable = ({
  authorImg,
  title,
  author,
  date,
  mongoId,
  deleteBlogs,
}) => {
  const BlogDate = new Date(date);

  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition-colors duration-150">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <div className="relative h-10 w-10">
          <Image
            fill
            src={authorImg ? authorImg : assets.profile_icon}
            alt={author || "Author"}
            className="rounded-full object-cover border border-gray-200"
          />
        </div>
        <p className="my-auto font-medium">{author ? author : "No Author"}</p>
      </th>
      <td className="px-6 py-4 text-left">
        <p className="line-clamp-1 font-medium text-gray-800">
          {title ? title : "No Title"}
        </p>
      </td>
      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
        {BlogDate.toDateString()}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => deleteBlogs(mongoId)}
          className="h-8 w-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
          aria-label="Delete blog"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default BlogTable;
