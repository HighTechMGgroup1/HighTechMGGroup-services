"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Reel = {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    video: string;
};

const reels: Reel[] = [
    {
        id: 1,
        title: "XL Classes Coaching Promo Reel",
        description:
            "AI-generated promotional reel for XL Classes, showcasing coaching environment, faculty highlights, and student success-focused visuals.",
        thumbnail: "/images/reel1-thumb.png",
        video: "/videos/video1.mp4",
    },
    {
        id: 2,
        title: "Bhopal Gas Tragedy Awareness Reel",
        description:
            "AI-assisted cinematic reel presenting the historical impact of the Bhopal Gas Tragedy with powerful storytelling and documentary-style visuals.",
        thumbnail: "/images/reel2-thumb.png",
        video: "/videos/video2.mp4",
    },
    {
        id: 3,
        title: "HighTechMG Digital Products Agency Reel",
        description:
            "AI-crafted marketing reel for HighTechMG, highlighting digital product services, brand authority, and modern tech-driven business solutions.",
        thumbnail: "/images/reel3-thumb.png",
        video: "/videos/video3.mp4",
    },
];


export default function AiReelsPage() {
    const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

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

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            closeModal();
        }
    };

    return (
        <main className="bg-black text-white min-h-screen px-4 md:px-16 lg:px-24 py-20">
            {/* Header */}
            <section className="max-w-6xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    AI Reels Showcase
                </h1>
                <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                    AI-generated short-form reels crafted for maximum engagement and
                    social media growth. Tap to watch full screen.
                </p>
            </section>

            {/* Reel Grid */}
            <section className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {reels.map((reel) => (
                    <div
                        key={reel.id}
                        className="relative group cursor-pointer rounded-xl overflow-hidden border border-gray-800 hover:border-yellow-500 transition duration-300"
                        onClick={() => openModal(reel)}
                    >
                        <div className="relative w-full h-80">
                            <img
                                src={reel.thumbnail}
                                alt={reel.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                <span className="bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold">
                                    Watch Reel
                                </span>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-900">
                            <h3 className="text-lg font-semibold text-yellow-400">
                                {reel.title}
                            </h3>
                            <p className="text-gray-400 mt-3 text-sm">
                                {reel.description}
                            </p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Modal */}
            {selectedReel && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4"
                    onClick={handleOutsideClick}
                >
                    <div
                        ref={modalRef}
                        className="relative max-w-3xl w-full bg-gray-900 border border-yellow-500 rounded-2xl overflow-hidden"
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-md transition z-10"
                        >
                            Close
                        </button>

                        <div className="relative w-full h-[60vh] md:h-[75vh] bg-black">
                            <video
                                src={selectedReel.video}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-bold text-yellow-400">
                                {selectedReel.title}
                            </h2>
                            <p className="text-gray-400 mt-4">
                                {selectedReel.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* CTA */}
            <section className="max-w-4xl mx-auto mt-24 text-center border border-yellow-500 rounded-2xl p-12 bg-gray-900 shadow-lg shadow-yellow-500/10">
                <h2 className="text-3xl font-bold text-yellow-400">
                    Want High-Engagement AI Reels?
                </h2>
                <p className="text-gray-400 mt-6">
                    We create AI-powered short videos optimized for Instagram, Facebook
                    and paid ad campaigns.
                </p>

                <Link
                    href="/"
                    className="inline-block mt-10 px-10 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition duration-300"
                >
                    Back to Home
                </Link>
            </section>
        </main>
    );
}
