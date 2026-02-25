import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, AnimatePresence, useTransform } from "framer-motion";
import { BookOpen, MessageCircle, Users, PenTool, ArrowRight } from "lucide-react";

import campusLife1 from "../assets/campus-life-1.png";
import campusLife2 from "../assets/campus-life-2.png";
import campusLife3 from "../assets/campus-life-3.png";
import gate7 from "../assets/gate-7.png";

const heroImages = [
  { title: "Centenary Gate", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Centenary_Gate_Jamia_Millia_Islamia.jpg/960px-Centenary_Gate_Jamia_Millia_Islamia.jpg?20231029143105" },
  { title: "Bab e Maulana Abul Kalam Azad", img: gate7 },
  { title: "Maulana Mahmud Hasan Gate", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Maulana_Mahmud_Hasan_gate%2C_Jamia_Millia_Islamia.jpg/960px-Maulana_Mahmud_Hasan_gate%2C_Jamia_Millia_Islamia.jpg?20230217034952" }
];

const campusImages = [
  { title: "Campus Life", img: campusLife1 },
  { title: "Campus Interaction", img: campusLife2 },
  { title: "Student Activities", img: campusLife3 }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 lg:px-16 py-24 mx-auto overflow-hidden bg-gradient-to-br from-[#f5f3ea] via-[#eef3d2] to-[#e4ecd0]">
      
      {/* Subtle grain texture overlay for depth */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-multiply" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Radial accent glow behind image side */}
      <div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none z-0 translate-x-1/4"
        style={{ background: "rgba(129, 157, 60, 0.12)", filter: "blur(120px)" }}
      />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-16 lg:gap-24">
        
        {/* Left Side: Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-7"
        >
          <motion.div variants={itemVariants}>
            <span className="font-mono text-[#809D3C] text-sm tracking-widest uppercase font-medium">
              Jamia Millia Islamia • Est. 1920
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-fraunces flex flex-col gap-2 tracking-tight">
            <span className="text-4xl lg:text-5xl font-normal text-[#1E2C12]">
              Jamia Connect
            </span>
            <span className="text-5xl lg:text-7xl text-[#5D8736] font-medium leading-[1.1]">
              Connected Campus Life
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="font-plex text-lg lg:text-xl text-[#3E5C25] font-light max-w-md leading-[1.8]">
            Built by Jamia students, for Jamia students. The modern academic companion for your university journey.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 pt-4 w-full sm:w-auto">
            <Link
              to="/signup"
              className="px-8 py-4 bg-[#2F441B] text-[#f5f3ea] font-medium rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-[2px] flex justify-center items-center"
            >
              Get Started
            </Link>
            <Link
              to="/explore"
              className="px-8 py-4 bg-transparent border border-[#A9C46C] text-[#2F441B] font-medium rounded-xl transition-colors duration-300 hover:bg-[#e4ecd0] flex justify-center items-center"
            >
              Explore Platform
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side: Image Container */}
        <div className="w-full md:w-1/2 relative flex flex-col items-center md:items-end mt-10 md:mt-0">
          
          <div className="relative w-full max-w-[500px]">
            {/* Depth background accent layer */}
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#DFF09E] blur-[40px] opacity-40 rounded-3xl z-0" />

            {/* Outer layered container */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative z-10 w-full p-3 bg-[#fafaf7]/60 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(47,68,27,0.06)] border border-[#E9F5D0]"
            >
              {/* Inner image container */}
              <div className="relative h-[420px] lg:h-[540px] rounded-xl overflow-hidden bg-[#e4ecd0]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={heroImages[currentIndex].img}
                    alt={heroImages[currentIndex].title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover sepia-[0.05]"
                  />
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E2C12]/30 via-transparent to-transparent pointer-events-none" />

                {/* Image Title Label Overlay */}
                <div className="absolute bottom-4 left-4 z-20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="px-4 py-2 bg-[#1E2C12]/75 backdrop-blur-md rounded-lg shadow-sm"
                    >
                      <span className="font-plex text-sm text-[#f5f3ea] font-medium tracking-wide">
                        {heroImages[currentIndex].title}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Image Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8 z-20 relative">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`View ${heroImages[idx].title}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'bg-[#5D8736] scale-125' 
                      : 'bg-[#A9C46C]/60 hover:bg-[#809D3C]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HistoryTimeline = () => {
  const timelineRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress: lineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const { scrollYProgress: parallaxProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(parallaxProgress, [0, 1], [-20, 20]);

  const handleMouseMove = (e) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const milestones = [
    {
      year: "1920",
      title: "Foundation",
      desc: "Jamia Millia Islamia was established in Aligarh by nationalist leaders during the freedom movement.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Molana-Muhammad-Ali.jpg/500px-Molana-Muhammad-Ali.jpg",
    },
    {
      year: "1925",
      title: "Move to Delhi",
      desc: "Jamia was relocated to Delhi, strengthening its independent identity.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Jamia_Millia_Islamia%2C_Karol_Bagh_Campus%2C_1925.png/500px-Jamia_Millia_Islamia%2C_Karol_Bagh_Campus%2C_1925.png",
    },
    {
      year: "1935",
      title: "Okhla Campus",
      desc: "Jamia permanently shifted to Okhla, where it continues to grow today.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Jamia_Millia_Islamia_1970_stamp_of_India.jpg/500px-Jamia_Millia_Islamia_1970_stamp_of_India.jpg",
    },
    {
      year: "1988",
      title: "Central University Status",
      desc: "Jamia was declared a Central University by an Act of Parliament.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/CENTRAL_JAMIA_LIBRARY.jpg/500px-CENTRAL_JAMIA_LIBRARY.jpg",
    },
    {
      year: "Present Day",
      title: "A Legacy Continues",
      desc: "Jamia continues to inspire generations of students and innovators.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Gulistan-e-Ghalib%2C_JMI.jpg/500px-Gulistan-e-Ghalib%2C_JMI.jpg",
    },
  ];

  return (
    <section 
      className="py-24 px-6 relative isolate overflow-hidden bg-gradient-to-b from-[#f5f3ea] via-[#eef3d2] to-[#e4ecd0]" 
      ref={timelineRef}
      onMouseMove={handleMouseMove}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-100 mix-blend-multiply"
        style={{
          background: `
            radial-gradient(900px circle at ${mousePos.x}px ${mousePos.y}px, rgba(129,157,60,0.35) 0%, rgba(129,157,60,0.22) 30%, rgba(129,157,60,0.12) 55%, transparent 75%),
            radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,184,77,0.25) 0%, rgba(255,184,77,0.12) 40%, transparent 70%)
          `,
          transition: "background 0.08s linear"
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20"
      >
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <span className="font-mono text-[#809D3C] text-xs tracking-widest uppercase mb-4 block">Heritage</span>
          <h2 className="font-fraunces text-4xl md:text-5xl text-[#1E2C12] mb-6">A Legacy of Excellence</h2>
          <p className="font-plex text-lg text-[#5D8736] max-w-xl mx-auto font-light leading-relaxed">
            Tracing our roots from the freedom struggle to a modern center of learning.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#DFF09E] -translate-x-1/2" />
          
          <motion.div
            style={{ scaleY: lineProgress }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#809D3C] to-[#E69A15] -translate-x-1/2 origin-top"
          />

          <div className="space-y-16 md:space-y-32 relative">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`group flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-[#E69A15] group-hover:bg-[#FFB84D] transition-colors duration-300 rounded-full -translate-x-1/2 ring-4 ring-[#f5f3ea] z-20" />

                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="bg-white/40 backdrop-blur-sm border border-[#E9F5D0] rounded-2xl p-8 shadow-sm group-hover:shadow-md group-hover:-translate-y-[3px] transition-all duration-300 ease-out relative z-10">
                      <span className="font-mono text-[#809D3C] text-sm tracking-wider mb-3 block">
                        {milestone.year}
                      </span>
                      <h3 className="font-fraunces text-2xl text-[#1E2C12] mb-3">{milestone.title}</h3>
                      <p className="font-plex text-[#3E5C25] leading-relaxed font-light">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 pl-16 md:pl-0">
                    <div className="relative p-2 bg-white/50 backdrop-blur-sm shadow-sm rounded-2xl border border-[#E9F5D0] overflow-hidden">
                      <motion.div style={{ y: yParallax }} className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden">
                        <img
                          src={milestone.img}
                          alt={milestone.title}
                          className="absolute inset-0 w-full h-full object-cover sepia-[0.05] group-hover:scale-[1.03] transition-transform duration-[1000ms] ease-out"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const PlatformFeatures = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const features = [
    { title: "Share Notes", desc: "Access and contribute to a curated repository of academic resources and study materials.", icon: BookOpen },
    { title: "Discuss Topics", desc: "Engage in meaningful academic discussions and resolve queries with peers.", icon: MessageCircle },
    { title: "Connect with Students", desc: "Build your academic network across departments and faculties.", icon: Users },
    { title: "Write Blogs", desc: "Share your campus experiences, technical insights, and personal journey.", icon: PenTool },
  ];

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="py-24 px-6 relative isolate overflow-hidden bg-gradient-to-b from-[#eef3d2] via-[#e8efd0] to-[#f5f3ea]"
    >
      {/* Premium Mouse Follow Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 blur-2xl opacity-80"
        style={{
          background: `
            radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(129,157,60,0.22) 0%, transparent 80%),
            radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,184,77,0.18) 0%, transparent 80%)
          `,
          transition: "background 0.15s linear"
        }}
      />

      {/* Content Wrapper */}
      <div className="max-w-6xl mx-auto relative z-20">
        <div className="text-center mb-20">
          <span className="font-mono text-[#809D3C] text-xs tracking-widest uppercase mb-4 block">Platform Modules</span>
          <h2 className="font-fraunces text-4xl md:text-5xl text-[#1E2C12]">Your Academic Companion</h2>
          {/* Decorative Divider */}
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#809D3C] to-transparent mx-auto mt-6 opacity-60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white/70 backdrop-blur-md p-9 rounded-2xl border border-[#E9F5D0] shadow-sm hover:shadow-xl hover:-translate-y-[6px] hover:scale-[1.02] hover:border-[#A9C46C] transition-all duration-300 ease-out overflow-hidden"
            >
              {/* Card Background Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                  background: "radial-gradient(circle at center, rgba(129,157,60,0.15) 0%, transparent 80%)"
                }}
              />

              {/* Icon Container */}
              <div className="relative z-10 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F4FFC3] to-[#DFF09E] text-[#5D8736] mb-6 group-hover:bg-none group-hover:bg-[#FFB84D] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(255,184,77,0.4)] transition-all duration-300 border border-[#E9F5D0] group-hover:border-transparent">
                <feature.icon size={24} strokeWidth={1.5} className="transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="font-fraunces text-xl text-[#2F441B] group-hover:text-[#5D8736] transition-colors duration-300 mb-3">
                  {feature.title}
                </h3>
                <p className="font-plex text-[#5D8736] text-sm leading-relaxed font-light">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const panels = [
  {
    title: "Campus Life",
    images: [
      campusLife1,
      campusLife2,
      campusLife3
    ]
  },
  {
    title: "Jamia Gates",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Centenary_Gate_Jamia_Millia_Islamia.jpg/960px-Centenary_Gate_Jamia_Millia_Islamia.jpg",
      gate7,
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Maulana_Mahmud_Hasan_gate%2C_Jamia_Millia_Islamia.jpg/960px-Maulana_Mahmud_Hasan_gate%2C_Jamia_Millia_Islamia.jpg"
    ]
  },
  {
    title: "Academic Spaces",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/CENTRAL_JAMIA_LIBRARY.jpg/500px-CENTRAL_JAMIA_LIBRARY.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Gulistan-e-Ghalib%2C_JMI.jpg/500px-Gulistan-e-Ghalib%2C_JMI.jpg",
      // "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Jamia_Millia_Islamia_Campus.jpg/1280px-Jamia_Millia_Islamia_Campus.jpg"
    ]
  }
];

const PanelCard = ({ panel, index, currentIndex }) => {
    const [mouse, setMouse] = useState({ x: 0, y: 0, normX: 0, normY: 0 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMouse({
        x,
        y,
        normX: x / rect.width - 0.5,
        normY: y / rect.height - 0.5
      });
    };

    return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
        className="group relative h-[400px] lg:h-[500px] w-full isolate"
      >
        {/* Depth Shadow Layer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[rgba(129,157,60,0.18)] blur-3xl rounded-[40px] -z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white/40 border border-[#E9F5D0] shadow-sm hover:shadow-xl hover:-translate-y-[6px] transition-all duration-500 ease-out backdrop-blur-sm p-2 z-10">
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#e4ecd0] isolate">
            
            {/* Mouse Follow Spotlight */}
            <div 
              className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
              style={{
                background: `
                  radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, rgba(129,157,60,0.25) 0%, transparent 60%),
                  radial-gradient(200px circle at ${mouse.x}px ${mouse.y}px, rgba(255,184,77,0.18) 0%, transparent 60%)
                `
              }}
            />

            {/* Parallax & Zoom Image Wrapper */}
            <motion.div 
              animate={{ x: mouse.normX * -10, y: mouse.normY * -10 }}
              transition={{ type: "spring", stiffness: 70, damping: 25 }}
              className="absolute -inset-6 z-0"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={panel.images[currentIndex]}
                  alt={`${panel.title} image`}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1.05 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 1, ease: "easeInOut" },
                    scale: { duration: 4, ease: "linear" }
                  }}
                  className="absolute inset-0 w-full h-full object-cover sepia-[0.05]"
                />
              </AnimatePresence>
            </motion.div>

            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E2C12]/80 via-[#1E2C12]/10 to-transparent z-10 pointer-events-none" />

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
              <h3 className="font-fraunces text-2xl lg:text-3xl text-[#f5f3ea] tracking-tight drop-shadow-md">
                {panel.title}
              </h3>
            </div>

          </div>
        </div>
      </motion.div>
    );
  };
const CampusShowcase = () => {
  const [indices, setIndices] = useState([0, 0, 0]);


  useEffect(() => {
    const timer = setInterval(() => {
      setIndices(prev => [
        (prev[0] + 1) % panels[0].images.length,
        (prev[1] + 1) % panels[1].images.length,
        (prev[2] + 1) % panels[2].images.length,
      ]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  

  return (
    <section className="py-24 px-6 relative isolate">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <span className="font-mono text-[#809D3C] text-xs tracking-widest uppercase mb-4 block">Gallery</span>
          <h2 className="font-fraunces text-3xl md:text-4xl lg:text-5xl text-[#1E2C12]">Campus Life</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {panels.map((panel, idx) => (
            <PanelCard 
              key={idx} 
              panel={panel} 
              index={idx} 
              currentIndex={indices[idx]} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

const FinalCTA = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ctaRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="py-32 px-6 relative isolate">
      {/* Depth Background Layer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[120%] bg-[rgba(129,157,60,0.25)] blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ctaRef}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="group/container relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-[4px] transition-all duration-500 ease-out p-12 md:p-24 text-center border border-[#A9C46C]/20"
        >
          {/* Slow Background Movement */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#5D8736] via-[#6f9c41] to-[#3E5C25] bg-[length:200%_200%] -z-20"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          {/* Mouse Follow Glow */}
          <div
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ease-linear mix-blend-screen"
            style={{
              background: `
                radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(129,157,60,0.35) 0%, transparent 70%),
                radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,184,77,0.25) 0%, transparent 60%)
              `
            }}
          />

          {/* Static Ambient Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#DFF09E] to-transparent mix-blend-overlay -z-10 pointer-events-none" />

          {/* Content */}
          <div className="relative z-20 space-y-8">
            <h2 className="font-fraunces text-4xl md:text-5xl lg:text-6xl text-[#f5f3ea] font-normal tracking-tight drop-shadow-sm">
              Be part of Jamia's digital future.
            </h2>
            <p className="font-plex text-lg md:text-xl text-[#E9F5D0] font-light max-w-2xl mx-auto drop-shadow-sm leading-relaxed">
              Join a growing community of scholars, share your knowledge, and leave your mark on the campus network.
            </p>
            
            <div className="pt-6 flex justify-center">
              <Link
                to="/signup"
                className="group/btn relative overflow-hidden inline-flex items-center gap-3 px-10 py-5 bg-[#FFB84D] text-[#1E2C12] font-medium rounded-xl hover:bg-[#E69A15] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-[3px] hover:scale-[1.03]"
              >
                {/* Button Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-[150%] group-hover/btn:translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none skew-x-12" />
                
                <span className="relative z-10 flex items-center gap-2 tracking-wide">
                  Join the Network <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const footerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <footer 
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="relative pt-24 pb-12 overflow-hidden bg-gradient-to-b from-transparent to-[#eef3d2] isolate"
    >
      {/* Subtle Mouse Follow Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-15 transition-opacity duration-300 ease-linear"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(129,157,60,0.5) 0%, transparent 60%)`
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Top Divider Accent */}
        <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#809D3C] to-transparent mx-auto mb-10 opacity-60" />

        <p className="font-mono text-[#5D8736] hover:text-[#2F441B] transition-colors duration-500 ease-out text-sm tracking-wide cursor-default leading-loose md:leading-normal">
          Designed and built by Mohammad Aneeq. <br className="md:hidden" />
          <span className="hidden md:inline text-[#A9C46C] mx-3">|</span> 
          Jamia Connect &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3ea] via-[#eef3d2] to-[#e4ecd0] text-[#2F441B] selection:bg-[#DFF09E] selection:text-[#1E2C12] overflow-x-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
        
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-plex { font-family: 'IBM Plex Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* Subtle radial light overlays for depth */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-[#ffffff] opacity-30 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#DFF09E] opacity-20 blur-[100px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3" />

      <HomeContent />
    </div>
  );
};

const HomeContent = () => {
  return (
    <div className="relative z-10">
      <Hero />
      <HistoryTimeline />
      <PlatformFeatures />
      <CampusShowcase />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Home;