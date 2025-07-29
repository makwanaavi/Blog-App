"use client";
import { assets, blog_data } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/Components/Footer";
import axios from "axios";

const page = ({ params }) => {
  const [data, setData] = useState(null);
  const router = useRouter();

  const fetchBlogData = async () => {
    // for (let i = 0; i < blog_data.length; i++) {
    //   if (Number(params.id) === blog_data[i].id) {
    //     setData(blog_data[i]);
    //     console.log(blog_data[i]);
    //     break;
    //   }
    // }
    const response = await axios.get("/api/blog", {
      params: { id: params.id },
    });
    setData(response.data);
  };
  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <Image
              src={assets.logo}
              width={180}
              alt=""
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get Started
            <Image src={assets.arrow} alt="" />
          </button>
        </div>

        <div className="text-center my-24 ">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data?.title}
          </h1>
          <Image
            src={data?.author_img}
            alt=""
            width={60}
            height={60}
            className="mx-auto mt-6 border border-white rounded-full"
          />
          <p className="mt-1 pb-2 text-lg mx-auto max-w-[740px]">
            {data.author}
          </p>
        </div>
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data?.image}
          width={1280}
          height={720}
          alt=""
          className="border-4 border-white"
        />

        <h1 className="my-8 text-[26px] font-semibold">Introduction</h1>
        <p>{data.description}</p>

        <h3 className="my-5 text-[18px] font-semibold">
          step 1 : Understanding Your Audience
        </h3>

        <p className="my-3">
          In this step, you'll learn how to identify your target audience and
          understand their needs and preferences.
        </p>
        <p className="my-3">
          This foundational knowledge will help you tailor your product and
          marketing strategies effectively.
        </p>

        <h3 className="my-5 text-[18px] font-semibold">
          step 2 : Crafting Your Unique Value Proposition
        </h3>
        <p className="my-3">
          This section will guide you in creating a compelling value proposition
          that sets your startup apart from the competition.
        </p>

        <p>
          You'll learn how to articulate what makes your product unique and why
          customers should choose it over others.
        </p>

        <h3 className="my-5 text-[18px] font-semibold">
          step 3 : Building Your Minimum Viable Product (MVP)
        </h3>
        <p className="my-3">
          Here, you'll learn how to develop a minimum viable product that meets
          the essential needs of your audience while minimizing development time
          and costs.
        </p>

        <p>
          The focus will be on creating a functional prototype that can be
          tested and refined based on user feedback.
        </p>

        <h3 className="my-5 text-[18px] font-semibold">Conclusion :</h3>
        <p className="my-3">
          By following these steps, you'll be well on your way to launching a
          successful startup within 90 days. Remember, persistence and
          adaptability are key. Stay committed to your vision, keep learning
          from your audience, and continuously iterate on your product. Success
          doesn't happen overnight, but with dedication and the right
          strategies, you can achieve your entrepreneurial goals.
        </p>

        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this article on social media{" "}
          </p>

          <div className="flex items-center justify-between my-5">
            <div className="flex">
              <Link href="https://www.facebook.com/" target="_blank">
                <Image src={assets.facebook_icon} width={50} alt="" />
              </Link>

              <Link href="https://twitter.com/" target="_blank">
                <Image src={assets.twitter_icon} width={50} alt="" />{" "}
              </Link>

              <Link href="https://plus.google.com/" target="_blank">
                <Image src={assets.googleplus_icon} width={50} alt="" />
              </Link>
            </div>

            {/* <div className="flex gap-6">
              <button
                onClick={() => prevId && router.push(`/blogs/${prevId}`)}
                disabled={!prevId}
                className="font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000] disabled:opacity-50 cursor-pointer"
              >
                Preview
              </button>
              <button
                onClick={() => nextId && router.push(`/blogs/${nextId}`)}
                disabled={!nextId}
                className="font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000] disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <> </>
  );
};

export default page;
