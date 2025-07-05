'use client';

import React from 'react';

export default function SwedanPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center min-h-[70vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/Swedan-Steam-Therapy.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4 py-20 text-white max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">स्वेदन (Swedan)</h1>
          <p className="text-lg leading-relaxed">
            आयुर्वेदिक भाप चिकित्सा जो शरीर से विषाक्त तत्वों को पसीने द्वारा बाहर निकालती है और वात दोष को संतुलित करती है।
          </p>
        </div>
      </section>

      {/* Detail Section */}
      <section className="px-4 py-10 max-w-3xl mx-auto space-y-6 text-gray-800">
        <h2 className="text-2xl font-semibold">स्वेदन क्या है?</h2>
        <p>
          स्वेदन एक आयुर्वेदिक चिकित्सा प्रक्रिया है जिसमें रोगी को औषधीय भाप दी जाती है।
          यह भाप त्वचा के छिद्रों को खोलती है, जिससे पसीने के माध्यम से शरीर से विषैले पदार्थ बाहर निकलते हैं।
          यह विशेष रूप से वातजन्य रोगों में उपयोगी है और पंचकर्म चिकित्सा की मुख्य प्रक्रिया में से एक मानी जाती है।
        </p>

        <h2 className="text-2xl font-semibold">प्रक्रिया (Step by Step)</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>रोगी को एक विशेष स्टीम बॉक्स या कुर्सी पर बैठाया जाता है।</li>
          <li>सिर बाहर रखा जाता है ताकि ताप नियंत्रण बना रहे।</li>
          <li>हर्बल औषधियों से युक्त भाप धीरे-धीरे पूरे शरीर को दी जाती है।</li>
          <li>भाप 15–20 मिनट तक दी जाती है जब तक पसीना ना आ जाए।</li>
          <li>इसके बाद गुनगुने जल से स्नान करवाया जाता है।</li>
        </ul>

        <h2 className="text-2xl font-semibold">लाभ (Benefits)</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>शरीर से विषैले तत्वों का नाश</li>
          <li>जोड़ों व मांसपेशियों के दर्द में राहत</li>
          <li>त्वचा में चमक और नमी की वृद्धि</li>
          <li>तनाव, थकान और अनिद्रा में सुधार</li>
          <li>रक्त परिसंचरण को सक्रिय करता है</li>
        </ul>

        <h2 className="text-2xl font-semibold">सावधानियाँ</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>बुखार, कमजोरी या दिल की बीमारी वाले रोगी पहले चिकित्सक से परामर्श लें।</li>
          <li>भूखे या पूर्ण पेट स्वेदन न कराएं।</li>
          <li>गर्भवती महिलाओं के लिए उपयुक्त नहीं है।</li>
        </ul>
      </section>
    </>
  );
}
