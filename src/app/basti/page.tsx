'use client';

import React from 'react';

export default function BastiPage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center min-h-[70vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/Basti-Therapy.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 py-20 text-white max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">बस्ति (Basti)</h1>
          <p className="text-lg leading-relaxed">
            बस्ति पंचकर्म की प्रमुख और प्रभावशाली चिकित्सा है, जो वात दोषों को संतुलित करने में अत्यंत उपयोगी होती है।
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 py-10 max-w-3xl mx-auto space-y-6 text-gray-800">
        <h2 className="text-2xl font-semibold">बस्ति क्या है?</h2>
        <p>
          बस्ति एक आयुर्वेदिक एनीमा (enema) चिकित्सा है जिसमें औषधीय तेलों या काढ़ों को गुदा मार्ग से शरीर में दिया जाता है।
          यह वात दोष को नियंत्रित करने का सबसे प्रमुख उपाय है। इसे 'आधा चिकित्सा' भी कहा गया है क्योंकि इसका असर शरीर पर व्यापक होता है।
        </p>

        <h2 className="text-2xl font-semibold">प्रक्रिया (Step by Step)</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>पूर्व कर्म: स्नेहन (तेल मालिश) और स्वेदन (भाप)</li>
          <li>मुख्य कर्म: बस्ति (औषधीय एनीमा) का प्रशासन</li>
          <li>उत्तर कर्म: विश्राम और आहार नियम</li>
        </ul>

        <h2 className="text-2xl font-semibold">लाभ (Benefits)</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>वात विकारों जैसे जोड़ दर्द, कमर दर्द, गठिया आदि में राहत</li>
          <li>नसों की शुद्धि और स्फूर्ति में वृद्धि</li>
          <li>बांझपन, नपुंसकता, मासिक धर्म विकारों में लाभ</li>
          <li>हाजमा और मलोत्सर्ग सुधारता है</li>
        </ul>

        <h2 className="text-2xl font-semibold">सावधानियाँ</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>गंभीर दस्त, बवासीर या गुदा रोगों में न करें</li>
          <li>चिकित्सक की निगरानी में ही करवाएं</li>
          <li>बस्ति के बाद विशेष आहार-विहार का पालन जरूरी है</li>
        </ul>
      </section>
    </div>
  );
}
