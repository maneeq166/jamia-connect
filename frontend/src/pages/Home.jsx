import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";


gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const featureCardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 }
    );
    featureCardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: { trigger: card, start: "top 90%" },
          duration: 0.6,
          delay: i * 0.1,
          ease: "power2.out",
        }
      );
    });
  }, []);

  const features = [
    {
      icon: "📚",
      title: "PYQs Repository",
      description: "Access previous year questions across departments.",
    },
    {
      icon: "💬",
      title: "Discussion Forums",
      description: "Engage in academic discussions.",
    },
    {
      icon: "✍️",
      title: "Student Blogs",
      description: "Share your journey, tips & experiences.",
    },
    {
      icon: "🤝",
      title: "Connect & Network",
      description: "Find peers, mentors, and study partners.",
    },
    {
      icon: "🎯",
      title: "Study Groups",
      description: "Form collaborative study groups.",
    },
    {
      icon: "🏆",
      title: "Achievements",
      description: "Showcase awards, projects, and talent.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4FFC3] to-[#A9C46C] font-poppins">
      <div className="max-w-6xl mx-auto px-6 py-16 relative">
        {/* Hero */}
        <section ref={heroRef} className="text-center space-y-6 mb-20 relative">
          {/* Jamia Logo Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/5/5f/Jamia_Millia_Islamia_Logo.svg" 
              alt="Jamia Logo" 
              className="w-80 h-80 object-contain"
            />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-[#5D8736] relative">
              Jamia Connect
            </h1>
            <div className="mx-auto w-28 h-1 bg-[#809D3C] rounded-full mt-4" />
            <p className="text-lg md:text-xl text-[#809D3C] max-w-2xl mx-auto mt-6">
              A student hub to share PYQs, discuss topics, blog, and network.
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#5D8736] via-[#809D3C] to-[#A9C46C] text-white font-semibold rounded-full shadow-xl hover:scale-105 transition-transform duration-300 mt-8"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Green Gradient Line */}
        <div className="flex justify-center mb-16">
          <div className="w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-[#809D3C] to-transparent rounded-full opacity-60"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              ref={el => featureCardsRef.current[i] = el}
              className="bg-white/70 backdrop-blur-lg border border-[#A9C46C] rounded-xl p-6 shadow hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#809D3C] text-white text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#5D8736] mb-2">{f.title}</h3>
              <p className="text-[#5D8736] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
