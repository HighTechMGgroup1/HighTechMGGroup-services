"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Reel = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  video: string;
  category: string;
  duration: string;
};

const reels: Reel[] = [
  {
    id: 1,
    title: "XL Classes Coaching Promo Reel",
    description:
      "AI-generated promotional reel for XL Classes, showcasing coaching environment, faculty highlights, and student success-focused visuals.",
    thumbnail: "/images/reel1-thumb.png",
    video: "/videos/video1.mp4",
    category: "Education",
    duration: "0:45",
  },
  {
    id: 2,
    title: "Bhopal Gas Tragedy Awareness Reel",
    description:
      "AI-assisted cinematic reel presenting the historical impact of the Bhopal Gas Tragedy with powerful storytelling and documentary-style visuals.",
    thumbnail: "/images/reel2-thumb.png",
    video: "/videos/video2.mp4",
    category: "Documentary",
    duration: "1:20",
  },
  {
    id: 3,
    title: "HighTechMG Digital Products Agency Reel",
    description:
      "AI-crafted marketing reel for HighTechMG, highlighting digital product services, brand authority, and modern tech-driven business solutions.",
    thumbnail: "/images/reel3-thumb.png",
    video: "/videos/video3.mp4",
    category: "Marketing",
    duration: "1:00",
  },
];

export default function AiReelsPage() {
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);

  const openModal = (reel: Reel) => {
    setSelectedReel(reel);
  };

  const closeModal = () => {
    setSelectedReel(null);
  };

  useEffect(() => {
    if (selectedReel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedReel]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (pageRef.current) {
        const rect = pageRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 30,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <main
      ref={pageRef}
      className="relative bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white min-h-screen px-4 md:px-16 lg:px-24 py-32 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-500/10 to-amber-500/10 rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Mouse Follow Effect */}
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(251,191,36,0.08), transparent 70%)`,
          }}
        />

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aWNoIiB0eXBlPSJmcmFjdGFsTm9pc2UiLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]" />
        </div>
      </div>

      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative max-w-6xl mx-auto text-center mb-20"
      >
        {/* Decorative Line Above */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.div
            className="h-[1px] w-20 bg-gradient-to-r from-transparent to-amber-500/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
          <motion.div
            className="h-[1px] w-20 bg-gradient-to-l from-transparent to-amber-500/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          AI Reels Showcase
        </motion.h1>

        <motion.p
          className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          AI-generated short-form reels crafted for maximum engagement and
          social media growth. Each video is meticulously designed to captivate
          and convert.
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { label: "Projects", value: "15+" },
            { label: "Avg. Engagement", value: "8.5%" },
            { label: "Total Views", value: "2M+" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* Reel Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-32"
      >
        {reels.map((reel, index) => (
          <motion.div
            key={reel.id}
            variants={itemVariants}
            onMouseEnter={() => setHoveredId(reel.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => openModal(reel)}
            className="relative group cursor-pointer"
          >
            {/* Card Container */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:border-amber-500/30">
              {/* Thumbnail */}
              <div className="relative w-full aspect-[9/16] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Hover Play Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: hoveredId === reel.id ? 1 : 0,
                    scale: hoveredId === reel.id ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-500/30 blur-2xl" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.6)]">
                      <svg
                        className="w-8 h-8 text-black ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-xs font-medium text-amber-400">
                    {reel.category}
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white flex items-center gap-1.5">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {reel.duration}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6">
                {/* Hover Gradient Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-amber-500/[0.08] to-yellow-500/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <h3 className="relative text-xl font-bold text-transparent bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text mb-3 line-clamp-2 group-hover:from-amber-200 group-hover:to-yellow-300 transition-all duration-300">
                  {reel.title}
                </h3>

                <p className="relative text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                  {reel.description}
                </p>

                {/* Bottom Accent Line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 origin-left shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: hoveredId === reel.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Index Number */}
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center font-bold text-xl text-black shadow-[0_8px_24px_rgba(251,191,36,0.4)] group-hover:scale-110 transition-transform duration-300">
              {String(index + 1).padStart(2, "0")}
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl flex items-center justify-center z-50 p-4"
            onClick={handleOutsideClick}
          >
            <motion.div
              ref={modalRef}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-w-4xl w-full bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(251,191,36,0.3)]"
            >
              {/* Close Button */}
              <motion.button
                onClick={closeModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 z-20 bg-gradient-to-br from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-300 text-sm"
              >
                Close
              </motion.button>

              {/* Video Container */}
              <div className="relative w-full aspect-video bg-black">
                <video
                  src={selectedReel.video}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-sm font-medium text-amber-400">
                    {selectedReel.category}
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {selectedReel.duration}
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text mb-4">
                  {selectedReel.title}
                </h2>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {selectedReel.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-5xl mx-auto"
      >
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-amber-500/30 p-12 md:p-16 shadow-[0_0_80px_rgba(251,191,36,0.2)]">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-500/5" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-full blur-3xl" />

          <div className="relative text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text mb-6">
                Want High-Engagement AI Reels?
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              We create AI-powered short videos optimized for Instagram,
              Facebook, and paid ad campaigns. Transform your social media
              presence with cinematic, high-converting content.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/"
                className="group relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-br from-amber-500 to-yellow-600 text-black font-semibold rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10">Back to Home</span>
                <svg
                  className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
