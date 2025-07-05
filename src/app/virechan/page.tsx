'use client';

import React from 'react';

export default function VirechanPage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center min-h-[70vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/Virechan-Therapy.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 py-20 text-white max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">विरेचन (Virechan)</h1>
          <p className="text-lg leading-relaxed">
            आयुर्वेदिक विधि द्वारा शरीर से पित्त दोष को बाहर निकालने की प्रक्रिया — शरीर का प्राकृतिक शुद्धिकरण।
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 py-10 max-w-3xl mx-auto space-y-6 text-gray-800">
        <h2 className="text-2xl font-semibold">विरेचन क्या है?</h2>
        <p>
          विरेचन एक आयुर्वेदिक प्रक्रिया है जिसमें औषधियों के माध्यम से शरीर से पित्त दोष को बाहर निकाला जाता है।
          यह प्रक्रिया पाचन तंत्र, यकृत (लिवर), और आँतों की गहराई से सफाई करती है।
          आमतौर पर इसका उपयोग त्वचा रोग, एलर्जी, बवासीर, और पित्त विकारों के लिए किया जाता है।
        </p>

        <h2 className="text-2xl font-semibold">प्रक्रिया (Step by Step)</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>पूर्व कर्म: स्नेहन और स्वेदन</li>
          <li>मुख्य कर्म: औषधियों द्वारा रेचक (laxative) देकर शुद्धि</li>
          <li>उत्तर कर्म: आहार और आराम की विशेष व्यवस्था</li>
        </ul>

        <h2 className="text-2xl font-semibold">लाभ (Benefits)</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>पाचन क्रिया में सुधार</li>
          <li>त्वचा रोगों जैसे एक्जिमा, सोरायसिस में लाभ</li>
          <li>पित्त से जुड़ी बीमारियों में राहत</li>
          <li>लीवर डिटॉक्स और रक्त की शुद्धता</li>
        </ul>

        <h2 className="text-2xl font-semibold">सावधानियाँ</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>गर्भवती, अति दुर्बल या बूढ़े लोगों पर नहीं करना चाहिए</li>
          <li>योग्य वैद्य की निगरानी में ही करें</li>
          <li>विरेचन के बाद विशेष आहार नियम का पालन अनिवार्य</li>
        </ul>
      </section>
    </div>
  );
}
