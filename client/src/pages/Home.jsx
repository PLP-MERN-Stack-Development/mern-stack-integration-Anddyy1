import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-600">
        <p className="text-lg font-semibold mb-4">Failed to load posts 😔</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">
        Latest Blog Posts
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts yet. Be the first to create one!</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
            >
              {post.image && (
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt={post.title}
                  className="rounded-xl mb-4 h-48 w-full object-cover"
                />
              )}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 flex-grow">{post.content.slice(0, 100)}...</p>
              <Link
                to={`/post/${post._id}`}
                className="mt-4 inline-block text-indigo-600 hover:underline font-medium"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Link
          to="/create"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-500 transition"
        >
          Create a New Post
        </Link>
      </div>
    </section>
  );
}
