import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import Button from "../components/Button";
import Container from "../components/container/container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
                setLoading(false);
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featureImage);
                navigate("/");
            }
        });
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex items-center gap-3 rounded-full border border-violet-400/20 bg-slate-900/60 px-6 py-3 shadow-[0_0_18px_rgba(139,92,246,0.25)] backdrop-blur-xl">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-violet-400/30 border-t-cyan-300" />
                    <span className="text-sm font-medium text-slate-300">Loading post…</span>
                </div>
            </div>
        );
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="relative mb-4 max-h-[80vh] max-w-[60vh] flex w-full justify-center rounded-xl border border-white/10 bg-slate-900/40 p-2 backdrop-blur-xl">
                    <img
                        src={appwriteService.getFileView(post.featureImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-[0_0_14px_rgba(16,185,129,0.35)] hover:from-emerald-600 hover:to-emerald-800">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                className="bg-gradient-to-r from-red-500 to-red-700 text-white shadow-[0_0_14px_rgba(239,68,68,0.35)] hover:from-red-600 hover:to-red-800"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                <div className="mb-6 w-full">
                    <h1 className="text-2xl font-bold text-slate-100">{post.title}</h1>
                </div>

                <div className="browser-css text-slate-300">{parse(post.content)}</div>
            </Container>
        </div>
    ) : null;
}