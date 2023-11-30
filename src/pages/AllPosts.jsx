import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import authService from '../appwrite/auth';

function AllPosts() 
{
    const [posts, setPosts] = useState([])
    const [id,setId] = useState(null) ;

    
    useEffect(() => {

        authService.getCurrentUser().then(((x)=>{
            console.log(`id ise ${x.$id}`)
            setId(x.$id)
          }
        ))
        
        if(id)
        {
            appwriteService.getUserPosts(id).then((posts) => {
                if (posts) 
                {
                    // console.log(posts.documents)
                    setPosts(posts.documents)
                }
            })
        }
    }, [id])


    // useEffect(() => {
        // appwriteService.getPosts().then((posts) => {
        //     if (posts) 
        //     {
        //         // console.log(posts.documents)
        //         setPosts(posts.documents)
        //     }
        // })
    // }, [])

    if (posts.length === 0) 
    {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Post
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }


  return (
    <div className='w-full'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key = {post.$id} className='p-2 md:w-1/4'>
                        <PostCard  {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts