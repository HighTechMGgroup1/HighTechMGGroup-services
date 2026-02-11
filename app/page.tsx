"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  featured?: boolean;
};

const featuredProjects: Project[] = [
  {
    id: 1,
    title: "DKS Handloom Shopping Platform",
    description:
      "Full-scale online shopping platform with product showcase, direct WhatsApp ordering system and admin-side product control for smooth business management.",
    image: "/images/project1.png",
    liveUrl: "https://www.dkshandloom.online/",
    featured: true,
  },
  {
    id: 2,
    title: "XL Coaching Classes Result Portal",
    description:
      "Student result portal designed for fast result access and downloadable mark sheets with clean interface and real student usability focus.",
    image: "/images/project2.png",
    liveUrl: "https://xl-classes.github.io/results.nic.in/",
    featured: true,
  },
  {
    id: 3,
    title: "Imitation Jewellery Store",
    description:
      "Premium jewellery showcase website built for smooth browsing, elegant product presentation and strong visual customer engagement.",
    image: "/images/project3.png",
    liveUrl: "https://js-immitation-jewellery-gilt.vercel.app",
    featured: true,
  },
];

const categories = [
  {
    title: "Websites",
    href: "/websites",
    description:
      "Modern, responsive and performance-driven websites designed to convert visitors into customers.",
    icon: "💎",
  },
  {
    title: "Logo Design",
    href: "/logo-design",
    description:
      "Unique and memorable logo identities crafted for strong brand positioning.",
    icon: "✨",
  },
  {
    title: "Poster Design",
    href: "/poster-design",
    description:
      "Eye-catching promotional posters built for campaigns, events and product launches.",
    icon: "🎨",
  },
  {
    title: "AI Reels",
    href: "/ai-reels",
    description:
      "AI-powered short video reels designed for high engagement and social media growth.",
    icon: "🎬",
  },
];

// Optimized Snowflake Component
function Snowflake({
  delay,
  duration,
  left,
}: {
  delay: number;
  duration: number;
  left: string;
}) {
  return (
    <motion.div
      className="absolute top-0 text-white/40 text-sm"
      style={{ left }}
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: "100vh",
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      ❄
    </motion.div>
  );
}

// Optimized Snow Effect - Reduced particles
function SnowEffect({ isMobile }: { isMobile: boolean }) {
  // Reduce snowflakes on mobile
  const snowflakeCount = isMobile ? 15 : 30;

  const snowflakes = useMemo(
    () =>
      Array.from({ length: snowflakeCount }, (_, i) => ({
        id: i,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 10,
        left: `${Math.random() * 100}%`,
      })),
    [snowflakeCount],
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {snowflakes.map((flake) => (
        <Snowflake
          key={flake.id}
          delay={flake.delay}
          duration={flake.duration}
          left={flake.left}
        />
      ))}
    </div>
  );
}

function PremiumButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={`group relative overflow-hidden px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
        isPrimary
          ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-gray-950 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 active:scale-95"
          : "border-2 border-amber-500/50 text-amber-400 hover:border-amber-400 hover:bg-amber-500/10 active:scale-95"
      } ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {isPrimary && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </Link>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="group relative"
    >
      <div className="relative bg-gradient-to-b from-gray-900/60 to-gray-950/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800/50 hover:border-amber-500/50 transition-all duration-500 shadow-2xl shadow-black/50 hover:shadow-amber-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.07] via-transparent to-yellow-500/[0.07] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative w-full h-72 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        </div>

        <div className="relative p-8">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-3 group-hover:from-amber-300 group-hover:to-yellow-400 transition-all duration-300">
            {project.title}
          </h3>

          <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
            {project.description}
          </p>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-950 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95"
          >
            <span>View Live</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: { title: string; href: string; description: string; icon: string };
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: "easeOut",
      }}
    >
      <Link
        href={category.href}
        className="group relative block p-8 rounded-2xl bg-gradient-to-b from-gray-900/50 to-gray-950/50 backdrop-blur-xl border border-gray-800/50 hover:border-amber-500/50 transition-all duration-300 overflow-hidden active:scale-95"
      >
        <div className="relative z-10">
          <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
            {category.icon}
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-3 group-hover:from-yellow-300 group-hover:to-amber-400 transition-all duration-300">
            {category.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
            {category.description}
          </p>
        </div>

        <div className="absolute inset-0 border border-amber-500/0 group-hover:border-amber-500/20 rounded-2xl transition-all duration-300" />
      </Link>
    </motion.div>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  useEffect(() => {
    setMounted(true);

    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative bg-gray-950 text-white min-h-screen w-full overflow-x-hidden">
      {/* Snow Effect */}
      <SnowEffect isMobile={isMobile} />

      {/* Simplified Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-black pointer-events-none" />

      {/* Reduced Noise Texture */}
      <div className="fixed inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aWNoIiB0eXBlPSJmcmFjdGFsTm9pc2UiLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]" />
      </div>

      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-24"
      >
        {/* Simplified Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="block bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                We Build High-Converting
              </span>
              <span className="block bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                Digital Experiences
              </span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Showcasing premium websites, creative branding, impactful posters,
            and AI-powered video reels crafted with precision and excellence.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <PremiumButton href="/websites" variant="primary">
              View Projects
            </PremiumButton>
            <PremiumButton href="#featured" variant="secondary">
              Explore Featured
            </PremiumButton>
          </motion.div>
        </div>

        {/* Simplified Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-amber-500/50 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full" />
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Projects Section */}
      <section
        id="featured"
        className="relative w-full py-24 md:py-32 px-6 md:px-16 lg:px-24"
      >
        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              A curated selection of high-performing digital products crafted
              with precision, performance, and premium design standards.
            </p>

            {/* Decorative Line */}
            <div className="mt-10 flex items-center justify-center gap-3">
              <div className="w-20 h-[2px] bg-gradient-to-r from-transparent to-amber-400/50" />
              <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
              <div className="w-20 h-[2px] bg-gradient-to-l from-transparent to-amber-400/50" />
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Link
              href="/websites"
              className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-xl overflow-hidden border-2 border-amber-400/40 hover:border-amber-400 transition-all duration-300 active:scale-95"
            >
              <span className="absolute inset-0 bg-white/5 backdrop-blur-xl" />
              <span className="relative z-10 text-amber-300 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                View All Websites
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative w-full py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent mb-6">
              Explore My Work Categories
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              From web development to creative branding and AI content, explore
              all my work categories and find what suits your needs.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-24 md:py-32 px-6 md:px-16 lg:px-24">
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-amber-400/20 
                 bg-gradient-to-b from-white/[0.07] to-white/[0.02] 
                 backdrop-blur-2xl 
                 p-10 md:p-14 lg:p-16
                 shadow-[0_0_60px_rgba(251,191,36,0.1)]
                 text-center"
          >
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
                <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                  Let's Build Something Powerful
                </span>
              </h2>

              <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                Whether you need a modern website, premium branding assets, or
                AI-driven marketing content — We craft high-performance digital
                experiences that actually convert and drive results.
              </p>

              <div className="flex justify-center">
                <PremiumButton
                  href="/websites"
                  variant="primary"
                  className="px-8 py-4 text-lg"
                >
                  View My Work
                </PremiumButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
