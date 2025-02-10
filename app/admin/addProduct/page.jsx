'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'

const Page = () => {
    const [image, setImage] = useState(null);
    const [authorImg, setAuthorImg] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const [data, setData] = useState({
        title: '',
        description: '',
        author: 'Alex Bennett',
        category: 'StartUp'
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!image) {
            toast.error("Please upload a blog image.");
            return;
        }

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('author', data.author);
        formData.append('category', data.category);

        if (authorImg) {
            formData.append('authorImg', authorImg);
        }
        
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('/api/blog', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                toast.success(response.data.msg);
                setImage(null);
                setAuthorImg(null);
                setData({ title: '', description: '', author: 'Alex Bennett', category: 'StartUp' });
                setIsOpen(false);
            } else {
                toast.error(response.data.msg);
            }
        } catch (error) {
            toast.error("Error uploading blog. Please try again.");
        }
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="bg-black text-white px-4 py-2 rounded">Add Blog</button>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                        <form onSubmit={onSubmitHandler} className="grid gap-4">
                            <p className="text-lg font-bold">Upload Thumbnail</p>
                            <label htmlFor="image">
                                <Image
                                    src={image ? URL.createObjectURL(image) : assets.upload_area}
                                    alt="upload"
                                    width={100}
                                    height={50}
                                    className="mx-auto"
                                />
                            </label>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="image" hidden required />

                            <p className="text-lg font-bold">Author Image</p>
                            <label htmlFor="authorImg">
                                <Image
                                    src={authorImg ? URL.createObjectURL(authorImg) : "/author_img.png"}
                                    alt="author"
                                    width={50}
                                    height={50}
                                    className="rounded-full mx-auto"
                                />
                            </label>
                            <input onChange={(e) => setAuthorImg(e.target.files[0])} type="file" name="authorImg" id="authorImg" hidden />

                            <input name="title" onChange={onChangeHandler} value={data.title} type="text" placeholder="Blog Title" className="px-4 py-2 border rounded" required />
                            <textarea name="description" onChange={onChangeHandler} value={data.description} placeholder="Blog Description" className="px-4 py-2 border rounded" required />
                            <select name="category" onChange={onChangeHandler} value={data.category} className="px-4 py-2 border rounded text-gray-500">
                                <option value="StartUp">Startup</option>
                                <option value="Technology">Technology</option>
                                <option value="Lifestyle">Lifestyle</option>
                            </select>

                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-300 py-2 rounded">Cancel</button>
                                <button type="submit" className="bg-black text-white py-2 rounded">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
