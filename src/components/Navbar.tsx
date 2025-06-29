"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/basti", label: "बस्ती" },
  { href: "/kaya-kalpam", label: "कायाकल्पम" },
  { href: "/leaf-massage", label: "लीफ मसाज" },
  { href: "/nasya", label: "नस्य" },
  { href: "/oil-bath", label: "ऑयल बाथ" },
  { href: "/oil-massage", label: "ऑयल मसाज" },
  { href: "/raktamokshana", label: "रक्तमोक्षण" },
  { href: "/rice-massage", label: "राइस मसाज" },
  { href: "/shirovasti", label: "शिरोवस्ती" },
  { href: "/steam-bath", label: "स्टीम बाथ" },
  { href: "/vamana", label: "वमन" },
  { href: "/virechana", label: "विरेचन" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* कलात्मक शीर्षक */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 py-5 shadow-md">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-white text-center tracking-widest drop-shadow-lg"
          style={{
            fontFamily: `'Noto Serif Devanagari', 'Mukta', 'Mangal', serif`,
            letterSpacing: "0.15em",
            textShadow: "0 2px 10px #1e40af",
          }}
        >
          काशी पंचकर्म हॉस्पिटल
        </h1>
      </div>

      {/* Blue Navbar */}
      <nav className="bg-blue-700 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
          {/* ☰ Hamburger */}
          <button
            className="md:hidden block text-white text-2xl mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
          {/* Desktop Menu */}
          <ul className="hidden md:flex flex-1 justify-center flex-nowrap gap-x-8 text-base font-semibold">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-amber-200 capitalize transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-blue-800 px-4 pb-4">
            <ul className="space-y-2 text-base font-semibold">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-white hover:text-amber-200 py-1 capitalize"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
