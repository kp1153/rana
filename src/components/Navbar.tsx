// app/components/Navbar.tsx

'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <div>
      {/* शीर्षक सेक्शन */}
      <div className="bg-amber-500 text-white text-center py-4 text-3xl font-bold tracking-wide">
        काशी पंचकर्म अस्पताल
      </div>
      {/* नेविगेशन मेन्यू */}
      <nav className="bg-gray-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center">
          <div className="flex space-x-8 text-lg font-medium">
            <Link href="/" className="hover:text-yellow-300 transition">होम</Link>
            <Link href="/paramarsh" className="hover:text-yellow-300 transition">परामर्श</Link>
            <Link href="/products" className="hover:text-yellow-300 transition">हमारे उत्पाद</Link>
            <Link href="/upchar-vidhiyan" className="hover:text-yellow-300 transition">उपचार-विधियाँ</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
