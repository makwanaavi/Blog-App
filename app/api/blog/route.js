import ConnectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
import { writeFile } from "fs/promises";
import { title } from "process";

const LoadDB = async () => {
    await ConnectDB();
}

LoadDB()

export async function GET(request) {
    console.log("Fetching blog data...");

    const blogs = await BlogModel.find({});


    return NextResponse.json({blogs});
}

export async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();
    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    const path = `./public/${timestamp}_${image.name}`

    await writeFile(path, buffer);

    const imgUrl = `/${timestamp}_${image.name}`

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imgUrl}`,
        author_img: `${formData.get(' author_img')}`,
    }

    await BlogModel.create(blogData);

    console.log("---- Blog data saved successfully ----");

    return NextResponse.json({ success: true, msg: "Blog data saved successfully" });
}


