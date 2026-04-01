"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight, Phone, Mail, Star, Shield, Users,
  Award, Heart, CheckCircle,
} from "lucide-react";
import { motion, Variants } from "framer-motion"; // Variants මෙහිදී එක් කර ඇත
import { useTranslations } from "next-intl";
import { contact } from "@/data/contact";

// 1. Animation Variants වලට 'Variants' type එක ලබා දීමෙන් Error එක විසඳේ
const reveal: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] // දැන් මෙය නිවැරදිව හඳුනා ගනී
    } 
  },
};

const stagger: Variants = { 
  hidden: {}, 
  show: { transition: { staggerChildren: 0.1 } } 
};

export default function AboutPage() {
  const t = useTranslations("about");
  const tStats = useTranslations("stats");
  const tWhy = useTranslations("whyUs");

  const STATS = [
    { value: "10+", label: tStats("experience") },
    { value: "5000+", label: tStats("travelers") },
    { value: "24/7", label: tStats("support") },
    { value: "100%", label: tStats("certified") },
  ];

  const REASONS = [
    { icon: Shield, title: tWhy("features.licensed.title"), desc: tWhy("features.licensed.desc") },
    { icon: Star, title: tWhy("features.rated.title"), desc: tWhy("features.rated.desc") },
    { icon: Users, title: tWhy("features.private.title"), desc: tWhy("features.private.desc") },
    { icon: Heart, title: tWhy("features.passionate.title"), desc: tWhy("features.passionate.desc") },
    { icon: Award, title: tWhy("features.pata.title"), desc: tWhy("features.pata.desc") },
    { icon: CheckCircle, title: tWhy("features.transparent.title"), desc: tWhy("features.transparent.desc") },
  ];

  const CHECKLIST = [
    t("checklist.item1"),
    t("checklist.item2"),
    t("checklist.item3"),
    t("checklist.item4"),
  ];

  const PARTNERS = [
    { name: "Sri Lanka Tourism", short: "SLT" },
    { name: "TripAdvisor", short: "TRIP" },
    { name: "Tourism Board", short: "SLTDA" },
    { name: "PATA", short: "PATA" },
    { name: "SKAL", short: "SKAL" },
  ];

  return (
    <main className="bg-white overflow-hidden">
      {/* HERO */}
      <section className="relative bg-linear-to-r from-orange-600 to-amber-500 py-20 px-6 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-bold text-white tracking-tight"
          >
            {t("title")}
          </motion.h1>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="relative py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left: Image Side */}
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-4/5 shadow-2xl">
              <Image 
                src="/aboutcover.jpg" 
                alt="Exploring Sri Lanka" 
                fill 
                className="object-cover" 
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl">
                <p className="text-orange-600 font-serif italic text-2xl">Create your</p>
                <p className="text-orange-700 font-black text-4xl uppercase tracking-tighter">Memories</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Text Side */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={reveal} className="flex items-center gap-3 mb-6">
              <div className="h-0.5 w-10 bg-orange-500" />
              <span className="text-orange-500 text-xs font-bold tracking-[0.3em] uppercase">{t("label")}</span>
            </motion.div>

            <motion.h2 variants={reveal} className="text-4xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-8">
              {t("heading")}{" "}
              <span className="text-orange-500 underline decoration-amber-300 underline-offset-8">
                {t("headingHighlight")}
              </span>
            </motion.h2>

            <motion.div variants={reveal} className="space-y-6 text-gray-600 text-lg leading-relaxed mb-10">
              <p>{t("desc1")}</p>
              <p>{t("desc2")}</p>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {CHECKLIST.map((item) => (
                <motion.div key={item} variants={reveal} className="flex items-center gap-3">
                  <div className="bg-orange-100 p-1 rounded-full">
                    <CheckCircle className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={reveal}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gray-900 text-white font-bold transition-all hover:bg-orange-600 shadow-xl"
              >
                {t("cta")}
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map(({ value, label }) => (
            <motion.div key={label} variants={reveal} className="bg-white border border-gray-100 p-10 rounded-4xl text-center shadow-sm">
              <h3 className="text-5xl font-black text-gray-900 mb-2">{value}</h3>
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em]">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gray-50 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REASONS.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={reveal} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-500 transition-colors">
                  <Icon className="w-7 h-7 text-orange-600 group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{title}</h4>
                <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-32 px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="max-w-7xl mx-auto bg-orange-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
          <div className="relative z-10 text-white">
            <h2 className="text-4xl lg:text-6xl font-bold mb-10 tracking-tight">Ready to plan your dream getaway?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="tel:+94769300334" className="flex items-center gap-3 px-8 py-4 bg-white text-orange-600 rounded-full font-bold shadow-lg">
                <Phone size={20} /> ${contact.phone}
              </a>
              <a href="${contact.email}" className="flex items-center gap-3 px-8 py-4 bg-orange-700 text-white rounded-full font-bold">
                <Mail size={20} /> Email Us
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}