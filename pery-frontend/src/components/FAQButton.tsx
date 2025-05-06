import React from "react";

export default function FAQButton() {
  return (
    <a
      href="https://mypery.com/#faqs"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
    >
      <button className="cursor-pointer bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-full shadow hover:shadow-md transition text-sm md:text-base">
        FAQ
      </button>
    </a>
  );
}
