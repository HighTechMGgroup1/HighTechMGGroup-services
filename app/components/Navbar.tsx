"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

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
      transition: {
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1],
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
        when: "beforeChildren",
        staggerChildren: 0.08,
        delayChildren: 0.15,
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
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const decorVariants = {
    closed: { opacity: 0, scale: 0.8 },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.header
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
            ? "bg-gray-950/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/50"
            : "bg-transparent"
          }`}
      >
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
          style={{
            opacity: scrolled ? 0.4 : 0,
            background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(251,191,36,0.03), transparent)`,
          }}
        />

        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
        </div>

        <nav className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24 h-20 flex items-center justify-between">
          <Link href="/" className="group relative z-10">
            <motion.div
              className="relative text-2xl md:text-3xl font-bold"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <span className="relative bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                HighTechMG
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.name} href={link.href} className="relative group px-4 py-2">
                  <span
                    className={`relative text-sm font-medium transition-colors duration-300 ${isActive ? "text-amber-400" : "text-gray-300 group-hover:text-amber-300"
                      }`}
                  >
                    {link.name}
                  </span>

                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full origin-left"
                    initial={false}
                    animate={{
                      scaleX: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    whileHover={{
                      scaleX: isActive ? 1 : 1,
                      opacity: isActive ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  />

                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                      initial={false}
                    />
                  )}

                  {isActive && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-lg -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <motion.button
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center focus:outline-none group"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="w-full h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full origin-center"
              />
              <motion.span
                animate={{
                  opacity: isOpen ? 0 : 1,
                  scaleX: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="w-full h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className="w-full h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full origin-center"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </motion.button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mounted && isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="absolute inset-0 bg-gradient-to-br from-gray-950/95 via-gray-900/95 to-gray-950/95"
            />

            <motion.div
              variants={decorVariants}
              className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
              variants={decorVariants}
              className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-500/10 to-amber-500/10 rounded-full blur-[120px] pointer-events-none"
            />

            <div className="absolute inset-0 opacity-[0.02]">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center px-8">
              <nav className="flex flex-col items-center gap-2 w-full max-w-md">
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
                        <div className="relative bg-gradient-to-r from-gray-900/40 to-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5 overflow-hidden">
                          <div
                            className={`absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isActive ? "!opacity-100" : ""
                              }`}
                          />

                          <div
                            className={`absolute inset-0 border-2 rounded-2xl transition-colors duration-500 ${isActive
                                ? "border-amber-500/30"
                                : "border-transparent group-hover:border-amber-500/20"
                              }`}
                          />

                          <span
                            className={`relative block text-2xl font-semibold transition-all duration-300 ${isActive
                                ? "text-transparent bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text"
                                : "text-gray-300 group-hover:text-amber-300"
                              }`}
                          >
                            {link.name}
                          </span>

                          {isActive && (
                            <motion.div
                              className="absolute right-6 top-1/2 -translate-y-1/2"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.3 + index * 0.08,
                                ease: [0.25, 0.4, 0.25, 1],
                              }}
                            >
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" />
                            </motion.div>
                          )}

                          <motion.div
                            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
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

              <motion.div
                variants={menuItemVariants}
                className="mt-12 text-center"
              >
                <p className="text-gray-500 text-sm">
                  Luxury Digital Experiences
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-amber-500/50" />
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" />
                  <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-amber-500/50" />
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
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </>
  );
}