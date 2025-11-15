"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/check");
      if (!response.ok) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">लोड हो रहा है...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-amber-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">वैद्य सॉफ्टवेयर</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-amber-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            लॉगआउट
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* मरीज़ रजिस्ट्रेशन */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
            <div className="text-4xl mb-4">👤</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              मरीज़ रजिस्ट्रेशन
            </h2>
            <p className="text-gray-600">नए मरीज़ का रजिस्ट्रेशन करें</p>
          </div>

          {/* OPD रिकॉर्ड */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              OPD रिकॉर्ड
            </h2>
            <p className="text-gray-600">आज के मरीज़ों का रिकॉर्ड</p>
          </div>

          {/* पंचकर्म ट्रैकिंग */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
            <div className="text-4xl mb-4">🌿</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              पंचकर्म ट्रैकिंग
            </h2>
            <p className="text-gray-600">पंचकर्म उपचार की जानकारी</p>
          </div>

          {/* दवा स्टॉक */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
            <div className="text-4xl mb-4">💊</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">दवा स्टॉक</h2>
            <p className="text-gray-600">दवाओं का भण्डार प्रबंधन</p>
          </div>

          {/* बिलिंग */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
            <div className="text-4xl mb-4">💰</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">बिलिंग</h2>
            <p className="text-gray-600">फीस और बिल बनाएं</p>
          </div>

          {/* मरीज़ खोजें */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer">
            <div className="text-4xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              मरीज़ खोजें
            </h2>
            <p className="text-gray-600">पुराने मरीज़ का रिकॉर्ड देखें</p>
          </div>
        </div>
      </main>
    </div>
  );
}
