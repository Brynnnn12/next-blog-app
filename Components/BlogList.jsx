import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios';

const BlogList = () => {
    const [menu,setMenu] = useState("ALL");
    const [blogs,setBlogs] = useState([]);

    const fetchBlogs = async()=>{
        const response =await axios.get('/api/blog');
        setBlogs(response.data.blogs);

    }

    useEffect(()=>{
        fetchBlogs();
    },[])

  return (
    <div className=''>
        <div className="flex justify-center gap-6 my-10 ">
            <button onClick={() => setMenu("ALL")} className={menu === "ALL" ? 'bg-black text-white py-1 px-4 rounded-sm':""}>All</button>
            <button onClick={() => setMenu("Technology")} className={menu === "Technology" ? 'bg-black text-white py-1 px-4 rounded-sm':""} >Technology</button>
            <button onClick={() => setMenu("StartUp")} className={menu === "StartUp" ? 'bg-black text-white py-1 px-4 rounded-sm':""} >StartUp</button>
            <button onClick={() => setMenu("Lifestyle")} className={menu === "Lifestyle" ? 'bg-black text-white py-1 px-4 rounded-sm':""} >Lifestyle</button>
        </div>
        <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
            {blogs.filter((item)=> menu === "ALL" ? true:item.category === menu).map((item,index)=>{
                return<BlogItem key={index} id={item._id} image={item.image} title={item.title} description={item.description} category={item.category} />
            })}
        </div>
    </div>
  )
}

export default BlogList