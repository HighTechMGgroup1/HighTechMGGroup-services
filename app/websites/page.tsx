"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type WebsiteProject = {
  id: number;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  category: string;
  tags?: string[];
};

const websiteProjects: WebsiteProject[] = [
  {
    id: 1,
    title: "DKS Handloom Shopping Platform",
    description:
      "Complete online shopping experience with product browsing, direct WhatsApp ordering, and admin-side product management for seamless business operations.",
    image: "/images/project1.png",
    liveUrl: "https://www.dkshandloom.online/",
    category: "Ecommerce",
    tags: ["Next.js", "WhatsApp API", "Admin Panel"],
  },
  {
    id: 2,
    title: "XL Coaching Classes Result Portal",
    description:
      "Student result portal where users can easily search and download academic results with a clean, fast and user-friendly interface designed for real student usage.",
    image: "/images/project2.png",
    liveUrl: "https://xl-classes.github.io/results.nic.in/",
    category: "Education",
    tags: ["React", "PDF Generation", "Search"],
  },
  {
    id: 3,
    title: "Mountain Mirage Hotel Website",
    description:
      "Premium hotel website featuring room showcase, booking flow, and immersive layout designed to enhance customer trust and increase direct reservations.",
    image: "/images/project3.png",
    liveUrl: "https://hotel-mountain-mirage.vercel.app",
    category: "Hospitality",
    tags: ["Next.js", "Booking System", "Premium UI"],
  },
  {
    id: 4,
    title: "Imitation Jewellery Store",
    description:
      "Elegant jewellery showcase platform designed for product highlighting, smooth browsing experience, and visually rich presentation for online customers.",
    image: "/images/project4.png",
    liveUrl: "https://js-immitation-jewellery-gilt.vercel.app",
    category: "Ecommerce",
    tags: ["E-commerce", "Product Showcase", "Responsive"],
  },
  {
    id: 5,
    title: "Marble Business Digital Platform",
    description:
      "End-to-end marble business website including trust-building pages and multiple real-world calculators for project estimation, material planning, and logistics calculations.",
    image: "/images/project5.png",
    liveUrl: "https://marble-website-nextjs.vercel.app",
    category: "Business",
    tags: ["Next.js", "Calculators", "Business Tools"],
  },
  {
    id: 6,
    title: "Modern Construction Company Website",
    description:
      "Professional construction business website showcasing services, completed projects, and enquiry-focused layout for strong client conversion.",
    image: "/images/project6.png",
    liveUrl: "https://gaurav786kumawat.github.io/modern-construction-site/",
    category: "Business",
    tags: ["Portfolio", "Services", "CRM"],
  },
  {
    id: 7,
    title: "Web Agency Platform",
    description:
      "Complete agency platform featuring service pages, pricing structure, reusable layouts, and scalable architecture for long-term business growth.",
    image: "/images/project7.png",
    liveUrl: "https://services.gauravkumawat.online",
    category: "Agency",
    tags: ["Multi-page", "Pricing", "Scalable"],
  },
  {
    id: 8,
    title: "Mukesh Lilawat Portfolio",
    description:
      "Personal portfolio website designed to showcase professional work, achievements, and contact presence with clean and modern layout design.",
    image: "/images/project8.png",
    liveUrl: "https://mukeshlilawat.online",
    category: "Portfolio",
    tags: ["Personal Brand", "Modern", "Minimal"],
  },
  {
    id: 9,
    title: "Gaurav Kumawat Portfolio",
    description:
      "Personal developer portfolio highlighting projects, digital work showcase, and professional online presence with premium UI styling.",
    image: "/images/project9.png",
    liveUrl: "https://portfolio.gauravkumawat.online",
    category: "Portfolio",
    tags: ["Developer", "Projects", "Premium"],
  },
];

export default function WebsitesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const pageRef = useRef<HTMLDivElement | null>(null);

  const categories = [
    "All",
    ...Array.from(new Set(websiteProjects.map((p) => p.category))),
  ];

  const filteredProjects =
    activeCategory === "All"
      ? websiteProjects
      : websiteProjects.filter((p) => p.category === activeCategory);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <main
      ref={pageRef}
      className="relative bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white min-h-screen w-full px-6 md:px-16 lg:px-24 py-32 overflow-hidden"
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
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
        </div>
      </div>

      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative max-w-7xl mx-auto text-center mb-16"
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
          Website Projects
        </motion.h1>

        <motion.p
          className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A collection of premium websites crafted with performance, aesthetics
          and conversion strategy in mind. Each project is built to deliver
          exceptional user experiences.
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { label: "Projects Delivered", value: "9+" },
            { label: "Industries Served", value: "6" },
            { label: "Client Satisfaction", value: "100%" },
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

      {/* Category Filter */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative max-w-7xl mx-auto mb-16"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-[0_4px_20px_rgba(251,191,36,0.4)]"
                  : "bg-gray-900/50 text-gray-400 border border-gray-800 hover:border-amber-500/50 hover:text-amber-400 backdrop-blur-sm"
              }`}
            >
              {category}
              {activeCategory === category && (
                <motion.div
                  layoutId="categoryBackground"
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full -z-10"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section
        key={activeCategory}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-32"
      >
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_8px_32px_rgba(251,191,36,0.15)] hover:border-amber-500/30 hover:-translate-y-2">
                {/* Image */}
                <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-xs font-medium text-amber-400">
                      {project.category}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-center pb-6"
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-semibold rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(251,191,36,0.5)] hover:shadow-[0_4px_30px_rgba(251,191,36,0.7)] transition-all duration-300 flex items-center gap-2"
                    >
                      <span className="relative z-10">View Live</span>
                      <svg
                        className="relative z-10 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </a>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative p-6">
                  {/* Hover Gradient Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-amber-500/[0.08] to-yellow-500/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  <h3 className="relative text-xl font-bold text-transparent bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text mb-3 line-clamp-2 group-hover:from-amber-200 group-hover:to-yellow-300 transition-all duration-300">
                    {project.title}
                  </h3>

                  <p className="relative text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Tags */}
                  {project.tags && (
                    <div className="relative flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full bg-gray-800/80 text-gray-400 border border-gray-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bottom Accent Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 origin-left shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: hoveredId === project.id ? 1 : 0,
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
        </AnimatePresence>
      </motion.section>

      {/* Bottom CTA */}
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
                Need a Custom Website?
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              We build high-performance, responsive and conversion-focused
              websites tailored for your business goals. Let's create something
              extraordinary together.
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
