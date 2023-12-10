import React from 'react'
import appwriteService from "../appwrite/config"

import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to = {`/post/${$id}`}>
        <div className='bg-white rounded-xl p-2 object-cover hover:shadow-2xl hover:shadow-blue-800 w-[250px] m-auto'>
            <div className='w-full justify-center mb-4'>
                <img src = {appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl w-96 h-80 object-cover' />
            </div>
            <h2 className='text-xl font-bold'>
                 {title}
            </h2>
        </div>
    </Link>
  )
}


export default PostCard