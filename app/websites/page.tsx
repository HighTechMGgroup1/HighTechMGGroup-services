"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type WebsiteProject = {
    id: number;
    title: string;
    description: string;
    image: string;
    liveUrl: string;
    category: string;
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
    },
    {
        id: 2,
        title: "XL Coaching Classes Result Portal",
        description:
            "Student result portal where users can easily search and download academic results with a clean, fast and user-friendly interface designed for real student usage.",
        image: "/images/project2.png",
        liveUrl: "https://xl-classes.github.io/results.nic.in/",
        category: "Education",
    },
    {
        id: 3,
        title: "Mountain Mirage Hotel Website",
        description:
            "Premium hotel website featuring room showcase, booking flow, and immersive layout designed to enhance customer trust and increase direct reservations.",
        image: "/images/project3.png",
        liveUrl: "https://hotel-mountain-mirage.vercel.app",
        category: "Hospitality",
    },
    {
        id: 4,
        title: "Imitation Jewellery Store",
        description:
            "Elegant jewellery showcase platform designed for product highlighting, smooth browsing experience, and visually rich presentation for online customers.",
        image: "/images/project4.png",
        liveUrl: "https://js-immitation-jewellery-gilt.vercel.app",
        category: "Ecommerce",
    },
    {
        id: 5,
        title: "Marble Business Digital Platform",
        description:
            "End-to-end marble business website including trust-building pages and multiple real-world calculators for project estimation, material planning, and logistics calculations.",
        image: "/images/project5.png",
        liveUrl: "https://marble-website-nextjs.vercel.app",
        category: "Business",
    },
    {
        id: 6,
        title: "Modern Construction Company Website",
        description:
            "Professional construction business website showcasing services, completed projects, and enquiry-focused layout for strong client conversion.",
        image: "/images/project6.png",
        liveUrl: "https://gaurav786kumawat.github.io/modern-construction-site/",
        category: "Business",
    },
    {
        id: 7,
        title: "Web Agency Platform",
        description:
            "Complete agency platform featuring service pages, pricing structure, reusable layouts, and scalable architecture for long-term business growth.",
        image: "/images/project7.png",
        liveUrl: "https://services.gauravkumawat.online",
        category: "Agency",
    },
    {
        id: 8,
        title: "Mukesh Lilawat Portfolio",
        description:
            "Personal portfolio website designed to showcase professional work, achievements, and contact presence with clean and modern layout design.",
        image: "/images/project8.png",
        liveUrl: "https://mukeshlilawat.online",
        category: "Portfolio",
    },
    {
        id: 9,
        title: "Gaurav Kumawat Portfolio",
        description:
            "Personal developer portfolio highlighting projects, digital work showcase, and professional online presence with premium UI styling.",
        image: "/images/project9.png",
        liveUrl: "https://portfolio.gauravkumawat.online",
        category: "Portfolio",
    },
];


export default function WebsitesPage() {
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const categories = [
        "All",
        ...Array.from(new Set(websiteProjects.map((p) => p.category))),
    ];

    const filteredProjects =
        activeCategory === "All"
            ? websiteProjects
            : websiteProjects.filter((p) => p.category === activeCategory);

    return (
        <main className="bg-black text-white min-h-screen w-full px-6 md:px-16 lg:px-24 py-20">
            {/* Header */}
            <section className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    Website Projects
                </h1>
                <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                    A collection of premium websites crafted with performance,
                    aesthetics and conversion strategy in mind.
                </p>
            </section>

            {/* Category Filter */}
            <section className="max-w-7xl mx-auto mb-12 flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-6 py-2 rounded-full border transition duration-300 ${activeCategory === category
                            ? "bg-yellow-500 text-black border-yellow-500"
                            : "border-gray-700 text-gray-400 hover:border-yellow-500 hover:text-yellow-500"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </section>

            {/* Projects Grid */}
            <section className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredProjects.map((project) => (
                    <div
                        key={project.id}
                        className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-yellow-500 transition duration-300 transform hover:-translate-y-2"
                    >
                        <div className="relative w-full h-64">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-500"
                            />
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-yellow-400">
                                {project.title}
                            </h3>

                            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                                {project.description}
                            </p>

                            <div className="mt-6 flex items-center justify-between">
                                <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                                    {project.category}
                                </span>

                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2 bg-yellow-500 text-black text-sm font-medium rounded-md hover:bg-yellow-400 transition duration-300"
                                >
                                    View Live
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Bottom CTA */}
            <section className="max-w-4xl mx-auto mt-24 text-center border border-yellow-500 rounded-2xl p-12 bg-gray-900 shadow-lg shadow-yellow-500/10">
                <h2 className="text-3xl font-bold text-yellow-400">
                    Need a Custom Website?
                </h2>
                <p className="text-gray-400 mt-6">
                    We build high-performance, responsive and conversion-focused websites
                    tailored for your business goals.
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
