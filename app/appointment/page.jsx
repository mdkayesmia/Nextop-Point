"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AppointmentPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SIMPLE VALIDATION
  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.email.includes("@")) return "Invalid email format";
    if (!form.phone.trim()) return "Phone is required";
    if (form.phone.length < 10) return "Invalid phone number";
    if (!form.service) return "Please select a service";
    if (!form.date) return "Please select a date";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validateForm();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("appointments").insert([
      form,
    ]);

    setLoading(false);

    if (error) {
      toast.error("Something went wrong!");
      return;
    }

    toast.success("Appointment booked successfully 🎉");

    // WhatsApp message
    router.push("/")

    // RESET FORM
    setForm({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      message: "",
    });

    // REDIRECT AFTER 1.5s
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-blue-50 to-blue-100 px-4 py-10">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-blue-900 text-center">
          Book Appointment
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Study Abroad • Visa • Air Ticket
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:outline-blue-900"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg focus:outline-blue-900"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg focus:outline-blue-900"
          />

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Service</option>
            <option value="study">Study Abroad</option>
            <option value="visa">Student Visa</option>
            <option value="tourist">Tourist Visa</option>
            <option value="ticket">Air Ticket</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message (optional)"
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            {loading ? "Submitting..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}