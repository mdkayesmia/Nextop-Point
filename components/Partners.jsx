"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const featured = [
  { name: "University of Toronto", domain: "utoronto.ca" },
  { name: "University of Oxford", domain: "ox.ac.uk" },
  { name: "Harvard University", domain: "harvard.edu" },
  { name: "MIT", domain: "mit.edu" },
  { name: "Stanford University", domain: "stanford.edu" },
  { name: "University of Melbourne", domain: "unimelb.edu.au" },
  { name: "NUS Singapore", domain: "nus.edu.sg" },
  { name: "University of Sydney", domain: "sydney.edu.au" },
  { name: "UBC", domain: "ubc.ca" },
  { name: "King’s College London", domain: "kcl.ac.uk" },
  { name: "University of Edinburgh", domain: "ed.ac.uk" },
  { name: "Columbia University", domain: "columbia.edu" },
  { name: "University of Manchester", domain: "manchester.ac.uk" },
  { name: "University of Waterloo", domain: "uwaterloo.ca" },
];

const getLogo = (domain) =>
  `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

export default function Partners() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">

      {/* Heading Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
          Our Global Education Partners
        </h2>
        <p className="text-gray-500 mt-3">
          Trusted universities and institutions worldwide
        </p>
      </motion.div>

      {/* Slider */}
      <div className="max-w-6xl mx-auto px-4">

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          autoplay={{
            delay: 1400,
            disableOnInteraction: false,
          }}
          loop
        >

          {featured.map((item, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 1,
                }}
                className="bg-white/70 backdrop-blur-md border border-slate-100 rounded-2xl shadow-sm hover:shadow-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300"
              >

                {/* Floating effect on image */}
                <motion.img
                  src={getLogo(item.domain)}
                  alt={item.name}
                  className="h-12 w-12 object-contain"
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                />

                <p className="mt-3 text-xs md:text-sm text-slate-600 font-medium">
                  {item.name}
                </p>

              </motion.div>
            </SwiperSlide>
          ))}

        </Swiper>

      </div>
    </section>
  );
}