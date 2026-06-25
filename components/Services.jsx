"use client";

import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaPassport,
  FaPlane,
  FaUniversity,
} from "react-icons/fa";

const services = [
  {
    title: "Study Abroad Guidance",
    description:
      "Expert counseling to help students choose the best destination and university.",
    icon: <FaGraduationCap />,
  },
  {
    title: "University Application",
    description:
      "Complete assistance with admission and application processing.",
    icon: <FaUniversity />,
  },
  {
    title: "Visa Processing",
    description:
      "Professional visa support with a high success rate.",
    icon: <FaPassport />,
  },
  {
    title: "Travel Assistance",
    description:
      "Flight booking, accommodation, and pre-departure guidance.",
    icon: <FaPlane />,
  },
];

export default function Services() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-14"
        >
          <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm md:text-base">
            Our Services
          </p>

          <h2 className="text-2xl md:text-5xl font-bold mt-2 text-gray-900">
            Complete Support For Your Journey
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            From university admission to visa approval, we guide you every step
            of your international education journey.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">

          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="
                group
                bg-white
                rounded-2xl
                md:rounded-3xl
                p-4
                md:p-8
                text-center
                shadow-md
                hover:shadow-2xl
                border
                border-gray-100
                transition-all
                duration-300
              "
            >
              {/* Icon */}
              <div
                className="
                  w-14 h-14
                  md:w-20 md:h-20
                  mx-auto
                  rounded-full
                  bg-blue-100
                  flex
                  items-center
                  justify-center
                  text-blue-700
                  text-2xl
                  md:text-4xl
                  mb-3
                  md:mb-6
                  group-hover:bg-blue-700
                  group-hover:text-white
                  transition-all
                  duration-300
                "
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-3 text-gray-900">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Button */}
              <button
                className="
                  mt-3
                  md:mt-6
                  text-blue-700
                  font-semibold
                  text-xs
                  md:text-base
                  hover:text-blue-900
                "
              >
                Learn More →
              </button>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}