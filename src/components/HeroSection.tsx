export default function Hero() {
  return (
    <section className="bg-green-50 py-10 px-4 text-gray-800">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        {/* लाभ और सुविधाएँ */}
        <div className="text-left bg-white p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-green-700">पंचकर्म के लाभ:</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>सभी प्रकार की जकड़न और दर्द में राहत</li>
            <li>गठिया, कमर दर्द, स्पॉन्डिलाइटिस, गर्दन और सिरदर्द</li>
            <li>पेट दर्द और अंगों में होने वाले पुराने रोग</li>
            <li>लिपिड प्रोफाइल (कोलेस्ट्रॉल) केवल 11 दिन में सामान्य करें</li>
          </ul>

          <h2 className="text-xl font-semibold text-green-700 pt-4">चिकित्सा सुविधाएँ:</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>हड्डी, नस और जोड़ के सभी रोगों का इलाज</li>
            <li>पीलिया, दमा, लकवा जैसे रोगों की चिकित्सा</li>
            <li>बवासीर, भगंदर का क्षारसूत्र द्वारा इलाज</li>
            <li>सामान्य रोगों की सुरक्षित आयुर्वेदिक चिकित्सा</li>
            <li>नि:संतान दंपत्तियों के लिए उपचार</li>
            <li>शुक्राणुओं की कमी व नपुंसकता का इलाज</li>
            <li>प्रदर रोग की विशेष चिकित्सा</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
