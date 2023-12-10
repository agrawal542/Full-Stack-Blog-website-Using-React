import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() 
{

    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const temp = useSelector((state)=>state.auth.userData)
    console.log(`post-> ${temp.$id}`)

    const isAuthor = post && temp ? post.userId === temp.$id : false;

    useEffect(() => 
    {
        if (slug) 
        {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } 
        else 
        { 
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="w-2/3 py-8 bg-white  shadow-blue-600 shadow-2xl rounded-md">
            <Container>
                <div className="flex items-center justify-center mb-4 relative border rounded-xl p-2">
                    <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-xl "/>
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css bg-slate-100 rounded-xl">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
