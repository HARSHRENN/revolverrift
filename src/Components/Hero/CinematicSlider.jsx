import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTwitter, FaFacebook, FaInstagram, FaDiscord, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import gun1 from '../../assets/newassets/GUN1.png';
import gun2 from '../../assets/newassets/GUN2.png';
import gun3 from '../../assets/newassets/GUN3.png';
import gun4 from '../../assets/newassets/GUN4.png';

const slides = [
    { id: 1, image: gun1, title: 'Epic Battle Awaits', subtitle: 'Prepare for Glory' },
    { id: 2, image: gun2, title: 'Godlike Warriors', subtitle: 'Unleash Your Power' },
    { id: 3, image: gun3, title: 'Dark Fantasy Realm', subtitle: 'Explore the Abyss' },
    { id: 4, image: gun4, title: 'Legendary Heroes', subtitle: 'Rise to Greatness' },
];

const socialLinks = [
    { icon: FaTwitter, url: '#', label: 'Twitter' },
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaDiscord, url: '#', label: 'Discord' },
];

const CinematicSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right

    // Auto-play functionality
    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                nextSlide();
            }, 6000);
            return () => clearInterval(interval);
        }
    }, [isHovered, currentIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const getSlideStyles = (index) => {
        const diff = (index - currentIndex + slides.length) % slides.length;

        // Center Slide
        if (diff === 0) {
            return {
                x: 0,
                scale: 1, // Normal scale
                opacity: 1,
                zIndex: 30,
                rotateY: 0,
                filter: 'blur(0px) brightness(1.0)', // Clean, no boost
                className: 'shadow-2xl' // Removed mask-grunge
            };
        }

        // Right Slide (Next)
        if (diff === 1) {
            return {
                x: '50%', // Adjusted overlap
                scale: 0.8,
                opacity: 1, // Fully visible but behind
                zIndex: 10,
                rotateY: 0, // Flat, like a painting
                filter: 'blur(0px) brightness(0.5)', // Darker but sharp
                className: '' // Clean rect
            };
        }

        // Left Slide (Previous)
        if (diff === slides.length - 1) {
            return {
                x: '-50%', // Adjusted overlap
                scale: 0.8,
                opacity: 1, // Fully visible but behind
                zIndex: 10,
                rotateY: 0, // Flat, like a painting
                filter: 'blur(0px) brightness(0.5)', // Darker but sharp
                className: '' // Clean rect
            };
        }

        // Hidden Slides
        return {
            x: diff < slides.length / 2 ? '100%' : '-100%',
            scale: 0.5,
            opacity: 0,
            zIndex: 0,
            rotateY: 0,
            filter: 'blur(20px)',
            className: ''
        };
    };

    return (
        <section
            className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col justify-center perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ perspective: '1200px' }}
        >
            {/* Background Texture - GodLike Style */}
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40 transition-all duration-1000"
                style={{ backgroundImage: `url(${slides[currentIndex].image})`, filter: 'blur(20px) scale(1.1)' }}
            />

            {/* Top Fade Gradient */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent z-40 pointer-events-none" />


            {/* Atmosphere Layers */}
            <div className="absolute inset-0 pointer-events-none z-10 cinematic-vignette mix-blend-multiply" />
            <div className="absolute inset-0 pointer-events-none z-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />

            {/* Fog Animation */}
            <div className="absolute inset-0 pointer-events-none z-25 overflow-hidden opacity-30">
                <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-fog" />
            </div>


            {/* Social Icons - Left Side */}
            <div className="hidden md:flex absolute left-8 lg:left-12 top-1/2 -translate-y-1/2 flex-col gap-8 z-50">
                {socialLinks.map((social, index) => (
                    <motion.a
                        key={index}
                        href={social.url}
                        aria-label={social.label}
                        className="text-white/40 hover:text-[#ff3333] transition-all duration-500 hover:drop-shadow-[0_0_8px_rgba(255,51,51,0.5)]"
                        whileHover={{ scale: 1.2, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <social.icon className="w-5 h-5" />
                    </motion.a>
                ))}
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto mt-4" />
            </div>

            {/* Slides Container */}
            <div className="relative w-full h-[85vh] flex items-center justify-center transform-style-3d">
                <AnimatePresence initial={false} mode='popLayout'>
                    {slides.map((slide, index) => {
                        const style = getSlideStyles(index);
                        const isCenter = (index - currentIndex + slides.length) % slides.length === 0;

                        return (
                            <motion.div
                                key={slide.id}
                                className={`absolute top-0 w-[90%] md:w-[80%] lg:w-[70%] aspect-[3/4] md:aspect-[16/9] lg:aspect-[16/9] ${style.className}`}
                                animate={{
                                    x: style.x,
                                    scale: style.scale,
                                    opacity: style.opacity,
                                    zIndex: style.zIndex,
                                    rotateY: style.rotateY,
                                    filter: style.filter
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 70, // Heavy feel
                                    damping: 20,
                                    mass: 1.2
                                }}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                }}
                            >
                                {/* Text Content Overlay - Removed for cleaner look */}
                                {/* {isCenter && (
                                    <motion.div 
                                        className="absolute inset-0 flex flex-col items-center justify-end pb-12 sm:pb-20 bg-gradient-to-t from-black/90 via-transparent to-transparent"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                    >
                                        <h3 className="text-[#ff3333] text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-2 drop-shadow-lg">{slide.subtitle}</h3>
                                        <h2 className="text-godlike text-3xl md:text-5xl lg:text-7xl text-white text-center px-4 leading-none glitch-text">
                                            {slide.title}
                                        </h2>
                                        <motion.button
                                            className="mt-8 px-8 py-3 border border-white/20 bg-black/50 text-white font-vintage tracking-widest hover:bg-[#ff3333] hover:border-[#ff3333] transition-all duration-300 backdrop-blur-sm"
                                            whileHover={{ scale: 1.05, letterSpacing: '0.1em' }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            DISCOVER
                                        </motion.button>
                                    </motion.div>
                                )} */}

                                {/* Overlay for depth on side slides */}
                                {!isCenter && <div className="absolute inset-0 bg-black/40" />}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 left-0 w-full flex justify-between px-4 md:px-20 -translate-y-1/2 pointer-events-none z-40">
                <button
                    onClick={prevSlide}
                    className="pointer-events-auto group text-white/50 hover:text-white transition-colors duration-300"
                    aria-label="Previous slide"
                >
                    <div className="flex items-center gap-2">
                        <FaChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden md:block text-xs tracking-widest uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">Prev</span>
                    </div>
                </button>
                <button
                    onClick={nextSlide}
                    className="pointer-events-auto group text-white/50 hover:text-white transition-colors duration-300"
                    aria-label="Next slide"
                >
                    <div className="flex items-center gap-2">
                        <span className="hidden md:block text-xs tracking-widest uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">Next</span>
                        <FaChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </div>
                </button>
            </div>

            {/* Dot Navigation */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`group relative flex items-center justify-center transition-all duration-500 ${index === currentIndex ? 'scale-125' : 'scale-100 hover:scale-110'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {/* Outer Ring */}
                        <span className={`absolute w-3 h-3 rounded-full border border-white/30 transition-all duration-500 ${index === currentIndex ? 'opacity-100 scale-150 border-[#ff3333]' : 'opacity-0 group-hover:opacity-50'
                            }`} />

                        {/* Inner Dot */}
                        <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${index === currentIndex ? 'bg-[#ff3333]' : 'bg-white/50 group-hover:bg-white'
                            }`} />
                    </button>
                ))}
            </div>
        </section>
    );
};

export default CinematicSlider;
