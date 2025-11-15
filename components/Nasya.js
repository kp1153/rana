"use client";

export default function NasyaPage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center min-h-[70vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/Nasya-Therapy.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 py-20 text-white max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">नस्य (Nasya)</h1>
          <p className="text-lg leading-relaxed">
            नस्य एक प्रभावशाली पंचकर्म उपचार है जिसमें औषधीय तेल या रस को नाक के
            माध्यम से शरीर में प्रविष्ट कराया जाता है।
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 py-10 max-w-3xl mx-auto space-y-6 text-gray-800">
        <h2 className="text-2xl font-semibold">नस्य क्या है?</h2>
        <p>
          नस्य एक विशिष्ट आयुर्वेदिक प्रक्रिया है जिसमें औषधीय पदार्थों को नाक
          से डाला जाता है। यह सिर, मस्तिष्क, ग्रीवा (गर्दन), और ENT क्षेत्र से
          संबंधित रोगों में अत्यंत लाभकारी है। इसे पंचकर्म चिकित्सा की पाँचवीं
          क्रिया माना जाता है।
        </p>

        <h2 className="text-2xl font-semibold">प्रक्रिया</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>रोगी को आरामदायक मुद्रा में लेटाया जाता है</li>
          <li>नाक में निर्धारित मात्रा में औषधीय तेल या रस डाला जाता है</li>
          <li>सिर, गर्दन और चेहरे की मालिश की जाती है</li>
          <li>गर्म पानी से गरारा और भाप लिया जाता है</li>
        </ul>

        <h2 className="text-2xl font-semibold">लाभ</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>सिरदर्द, साइनस, माइग्रेन और एलर्जी में राहत</li>
          <li>नाक और गले की शुद्धि</li>
          <li>चेहरे का सौंदर्य और चमक बढ़ती है</li>
          <li>मानसिक तनाव और अनिद्रा में शांति</li>
        </ul>

        <h2 className="text-2xl font-semibold">सावधानियाँ</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>भोजन के तुरंत बाद या अत्यधिक भूख में न करें</li>
          <li>जुकाम, बुखार या बहुत कमजोर रोगी में न करें</li>
          <li>प्रशिक्षित वैद्य की देखरेख में ही करवाना चाहिए</li>
        </ul>
      </section>
    </div>
  );
}
