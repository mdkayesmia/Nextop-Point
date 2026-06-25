"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import {
  FaUserGraduate,
  FaGlobe,
  FaAward,
  FaCertificate,
  FaPassport,
  FaUniversity,
  FaPlane,
  FaArrowRight,
} from "react-icons/fa";

// --- ANIMATION CONFIGS ---
const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    opacity: 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.2,
      delay,
    },
  },
});

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function AboutPage() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalCountries: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const { data: clients } = await supabase.from("clients").select("country");

    const countries = [
      ...new Set(
        (clients || [])
          .map((c) => c.country)
          .filter(Boolean)
      ),
    ];

    setStats({
      totalClients: clients?.length || 0,
      totalCountries: countries.length,
    });
  }

  return (
    <div className="bg-slate-50 text-slate-800 overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 text-white py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span 
              variants={fadeIn("up", 0)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-blue-500/10 text-blue-300 border border-blue-500/20 inline-block mb-6"
            >
              Discover Our Journey
            </motion.span>
            <motion.h1 
              variants={fadeIn("up", 0.1)}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200"
            >
              Empowering Global <br />Educational Dreams
            </motion.h1>
            <motion.p 
              variants={fadeIn("up", 0.2)}
              className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto"
            >
              We are a premier education and visa consultancy dedicated to unlocking global opportunities through bespoke admissions support, flawless documentation, and complete travel guidance.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeIn("right")} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-3xl opacity-10 blur-2xl group-hover:opacity-20 transition duration-500" />
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
                <Image
                  src="/air-ticket.png"
                  alt="Our dynamic consultancy team collaborating"
                  width={600}
                  height={450}
                  className="rounded-2xl w-full object-cover aspect-[4/3] transform hover:scale-[1.02] transition duration-500"
                  priority
                />
              </div>
            </motion.div>

            <motion.div variants={fadeIn("left")} className="space-y-6">
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Who We Are</span>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
                Architecting Transitions To World-Class Learning
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Navigating overseas admission shouldn't be an overwhelming maze. With structural integrity and expert insight at our core, we optimize your candidacy for elite international academies.
              </p>
              <div className="h-px bg-slate-200 my-4" />
              <p className="text-slate-600 leading-relaxed">
                From initial profiling and micro-targeting destination universities to dynamic interview simulation checks and ultimate visa clearance, we stand by you at every single gateway.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <StatCard
              icon={<FaUserGraduate />}
              value={stats.totalClients}
              suffix="+"
              title="Students Assisted"
            />
            <StatCard
              icon={<FaGlobe />}
              value={stats.totalCountries}
              suffix="+"
              title="Countries Served"
            />
            <StatCard
              icon={<FaAward />}
              value={10}
              suffix="+"
              title="Years Experience"
            />
            <StatCard
              icon={<FaCertificate />}
              value="Licensed"
              title="Government Approved"
            />
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Our Core Advantages</span>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mt-2">
              Why Strategic Students Choose Us
            </h2>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            <FeatureCard 
              icon={<FaCertificate />}
              title="Government Licensed"
              description="Full legal compliance and audited protocols secure your timeline against fraudulent practices."
            />
            <FeatureCard 
              icon={<FaUniversity />}
              title="University Admissions"
              description="Direct channels with world-ranking institutions amplify offer letter generation rates."
            />
            <FeatureCard 
              icon={<FaPassport />}
              title="Visa Processing"
              description="Exceptional success rate driven by thorough financial auditing and mock interview frameworks."
            />
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">What We Provide</span>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mt-2">
              End-To-End Mobility Ecosystem
            </h2>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            <ServiceCard
              icon={<FaUniversity />}
              title="University Admission"
              text="Comprehensive portfolio curation matching your long-term academic and financial goals."
            />
            <ServiceCard
              icon={<FaPassport />}
              title="Visa Assistance"
              text="Meticulous application indexing to satisfy complex immigration compliance seamlessly."
            />
            <ServiceCard
              icon={<FaPlane />}
              title="Travel Support"
              text="Pre-departure orientations, logistical coordination, and accommodation networking support."
            />
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div 
              variants={fadeIn("up")}
              className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 transition-all group-hover:w-3" />
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To break structural borders down for ambitious minds by executing high-standard consultations, unlocking access to peerless world resources securely.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeIn("up")}
              className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500 transition-all group-hover:w-3" />
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To establish the benchmark for international student pipelines, expanding trusted operations across continuous borders while retaining individualized focus.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-gradient-to-br from-blue-950 to-slate-950 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.1),transparent_40%)]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Formulate Your Global Future?
            </h2>
            <p className="text-blue-200/80 mb-10 text-lg font-light max-w-xl mx-auto leading-relaxed">
              Engage directly with experienced evaluation consultants today. Let us convert your aspirations into active placements.
            </p>
            <button className="inline-flex items-center gap-3 bg-white text-blue-950 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition transform hover:-translate-y-0.5 shadow-lg group">
              Contact Us Now
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

// --- SUB-COMPONENTS WITH ANIMATIONS ---

function AnimatedCounter({ from = 0, to, duration = 2 }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration, ease: "easeOut" });
      const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [inView, to, count, rounded, duration]);

  return <span ref={ref}>{displayValue}</span>;
}

function StatCard({ icon, value, suffix = "", title }) {
  return (
    <motion.div 
      variants={fadeIn("up")}
      className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center shadow-sm hover:shadow-md transition duration-300"
    >
      <div className="text-3xl text-blue-600 flex justify-center mb-4 bg-blue-50 w-14 h-14 items-center rounded-xl mx-auto">
        {icon}
      </div>
      <h3 className="text-4xl font-extrabold text-slate-900 mb-1 tracking-tight">
        {typeof value === "number" ? (
          <AnimatedCounter to={value} />
        ) : (
          value
        )}
        {suffix}
      </h3>
      <p className="text-slate-500 font-medium text-sm">
        {title}
      </p>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      variants={fadeIn("up")}
      className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-blue-200 transition duration-300 group"
    >
      <div className="text-3xl text-blue-600 mb-5 bg-blue-50/50 w-12 h-12 flex items-center justify-center rounded-xl group-hover:bg-blue-600 group-hover:text-white transition duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function ServiceCard({ icon, title, text }) {
  return (
    <motion.div 
      variants={fadeIn("up")}
      className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center hover:bg-white hover:shadow-xl hover:border-slate-200/80 transition duration-300 group"
    >
      <div className="text-4xl text-blue-600 flex justify-center mb-5 bg-white w-16 h-16 items-center rounded-2xl mx-auto shadow-sm group-hover:scale-110 transition duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
}