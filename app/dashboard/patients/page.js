"use client";
import React, { useState } from "react";
import {
  Search,
  Plus,
  User,
  Edit,
  Trash2,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

export default function PatientRegistration() {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
    registrationDate: new Date().toISOString().split("T")[0],
  });

  const generatePatientId = () => {
    const count = patients.length + 1;
    return `P${String(count).padStart(4, "0")}`;
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.age ||
      !formData.gender ||
      !formData.mobile
    ) {
      alert("कृपया सभी आवश्यक फील्ड भरें");
      return;
    }

    if (formData.mobile.length !== 10) {
      alert("मोबाइल नंबर 10 अंकों का होना चाहिए");
      return;
    }

    if (editingId) {
      setPatients(
        patients.map((p) =>
          p.id === editingId ? { ...formData, id: editingId } : p
        )
      );
      setEditingId(null);
    } else {
      const newPatient = {
        id: Date.now(),
        ...formData,
        patientId: formData.patientId || generatePatientId(),
        age: parseInt(formData.age),
      };
      setPatients([newPatient, ...patients]);
    }

    setFormData({
      patientId: "",
      name: "",
      age: "",
      gender: "",
      mobile: "",
      address: "",
      registrationDate: new Date().toISOString().split("T")[0],
    });
    setShowForm(false);
  };

  const handleEdit = (patient) => {
    setFormData(patient);
    setEditingId(patient.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("क्या आप इस मरीज़ को डिलीट करना चाहते हैं?")) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  const cancelEdit = () => {
    setFormData({
      patientId: "",
      name: "",
      age: "",
      gender: "",
      mobile: "",
      address: "",
      registrationDate: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mobile.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                मरीज़ रजिस्ट्रेशन
              </h1>
              <p className="text-gray-600 mt-1">
                नए मरीज़ का पंजीकरण और प्रबंधन
              </p>
            </div>
            <button
              onClick={() => {
                if (!showForm) {
                  setFormData({
                    patientId: generatePatientId(),
                    name: "",
                    age: "",
                    gender: "",
                    mobile: "",
                    address: "",
                    registrationDate: new Date().toISOString().split("T")[0],
                  });
                }
                setShowForm(!showForm);
              }}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              <Plus size={20} />
              नया मरीज़ जोड़ें
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="नाम, मरीज़ ID या मोबाइल नंबर खोजें..."
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
              {editingId
                ? "मरीज़ की जानकारी अपडेट करें"
                : "नया मरीज़ रजिस्टर करें"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  मरीज़ ID
                </label>
                <input
                  type="text"
                  value={formData.patientId}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  पंजीकरण तिथि
                </label>
                <input
                  type="date"
                  value={formData.registrationDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationDate: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  नाम *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="मरीज़ का पूरा नाम"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  उम्र *
                </label>
                <input
                  type="number"
                  min="0"
                  max="150"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  placeholder="वर्षों में"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  लिंग *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">चुनें</option>
                  <option value="male">पुरुष</option>
                  <option value="female">महिला</option>
                  <option value="other">अन्य</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  मोबाइल नंबर *
                </label>
                <input
                  type="tel"
                  maxLength="10"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mobile: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  placeholder="10 अंकों का मोबाइल नंबर"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  पता
                </label>
                <textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="पूरा पता दर्ज करें..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2 flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  {editingId ? "अपडेट करें" : "रजिस्टर करें"}
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  रद्द करें
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Patients List */}
        {filteredPatients.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <User size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              कोई मरीज़ रजिस्टर नहीं
            </h3>
            <p className="text-gray-500 mb-4">
              नया मरीज़ जोड़ने के लिए ऊपर बटन क्लिक करें
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <User size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {patient.patientId}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} className="text-gray-400" />
                    <span>{patient.age} वर्ष</span>
                    <span className="text-gray-400">•</span>
                    <span>
                      {patient.gender === "male"
                        ? "पुरुष"
                        : patient.gender === "female"
                          ? "महिला"
                          : "अन्य"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={16} className="text-gray-400" />
                    <span>{patient.mobile}</span>
                  </div>

                  {patient.address && (
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin
                        size={16}
                        className="text-gray-400 flex-shrink-0 mt-0.5"
                      />
                      <span className="line-clamp-2">{patient.address}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-500 pt-2 border-t border-gray-100">
                    <Calendar size={16} className="text-gray-400" />
                    <span>
                      रजिस्ट्रेशन:{" "}
                      {new Date(patient.registrationDate).toLocaleDateString(
                        "hi-IN"
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(patient)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition"
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
            <div className="text-sm text-gray-600">कुल मरीज़</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {patients.length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">पुरुष</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {patients.filter((p) => p.gender === "male").length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">महिला</div>
            <div className="text-2xl font-bold text-pink-600 mt-1">
              {patients.filter((p) => p.gender === "female").length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">आज रजिस्टर</div>
            <div className="text-2xl font-bold text-orange-600 mt-1">
              {
                patients.filter(
                  (p) =>
                    p.registrationDate ===
                    new Date().toISOString().split("T")[0]
                ).length
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
