// app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "निरोगी काया के लिए आयुर्वेद अपनाएं | काशी पंचकर्म हॉस्पिटल",
  description:
    "डॉ. विजय सिंह राणा द्वारा संचालित काशी पंचकर्म हॉस्पिटल, वाराणसी। आयुर्वेदिक पंचकर्म चिकित्सा - वमन, विरेचन, बस्ति, नस्य, रक्तमोक्षण। शरीर शुद्धिकरण और रोग निवारण के लिए प्रामाणिक आयुर्वेदिक उपचार।",
  keywords:
    "पंचकर्म, आयुर्वेद, वाराणसी, काशी, वमन, विरेचन, बस्ति, नस्य, रक्तमोक्षण, आयुर्वेदिक चिकित्सा, डॉ विजय सिंह राणा",
  authors: [{ name: "डॉ. विजय सिंह राणा" }],
  openGraph: {
    title: "काशी पंचकर्म हॉस्पिटल - आयुर्वेदिक पंचकर्म चिकित्सा केंद्र",
    description:
      "वाराणसी में प्रामाणिक आयुर्वेदिक पंचकर्म उपचार। शरीर शुद्धिकरण और रोग मुक्ति के लिए।",
    url: "https://www.kashipanchkarmahospital.in",
    siteName: "काशी पंचकर्म हॉस्पिटल",
    locale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "काशी पंचकर्म हॉस्पिटल",
    description: "आयुर्वेदिक पंचकर्म चिकित्सा - वाराणसी",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
