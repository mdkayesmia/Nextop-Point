"use client";

import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Nextop Point
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            We help students achieve their dream of studying abroad with expert
            guidance, visa support, and university admission assistance.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <li><Link href="/" className="hover:text-white text-sm transition">Home</Link></li>

          <li><Link href="/about" className="hover:text-white text-sm transition">About Us</Link></li>

          <li><Link href="/services" className="hover:text-white text-sm transition">Services</Link></li>

          <li><Link href="/countries" className="hover:text-white text-sm transition">Countries</Link></li>

          <li><Link href="/contact" className="hover:text-white text-sm transition">Contact</Link></li>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Study Abroad Guidance</li>
            <li>University Admission</li>
            <li>Visa Processing</li>
            <li>IELTS Support</li>
            <li>Career Counseling</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>

          <div className="space-y-3 text-sm text-gray-300">

            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              House-61, Shahmukhdum Avenue,
              Sector-12, Uttara Model Town,
              Dhaka-1230
            </div>

            <div className="flex items-center gap-2">
              <FaPhone />
              +880 1804-334313
            </div>
            <div className="flex items-center gap-2">
              <FaPhone />
              +880 1830-6274983
            </div>

            <div className="flex items-center gap-2">
              <FaEnvelope />
              nextoppoint.bd@gmail.com
            </div>

            <div className="flex items-center gap-3 mt-4 text-xl">
              <Link href={"https://www.facebook.com/profile.php?id=61564460451482&rdid=Iy7laUgKb68gMHMY&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18cH3GXxM8%2F#"}> <FaFacebook className="hover:text-blue-400 cursor-pointer" /></Link>
              <Link href="https://www.instagram.com/nextoppoint/"><FaInstagram className="hover:text-pink-400 cursor-pointer" /></Link>
              <FaLinkedin className="hover:text-blue-300 cursor-pointer" />
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

      {/* BOTTOM BAR */}
      <div className="border-t border-blue-900 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Nextop Point. All rights reserved.
        <p>
          Developed by{" "}
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            Md. Kayes Mia
          </a>
        </p>
      </div>

    </footer>
  );
}