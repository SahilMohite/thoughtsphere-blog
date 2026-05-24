import { useEffect, useState } from "react";

export default function ThoughtsBlogWebsite() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Why Consistency Beats Motivation",
      author: "Sahil Mohite",
      date: "May 24, 2026",
      likes: 128,
      comments: 18,
      content:
        "Most people wait for motivation before starting. But the people who grow are the ones who keep showing up even when they don't feel like it.",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

const createPost = async () => {
  if (!title || !content) {
    alert("Please fill all fields");
    return;
  }

  const newPost = {
    title,
    content,
    author: "Sahil Mohite",
    likes: 0,
    comments: 0,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  };

  const response = await axios.post(
    "https://thoughtsphere-blog.onrender.com/posts",
    newPost
  );

  setPosts([response.data, ...posts]);

  setTitle("");
  setContent("");
};

  const likePost = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

useEffect(() => {
  axios
    .get("https://thoughtsphere-blog.onrender.com/posts")
    .then((res) => setPosts(res.data))
    .catch((err) => console.log(err));
}, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10 backdrop-blur-lg sticky top-0 bg-[#0f172a]/90 z-50">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">ThoughtSphere</h1>
          <p className="text-sm text-gray-400">
            Share your thoughts with the world
          </p>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#" className="hover:text-white transition">
            Home
          </a>
          <a href="#" className="hover:text-white transition">
            Explore
          </a>
          <a href="#" className="hover:text-white transition">
            Trending
          </a>
          <a href="#" className="hover:text-white transition">
            About
          </a>
        </div>

        <button
  onClick={() =>
    document
      .getElementById("create-post")
      .scrollIntoView({ behavior: "smooth" })
  }
  className="bg-white text-black px-5 py-2 rounded-full font-medium hover:scale-105 transition-all"
>
  Create Post
</button>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-gray-300">
            Modern Blogging Platform
          </span>

          <h2 className="text-5xl md:text-7xl font-bold leading-tight mt-6">
            Turn Your <span className="text-cyan-400">Thoughts</span> Into
            Conversations
          </h2>

          <p className="text-gray-400 text-lg mt-6 leading-relaxed max-w-xl">
            Publish blogs, share experiences, collect likes, and engage with
            your audience through comments.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
  onClick={() =>
    document
      .getElementById("create-post")
      .scrollIntoView({ behavior: "smooth" })
  }
  className="bg-cyan-400 text-black font-semibold px-6 py-3 rounded-2xl hover:scale-105 transition-all shadow-xl"
>
  Start Writing
</button>

            <button
  onClick={() =>
    document
      .getElementById("latest-blogs")
      .scrollIntoView({ behavior: "smooth" })
  }
  className="border border-white/20 px-6 py-3 rounded-2xl hover:bg-white/10 transition-all"
>
  Explore Blogs
</button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-20 rounded-full"></div>

          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-6 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop"
              alt="blogging"
              className="rounded-3xl h-[450px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Create Post Section */}
      <section
  id="create-post"
  className="max-w-5xl mx-auto px-8 py-10"
>
        <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/10 border border-white/10 rounded-[36px] p-10 backdrop-blur-xl">
          <h2 className="text-4xl font-bold mb-4">Create a New Thought</h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
            />

            <textarea
              rows="7"
              placeholder="Write your thoughts here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 resize-none"
            ></textarea>

            <button
              onClick={createPost}
              className="bg-white text-black px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition-all"
            >
              Publish Post
            </button>
          </div>
        </div>
      </section>

      {/* Blog Feed */}
   <section
  id="latest-blogs"
  className="max-w-7xl mx-auto px-8 py-16"
>
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold">Latest Thoughts</h2>
            <p className="text-gray-400 mt-2">
              Read what creators are sharing today.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/5 border border-white/10 rounded-[28px] overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-2xl"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-[280px] w-full object-cover"
              />

              <div className="p-7">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-3xl font-bold mb-4 leading-snug">
                  {post.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-6">
                  {post.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-gray-300">
                    <button
                      onClick={() => likePost(post.id)}
                      className="flex items-center gap-2 hover:text-pink-400 transition"
                    >
                      ❤️ {post.likes}
                    </button>

                    <button className="flex items-center gap-2 hover:text-cyan-400 transition">
                      💬 {post.comments}
                    </button>
                  </div>

                  <button className="bg-cyan-400 text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition-all">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-10 py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">ThoughtSphere</h2>
            <p className="text-gray-400 mt-2">
              A modern blogging platform built for creators.
            </p>
          </div>

          <div className="flex items-center gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
