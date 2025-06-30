'use client';
import { useEffect, useState } from 'react';

const images = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
  "/4.jpg",
  "/5.jpg",
];

const therapies = [
  { name: 'अभ्यंग (तेल मालिश)', desc: 'पूरा शरीर औषधीय तेल से मालिश कर रक्त संचार, त्वचा और मांसपेशियों को पोषण देना।' },
  { name: 'स्वेदन (वाष्प स्नान)', desc: 'हर्बल स्टीम बाथ द्वारा शरीर से विषाक्त पदार्थों का निष्कासन और शारीरिक शुद्धि।' },
  { name: 'वमन (औषधीय वमन)', desc: 'विशेष औषधियों द्वारा उल्टी करवाकर शरीर से कफ दोष और टॉक्सिन्स की सफाई।' },
  { name: 'विरेचन (औषधीय विरेचन)', desc: 'औषधियों द्वारा नियंत्रित दस्त लाकर पित्त दोष और आंतों की शुद्धि।' },
  { name: 'बस्ति (औषधीय एनिमा)', desc: 'औषधीय घृत/तेल या काढ़े के एनिमा से वात दोष व पेट की गहराई से सफाई।' },
  { name: 'नस्य (नाक द्वारा औषधि)', desc: 'नाक के माध्यम से औषधि देकर सिर, नाक, गला और मस्तिष्क की शुद्धि।' },
  { name: 'रक्तमोक्षण (रक्त letting)', desc: 'विशेष विधियों द्वारा दूषित रक्त निकालकर त्वचा, जोड़ों और रक्त संबंधी रोगों में राहत।' }
];

const SLIDE_DURATION = 5000; // 5 सेकंड

const HeroSection = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % images.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt=""
            className={`
              absolute inset-0 w-full h-full object-cover transition-opacity duration-1000
              ${idx === bgIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'}
            `}
            draggable={false}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 py-12 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          प्रमुख पंचकर्म थैरेपीज़
        </h1>
        <p className="text-lg mb-8 text-center">
          हमारे यहाँ अनुभवी वैद्य द्वारा निम्नलिखित आयुर्वेदिक पंचकर्म उपचार उपलब्ध हैं:
        </p>
        <div className="grid gap-4">
          {therapies.map((therapy) => (
            <div
              key={therapy.name}
              className="bg-black/50 rounded-lg shadow p-4 border-l-4 border-amber-400"
            >
              <h2 className="text-lg font-semibold text-amber-300 mb-1">{therapy.name}</h2>
              <p>{therapy.desc}</p>
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="flex gap-2 mt-8 justify-center">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border border-amber-400 ${bgIndex === idx ? 'bg-amber-400' : 'bg-white/30'}`}
              onClick={() => setBgIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
