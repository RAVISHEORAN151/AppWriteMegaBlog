import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Logo } from '../components'

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((response) => {
        if (response) {
          setPosts(response.documents);
        }
      })
      .catch((error) => {
        console.error("Could not load home posts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-cyan-300" />
          <p className="text-slate-500">Loading latest posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-10 text-white">
      <Container>
        {/* Hero section */}
        <section className="relative mb-12 overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 via-slate-900 to-cyan-500/10 px-6 py-14 text-center shadow-[0_0_50px_rgba(139,92,246,0.15)] sm:px-12">
          <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative">
            <div className="flex gap-2 justify-center items-center">
                        <span>
                            <Logo width="200%" />
                        </span>
                   
            <p className="mb-0 text-sm font-semibold uppercase tracking-[0.20em] text-cyan-300">
               Welcome to MegaBlog
            </p>
            </div>

            <h1 className="mb-5 bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
              Ideas worth sharing.
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Discover posts, learn new things, and explore ideas created by
              the MegaBlog community.
            </p>
          </div>
        </section>

        {/* Posts heading */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
                Explore
              </p>

              <h2 className="mt-1 text-3xl font-bold text-white">
                Latest Posts
              </h2>
            </div>

            <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200">
              {posts.length} {posts.length === 1 ? "Post" : "Posts"}
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-violet-400/30 bg-slate-900/60 px-6 py-16 text-center">
              <div className="mb-4 text-5xl">✦</div>

              <h3 className="text-2xl font-bold text-white">
                No posts available yet
              </h3>

              <p className="mt-3 text-slate-400">
                Be the first person to create and share a post.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap">
              {posts.map((post) => (
                <div
                  key={post.$id}
                  className="w-full p-3 sm:w-1/2 lg:w-1/3 xl:w-1/4"
                >
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}

export default Home;