"use client";

import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaUniversity,
  FaPassport,
  FaPlaneDeparture,
  FaFileAlt,
  FaGlobeAsia,
  FaCheckCircle,
} from "react-icons/fa";

const services = [
  {
    icon: <FaGraduationCap />,
    title: "Study Abroad Guidance",
    description:
      "Professional counseling to choose the right country, university, and course based on your career goals.",
  },
  {
    icon: <FaUniversity />,
    title: "University Admission",
    description:
      "Complete support for applications, offer letters, scholarships, and admission processing.",
  },
  {
    icon: <FaPassport />,
    title: "Visa Processing",
    description:
      "Expert visa documentation, interview preparation, and application submission support.",
  },
  {
    icon: <FaFileAlt />,
    title: "Document Assistance",
    description:
      "Help with SOP, CV, recommendation letters, financial documents, and more.",
  },
  {
    icon: <FaPlaneDeparture />,
    title: "Travel Support",
    description:
      "Flight booking, accommodation guidance, and pre-departure orientation.",
  },
  {
    icon: <FaGlobeAsia />,
    title: "Global Opportunities",
    description:
      "Access universities and institutions across multiple countries worldwide.",
  },
];

const processSteps = [
  "Free Consultation",
  "University Selection",
  "Application Submission",
  "Offer Letter",
  "Visa Processing",
  "Travel & Departure",
];

export default function ServicesPage() {
  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <section className="relative overflow-hidden bg-blue-900 text-white py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:30px_30px]" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Our Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto text-lg text-blue-100"
          >
            Comprehensive education consultancy and visa services
            designed to help students achieve their international
            study goals successfully.
          </motion.p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20">
        <div className="container mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-blue-900">
              What We Offer
            </h2>
            <p className="text-gray-500 mt-3">
              Complete support from admission to departure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="text-5xl text-blue-900 mb-5">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {service.description}
                </p>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-blue-900">
              Our Process
            </h2>
            <p className="text-gray-500 mt-3">
              Simple and transparent steps to success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-blue-900 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {index + 1}
                </div>

                <h3 className="font-semibold">
                  {step}
                </h3>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20">
        <div className="container mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-blue-900">
              Why Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              "Government Licensed Consultancy",
              "10+ Years Experience",
              "End-to-End Student Support",
              "Professional Visa Guidance",
              "Trusted by Students Worldwide",
              "Transparent Process",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow flex items-center gap-4"
              >
                <FaCheckCircle className="text-green-600 text-2xl" />

                <span className="font-medium">
                  {item}
                </span>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 text-white py-24">
        <div className="container mx-auto px-6 text-center">

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready To Study Abroad?
          </motion.h2>

          <p className="max-w-2xl mx-auto text-blue-100 mb-8">
            Let our experts guide you through admissions,
            visa processing, and travel arrangements.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg"
          >
            Book Free Consultation
          </motion.button>

        </div>
      </section>

    </div>
  );
}