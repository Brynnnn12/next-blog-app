import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTable = ({authorImg,title,author,date,mongoId,deleteBlogs}) => {
    const BlogDate = new Date(date);
  return (
    <tr className="bg-white border-b text-center ">
        <th scope="row" className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            <Image width={40} height={40} src={authorImg?authorImg:assets.profile_icon} alt="" className='rounded-full' />
            <p className="">{author?author:"No Author"}</p>
        </th>
        <td className="px-6 py-4">
            {title?title:"No Title"}
        </td>
        <td className="px-6 py-4">
            {BlogDate.toDateString()}
        </td>
        <td onClick={()=>deleteBlogs(mongoId)} className="px-6 py-4">

        x
        </td>
    </tr>
  )
}

export default BlogTable