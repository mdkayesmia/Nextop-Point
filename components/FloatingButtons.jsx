"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-row gap-3 z-50">

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/+8801804334313"
        target="_blank"
        rel="noopener noreferrer"
        className="
          bg-green-500 text-white
          p-4 rounded-full
          shadow-xl
          hover:scale-110 hover:bg-green-600
          transition-all duration-300
          flex items-center justify-center
        "
      >
        <FaWhatsapp className="text-2xl" />
      </a>

      {/* Back to Top Button */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="
            bg-blue-900 text-white
            p-4 rounded-full
            shadow-xl
            hover:scale-110 hover:bg-blue-800
            transition-all duration-300
            flex items-center justify-center
          "
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}

    </div>
  );
}