"use client";

export default function StickyFooter() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 text-white py-3 px-4 text-center shadow-lg z-50">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-2">
        <span className="font-bold text-lg md:text-xl tracking-wider">
          © 2003 - {new Date().getFullYear()} काशी पंचकर्म एवं आयुर्वेदिक हॉस्पिटल, वाराणसी
        </span>
        <span className="text-sm md:text-base font-medium">
          संचालक: डॉ. विजय सिंह राणा | आयुर्वेद एवं पंचकर्म चिकित्सा में समर्पित
        </span>
      </div>
    </footer>
  );
}
