"use client"; 
import React, { useState } from "react";
import {
  Search,
  Plus,
  Activity,
  User,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Pause,
} from "lucide-react";

export default function PanchakarmaTracking() {
  const [treatments, setTreatments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    therapyType: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    totalSessions: "",
    completedSessions: 0,
    status: "ongoing",
    remarks: "",
  });

  const therapyOptions = [
    { value: "abhyang", label: "अभ्यंग" },
    { value: "swedan", label: "स्वेदन" },
    { value: "vaman", label: "वमन" },
    { value: "virechan", label: "विरेचन" },
    { value: "basti", label: "बस्ति" },
    { value: "raktmokshan", label: "रक्तमोक्षण" },
    { value: "nasya", label: "नस्य" },
  ];

  const handleSubmit = () => {
    if (
      !formData.patientName ||
      !formData.patientId ||
      !formData.therapyType ||
      !formData.totalSessions
    ) {
      alert("कृपया सभी आवश्यक फील्ड भरें");
      return;
    }

    const newTreatment = {
      id: Date.now(),
      ...formData,
      totalSessions: parseInt(formData.totalSessions),
      completedSessions: parseInt(formData.completedSessions),
    };
    setTreatments([newTreatment, ...treatments]);
    setFormData({
      patientName: "",
      patientId: "",
      therapyType: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      totalSessions: "",
      completedSessions: 0,
      status: "ongoing",
      remarks: "",
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (confirm("क्या आप इस ट्रीटमेंट को डिलीट करना चाहते हैं?")) {
      setTreatments(treatments.filter((t) => t.id !== id));
    }
  };

  const updateSession = (id, increment) => {
    setTreatments(
      treatments.map((t) => {
        if (t.id === id) {
          const newCompleted = Math.max(
            0,
            Math.min(t.totalSessions, t.completedSessions + increment)
          );
          return {
            ...t,
            completedSessions: newCompleted,
            status: newCompleted === t.totalSessions ? "completed" : t.status,
          };
        }
        return t;
      })
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} className="text-green-600" />;
      case "paused":
        return <Pause size={16} className="text-orange-600" />;
      default:
        return <Clock size={16} className="text-blue-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      ongoing: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      paused: "bg-orange-100 text-orange-700",
    };
    const labels = {
      ongoing: "चल रहा",
      completed: "पूर्ण",
      paused: "रोका गया",
    };
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${styles[status]}`}
      >
        {getStatusIcon(status)}
        {labels[status]}
      </span>
    );
  };

  const filteredTreatments = treatments.filter(
    (t) =>
      t.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProgressPercent = (completed, total) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                पंचकर्म ट्रैकिंग
              </h1>
              <p className="text-gray-600 mt-1">
                थेरेपी सत्र और प्रगति प्रबंधन
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              <Plus size={20} />
              नया ट्रीटमेंट
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="मरीज़ का नाम या ID खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              नया पंचकर्म ट्रीटमेंट
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  मरीज़ का नाम *
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({ ...formData, patientName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  मरीज़ ID *
                </label>
                <input
                  type="text"
                  value={formData.patientId}
                  onChange={(e) =>
                    setFormData({ ...formData, patientId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  थेरेपी प्रकार *
                </label>
                <select
                  value={formData.therapyType}
                  onChange={(e) =>
                    setFormData({ ...formData, therapyType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">चुनें</option>
                  {therapyOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  कुल सत्र *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.totalSessions}
                  onChange={(e) =>
                    setFormData({ ...formData, totalSessions: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  शुरुआत तिथि *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  समाप्ति तिथि
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  टिप्पणी
                </label>
                <textarea
                  rows={2}
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="अतिरिक्त जानकारी..."
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

        {/* Treatments Grid */}
        {filteredTreatments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Activity size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              कोई पंचकर्म ट्रीटमेंट नहीं
            </h3>
            <p className="text-gray-500 mb-4">
              नया ट्रीटमेंट जोड़ने के लिए ऊपर बटन क्लिक करें
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTreatments.map((treatment) => (
              <div
                key={treatment.id}
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <User size={20} className="text-gray-400" />
                    <div>
                      <div className="font-semibold text-gray-800">
                        {treatment.patientName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {treatment.patientId}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(treatment.status)}
                </div>

                <div className="mb-4">
                  <div className="text-lg font-semibold text-green-700 mb-1">
                    {
                      therapyOptions.find(
                        (t) => t.value === treatment.therapyType
                      )?.label
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    शुरुआत:{" "}
                    {new Date(treatment.startDate).toLocaleDateString("hi-IN")}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">प्रगति</span>
                    <span className="font-semibold text-gray-800">
                      {treatment.completedSessions}/{treatment.totalSessions}{" "}
                      सत्र
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${getProgressPercent(treatment.completedSessions, treatment.totalSessions)}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {getProgressPercent(
                      treatment.completedSessions,
                      treatment.totalSessions
                    )}
                    % पूर्ण
                  </div>
                </div>

                {treatment.remarks && (
                  <div className="text-sm text-gray-600 mb-3 p-2 bg-gray-50 rounded">
                    {treatment.remarks}
                  </div>
                )}

                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => updateSession(treatment.id, 1)}
                    disabled={
                      treatment.completedSessions >= treatment.totalSessions
                    }
                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                  >
                    + सत्र
                  </button>
                  <button
                    onClick={() => updateSession(treatment.id, -1)}
                    disabled={treatment.completedSessions <= 0}
                    className="flex-1 bg-orange-600 text-white px-3 py-2 rounded text-sm hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                  >
                    - सत्र
                  </button>
                  <button
                    onClick={() => handleDelete(treatment.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">कुल ट्रीटमेंट</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {treatments.length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">चल रहे</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {treatments.filter((t) => t.status === "ongoing").length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">पूर्ण</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {treatments.filter((t) => t.status === "completed").length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">रोके गए</div>
            <div className="text-2xl font-bold text-orange-600 mt-1">
              {treatments.filter((t) => t.status === "paused").length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
