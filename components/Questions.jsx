"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "How much does your service cost?",
    answer:
      "Our service cost depends on the country and university. We also offer free consultation to guide you first.",
  },
  {
    question: "Do you guarantee visa approval?",
    answer:
      "We do not guarantee visas, but we maintain a very high success rate (98%) with proper documentation support.",
  },
  {
    question: "What documents are required?",
    answer:
      "You usually need academic certificates, passport, financial documents, and IELTS or equivalent test scores.",
  },
  {
    question: "How long does the visa process take?",
    answer:
      "It depends on the country. On average, it takes 2–8 weeks after application submission.",
  },
  {
    question: "Do you help with scholarships?",
    answer:
      "Yes, we help students find and apply for scholarships based on their academic profile.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-2">
            Everything you need to know before applying
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              layout
              className="bg-white/70 backdrop-blur-md border border-slate-100 rounded-2xl shadow-md overflow-hidden"
            >

              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-slate-800">
                  {faq.question}
                </span>

                <span className="text-blue-600">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-gray-600 text-sm leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}