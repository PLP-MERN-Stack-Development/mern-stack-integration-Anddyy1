import React from "react";

export default function About() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12 text-center">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About This Project</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          This blogging platform is powered by the <span className="font-semibold text-indigo-600">MERN Stack</span> — MongoDB, Express, React, and Node.js.
          It demonstrates a full integration between frontend and backend for building scalable web applications.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          The frontend uses <span className="font-semibold text-teal-600">React 19</span> with <span className="font-semibold text-sky-600">Vite</span> for fast builds,
          and <span className="font-semibold text-emerald-600">Tailwind CSS</span> for a clean and responsive design. Users can create, read, and manage posts easily.
        </p>
        <div className="bg-white shadow-lg rounded-2xl p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Developer Info</h2>
          <p className="text-gray-600 mb-2"><strong>Name:</strong> Lawrence Omanya</p>
          <p className="text-gray-600 mb-2"><strong>Role:</strong> Full Stack Developer (MERN)</p>
          <p className="text-gray-600">Passionate about clean UI, modern web apps, and continuous learning.</p>
        </div>
      </div>
    </section>
  );
}
