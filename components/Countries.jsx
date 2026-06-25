"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const countries = [
  { name: "United Kingdom", flag: "https://flagcdn.com/w320/gb.png" },
  { name: "United States", flag: "https://flagcdn.com/w320/us.png" },
  { name: "Canada", flag: "https://flagcdn.com/w320/ca.png" },
  { name: "Australia", flag: "https://flagcdn.com/w320/au.png" },
  { name: "Germany", flag: "https://flagcdn.com/w320/de.png" },
  { name: "Malaysia", flag: "https://flagcdn.com/w320/my.png" },
  { name: "Japan", flag: "https://flagcdn.com/w320/jp.png" },
  { name: "South Korea", flag: "https://flagcdn.com/w320/kr.png" },
  { name: "France", flag: "https://flagcdn.com/w320/fr.png" },
  { name: "Italy", flag: "https://flagcdn.com/w320/it.png" },
  { name: "Netherlands", flag: "https://flagcdn.com/w320/nl.png" },
  { name: "Singapore", flag: "https://flagcdn.com/w320/sg.png" },
];

export default function Countries() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">

        <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 text-slate-800">
          Popular Study Destinations
        </h2>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          autoplay={{
            delay: 1800,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation
          loop
        >
          {countries.map((country, i) => (
            <SwiperSlide key={i}>
              <div className="group bg-white/70 backdrop-blur-md shadow-md hover:shadow-2xl rounded-2xl p-4 text-center transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">

                <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border group-hover:scale-110 transition">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-sm md:text-base font-semibold text-slate-700 group-hover:text-blue-600">
                  {country.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}