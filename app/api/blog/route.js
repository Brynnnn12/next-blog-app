import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/models/BlogModel";
import fs from "fs";
import path from "path";
const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json({
      success: true,
      blog,
    });
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({
      success: true,
      blogs,
    });
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();

  // **🔹 Simpan `image` utama**
  const image = formData.get("image");
  if (!image || typeof image.arrayBuffer !== "function") {
    return NextResponse.json(
      {
        success: false,
        msg: "Image is required and must be a file.",
      },
      { status: 400 }
    );
  }

  const imageByteData = await image.arrayBuffer();
  const imageBuffer = Buffer.from(imageByteData);
  const imagePath = `./public/uploads/${timestamp}_${image.name}`;
  await writeFile(imagePath, imageBuffer);
  const imgUrl = `/uploads/${timestamp}_${image.name}`;

  // **🔹 Simpan `authorImg` (jika ada)**
  let authorImgUrl = null;
  const authorImg = formData.get("authorImg");

  if (authorImg && typeof authorImg.arrayBuffer === "function") {
    const authorImgByteData = await authorImg.arrayBuffer();
    const authorImgBuffer = Buffer.from(authorImgByteData);
    const authorImgPath = `./public/uploads/${timestamp}_${authorImg.name}`;
    await writeFile(authorImgPath, authorImgBuffer);
    authorImgUrl = `/uploads/${timestamp}_${authorImg.name}`;
  }

  // **🔹 Simpan data blog ke database**
  const blogData = {
    title: formData.get("title"),
    description: formData.get("description"),
    author: formData.get("author"),
    image: imgUrl,
    authorImg: authorImgUrl, // Bisa `null` jika tidak ada
    category: formData.get("category"),
  };

  await BlogModel.create(blogData);
  console.log(blogData);

  return NextResponse.json({
    success: true,
    msg: "Blog created successfully",
    data: blogData,
  });
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, msg: "Blog not found" },
        { status: 404 }
      );
    }

    // ✅ Ambil nama file dari path `/uploads/filename.jpg`
    const imageName = blog.image.split("/").pop(); // Ambil bagian terakhir dari path
    const imagePath = path.join(process.cwd(), "public", "uploads", imageName);

    console.log("Image Path:", imagePath); // Debugging

    // ✅ Hapus file secara asynchronous
    if (fs.existsSync(imagePath)) {
      await fs.promises.unlink(imagePath); // Gunakan `await`
      console.log("Image deleted successfully");
    } else {
      console.log("Image not found in uploads folder");
    }

    // ✅ Hapus data dari database
    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      msg: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}
