"use client";

import { motion } from "framer-motion";
import Ask from "./../../components/Ask"
import Link from "next/link";
import {
  FaPassport,
  FaUniversity,
  FaFileAlt,
  FaPlaneDeparture,
  FaCheckCircle,
  FaGlobeAsia,
  FaUserGraduate,
  FaQuestionCircle,
} from "react-icons/fa";

const countries = [
  "🇨🇦 Canada",
  "🇦🇺 Australia",
  "🇬🇧 United Kingdom",
  "🇺🇸 United States",
  "🇳🇿 New Zealand",
  "🇩🇪 Germany",
  "🇲🇾 Malaysia",
  "🇸🇪 Sweden",
];

const documents = [
  "Valid Passport",
  "Academic Certificates & Transcripts",
  "IELTS / TOEFL / PTE Score",
  "University Offer Letter",
  "Bank Statement",
  "Sponsor Documents",
  "Medical Certificate",
  "Visa Application Form",
  "Passport Size Photos",
];

const processSteps = [
  {
    title: "Profile Assessment",
    icon: <FaUserGraduate />,
  },
  {
    title: "University Admission",
    icon: <FaUniversity />,
  },
  {
    title: "Document Collection",
    icon: <FaFileAlt />,
  },
  {
    title: "Visa Application",
    icon: <FaPassport />,
  },
  {
    title: "Interview Preparation",
    icon: <FaCheckCircle />,
  },
  {
    title: "Fly Abroad",
    icon: <FaPlaneDeparture />,
  },
];

export default function VisaGuidancePage() {
  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Student Visa Guidance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto text-xl text-blue-100"
          >
            Get complete visa assistance from university admission
            to visa approval and departure.
          </motion.p>

          <button className="mt-8 bg-white text-blue-900 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
            <Link href={"/appointment"}> Book Free Consultation</Link>
          </button>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900">
              Why Choose Our Visa Guidance?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              "Expert Consultants",
              "95% Success Rate",
              "Complete Documentation",
              "Interview Preparation",
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
              >
                <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
                <h3 className="font-bold">{item}</h3>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
            Visa Application Process
          </h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-6 rounded-2xl shadow text-center"
              >
                <div className="text-blue-900 text-4xl mb-4 flex justify-center">
                  {step.icon}
                </div>

                <h3 className="font-semibold">
                  {step.title}
                </h3>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
            Required Documents
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {documents.map((doc, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                className="bg-white p-4 rounded-xl shadow flex items-center gap-3"
              >
                <FaCheckCircle className="text-green-500" />
                {doc}
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* COUNTRIES */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
            Countries We Support
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {countries.map((country, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-2xl shadow-xl text-center"
              >
                <FaGlobeAsia className="mx-auto text-4xl mb-4" />
                <h3 className="font-bold text-lg">
                  {country}
                </h3>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* INTERVIEW TIPS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
            Visa Interview Preparation
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Why did you choose this country?",
              "Why this university?",
              "Who will sponsor your education?",
              "What are your future plans?",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow"
              >
                ✔ {item}
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* REJECTION REASONS */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-red-600 mb-12">
            Common Visa Rejection Reasons
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "Incomplete Documents",
              "Weak Financial Proof",
              "False Information",
              "Poor Interview Performance",
              "Unclear Study Plan",
              "Insufficient Funds",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-red-50 border border-red-200 p-6 rounded-xl"
              >
                ❌ {item}
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl p-6 shadow text-center">
              <h3 className="text-5xl font-bold text-blue-900">
                95%
              </h3>
              <p>Visa Success Rate</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow text-center">
              <h3 className="text-5xl font-bold text-blue-900">
                5000+
              </h3>
              <p>Students Assisted</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow text-center">
              <h3 className="text-5xl font-bold text-blue-900">
                20+
              </h3>
              <p>Countries</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow text-center">
              <h3 className="text-5xl font-bold text-blue-900">
                10+
              </h3>
              <p>Years Experience</p>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ */}
      <Ask/>

      {/* CTA */}
      <section className="bg-blue-900 text-white py-20">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold mb-6">
            Ready To Start Your Study Abroad Journey?
          </h2>

          <p className="text-blue-100 mb-8">
            Contact our experts today and get a free consultation.
          </p>

          <button className="bg-white text-blue-900 px-8 py-3 rounded-xl font-bold hover:scale-105 transition">
           <Link href={"/appointment"}> Contact Us Now</Link>
          </button>

        </div>

      </section>

    </div>
  );
}