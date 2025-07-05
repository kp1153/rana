'use client';

import React from 'react';

export default function RaktmokshanPage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center min-h-[70vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/Raktmokshan-Therapy.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 py-20 text-white max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">रक्तमोक्षण (Raktmokshan)</h1>
          <p className="text-lg leading-relaxed">
            रक्तमोक्षण एक आयुर्वेदिक चिकित्सा है जिसमें शरीर से दूषित रक्त को निकालकर विभिन्न रोगों का शमन किया जाता है।
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 py-10 max-w-3xl mx-auto space-y-6 text-gray-800">
        <h2 className="text-2xl font-semibold">रक्तमोक्षण क्या है?</h2>
        <p>
          यह पंचकर्म की पाँचवीं विधि है जो मुख्यतः त्वचा रोग, रक्तदोष और उच्च रक्तचाप जैसे रोगों के लिए प्रयोग की जाती है।
          इसमें दूषित रक्त को विशेष तकनीकों जैसे जोंक थेरेपी, सींग, या सिरा वेधन विधियों से निकाला जाता है।
        </p>

        <h2 className="text-2xl font-semibold">प्रमुख विधियाँ</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>जोंक (Leech Therapy): सौम्य और सुरक्षित रक्तस्राव तकनीक</li>
          <li>श्रृंग (Horn Therapy): वायुदोष शमन हेतु प्रयुक्त</li>
          <li>सिरा वेधन (Venesection): नस काटकर रक्त निकालना</li>
        </ul>

        <h2 className="text-2xl font-semibold">लाभ</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>त्वचा विकार जैसे सोरायसिस, एक्जिमा में लाभ</li>
          <li>उच्च रक्तचाप और सिरदर्द में राहत</li>
          <li>रक्त शुद्धिकरण और प्रतिरक्षा प्रणाली में सुधार</li>
        </ul>

        <h2 className="text-2xl font-semibold">सावधानियाँ</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>कमज़ोरी, एनीमिया या रक्ताल्पता में न करें</li>
          <li>केवल प्रशिक्षित वैद्य की देखरेख में करवाएँ</li>
        </ul>
      </section>
    </div>
  );
}
