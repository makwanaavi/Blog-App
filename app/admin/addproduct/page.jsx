"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Admin",
    author_img: "/author_img.png",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("author_img", data.author_img);
    formData.append("image", image);

    const response = await axios.post("/api/blog", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false);
      setData({
        title: "",
        description: "",
        category: "Startup",
        author: "Admin",
        author_img: "/author_img.png",
        image: null,
      });
    } else {
      toast.error("Something went wrong, please try again later.");
    }
  };
  return (
    <>
      <form className="pt-5 px-5 sm:pt-12 sm:pl-16" onSubmit={onSubmitHandler}>
        <p className="text-xl">Upload Thumbnail</p>
        <label htmlFor="image" className="cursor-pointer">
          <Image
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            alt=""
            height={170}
            className="mt-4"
          />
        </label>

        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />

        <p className="text-xl mt-5">Blog Title</p>
        <input
          type="text"
          placeholder="Type here..."
          required
          className="w-full  sm:w-[500px] mt-2 px-4 py-3 border"
          name="title"
          onChange={onChangeHandler}
          value={data.title}
        />

        <p className="text-xl mt-5">Blog Description</p>
        <textarea
          placeholder="Write content here..."
          required
          className="w-full  sm:w-[500px] mt-2 px-4 py-3 border"
          rows={6}
          name="description"
          onChange={onChangeHandler}
          value={data.description}
        />

        <p className="text-xl mt-5">Blog Category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-4 border text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-14 text-white bg-black">
          ADD{" "}
        </button>
      </form>
    </>
  );
};

export default page;
