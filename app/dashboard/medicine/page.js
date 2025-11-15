"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Package,
  AlertTriangle,
  Edit,
  Trash2,
  TrendingDown,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

export default function MedicineStock() {
  const router = useRouter();
  const [medicines, setMedicines] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    price: "",
    expiryDate: "",
    reorderLevel: "",
  });

  const categories = [
    { value: "tablet", label: "वटी/गोली" },
    { value: "powder", label: "चूर्ण" },
    { value: "syrup", label: "रस/सिरप" },
    { value: "oil", label: "तेल" },
    { value: "kadha", label: "काढ़ा" },
    { value: "other", label: "अन्य" },
  ];

  const units = ["पीस", "ग्राम", "मिली", "बोतल", "पैकेट"];

  // Load medicines from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("medicines");
    if (saved) setMedicines(JSON.parse(saved));
  }, []);

  // Save medicines to localStorage
  useEffect(() => {
    if (medicines.length > 0) {
      localStorage.setItem("medicines", JSON.stringify(medicines));
    }
  }, [medicines]);

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.category ||
      !formData.quantity ||
      !formData.unit
    ) {
      alert("कृपया सभी आवश्यक फील्ड भरें");
      return;
    }

    const newMedicine = {
      id: Date.now(),
      ...formData,
      quantity: parseFloat(formData.quantity),
      price: parseFloat(formData.price) || 0,
      reorderLevel: parseFloat(formData.reorderLevel) || 0,
    };
    setMedicines([newMedicine, ...medicines]);
    setFormData({
      name: "",
      category: "",
      quantity: "",
      unit: "",
      price: "",
      expiryDate: "",
      reorderLevel: "",
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (confirm("क्या आप इस दवा को डिलीट करना चाहते हैं?")) {
      setMedicines(medicines.filter((m) => m.id !== id));
    }
  };

  const updateStock = (id, change) => {
    setMedicines(
      medicines.map((m) => {
        if (m.id === id) {
          return { ...m, quantity: Math.max(0, m.quantity + change) };
        }
        return m;
      })
    );
  };

  const isLowStock = (medicine) => {
    return (
      medicine.reorderLevel > 0 && medicine.quantity <= medicine.reorderLevel
    );
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0;
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const filteredMedicines = medicines.filter((m) => {
    const matchesSearch = m.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || m.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryLabel = (value) => {
    return categories.find((c) => c.value === value)?.label || value;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft size={24} className="text-gray-700" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  दवा स्टॉक प्रबंधन
                </h1>
                <p className="text-gray-600 mt-1">
                  इन्वेंटरी और स्टॉक ट्रैकिंग
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              <Plus size={20} />
              नई दवा जोड़ें
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="दवा का नाम खोजें..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">सभी श्रेणी</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              नई दवा जोड़ें
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  दवा का नाम *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  श्रेणी *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">चुनें</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  मात्रा *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  इकाई *
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">चुनें</option>
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  मूल्य (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  एक्सपायरी तिथि
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  री-ऑर्डर स्तर
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.reorderLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, reorderLevel: e.target.value })
                  }
                  placeholder="जब स्टॉक इससे कम हो तो अलर्ट"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2 flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  सेव करें
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  रद्द करें
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Alerts */}
        {medicines.filter(
          (m) =>
            isLowStock(m) ||
            isExpiringSoon(m.expiryDate) ||
            isExpired(m.expiryDate)
        ).length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="text-yellow-600 flex-shrink-0 mt-0.5"
                size={20}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800 mb-2">
                  ध्यान दें
                </h3>
                <ul className="space-y-1 text-sm text-yellow-700">
                  {medicines.filter((m) => isLowStock(m)).length > 0 && (
                    <li>
                      • {medicines.filter((m) => isLowStock(m)).length} दवाएं कम
                      स्टॉक में
                    </li>
                  )}
                  {medicines.filter((m) => isExpiringSoon(m.expiryDate))
                    .length > 0 && (
                    <li>
                      •{" "}
                      {
                        medicines.filter((m) => isExpiringSoon(m.expiryDate))
                          .length
                      }{" "}
                      दवाएं 90 दिन में एक्सपायर होंगी
                    </li>
                  )}
                  {medicines.filter((m) => isExpired(m.expiryDate)).length >
                    0 && (
                    <li>
                      •{" "}
                      {medicines.filter((m) => isExpired(m.expiryDate)).length}{" "}
                      दवाएं एक्सपायर हो चुकी हैं
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Medicine Table */}
        {filteredMedicines.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              कोई दवा नहीं मिली
            </h3>
            <p className="text-gray-500 mb-4">
              नई दवा जोड़ने के लिए ऊपर बटन क्लिक करें
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      दवा का नाम
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      श्रेणी
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      स्टॉक
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      मूल्य
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      एक्सपायरी
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      स्थिति
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      एक्शन
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMedicines.map((medicine) => (
                    <tr key={medicine.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-800">
                          {medicine.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {getCategoryLabel(medicine.category)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold ${isLowStock(medicine) ? "text-red-600" : "text-gray-800"}`}
                          >
                            {medicine.quantity}
                          </span>
                          <span className="text-sm text-gray-500">
                            {medicine.unit}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {medicine.price ? `₹${medicine.price.toFixed(2)}` : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {medicine.expiryDate ? (
                          <span
                            className={
                              isExpired(medicine.expiryDate)
                                ? "text-red-600 font-semibold"
                                : isExpiringSoon(medicine.expiryDate)
                                  ? "text-orange-600"
                                  : "text-gray-600"
                            }
                          >
                            {new Date(medicine.expiryDate).toLocaleDateString(
                              "hi-IN"
                            )}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          {isExpired(medicine.expiryDate) && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs w-fit">
                              <AlertTriangle size={12} />
                              एक्सपायर
                            </span>
                          )}
                          {!isExpired(medicine.expiryDate) &&
                            isExpiringSoon(medicine.expiryDate) && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs w-fit">
                                <AlertTriangle size={12} />
                                जल्द एक्सपायर
                              </span>
                            )}
                          {isLowStock(medicine) && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs w-fit">
                              <TrendingDown size={12} />
                              कम स्टॉक
                            </span>
                          )}
                          {!isLowStock(medicine) &&
                            !isExpiringSoon(medicine.expiryDate) &&
                            !isExpired(medicine.expiryDate) && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs w-fit">
                                <TrendingUp size={12} />
                                उपलब्ध
                              </span>
                            )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStock(medicine.id, 1)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded text-xs"
                            title="स्टॉक बढ़ाएं"
                          >
                            <TrendingUp size={16} />
                          </button>
                          <button
                            onClick={() => updateStock(medicine.id, -1)}
                            className="p-1 text-orange-600 hover:bg-orange-50 rounded text-xs"
                            title="स्टॉक घटाएं"
                          >
                            <TrendingDown size={16} />
                          </button>
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(medicine.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">कुल दवाएं</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {medicines.length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">कम स्टॉक</div>
            <div className="text-2xl font-bold text-yellow-600 mt-1">
              {medicines.filter((m) => isLowStock(m)).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">जल्द एक्सपायर</div>
            <div className="text-2xl font-bold text-orange-600 mt-1">
              {medicines.filter((m) => isExpiringSoon(m.expiryDate)).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">कुल मूल्य</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              ₹
              {medicines
                .reduce((sum, m) => sum + m.price * m.quantity, 0)
                .toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
