"use client";

export default function AbhyangPage() {
  return (
    <>
      {/* Hero Section with Background Image */}
      <section
        className="relative bg-cover bg-center min-h-[70vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/Abhyanga-Oil-Massage.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4 py-20 text-white max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">अभ्यंग (Abhyanga)</h1>
          <p className="text-lg leading-relaxed">
            आयुर्वेदिक तेल से सम्पूर्ण शरीर की मालिश, जो दोष संतुलन, तंत्रिका
            शिथिलता, त्वचा पोषण और मानसिक शांति प्रदान करती है।
          </p>
        </div>
      </section>

      {/* Description Section */}
      <section className="px-4 py-10 max-w-3xl mx-auto space-y-6 text-gray-800">
        <h2 className="text-2xl font-semibold">अभ्यंग क्या है?</h2>
        <p>
          अभ्यंग एक पारंपरिक आयुर्वेदिक तेल मालिश है जिसमें पूरे शरीर में गर्म
          हर्बल तेलों से सिर से पैर तक लयबद्ध तरीके से मालिश की जाती है। यह शरीर
          को शुद्ध करता है, रक्त संचार को बढ़ाता है और मानसिक तनाव को दूर करता
          है।
        </p>

        <h2 className="text-2xl font-semibold">प्रक्रिया (स्टेप बाय स्टेप)</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>शरीर पर गर्म हर्बल तेल लगाया जाता है।</li>
          <li>सर से पैर तक लयबद्ध और रोम की दिशा में मालिश होती है।</li>
          <li>मर्म बिंदुओं पर विशेष ध्यान दिया जाता है।</li>
          <li>
            10–25 मिनट तक तेल को सोखने दिया जाता है, फिर स्नान कराया जाता है।
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">लाभ</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>रक्त परिसंचरण में सुधार</li>
          <li>तनाव व चिंता में राहत</li>
          <li>त्वचा कोमल व पोषित होती है</li>
          <li>जोड़ों का दर्द और मांसपेशियों में लचीलापन</li>
          <li>ऊर्जा और उत्साह में वृद्धि</li>
        </ul>

        <h2 className="text-2xl font-semibold">सावधानियाँ</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>बुखार, संक्रमण या पेट खराब होने पर न करें</li>
          <li>भोजन के तुरंत बाद न कराएं</li>
          <li>गर्भवती महिलाएं चिकित्सक से परामर्श लें</li>
        </ul>
      </section>
    </>
  );
}
