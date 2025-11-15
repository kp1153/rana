// components/Navbar.js
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
  "/6.jpg",
  "/7.jpg",
  "/8.jpg",
  "/9.jpg",
];

const SLIDE_DURATION = 5000;

export default function Navbar() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* शीर्षक */}
      <div className="bg-amber-500 text-white text-center py-4 text-3xl font-bold tracking-wide">
        काशी पंचकर्म अस्पताल
      </div>

      {/* नेविगेशन मेन्यू */}
      <nav className="bg-gray-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-6 text-lg font-medium">
          <a href="#home" className="hover:text-yellow-300 transition">
            होम
          </a>
          <a href="#abhyang" className="hover:text-yellow-300 transition">
            अभ्यंग
          </a>
          <a href="#swedan" className="hover:text-yellow-300 transition">
            स्वेदन
          </a>
          <a href="#vaman" className="hover:text-yellow-300 transition">
            वमन
          </a>
          <a href="#virechan" className="hover:text-yellow-300 transition">
            विरेचन
          </a>
          <a href="#basti" className="hover:text-yellow-300 transition">
            बस्ति
          </a>
          <a href="#raktmokshan" className="hover:text-yellow-300 transition">
            रक्तमोक्षण
          </a>
          <a href="#nasya" className="hover:text-yellow-300 transition">
            नस्य
          </a>
        </div>
      </nav>

      {/* स्लाइडिंग इमेज और टेक्स्ट */}
      <section
        id="home"
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 w-full h-full">
          {images.map((img, idx) => (
            <div
              key={img}
              className={`
                absolute inset-0 w-full h-full transition-opacity duration-1000
                ${idx === bgIndex ? "opacity-100 z-0" : "opacity-0 z-0"}
              `}
            >
              <Image
                src={img}
                alt={`Background ${idx + 1}`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/60 z-10"></div>
        </div>

        <div className="relative z-20 max-w-3xl mx-auto px-4 py-12 text-white text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            पंचकर्म कराएं, रोगों से मुक्ति पाएं
          </h1>
          <p className="text-lg leading-relaxed">
            आयुर्वेदिक जड़ी-बूटियों द्वारा शरीर का शुद्धिकरण ही पंचकर्म है।
            <br />
            यह शरीर की विषाक्तता को दूर करके आपको स्वस्थ, सुंदर, दीर्घायु और
            पवित्र बनाता है।
          </p>
        </div>
      </section>
    </div>
  );
}
