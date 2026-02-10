"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isPrimary = variant === "primary";

  return (
    <Link
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden px-8 py-4 rounded-xl font-semibold transition-all duration-500 ${isPrimary
        ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-gray-950 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50"
        : "border-2 border-amber-500/50 text-amber-400 hover:border-amber-400"
        } ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {isPrimary && (
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3), transparent)`,
          }}
        />
      )}
      {!isPrimary && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(251,191,36,0.15), transparent)`,
          }}
        />
      )}
    </Link>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative bg-gradient-to-b from-gray-900/50 to-gray-950/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 hover:border-amber-500/50 transition-all duration-700 transform hover:-translate-y-3 shadow-2xl shadow-black/50 hover:shadow-amber-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative w-full h-72 overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="w-full h-full"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
        </div>

        <div className="relative p-8">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-3">
            {project.title}
          </h3>

          <p className="text-gray-400 leading-relaxed mb-6">
            {project.description}
          </p>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-950 rounded-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-amber-500/30"
          >
            <span className="relative z-10">View Live</span>
            <motion.span
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              →
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
          </a>
        </div>

        <motion.div
          className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(251,191,36,0.3), transparent)",
          }}
          animate={{
            backgroundPosition: isHovered ? ["0% 0%", "200% 0%"] : "0% 0%",
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />
      </div>
    </motion.div >
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <Link
        ref={cardRef}
        href={category.href}
        onMouseMove={handleMouseMove}
        className="group relative block p-8 rounded-2xl bg-gradient-to-b from-gray-900/40 to-gray-950/40 backdrop-blur-sm border border-gray-800/50 hover:border-amber-500/50 transition-all duration-500 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(251,191,36,0.08), transparent)`,
          }}
        />

        <div className="relative z-10">
          <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
            {category.icon}
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-3 group-hover:from-yellow-300 group-hover:to-amber-400 transition-all duration-500">
            {category.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="absolute inset-0 border border-amber-500/0 group-hover:border-amber-500/20 rounded-2xl transition-all duration-500" />
      </Link>
    </motion.div>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative bg-gray-950 text-white min-h-screen w-full overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black pointer-events-none" />

      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(251,191,36,0.06), transparent)`,
        }}
      />

      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
      </div>

      <motion.section
        style={{ opacity, scale }}
        className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-24"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="block bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                We Build High-Converting
              </span>
              <span className="block bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Digital Experiences
              </span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-gray-400 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Showcasing premium websites, creative branding, impactful posters,
            and AI-powered video reels crafted with precision.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <PremiumButton href="/websites" variant="primary">
              View Projects
            </PremiumButton>
            <PremiumButton href="#featured" variant="secondary">
              Explore Featured
            </PremiumButton>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-amber-500/50 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.section>

      <section
        id="featured"
        className="relative w-full py-24 md:py-32 px-6 md:px-16 lg:px-24 overflow-hidden"
      >
        {/* Ambient Background */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-yellow-400/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 md:mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 leading-tight">
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>

            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              A curated selection of high-performing digital products crafted
              with precision, performance, and premium design standards.
            </p>

            {/* Subtle divider line */}
            <div className="mt-10 w-24 h-[2px] mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-40" />
          </motion.div>

          {/* Projects Grid */}
          <div className="relative mb-16">
            {/* Grid Glow Layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent pointer-events-none rounded-3xl" />

            <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Button Glow */}
              <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full opacity-40 pointer-events-none" />

              <div className="flex justify-center">
                <a
                  href="/websites"
                  className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-medium rounded-full overflow-hidden"
                >
                  {/* Glow Layer */}
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-400/30 via-yellow-400/30 to-amber-400/30 blur-xl opacity-40 group-hover:opacity-70 transition duration-500" />

                  {/* Border */}
                  <span className="absolute inset-0 rounded-full border border-amber-400/40 group-hover:border-amber-300 transition duration-300" />

                  {/* Background Glass */}
                  <span className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-full" />

                  {/* Shine Effect */}
                  <span className="absolute -left-40 top-0 h-full w-40 bg-white/20 skew-x-12 group-hover:left-[120%] transition-all duration-700" />

                  {/* Text */}
                  <span className="relative z-10 text-amber-300 group-hover:text-white transition duration-300">
                    View All Websites →
                  </span>
                </a>
              </div>

            </div>
          </motion.div>
        </div>
      </section>


      <section className="relative w-full py-32 px-6 md:px-16 lg:px-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent mb-6">
              Explore My Work Categories
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              From web development to creative branding and AI content, explore
              all my work categories.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full py-24 md:py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-400/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-amber-400/20 
                 bg-gradient-to-b from-white/5 to-white/[0.02] 
                 backdrop-blur-2xl 
                 p-10 md:p-14 lg:p-16
                 shadow-[0_0_60px_rgba(251,191,36,0.08)]
                 text-center"
          >
            {/* Inner subtle border glow */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-6">
                <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                  Let’s Build Something Powerful
                </span>
              </h2>

              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                Whether you need a modern website, premium branding assets,
                or AI-driven marketing content — We craft high-performance
                digital experiences that actually convert.
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


      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </main>
  );
}