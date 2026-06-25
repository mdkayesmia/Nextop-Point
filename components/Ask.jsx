"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How long does visa processing take?",
      answer:
        "Visa processing time depends on the country and visa type. On average, student visa processing takes between 2 to 12 weeks after submission of all required documents.",
    },
    {
      question: "Can I apply without IELTS?",
      answer:
        "Yes. Many universities and colleges accept alternative English proficiency proofs or offer admission without IELTS depending on your academic background and destination country.",
    },
    {
      question: "Can I work while studying?",
      answer:
        "Yes. Most countries allow international students to work part-time during studies and full-time during scheduled breaks. Work regulations vary by country.",
    },
    {
      question: "What if my visa gets rejected?",
      answer:
        "If your visa application is rejected, our consultants will review the rejection reasons, guide you through the appeal or reapplication process, and help strengthen your next application.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-3">
            Find answers to the most common questions about studying abroad,
            university admission, and visa processing.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>

                {openIndex === index ? (
                  <FaChevronUp className="text-blue-900" />
                ) : (
                  <FaChevronDown className="text-blue-900" />
                )}
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}