"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Websites", href: "/websites" },
  { name: "Logo Design", href: "/logo-design" },
  { name: "Poster Design", href: "/poster-design" },
  { name: "AI Reels", href: "/ai-reels" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        when: "beforeChildren",
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const decorVariants = {
    closed: { opacity: 0, scale: 0.8, rotate: -10 },
    open: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 z-[60]">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.5)]"
          style={{ width: progressWidth }}
        />
      </div>

      <motion.header
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "bg-gray-950/90 backdrop-blur-3xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
            : "bg-transparent"
        }`}
      >
        {/* Enhanced Gradient Orb Following Mouse */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none"
          style={{
            opacity: scrolled ? 0.5 : 0,
            background: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(251,191,36,0.05), transparent 70%)`,
          }}
        />

        {/* Refined Noise Texture */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
        </div>

        <nav className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative z-10">
            <motion.div
              className="relative text-2xl md:text-3xl font-bold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="relative bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                HighTechMG
              </span>

              {/* Logo Glow Effect */}
              <div className="absolute -inset-3 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10 animate-pulse-slow" />

              {/* Subtle Underline */}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group px-5 py-2.5"
                >
                  <span
                    className={`relative text-sm font-medium tracking-wide transition-all duration-300 ${
                      isActive
                        ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                        : "text-gray-300 group-hover:text-amber-300"
                    }`}
                  >
                    {link.name}
                  </span>

                  {/* Active/Hover Underline */}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full origin-left shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                    initial={false}
                    animate={{
                      scaleX: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    whileHover={{
                      scaleX: 1,
                      opacity: isActive ? 1 : 0.7,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />

                  {/* Hover Background */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.07] to-yellow-500/[0.07] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 backdrop-blur-sm"
                      initial={false}
                    />
                  )}

                  {/* Active Background with Animation */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.12] to-yellow-500/[0.12] rounded-xl -z-10 backdrop-blur-sm border border-amber-500/20"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            whileTap={{ scale: 0.92 }}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center focus:outline-none group"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full h-[2px] bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full origin-center"
              />
              <motion.span
                animate={{
                  opacity: isOpen ? 0 : 1,
                  scaleX: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full h-[2px] bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full h-[2px] bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full origin-center"
              />
            </div>
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mounted && isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Enhanced Backdrop */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(32px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 bg-gradient-to-br from-gray-950/97 via-gray-900/97 to-black/97"
            />

            {/* Animated Gradient Orbs */}
            <motion.div
              variants={decorVariants}
              className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/[0.15] to-yellow-500/[0.15] rounded-full blur-[140px] pointer-events-none"
            />
            <motion.div
              variants={decorVariants}
              className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-500/[0.15] to-amber-500/[0.15] rounded-full blur-[140px] pointer-events-none"
            />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aWNoIiB0eXBlPSJmcmFjdGFsTm9pc2UiLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIxIi8+PC9zdmc+')]" />
            </div>

            {/* Menu Content */}
            <div className="relative h-full flex flex-col items-center justify-center px-8">
              <nav className="flex flex-col items-center gap-3 w-full max-w-md">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      variants={menuItemVariants}
                      className="w-full"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="group relative block w-full"
                      >
                        <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.08] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_8px_32px_rgba(251,191,36,0.1)]">
                          {/* Hover/Active Gradient */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br from-amber-500/[0.12] via-yellow-500/[0.08] to-amber-500/[0.12] opacity-0 group-hover:opacity-100 transition-all duration-700 ${
                              isActive ? "!opacity-100" : ""
                            }`}
                          />

                          {/* Border Glow */}
                          <div
                            className={`absolute inset-0 rounded-2xl transition-all duration-700 ${
                              isActive
                                ? "shadow-[inset_0_0_0_1px_rgba(251,191,36,0.3)] shadow-amber-500/20"
                                : "shadow-[inset_0_0_0_1px_transparent] group-hover:shadow-[inset_0_0_0_1px_rgba(251,191,36,0.2)]"
                            }`}
                          />

                          {/* Link Text */}
                          <span
                            className={`relative block text-2xl font-semibold tracking-wide transition-all duration-500 ${
                              isActive
                                ? "text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 bg-clip-text drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]"
                                : "text-gray-300 group-hover:text-amber-300"
                            }`}
                          >
                            {link.name}
                          </span>

                          {/* Active Indicator Dot */}
                          {isActive && (
                            <motion.div
                              className="absolute right-6 top-1/2 -translate-y-1/2"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{
                                duration: 0.6,
                                delay: 0.3 + index * 0.08,
                                ease: [0.25, 0.46, 0.45, 0.94],
                              }}
                            >
                              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
                            </motion.div>
                          )}

                          {/* Bottom Accent Line */}
                          <motion.div
                            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 origin-left shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{
                              duration: 0.5,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            style={{
                              scaleX: isActive ? 1 : 0,
                            }}
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer Decoration */}
              <motion.div
                variants={menuItemVariants}
                className="mt-16 text-center"
              >
                <p className="text-gray-500 text-sm tracking-widest uppercase font-medium">
                  Luxury Digital Experiences
                </p>
                <div className="mt-6 flex items-center justify-center gap-4">
                  <motion.div
                    className="w-20 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-amber-500/50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
                  <motion.div
                    className="w-20 h-[1px] bg-gradient-to-l from-transparent via-amber-500/50 to-amber-500/50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-gradient {
          animation: gradient 8s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
