"use client";
import React, { useState } from "react";
import {
  Search,
  Plus,
  Receipt,
  Trash2,
  Eye,
  DollarSign,
  CreditCard,
} from "lucide-react";

export default function BillingModule() {
  const [bills, setBills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewBill, setViewBill] = useState(null);
  const [formData, setFormData] = useState({
    billNumber: "",
    patientName: "",
    patientId: "",
    billDate: new Date().toISOString().split("T")[0],
    items: [{ description: "", quantity: 1, rate: 0 }],
    discount: 0,
    paymentStatus: "paid",
    paymentMode: "नकद",
  });

  const generateBillNumber = () => {
    const count = bills.length + 1;
    const date = new Date();
    return `INV${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(count).padStart(4, "0")}`;
  };

  const calculateSubtotal = (items) => {
    return items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  };

  const calculateTotal = (items, discount) => {
    const subtotal = calculateSubtotal(items);
    return subtotal - (subtotal * discount) / 100;
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", quantity: 1, rate: 0 }],
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items:
        newItems.length > 0
          ? newItems
          : [{ description: "", quantity: 1, rate: 0 }],
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] =
      field === "description" ? value : parseFloat(value) || 0;
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = () => {
    if (!formData.patientName || !formData.patientId) {
      alert("कृपया मरीज़ की जानकारी भरें");
      return;
    }

    const hasValidItem = formData.items.some(
      (item) => item.description && item.quantity > 0 && item.rate > 0
    );
    if (!hasValidItem) {
      alert("कृपया कम से कम एक मान्य आइटम जोड़ें");
      return;
    }

    const subtotal = calculateSubtotal(formData.items);
    const total = calculateTotal(formData.items, formData.discount);

    const newBill = {
      id: Date.now(),
      ...formData,
      billNumber: formData.billNumber || generateBillNumber(),
      subtotal,
      total,
      items: formData.items.filter((item) => item.description),
    };

    setBills([newBill, ...bills]);
    setFormData({
      billNumber: "",
      patientName: "",
      patientId: "",
      billDate: new Date().toISOString().split("T")[0],
      items: [{ description: "", quantity: 1, rate: 0 }],
      discount: 0,
      paymentStatus: "paid",
      paymentMode: "नकद",
    });
    setShowForm(false);
  };

  const filteredBills = bills.filter(
    (b) =>
      b.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const styles = {
      paid: "bg-green-100 text-green-700",
      pending: "bg-red-100 text-red-700",
      partial: "bg-orange-100 text-orange-700",
    };
    const labels = {
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">बिलिंग</h1>
              <p className="text-gray-600 mt-1">
                इनवॉइस जनरेशन और भुगतान प्रबंधन
              </p>
            </div>
            <button
              onClick={() => {
                setFormData({
                  billNumber: generateBillNumber(),
                  patientName: "",
                  patientId: "",
                  billDate: new Date().toISOString().split("T")[0],
                  items: [{ description: "", quantity: 1, rate: 0 }],
                  discount: 0,
                  paymentStatus: "paid",
                  paymentMode: "नकद",
                });
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              <Plus size={20} />
              नया बिल बनाएं
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="बिल नंबर, मरीज़ का नाम या ID खोजें..."
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
              नया बिल
            </h2>

            {/* Patient Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  बिल नंबर
                </label>
                <input
                  type="text"
                  value={formData.billNumber}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
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
            </div>

            {/* Items */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-700">आइटम</h3>
                <button
                  onClick={addItem}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  + आइटम जोड़ें
                </button>
              </div>

              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-3 items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="col-span-12 md:col-span-5">
                      <input
                        type="text"
                        placeholder="विवरण (दवा/थेरेपी/परामर्श)"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(index, "description", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <input
                        type="number"
                        min="1"
                        placeholder="मात्रा"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(index, "quantity", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="दर (₹)"
                        value={item.rate}
                        onChange={(e) =>
                          updateItem(index, "rate", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-2 text-right font-semibold text-gray-700">
                      ₹{(item.quantity * item.rate).toFixed(2)}
                    </div>
                    <div className="col-span-1">
                      {formData.items.length > 1 && (
                        <button
                          onClick={() => removeItem(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculation & Payment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    छूट (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discount: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    भुगतान स्थिति
                  </label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentStatus: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="paid">भुगतान हुआ</option>
                    <option value="pending">बाकी</option>
                    <option value="partial">आंशिक</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    भुगतान विधि
                  </label>
                  <select
                    value={formData.paymentMode}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentMode: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="नकद">नकद</option>
                    <option value="UPI">UPI</option>
                    <option value="कार्ड">कार्ड</option>
                    <option value="चेक">चेक</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>उप-योग:</span>
                  <span className="font-semibold">
                    ₹{calculateSubtotal(formData.items).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>छूट ({formData.discount}%):</span>
                  <span className="font-semibold text-red-600">
                    -₹
                    {(
                      (calculateSubtotal(formData.items) * formData.discount) /
                      100
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t-2 border-gray-300">
                  <span>कुल राशि:</span>
                  <span className="text-green-600">
                    ₹
                    {calculateTotal(formData.items, formData.discount).toFixed(
                      2
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                बिल सेव करें
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                रद्द करें
              </button>
            </div>
          </div>
        )}

        {/* Bills Table */}
        {filteredBills.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Receipt size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              कोई बिल नहीं
            </h3>
            <p className="text-gray-500 mb-4">
              नया बिल बनाने के लिए ऊपर बटन क्लिक करें
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      बिल नंबर
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      तिथि
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      मरीज़
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      आइटम
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      राशि
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      भुगतान
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                      एक्शन
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBills.map((bill) => (
                    <tr key={bill.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-sm text-gray-700">
                        {bill.billNumber}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(bill.billDate).toLocaleDateString("hi-IN")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-800">
                          {bill.patientName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {bill.patientId}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {bill.items.length} आइटम
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        ₹{bill.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          {getStatusBadge(bill.paymentStatus)}
                          <div className="text-xs text-gray-500">
                            {bill.paymentMode}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setViewBill(bill)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye size={16} />
                        </button>
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
            <div className="text-sm text-gray-600">कुल बिल</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {bills.length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">कुल राजस्व</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              ₹{bills.reduce((sum, b) => sum + b.total, 0).toFixed(2)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">भुगतान हुआ</div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {bills.filter((b) => b.paymentStatus === "paid").length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600">बाकी</div>
            <div className="text-2xl font-bold text-red-600 mt-1">
              {bills.filter((b) => b.paymentStatus === "pending").length}
            </div>
          </div>
        </div>

        {/* View Bill Modal */}
        {viewBill && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      बिल विवरण
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {viewBill.billNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => setViewBill(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">मरीज़:</span>
                      <div className="font-semibold">
                        {viewBill.patientName}
                      </div>
                      <div className="text-gray-500">{viewBill.patientId}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">तिथि:</span>
                      <div className="font-semibold">
                        {new Date(viewBill.billDate).toLocaleDateString(
                          "hi-IN"
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-3">आइटम विवरण</h3>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-2">विवरण</th>
                        <th className="text-right p-2">मात्रा</th>
                        <th className="text-right p-2">दर</th>
                        <th className="text-right p-2">राशि</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewBill.items.map((item, i) => (
                        <tr key={i} className="border-b">
                          <td className="p-2">{item.description}</td>
                          <td className="text-right p-2">{item.quantity}</td>
                          <td className="text-right p-2">
                            ₹{item.rate.toFixed(2)}
                          </td>
                          <td className="text-right p-2">
                            ₹{(item.quantity * item.rate).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span>उप-योग:</span>
                    <span className="font-semibold">
                      ₹{viewBill.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>छूट ({viewBill.discount}%):</span>
                    <span className="font-semibold">
                      -₹{(viewBill.subtotal - viewBill.total).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t-2">
                    <span>कुल राशि:</span>
                    <span className="text-green-600">
                      ₹{viewBill.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 text-sm">
                    <span>भुगतान:</span>
                    <div className="flex gap-2 items-center">
                      {getStatusBadge(viewBill.paymentStatus)}
                      <span className="text-gray-600">
                        ({viewBill.paymentMode})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
