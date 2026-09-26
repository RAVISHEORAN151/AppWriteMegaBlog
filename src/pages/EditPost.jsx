import React, {useEffect, useState} from 'react'
import Container from "../components/container/container";
import PostForm from "../components/post-form/PostForm";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate()

    useEffect(() =>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }else{
                    navigate('/')
                }
            })
        }else{
            navigate('/')
        }
    },[slug, navigate])

   if (loading) {
        return (
            <div className="flex  max-h-[50hv] items-center justify-center">
                <div className="flex items-center gap-3 rounded-full border border-violet-400/20 bg-slate-900/60 px-6 py-3 shadow-[0_0_18px_rgba(139,92,246,0.25)] backdrop-blur-xl">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-violet-400/30 border-t-cyan-300" />
                    <span className="text-sm font-medium text-slate-300">Loading post</span>
                </div>
            </div>
        )
    }

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}


export default EditPost