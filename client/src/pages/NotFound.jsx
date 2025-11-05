import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12 text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-6">404</h1>
      <p className="text-gray-700 text-lg mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-500 transition"
      >
        Go Back Home
      </Link>
    </section>
  );
}
