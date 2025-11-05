import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!response.ok) throw new Error("Post not found");
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading post...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-red-600">
        <p className="text-lg font-semibold mb-4">Something went wrong 😔</p>
        <p>{error}</p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-50 px-6 py-12 flex flex-col items-center">
      <div className="max-w-3xl bg-white shadow-md rounded-2xl p-8">
        {post.image && (
          <img
            src={`http://localhost:5000${post.image}`}
            alt={post.title}
            className="rounded-xl mb-6 w-full h-80 object-cover"
          />
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
          {post.content}
        </p>
        <div className="text-gray-500 text-sm border-t pt-4 mt-6">
          <p>
            <strong>Author:</strong> {post.author?.name || "Unknown"}
          </p>
          <p>
            <strong>Category:</strong> {post.category?.name || "Uncategorized"}
          </p>
          <p>
            <strong>Published:</strong>{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </article>
  );
}
