// src/app/components/Footer.tsx

const Footer = () => (
  <footer className="bg-zinc-900 text-white py-8 px-4">
    <div className="max-w-4xl mx-auto">
      {/* परिचय */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">काशी पंचकर्म अस्पताल</h2>
        <p className="mb-2">
          काशी पंचकर्म अस्पताल की स्थापना मार्च 2003 में डॉ. विजय सिंह राणा द्वारा की गई थी।
          आयुर्वेद में डिग्री प्राप्त करने और पंचकर्म चिकित्सा में विशेष प्रशिक्षण लेने के बाद,
          उन्होंने यह निर्णय लिया कि एक ऐसा केंद्र स्थापित किया जाए, जिससे लोगों को शरीर में विषाक्त पदार्थों (टॉक्सिन) के कारण उत्पन्न होने वाली बीमारियों से मुक्ति दिलाई जा सके।
          ये विषाक्त पदार्थ अनुचित खानपान और इंद्रियों की असंतुलित गतिविधियों के चलते शरीर में बन जाते हैं।
          इस अस्पताल की स्थापना का उद्देश्य लोगों को प्राकृतिक और आयुर्वेदिक पद्धति से स्वस्थ जीवन प्रदान करना है।
        </p>
      </div>
      {/* पता और संपर्क */}
      <div className="mb-4">
        <p className="mb-1">
          <span className="font-semibold">पता:</span> S-25/221-A महाबीर मंदिर रोड, भुजुबीर, वाराणसी, उत्तर प्रदेश, भारत - 220101
        </p>
        <p className="mb-1">
          <span className="font-semibold">मोबाइल:</span> <a href="tel:+919415872553" className="underline hover:text-yellow-300">+91-9415872553</a>
        </p>
        <p>
          <span className="font-semibold">ईमेल:</span> <a href="mailto:ranavijay1973@gmail.com" className="underline hover:text-yellow-300">ranavijay1973@gmail.com</a>
        </p>
      </div>
      {/* डिवाइडर */}
      <div className="border-t border-white/20 my-4"></div>
      {/* कॉपीराइट और क्रेडिट */}
      <div className="flex flex-col md:flex-row md:justify-between items-center text-sm">
        <span>
          &copy; Kashi Panchkarma Hospital.
        </span>
        <span className="mt-2 md:mt-0">
          Designed &amp; Managed By <span className="underline">hamaramorcha.com</span>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
