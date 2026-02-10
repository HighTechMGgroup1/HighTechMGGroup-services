"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Logo = {
    id: number;
    title: string;
    description: string;
    image: string;
};

const logos: Logo[] = [
    {
        id: 1,
        title: "Modern Tech Brand",
        description:
            "Minimal and futuristic logo crafted for a SaaS-based technology startup.",
        image: "/images/logo1.png",
    },
    {
        id: 2,
        title: "Luxury Fashion Identity",
        description:
            "Elegant monogram-based logo designed for a premium fashion label.",
        image: "/images/logo2.png",
    },
    {
        id: 3,
        title: "Fitness Brand Mark",
        description:
            "Bold and energetic logo symbol representing strength and performance.",
        image: "/images/logo3.png",
    },
    {
        id: 4,
        title: "Digital Agency Logo",
        description:
            "Clean and geometric brand identity for a creative digital agency.",
        image: "/images/logo4.png",
    },
    {
        id: 5,
        title: "Restaurant Branding",
        description:
            "Warm and modern logo crafted for a fine dining restaurant brand.",
        image: "/images/logo5.png",
    },
    {
        id: 6,
        title: "Crypto Startup Identity",
        description:
            "Futuristic Web3-inspired logo with sharp lines and neon aesthetics.",
        image: "/images/logo6.png",
    },
    {
        id: 7,
        title: "Travel Company Logo",
        description:
            "Dynamic and clean logo symbolizing exploration and movement.",
        image: "/images/logo7.png",
    },
    {
        id: 8,
        title: "Corporate Consulting Brand",
        description:
            "Professional and trustworthy brand mark designed for consulting firm.",
        image: "/images/logo8.png",
    },
    {
        id: 9,
        title: "Ecommerce Brand Identity",
        description:
            "Simple yet memorable logo built for an online retail brand.",
        image: "/images/logo9.png",
    },
    {
        id: 10,
        title: "Education Platform Logo",
        description:
            "Modern and approachable brand identity for online learning platform.",
        image: "/images/logo10.png",
    },
    {
        id: 11,
        title: "Event Management Brand",
        description:
            "Creative and bold logo concept for event planning company.",
        image: "/images/logo11.png",
    },
    {
        id: 12,
        title: "Premium Real Estate Logo",
        description:
            "Luxury gold-accented brand identity designed for real estate firm.",
        image: "/images/logo12.png",
    },
];

export default function LogoDesignPage() {
    const [selectedLogo, setSelectedLogo] = useState<Logo | null>(null);
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const openModal = (logo: Logo) => {
        setSelectedLogo(logo);
    };

    const closeModal = () => {
        setSelectedLogo(null);
    };

    useEffect(() => {
        document.body.style.overflow = selectedLogo ? "hidden" : "auto";
    }, [selectedLogo]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            closeModal();
        }
    };

    if (!mounted) return null;

    return (
        <main className="relative bg-gray-950 text-white min-h-screen px-4 md:px-8 lg:px-16 xl:px-24 py-24 md:py-32 overflow-x-hidden">
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black pointer-events-none" />

            <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
            </div>

            <section className="relative max-w-6xl mx-auto text-center mb-16 md:mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent mb-6">
                        Logo Design Gallery
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                        Tap on any logo to preview in full screen. Click outside or press ESC
                        to close the preview.
                    </p>
                </motion.div>
            </section>

            <section className="relative w-full max-w-7xl mx-auto px-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
                    {logos.map((logo, index) => (
                        <motion.div
                            key={logo.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="w-full max-w-[320px] relative group cursor-pointer overflow-hidden rounded-2xl border border-gray-800/50 hover:border-amber-500/50 transition-all duration-500 bg-gradient-to-b from-gray-900/40 to-gray-950/40 backdrop-blur-sm shadow-xl shadow-black/50 hover:shadow-amber-500/20 transform hover:-translate-y-1"
                            onClick={() => openModal(logo)}
                        >
                            <div className="relative bg-gray-900/50 p-6">
                                <Image
                                    src={logo.image}
                                    alt={logo.title}
                                    width={500}
                                    height={500}
                                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-4 text-center">
                                <span className="text-amber-400 font-bold text-lg mb-2">
                                    {logo.title}
                                </span>
                                <div className="px-5 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-950 rounded-lg font-semibold text-sm shadow-lg shadow-amber-500/30">
                                    View Logo
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>


            <AnimatePresence>
                {selectedLogo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-gray-950/95 backdrop-blur-2xl flex items-center justify-center z-50 p-4 md:p-6 lg:p-8"
                        onClick={handleOutsideClick}
                    >
                        <motion.div
                            ref={modalRef}
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                            className="relative max-w-4xl w-full bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-xl border border-amber-500/30 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5 pointer-events-none" />

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={closeModal}
                                className="absolute top-3 right-3 md:top-4 md:right-4 lg:top-6 lg:right-6 z-10 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-400 hover:to-amber-400 text-gray-950 font-bold px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/30 text-sm md:text-base"
                            >
                                ✕ Close
                            </motion.button>

                            <div className="relative w-full h-[45vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] flex items-center justify-center p-8 md:p-12 lg:p-16 bg-gray-900/50">
                                <Image
                                    src={selectedLogo.image}
                                    alt={selectedLogo.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            <div className="relative p-6 md:p-8 lg:p-10 text-center border-t border-white/5 bg-gradient-to-b from-gray-900/50 to-gray-950/50">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-3 md:mb-4">
                                    {selectedLogo.title}
                                </h2>
                                <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                                    {selectedLogo.description}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="relative max-w-4xl mx-auto mt-20 md:mt-32 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-gradient-to-br from-gray-900/60 via-gray-950/60 to-gray-900/60 backdrop-blur-xl rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 border border-amber-500/20 shadow-2xl shadow-amber-500/10 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px]" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-500/20 rounded-full blur-[100px]" />

                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent mb-4 md:mb-6">
                            Need a Strong Brand Identity?
                        </h2>
                        <p className="text-gray-300 text-sm md:text-base lg:text-lg mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed">
                            We design memorable and professional logos tailored to your brand
                            vision.
                        </p>

                        <Link
                            href="/"
                            className="group relative inline-flex items-center gap-2 px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-950 font-semibold rounded-lg md:rounded-xl overflow-hidden transition-all duration-500 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 text-sm md:text-base"
                        >
                            <span className="relative z-10">Back to Home</span>
                            <motion.span
                                className="relative z-10"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}