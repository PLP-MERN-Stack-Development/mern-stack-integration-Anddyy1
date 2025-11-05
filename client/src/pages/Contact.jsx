import React from "react";

export default function Contact() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Me</h1>
      <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mb-6">
        Have questions or want to collaborate? Reach out via email or social media. I’ll respond as soon as possible.
      </p>
      <p className="text-gray-800 font-medium">Email: <span className="text-indigo-600">lawrence.omanya@example.com</span></p>
      <p className="text-gray-800 font-medium mt-2">Twitter: <span className="text-indigo-600">@LawrenceOmanya</span></p>
    </section>
  );
}
