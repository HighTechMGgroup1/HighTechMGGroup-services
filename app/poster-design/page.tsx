"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Poster = {
    id: number;
    title: string;
    description: string;
    image: string;
};

const posters: Poster[] = [
    {
        id: 1,
        title: "Product Launch Campaign",
        description:
            "High-impact promotional poster crafted for premium product launch campaigns.",
        image: "/images/poster1.png",
    },
    {
        id: 2,
        title: "Fitness Membership Offer",
        description:
            "Energetic and bold gym membership campaign poster with strong call-to-action.",
        image: "/images/poster2.png",
    },
    {
        id: 3,
        title: "Restaurant Special Menu",
        description:
            "Elegant food promotional poster designed to highlight signature dishes.",
        image: "/images/poster3.png",
    },
    {
        id: 4,
        title: "Music Night Event",
        description:
            "Creative DJ night event poster with vibrant gradient and bold typography.",
        image: "/images/poster4.png",
    },
    {
        id: 5,
        title: "Real Estate Promotion",
        description:
            "Luxury real estate campaign poster focused on property showcase.",
        image: "/images/poster5.png",
    },
    {
        id: 6,
        title: "Tech Conference",
        description:
            "Minimal and futuristic corporate tech conference promotional poster.",
        image: "/images/poster6.png",
    },
    {
        id: 7,
        title: "Seasonal Sale Campaign",
        description:
            "High-conversion ecommerce discount poster with premium dark theme layout.",
        image: "/images/poster7.png",
    },
    {
        id: 8,
        title: "Digital Agency Branding",
        description:
            "Agency brand awareness poster crafted with premium gold accents.",
        image: "/images/poster8.png",
    },
    {
        id: 9,
        title: "Travel Destination Offer",
        description:
            "Immersive travel promotion poster with strong visual storytelling.",
        image: "/images/poster9.png",
    },
    {
        id: 10,
        title: "Grand Opening Campaign",
        description:
            "Luxury store opening poster designed for maximum attention and engagement.",
        image: "/images/poster10.png",
    },
    {
        id: 11,
        title: "Online Course Enrollment",
        description:
            "Educational campaign poster built for high student conversion rates.",
        image: "/images/poster11.png",
    },
    {
        id: 12,
        title: "Crypto Token Launch",
        description:
            "Futuristic Web3 promotional poster featuring neon glow aesthetics.",
        image: "/images/poster12.png",
    },
];

export default function PosterDesignPage() {
    const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const openModal = (poster: Poster) => {
        setSelectedPoster(poster);
    };

    const closeModal = () => {
        setSelectedPoster(null);
    };

    useEffect(() => {
        document.body.style.overflow = selectedPoster ? "hidden" : "auto";
    }, [selectedPoster]);

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
                        Poster Design Gallery
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                        Tap on any poster to view in full screen. Click outside or press ESC
                        to close.
                    </p>
                </motion.div>
            </section>

            <section className="relative max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
                {posters.map((poster, index) => (
                    <motion.div
                        key={poster.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="relative group cursor-pointer break-inside-avoid overflow-hidden rounded-xl md:rounded-2xl border border-gray-800/50 hover:border-amber-500/50 transition-all duration-500 bg-gradient-to-b from-gray-900/40 to-gray-950/40 backdrop-blur-sm shadow-xl shadow-black/50 hover:shadow-amber-500/20 transform hover:-translate-y-1"
                        onClick={() => openModal(poster)}
                    >
                        <div className="relative overflow-hidden">
                            <Image
                                src={poster.image}
                                alt={poster.title}
                                width={600}
                                height={800}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                        </div>

                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-4 md:p-6"
                            initial={false}
                        >
                            <span className="text-amber-400 font-bold text-lg md:text-xl mb-2 md:mb-3">
                                {poster.title}
                            </span>
                            <span className="text-gray-300 text-xs md:text-sm text-center line-clamp-2 mb-3 md:mb-4">
                                {poster.description}
                            </span>
                            <div className="px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-950 rounded-lg font-semibold text-sm md:text-base shadow-lg shadow-amber-500/30">
                                View Full
                            </div>
                        </motion.div>

                        <div className="absolute inset-0 border border-amber-500/0 group-hover:border-amber-500/30 rounded-xl md:rounded-2xl transition-all duration-500 pointer-events-none" />
                    </motion.div>
                ))}
            </section>

            <AnimatePresence>
                {selectedPoster && (
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
                            className="relative max-w-5xl w-full bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-xl border border-amber-500/30 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/20"
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

                            <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] p-4 md:p-6">
                                <Image
                                    src={selectedPoster.image}
                                    alt={selectedPoster.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            <div className="relative p-6 md:p-8 lg:p-10 text-center border-t border-white/5 bg-gradient-to-b from-gray-900/50 to-gray-950/50">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-3 md:mb-4">
                                    {selectedPoster.title}
                                </h2>
                                <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                                    {selectedPoster.description}
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
                            Need Premium Poster Designs?
                        </h2>
                        <p className="text-gray-300 text-sm md:text-base lg:text-lg mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed">
                            We craft high-converting promotional posters tailored to your brand
                            strategy.
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