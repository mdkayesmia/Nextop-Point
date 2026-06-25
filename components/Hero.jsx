"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Study Abroad & Student Visa",
    highlight: "Global Education Opportunities",
    description:
      "Get expert guidance for university admission, scholarship opportunities, and student visa processing.",
    image: "/hero1.png",
    button: "Explore Universities",
  },
  {
    title: "Tourist Visa Services",
    highlight: "Travel The World With Confidence",
    description:
      "Fast and reliable tourist visa processing for your dream destinations around the world.",
    image: "/tourist.png",
    button: "Apply For Visa",
  },
  {
    title: "Air Ticket Booking",
    highlight: "Best Flight Deals Worldwide",
    description:
      "Book domestic and international air tickets at competitive prices with complete travel support.",
    image: "/air-ticket.png",
    button: "Book Flight",
  },
];

export default function Hero() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-auto"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gradient-to-r from-white via-blue-50 to-blue-100 min-h-[85vh] flex items-center">
              <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  {/* Left Side */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-5">
                      Trusted Consultancy Services
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                      {slide.title}
                    </h1>

                    <h2 className="text-blue-700 text-xl md:text-2xl font-semibold mt-4">
                      {slide.highlight}
                    </h2>

                    <p className="mt-6 text-gray-600 text-lg max-w-xl">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-8">
                      <button className="bg-blue-900 text-white px-7 py-4 rounded-xl flex items-center gap-2 hover:bg-blue-800 transition">
                        {slide.button}
                        <FaArrowRight />
                      </button>

                      <button className="border-2 border-blue-900 text-blue-900 px-7 py-4 rounded-xl hover:bg-blue-900 hover:text-white transition">
                        Free Consultation
                      </button>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-6 mt-10 text-sm font-medium text-gray-700">
                      <div>✓ Expert Guidance</div>
                      <div>✓ Visa Assistance</div>
                      <div>✓ 24/7 Support</div>
                    </div>
                  </motion.div>

                  {/* Right Side */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex justify-center"
                  >
                    <motion.img
                      src={slide.image}
                      alt={slide.title}
                      className="max-h-[650px] w-auto object-contain"
                      animate={{ y: [0, -15, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Floating Card */}
                    <div className="absolute bottom-10 left-0 bg-white shadow-2xl rounded-2xl p-5 hidden md:block">
                      <h3 className="text-2xl font-bold text-blue-900">
                        5000+
                      </h3>
                      <p className="text-gray-600">
                        Successful Applications
                      </p>
                    </div>

                    <div className="absolute top-10 right-0 bg-white shadow-2xl rounded-2xl p-5 hidden md:block">
                      <h3 className="text-2xl font-bold text-blue-900">
                        98%
                      </h3>
                      <p className="text-gray-600">Visa Success Rate</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Background Shape */}
              <div className="absolute top-20 right-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}