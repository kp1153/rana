"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Calendar,
  FileText,
  User,
  Edit,
  Trash2,
  ArrowLeft,
} from "lucide-react";

export default function OPDDashboard() {
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    visitDate: new Date().toISOString().split("T")[0],
    complaints: "",
    diagnosis: "",
    treatment: "",
    notes: "",
    nextVisit: "",
  });

  // Load data from localStorage
  useEffect(() => {
    const savedRecords = localStorage.getItem("opdRecords");
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }

    const savedPatients = localStorage.getItem("patients");
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  // Save records to localStorage
  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem("opdRecords", JSON.stringify(records));
    }
  }, [records]);

  const handlePatientSelect = (e) => {
    const selectedId = e.target.value;

    if (selectedId === "manual") {
      setFormData({
        ...formData,
        patientId: "",
        patientName: "",
      });
    } else if (selectedId) {
      const patient = patients.find((p) => p.id.toString() === selectedId);
      if (patient) {
        setFormData({
          ...formData,
          patientId: patient.id.toString(),
          patientName: patient.name,
        });
      }
    }
  };

  const handleSubmit = () => {
    if (!formData.patientName || !formData.patientId || !formData.complaints) {
      alert("कृपया सभी आवश्यक फील्ड भरें");
      return;
    }

    const newRecord = {
      id: Date.now(),
      ...formData,
    };
    setRecords([newRecord, ...records]);
    setFormData({
      patientName: "",
      patientId: "",
      visitDate: new Date().toISOString().split("T")[0],
      complaints: "",
      diagnosis: "",
      treatment: "",
      notes: "",
      nextVisit: "",
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (confirm("क्या आप इस रिकॉर्ड को डिलीट करना चाहते हैं?")) {
      setRecords(records.filter((r) => r.id !== id));
    }
  };

  const filteredRecords = records.filter(
    (r) =>
      r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  OPD रिकॉर्ड
                </h1>
                <p className="text-gray-600 mt-1">
                  रोगी विज़िट और उपचार प्रबंधन
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              <Plus size={20} />
              नया OPD रिकॉर्ड
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
              नया OPD रिकॉर्ड जोड़ें
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Patient Selection */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  मरीज़ चुनें *
                </label>
                <select
                  onChange={handlePatientSelect}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">-- मरीज़ चुनें --</option>
                  <option value="manual">🖊️ मैन्युअल एंट्री</option>
                  <optgroup label="पंजीकृत मरीज़">
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} - {patient.phone}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

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
                  placeholder="नाम"
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
                  placeholder="ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  विज़िट तिथि *
                </label>
                <input
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) =>
                    setFormData({ ...formData, visitDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  अगली विज़िट
                </label>
                <input
                  type="date"
                  value={formData.nextVisit}
                  onChange={(e) =>
                    setFormData({ ...formData, nextVisit: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  शिकायतें *
                </label>
                <textarea
                  rows={2}
                  value={formData.complaints}
                  onChange={(e) =>
                    setFormData({ ...formData, complaints: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="मरीज़ की मुख्य समस्याएं..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  निदान
                </label>
                <textarea
                  rows={2}
                  value={formData.diagnosis}
                  onChange={(e) =>
                    setFormData({ ...formData, diagnosis: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="रोग का निदान..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  उपचार
                </label>
                <textarea
                  rows={2}
                  value={formData.treatment}
                  onChange={(e) =>
                    setFormData({ ...formData, treatment: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="दवाएं और थेरेपी..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  नोट्स
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
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

        {/* Records Table or Empty State */}
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              कोई OPD रिकॉर्ड नहीं
            </h3>
            <p className="text-gray-500 mb-4">
              नया रिकॉर्ड जोड़ने के लिए ऊपर बटन क्लिक करें
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      तिथि
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      मरीज़
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      शिकायतें
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      निदान
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      उपचार
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      अगली विज़िट
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      एक्शन
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={16} />
                          {new Date(record.visitDate).toLocaleDateString(
                            "hi-IN"
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-800">
                              {record.patientName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {record.patientId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                        {record.complaints}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                        {record.diagnosis || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                        {record.treatment || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {record.nextVisit ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            <Calendar size={12} />
                            {new Date(record.nextVisit).toLocaleDateString(
                              "hi-IN"
                            )}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
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

        {/* Stats Footer */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">आज की विज़िट</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {
                records.filter(
                  (r) => r.visitDate === new Date().toISOString().split("T")[0]
                ).length
              }
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">कुल रिकॉर्ड</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {records.length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">आगामी फॉलो-अप</div>
            <div className="text-2xl font-bold text-orange-600 mt-1">
              {
                records.filter(
                  (r) => r.nextVisit && new Date(r.nextVisit) > new Date()
                ).length
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
