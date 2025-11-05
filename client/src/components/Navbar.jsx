import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg py-4 px-6 sticky top-0 z-50">
      <ul className="flex space-x-8 justify-center font-medium text-gray-700">
        <li>
          <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
        </li>
        <li>
          <Link to="/create" className="hover:text-indigo-600 transition">Create Post</Link>
        </li>
      </ul>
    </nav>
  );
}
