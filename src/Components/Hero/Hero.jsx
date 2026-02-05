import React, { useEffect, useState, useRef } from 'react';
import bgVideo from '../../assets/newassets/2.mp4';
import crackedBox from '../../assets/image.png';
import revolverTitle from '../../assets/IMG.png';
import bgVideo2 from '../../assets/mp5.mp4';
import SlantedGallery from './SlantedGallery';

import ShopPreview from '../Shop/ShopPreview';

const HeroCountdown = () => {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const overlay1Ref = useRef(null);
    const overlay2Ref = useRef(null);

    // const calculateTimeLeft = () => {
    //   const targetDate = new Date('2025-08-29T13:00:00+02:00');
    //   const difference = targetDate - new Date();
    //   let timeLeft = {};

    //   if (difference > 0) {
    //     timeLeft = {
    //       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    //       hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
    //       minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
    //     };
    //   }
    //   return timeLeft;
    // };

    // const [timeLeft, setTimeLeft] = useState({
    //   days: 1,
    //   hours: '05',
    //   minutes: '30',
    // });

    // Function to update background height
    const updateBackgroundHeight = () => {
        if (sectionRef.current && videoRef.current && overlay1Ref.current && overlay2Ref.current) {
            const sectionHeight = sectionRef.current.scrollHeight;
            const height = `${Math.max(sectionHeight, window.innerHeight)}px`;

            videoRef.current.style.height = height;
            overlay1Ref.current.style.height = height;
            overlay2Ref.current.style.height = height;
        }
    };

    useEffect(() => {
        // Multiple attempts to update height at different timing intervals
        const updateWithDelay = () => {
            updateBackgroundHeight();
            setTimeout(updateBackgroundHeight, 100);
            setTimeout(updateBackgroundHeight, 300);
            setTimeout(updateBackgroundHeight, 500);
            setTimeout(updateBackgroundHeight, 1000);
        };

        // Initial update
        updateWithDelay();

        // Update when images load
        const images = sectionRef.current?.querySelectorAll('img');
        images?.forEach(img => {
            if (img.complete) {
                updateBackgroundHeight();
            } else {
                img.addEventListener('load', updateBackgroundHeight);
                img.addEventListener('error', updateBackgroundHeight);
            }
        });

        // Update height on window resize
        const handleResize = () => {
            setTimeout(updateBackgroundHeight, 50);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('load', updateBackgroundHeight);

        // Use ResizeObserver to watch for content changes
        const resizeObserver = new ResizeObserver(() => {
            setTimeout(updateBackgroundHeight, 10);
        });

        if (sectionRef.current) {
            resizeObserver.observe(sectionRef.current);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', updateBackgroundHeight);
            images?.forEach(img => {
                img.removeEventListener('load', updateBackgroundHeight);
                img.removeEventListener('error', updateBackgroundHeight);
            });
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        // const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000);
        // return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-black">
            <section ref={sectionRef} className="relative w-full text-white font-serif" style={{ minHeight: '100vh' }}>
                {/* 🎥 Background Video */}
                <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full object-cover z-0"
                    style={{ minHeight: '100vh' }}
                    src={bgVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                {/* 📳 Overlays */}
                <div
                    ref={overlay1Ref}
                    className="absolute top-0 left-0 w-full z-10"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.65))',
                        minHeight: '100vh'
                    }}
                />
                <div
                    ref={overlay2Ref}
                    className="absolute top-0 left-0 w-full z-15 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)',
                        minHeight: '100vh'
                    }}
                />

                {/* 📜 Content */}
                <div className="relative z-20 flex flex-col md:flex-row items-center sm:px-6 lg:px-[5vw] py-10 w-full min-h-screen">

                    {/* Left/Center Content */}
                    <div className="flex-1 flex flex-col items-center text-center">
                        {/* Top content container */}
                        <div className="flex flex-col items-center w-full mt-[10vh] mb-3">
                            {/* 🖼️ Logo */}
                            <img
                                src={revolverTitle}
                                alt="Revolver Rift Title"
                                className="w-[clamp(250px,45vw,500px)] mb-2"
                                style={{ animation: 'bounceDrop 1.2s ease-out forwards' }}
                            />
                        </div>

                        {/* Bottom message */}
                        <div className="max-w-4xl mx-auto px-4 pb-10">
                            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-8">
                                Hardcore PvPvE extraction shooter game. <br />
                                Wishlisting available soon on PC stores.
                            </h2>

                            {/* Store Logos */}
                            <div className="flex items-center justify-center gap-3 md:gap-4 mt-6">
                                <img
                                    src="https://res.cloudinary.com/df7s2xmz1/image/upload/v1765701093/24babc47-9fc8-4b0a-a09f-74e7e51b09a6.png"
                                    alt="Steam"
                                    className="h-12 md:h-16 lg:h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                                />
                                <img
                                    src="https://res.cloudinary.com/df7s2xmz1/image/upload/v1765705048/image-removebg-preview_su2ttv.png"
                                    alt="PC Store"
                                    className="h-12 md:h-16 lg:h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Shop Preview (Hidden on small mobile) */}
                    <div className="hidden md:block absolute right-[5vw] top-1/2 -translate-y-1/2 z-30 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
                        <ShopPreview />
                    </div>
                </div>
            </section>

            <SlantedGallery />


            {/* Second Video Section */}
            <section className="relative w-full h-screen">
                <video
                    className="w-full h-full object-cover"
                    src={bgVideo2}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </section>
        </div >
    );
};

export default HeroCountdown;