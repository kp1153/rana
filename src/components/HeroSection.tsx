"use client";
import { useState, useEffect } from "react";

const images = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden flex flex-col items-center justify-start bg-gray-50">
      {/* सबसे ऊपर बड़ा नाम */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-amber-700 drop-shadow-lg tracking-wide uppercase">
          Kashi Panchkarma Hospital
        </h1>
      </div>
      {/* स्लाइडिंग इमेज */}
      {images.map((image, idx) => (
        <img
          key={image}
          src={image}
          alt={`Slide ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          draggable={false}
        />
      ))}
      {/* ओवरले */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 z-20"></div>
      {/* नेविगेशन बटन */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/60 text-white p-3 rounded-full"
        aria-label="Previous slide"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/60 text-white p-3 rounded-full"
        aria-label="Next slide"
      >
        ▶
      </button>
      {/* डॉट्स */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? "bg-amber-500" : "bg-white/60"}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
