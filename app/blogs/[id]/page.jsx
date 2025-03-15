"use client";
import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dateblog = data?.date ? new Date(data.date).toDateString() : "No Date";

  const fetchBlogData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/blog`, { params: { id } });
      setData(response.data.blog);
    } catch (error) {
      console.error("Gagal mengambil data blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center py-20">Blog post not found</div>;
  }

  return (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              alt="logo"
              width={180}
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_0px_#000000] hover:shadow-[0px_0px_0px_0px_#000000] transition-all duration-300 bg-white"
          >
            Get Started{" "}
            <Image src={assets.arrow} alt="arrow" width={12} height={12} />
          </button>
        </div>
        <div className="text-center my-20">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto leading-tight">
            {data.title}
          </h1>

          <div className="relative w-16 h-16 mx-auto mt-8">
            <Image
              src={data.authorImg || assets.profile_icon}
              alt={data.author || "Author"}
              fill
              className="rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>

          <p className="mt-3 pb-2 text-lg font-medium max-w-[700px] mx-auto">
            {data.author || "Unknown Author"}
          </p>
          <p className="text-sm text-gray-500">{dateblog}</p>
        </div>
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <div className="relative w-full h-auto overflow-hidden rounded-lg">
          <Image
            src={data.image}
            alt={data.title}
            width={1280}
            height={720}
            className="border-4 border-white shadow-lg w-full object-cover"
          />
        </div>

        <h1 className="my-8 text-[26px] font-semibold">Introduction:</h1>
        <p className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
          {data.description}
        </p>

        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this article on:
          </p>
          <div className="flex gap-2">
            <button className="transition-transform duration-200 hover:scale-110">
              <Image
                src={assets.facebook_icon}
                alt="facebook"
                width={50}
                height={50}
              />
            </button>
            <button className="transition-transform duration-200 hover:scale-110">
              <Image
                src={assets.twitter_icon}
                alt="twitter"
                width={50}
                height={50}
              />
            </button>
            <button className="transition-transform duration-200 hover:scale-110">
              <Image
                src={assets.googleplus_icon}
                alt="googleplus"
                width={50}
                height={50}
              />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
