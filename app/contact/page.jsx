"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaGraduationCap,
} from "react-icons/fa";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);

    const { error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
      ]);

    setLoading(false);

    if (error) {
      console.log(error);
      return toast.error("Failed to send message");
    }

    toast.success("Message sent successfully");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-600 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Contact Nextop Point
          </h1>

          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Educational & Travel Consultancy
          </p>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-10">

            {/* LEFT SIDE */}
            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <h2 className="text-3xl font-bold text-blue-900 mb-8">
                Contact Information
              </h2>

              <div className="space-y-8">

                <div className="flex gap-4">
                  <div className="bg-blue-100 p-4 rounded-full h-fit">
                    <FaPhoneAlt className="text-blue-900 text-xl" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      Mobile
                    </h3>

                    <p className="text-gray-600">
                      +880 1804-334313
                    </p>

                    <p className="text-gray-600">
                      +880 1830-627498
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-green-100 p-4 rounded-full h-fit">
                    <FaEnvelope className="text-green-700 text-xl" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      Email
                    </h3>

                    <p className="text-gray-600">
                      nextoppoint.bd@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-red-100 p-4 rounded-full h-fit">
                    <FaMapMarkerAlt className="text-red-600 text-xl" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      Office Address
                    </h3>

                    <p className="text-gray-600 leading-7">
                      House-61, Shahmukhdum Avenue,
                      <br />
                      Sector-12, Uttara Model Town,
                      <br />
                      Dhaka-1230
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-yellow-100 p-4 rounded-full h-fit">
                    <FaGraduationCap className="text-yellow-600 text-xl" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      IELTS Club
                    </h3>

                    <p className="text-gray-600">
                      Nextop Point IELTS Club
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="bg-white p-8 rounded-3xl shadow-sm">

              <h2 className="text-3xl font-bold text-blue-900 mb-8">
                Quick Contact
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                  rows="6"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-300"
                >
                  <FaPaperPlane />
                  {loading ? "Sending..." : "Send Message"}
                </button>

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* MAP */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

            <div className="bg-blue-900 text-white text-center py-4">
              <h2 className="text-2xl font-bold">
                Find Us On Map
              </h2>
            </div>

            <iframe
              title="Nextop Point Location"
              src="https://maps.google.com/maps?q=Uttara%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[450px]"
              loading="lazy"
            />

          </div>

        </div>
      </section>

    </div>
  );
}