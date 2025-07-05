'use client';

import React from 'react';

export default function VamanPage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center min-h-[70vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/Vaman-Therapy.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 py-20 text-white max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">वमन (Vaman)</h1>
          <p className="text-lg leading-relaxed">
            यह पंचकर्म की प्रमुख प्रक्रिया है, जिसमें आयुर्वेदिक औषधियों द्वारा वमन (उल्टी) कराकर कफ दोष का शुद्धिकरण किया जाता है।
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 py-10 max-w-3xl mx-auto space-y-6 text-gray-800">
        <h2 className="text-2xl font-semibold">वमन क्या है?</h2>
        <p>
          वमन चिकित्सा एक नियंत्रित और चिकित्सकीय उल्टी की प्रक्रिया है,
          जो विशेष रूप से कफ दोष से संबंधित रोगों जैसे कि दमा, खांसी, मोटापा, एलर्जी आदि के उपचार में उपयोगी है।
        </p>

        <h2 className="text-2xl font-semibold">प्रक्रिया (Step by Step)</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>पूर्व कर्म: स्नेहन और स्वेदन</li>
          <li>मुख्य कर्म: औषधीय काढ़ा देकर वमन</li>
          <li>उत्तर कर्म: विश्राम और विशेष आहार</li>
        </ul>

        <h2 className="text-2xl font-semibold">लाभ (Benefits)</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>कफजन्य रोगों में लाभ</li>
          <li>श्वसन तंत्र की शुद्धि</li>
          <li>त्वचा रोग और एलर्जी में राहत</li>
          <li>मोटापा व कोलेस्ट्रॉल में कमी</li>
        </ul>

        <h2 className="text-2xl font-semibold">सावधानियाँ</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>केवल योग्य चिकित्सक की देखरेख में करें</li>
          <li>कमजोर या अति वृद्ध व्यक्ति पर न करें</li>
          <li>विश्राम और भोजन विधि का पालन जरूरी</li>
        </ul>
      </section>
    </div>
  );
}
