"use client";
import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const{id} = useParams();
  const [data, setData] = useState(null);
  const dateblog = data?.date ? new Date(data.date).toDateString() : "No Date";


  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`/api/blog`, { params: { id } });
      setData(response.data.blog);
    } catch (error) {
      console.error("Gagal mengambil data blog:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogData();
    }
  }, [id]);
  return data ? (
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
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_0px_#000000] hover:shadow-[0px_0px_0px_0px_#000000]"
          >
            {" "}
            Get Started <Image src={assets.arrow} alt="arrow" />
          </button>
        </div>
        <div className="text-center my-20">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            src={data.authorImg}
            alt=""
            width={60}
            height={60}
            className=" mx-auto mt-6 border border-white rounded-full"
          />
          <p className="mt-1 pb-2 text-lg max-w-[700px] mx-auto">
            {data.author}
          </p>
          <p className="text-sm text-gray-500">
            {dateblog}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10 ">
        <Image
          src={data.image}
          alt=""
          width={1280}
          height={720}
          className="border-4 border-white "
        />
        <h1 className="my-8 text-[26px] font-semibold ">Introduction:</h1>
        <p className="whitespace-pre-line text-gray-700 leading-relaxed">
    {data.description}
</p>
        
        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this article on:
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} alt="facebook" width={50} />
            <Image src={assets.twitter_icon} alt="twitter" width={50} />
            <Image src={assets.googleplus_icon} alt="googleplus" width={50} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;
