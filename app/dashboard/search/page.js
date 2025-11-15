"use client";
import React, { useState } from "react";
import {
  Search,
  User,
  Calendar,
  Activity,
  Receipt,
  FileText,
  Phone,
  MapPin,
  X,
} from "lucide-react";

export default function PatientSearchModule() {
  const [patients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mobile.includes(searchTerm)
  );

  const getStatusBadge = (status) => {
    const styles = {
      ongoing: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      paused: "bg-orange-100 text-orange-700",
      paid: "bg-green-100 text-green-700",
      pending: "bg-red-100 text-red-700",
      partial: "bg-orange-100 text-orange-700",
    };
    const labels = {
      ongoing: "चल रहा",
      completed: "पूर्ण",
      paused: "रोका गया",
      paid: "भुगतान हुआ",
      pending: "बाकी",
      partial: "आंशिक",
    };
    return (
      <span
        className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">मरीज़ खोजें</h1>
          <p className="text-gray-600 mt-1">
            मरीज़ की पूरी जानकारी और इतिहास देखें
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="नाम, मरीज़ ID या मोबाइल नंबर से खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => {
                      setSelectedPatient(patient);
                      setActiveTab("overview");
                    }}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-full">
                          <User size={24} className="text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {patient.name}
                          </h3>
                          <div className="text-sm text-gray-600 flex gap-3 mt-1">
                            <span>{patient.patientId}</span>
                            <span>•</span>
                            <span>{patient.age} वर्ष</span>
                            <span>•</span>
                            <span>{patient.mobile}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>{patient.opdRecords?.length || 0} OPD विज़िट</div>
                        <div>{patient.panchakarma?.length || 0} थेरेपी</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <User size={48} className="mx-auto mb-2 text-gray-300" />
                  <p>कोई मरीज़ नहीं मिला</p>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!searchTerm && (
            <div className="text-center py-12 text-gray-500">
              <Search size={64} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                मरीज़ खोजें
              </h3>
              <p>ऊपर सर्च बार में नाम, ID या मोबाइल नंबर डालें</p>
            </div>
          )}
        </div>

        {/* Patient Details */}
        {selectedPatient && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Patient Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-4 rounded-full">
                    <User size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedPatient.name}
                    </h2>
                    <div className="flex gap-4 mt-2 text-green-100">
                      <span>{selectedPatient.patientId}</span>
                      <span>•</span>
                      <span>{selectedPatient.age} वर्ष</span>
                      <span>•</span>
                      <span>
                        {selectedPatient.gender === "male" ? "पुरुष" : "महिला"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-green-100">
                      <div className="flex items-center gap-1">
                        <Phone size={14} />
                        {selectedPatient.mobile}
                      </div>
                      {selectedPatient.address && (
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {selectedPatient.address}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex gap-1 px-6">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-3 font-medium transition ${
                    activeTab === "overview"
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  सारांश
                </button>
                <button
                  onClick={() => setActiveTab("opd")}
                  className={`px-4 py-3 font-medium transition ${
                    activeTab === "opd"
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  OPD रिकॉर्ड ({selectedPatient.opdRecords?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab("panchakarma")}
                  className={`px-4 py-3 font-medium transition ${
                    activeTab === "panchakarma"
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  पंचकर्म ({selectedPatient.panchakarma?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab("bills")}
                  className={`px-4 py-3 font-medium transition ${
                    activeTab === "bills"
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  बिलिंग ({selectedPatient.bills?.length || 0})
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="text-blue-600" size={20} />
                        <h3 className="font-semibold text-gray-800">
                          OPD विज़िट
                        </h3>
                      </div>
                      <div className="text-3xl font-bold text-blue-600">
                        {selectedPatient.opdRecords?.length || 0}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">कुल विज़िट</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Activity className="text-green-600" size={20} />
                        <h3 className="font-semibold text-gray-800">पंचकर्म</h3>
                      </div>
                      <div className="text-3xl font-bold text-green-600">
                        {selectedPatient.panchakarma?.length || 0}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">थेरेपी सत्र</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <Receipt className="text-purple-600" size={20} />
                        <h3 className="font-semibold text-gray-800">
                          कुल खर्च
                        </h3>
                      </div>
                      <div className="text-3xl font-bold text-purple-600">
                        ₹
                        {selectedPatient.bills
                          ?.reduce((sum, b) => sum + b.total, 0)
                          .toLocaleString() || 0}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedPatient.bills?.length || 0} बिल
                      </p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  {selectedPatient.opdRecords &&
                  selectedPatient.opdRecords.length > 0 ? (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Calendar size={20} />
                        हाल की गतिविधि
                      </h3>
                      <div className="space-y-3">
                        {selectedPatient.opdRecords
                          .slice(0, 3)
                          .map((record) => (
                            <div
                              key={record.id}
                              className="border-l-4 border-blue-500 pl-4 py-2"
                            >
                              <div className="text-sm text-gray-500">
                                {new Date(record.visitDate).toLocaleDateString(
                                  "hi-IN"
                                )}
                              </div>
                              <div className="font-medium text-gray-800">
                                {record.complaints}
                              </div>
                              <div className="text-sm text-gray-600">
                                उपचार: {record.treatment}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar
                        size={48}
                        className="mx-auto mb-2 text-gray-300"
                      />
                      <p>कोई गतिविधि नहीं</p>
                    </div>
                  )}
                </div>
              )}

              {/* OPD Tab */}
              {activeTab === "opd" && (
                <div className="space-y-4">
                  {selectedPatient.opdRecords &&
                  selectedPatient.opdRecords.length > 0 ? (
                    selectedPatient.opdRecords.map((record) => (
                      <div
                        key={record.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="text-gray-400" size={16} />
                            <span className="font-semibold text-gray-700">
                              {new Date(record.visitDate).toLocaleDateString(
                                "hi-IN"
                              )}
                            </span>
                          </div>
                          {record.nextVisit && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              अगली विज़िट:{" "}
                              {new Date(record.nextVisit).toLocaleDateString(
                                "hi-IN"
                              )}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">
                              शिकायतें:{" "}
                            </span>
                            <span className="text-gray-600">
                              {record.complaints}
                            </span>
                          </div>
                          {record.diagnosis && (
                            <div>
                              <span className="font-medium text-gray-700">
                                निदान:{" "}
                              </span>
                              <span className="text-gray-600">
                                {record.diagnosis}
                              </span>
                            </div>
                          )}
                          {record.treatment && (
                            <div>
                              <span className="font-medium text-gray-700">
                                उपचार:{" "}
                              </span>
                              <span className="text-gray-600">
                                {record.treatment}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FileText
                        size={48}
                        className="mx-auto mb-2 text-gray-300"
                      />
                      <p>कोई OPD रिकॉर्ड नहीं</p>
                    </div>
                  )}
                </div>
              )}

              {/* Panchakarma Tab */}
              {activeTab === "panchakarma" && (
                <div className="space-y-4">
                  {selectedPatient.panchakarma &&
                  selectedPatient.panchakarma.length > 0 ? (
                    selectedPatient.panchakarma.map((therapy) => (
                      <div
                        key={therapy.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg">
                              {therapy.therapyType}
                            </h3>
                            <p className="text-sm text-gray-600">
                              शुरुआत:{" "}
                              {new Date(therapy.startDate).toLocaleDateString(
                                "hi-IN"
                              )}
                            </p>
                          </div>
                          {getStatusBadge(therapy.status)}
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">प्रगति</span>
                            <span className="font-semibold">
                              {therapy.completedSessions}/
                              {therapy.totalSessions} सत्र
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all"
                              style={{
                                width: `${(therapy.completedSessions / therapy.totalSessions) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Activity
                        size={48}
                        className="mx-auto mb-2 text-gray-300"
                      />
                      <p>कोई पंचकर्म थेरेपी नहीं</p>
                    </div>
                  )}
                </div>
              )}

              {/* Bills Tab */}
              {activeTab === "bills" && (
                <div className="space-y-4">
                  {selectedPatient.bills && selectedPatient.bills.length > 0 ? (
                    <>
                      {selectedPatient.bills.map((bill) => (
                        <div
                          key={bill.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-mono font-semibold text-gray-800">
                                {bill.billNumber}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {new Date(bill.billDate).toLocaleDateString(
                                  "hi-IN"
                                )}
                              </p>
                            </div>
                            {getStatusBadge(bill.paymentStatus)}
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                              {bill.items} आइटम
                            </div>
                            <div className="text-xl font-bold text-green-600">
                              ₹{bill.total.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="bg-gray-50 p-4 rounded-lg mt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700">
                            कुल राशि:
                          </span>
                          <span className="text-2xl font-bold text-green-600">
                            ₹
                            {selectedPatient.bills
                              .reduce((sum, b) => sum + b.total, 0)
                              .toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-sm">
                          <span className="text-gray-600">भुगतान हुआ:</span>
                          <span className="font-semibold text-green-600">
                            {
                              selectedPatient.bills.filter(
                                (b) => b.paymentStatus === "paid"
                              ).length
                            }{" "}
                            बिल
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1 text-sm">
                          <span className="text-gray-600">बाकी:</span>
                          <span className="font-semibold text-red-600">
                            {
                              selectedPatient.bills.filter(
                                (b) => b.paymentStatus === "pending"
                              ).length
                            }{" "}
                            बिल
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Receipt
                        size={48}
                        className="mx-auto mb-2 text-gray-300"
                      />
                      <p>कोई बिल नहीं</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
