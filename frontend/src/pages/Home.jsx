import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import HistoryOfJMI from "./HistoryOfJMI";

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
    <div className="min-h-screen relative bg-gradient-to-br from-[#F4FFC3] to-[#5D8736] font-poppins">
      {/* Radial Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_300px,rgba(244,255,195,0.5),rgba(169,196,108,0.35),rgba(93,135,54,0.2),transparent)] z-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="text-center space-y-6 mb-20 relative">
          {/* Optional Logo Background */}
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

        {/* Gradient Line */}
        <div className="flex justify-center mb-16">
          <div className="w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-[#809D3C] to-transparent rounded-full opacity-60"></div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              ref={(el) => (featureCardsRef.current[i] = el)}
              className="bg-white/70 backdrop-blur-lg border border-[#A9C46C] rounded-xl p-6 shadow hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#809D3C] text-white text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#5D8736] mb-2">
                {f.title}
              </h3>
              <p className="text-[#5D8736] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* About Jamia Section */}
        <div
          ref={(el) => (featureCardsRef.current[features.length] = el)}
          className="mt-20 bg-white/70 backdrop-blur-lg border border-[#A9C46C] rounded-xl p-6 shadow hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-lg  text-white text-2xl mb-4 mx-auto">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/d/df/Jamia_Millia_Islamia_Logo.svg"
              alt=""
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#5D8736] mb-4 text-center">
            About Jamia Millia Islamia
          </h2>
          <p className="text-[#5D8736] leading-relaxed text-justify">
            <strong>
              <a
                href="https://en.wikipedia.org/wiki/Jamia_Millia_Islamia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-green-800"
              >
                Jamia Millia Islamia
              </a>
            </strong>{" "}
            is a public and research university located in New Delhi, India. It
            was originally established in 1920 at Aligarh during the British Raj
            by prominent leaders such as{" "}
            <strong>
              <a
                href="https://en.wikipedia.org/wiki/Maulana_Mohammad_Ali_Jauhar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-green-800"
              >
                Maulana Mohammad Ali Jauhar
              </a>
            </strong>
            ,{" "}
            <strong>
              <a
                href="https://en.wikipedia.org/wiki/Hakim_Ajmal_Khan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-green-800"
              >
                Hakim Ajmal Khan
              </a>
            </strong>
            , and{" "}
            <strong>
              <a
                href="https://en.wikipedia.org/wiki/Mahmud_Hasan_Deobandi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-green-800"
              >
                Mahmud Hasan Deobandi
              </a>
            </strong>
            . The university moved to its current location in Okhla, Delhi in
            1935.
            <br />
            <br />
            In 1962, it was declared a deemed university by the University
            Grants Commission, and later in 1988, it was granted the status of a
            central university by an Act of the Indian Parliament.
            <br />
            <br />
            With a strong foundation rooted in self-reliance, education, and
            national service,{" "}
            <strong>
              <a
                href="https://en.wikipedia.org/wiki/Jamia_Millia_Islamia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-green-800"
              >
                Jamia
              </a>
            </strong>{" "}
            has grown into a modern center of learning that promotes academic
            excellence, research, and inclusive development.
          </p>
          <Link
            to="/history"
            className="font-bold text-l text-jmi-600 mt-5 relative right-0"
          >
            FOR FULL HISTORY CLICK HERE
          </Link>
        </div>

      </div>
        
    </div>
  );
};

export default Home;

{
  /* <div className="min-h-screen w-full relative">
  {/* Radial Gradient Background */
}
// <div
//   className="absolute inset-0 z-0"
//   style={{
//     background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
//   }}
// />
{
  /* Your Content/Components */
}
// </div> */}
