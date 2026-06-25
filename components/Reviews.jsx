"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Rahim Uddin",
    country: "Bangladesh",
    review:
      "Amazing service! They guided me step by step for my UK visa. Highly recommended.",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Sarah Johnson",
    country: "Canada",
    review:
      "Very professional consultancy. My student visa process was smooth and fast.",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "John Smith",
    country: "USA",
    review:
      "Excellent support team. They helped me get admission in a top university.",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Ayesha Khan",
    country: "Malaysia",
    review:
      "Great experience! They made my dream of studying abroad come true.",
    image: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "David Lee",
    country: "Australia",
    review:
      "Fast response and very helpful consultants. Highly trustworthy agency.",
    image: "https://i.pravatar.cc/100?img=45",
  },
];

export default function ClientsReview() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
          What Our Clients Say
        </h2>
        <p className="text-gray-500 mt-3">
          Real experiences from students around the world
        </p>
      </motion.div>

      {/* Slider */}
      <div className="max-w-6xl mx-auto px-4">

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop
        >

          {reviews.map((item, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="h-full bg-white/70 backdrop-blur-md border border-slate-100 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300"
              >

                {/* User */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full border"
                  />

                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">{item.country}</p>
                  </div>
                </div>

                {/* Review */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  “{item.review}”
                </p>

                {/* Stars */}
                <div className="flex gap-1 mt-4 text-yellow-400">
                  ⭐⭐⭐⭐⭐
                </div>

              </motion.div>
            </SwiperSlide>
          ))}

        </Swiper>

      </div>
    </section>
  );
}