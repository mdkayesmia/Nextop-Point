"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { HiMenu, HiX } from "react-icons/hi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaClock,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const bdTime = new Date().toLocaleTimeString("en-BD", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setTime(bdTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-950 text-white h-10 flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">

          {/* Contact Info */}
          <div className="hidden xl:flex items-center gap-4 text-sm whitespace-nowrap">
            <span>📧 nextoppoint.bd@gmail.com</span>
            <span>📞 +880 1804-334313</span>
          </div>

          {/* Marquee Services */}
          <div className="flex-1 overflow-hidden">
            <Marquee speed={40} pauseOnHover gradient={false}>
              🎓 Study Abroad Guidance &nbsp; • &nbsp;
              🏛️ University Admission &nbsp; • &nbsp;
              📑 Student Visa Processing &nbsp; • &nbsp;
              🌍 Tourist Visa Services &nbsp; • &nbsp;
              ✈️ International Air Ticket Booking &nbsp; • &nbsp;
              🛂 Visa Consultancy &nbsp; • &nbsp;
              🎯 Scholarship Assistance &nbsp; • &nbsp;
            </Marquee>
          </div>

          {/* Time + Social */}
          <div className="flex items-center gap-4 whitespace-nowrap">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FaClock className="text-blue-300" />
              <span>{time}</span>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61564460451482&rdid=Iy7laUgKb68gMHMY&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18cH3GXxM8%2F#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/nextoppoint/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://wa.me/+8801804334313"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 h-15 flex items-center justify-between">
          
          {/* Logo */}
          <Link href={"/"}><h1 className="text-2xl font-bold text-blue-900">
            Nextop Point
          </h1></Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 font-medium">
            <Link href="/" className="hover:text-blue-900">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-900">
              About
            </Link>
            <Link href="/services" className="hover:text-blue-900">
              Services
            </Link>
            <Link href="/countries" className="hover:text-blue-900">
              Countries
            </Link>
            <Link href="/visa-guide" className="hover:text-blue-900">
              Visa Guide
            </Link>
            <Link href="/blog" className="hover:text-blue-900">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-blue-900">
              Contact
            </Link>
            <Link href="/admin" className="hover:text-blue-900">
              Admin
            </Link>
          </div>

          {/* CTA Button */}
          <Link href={"/appointment"}><button className="hidden md:block bg-blue-900 text-white px-5 py-3 rounded-lg hover:bg-blue-800 transition">
            Book Appointment
          </button></Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-white border-t">
            <div className="flex flex-col gap-4 p-4">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/countries">Countries</Link>
              <Link href="/visa-guide">Visa Guide</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/admin">Admin</Link>

              <button className="bg-blue-900 text-white py-3 rounded-lg">
                Book Appointment
              </button>

              <div className="flex justify-center gap-4 pt-2 text-lg">
                <FaFacebookF />
                <FaInstagram />
                <FaLinkedinIn />
                <FaWhatsapp />
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}