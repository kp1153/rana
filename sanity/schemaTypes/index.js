// schemas/index.js
export const schema = {
  types: [
    // 1. Patient Schema
    {
      name: "patient",
      title: "मरीज़",
      type: "document",
      fields: [
        {
          name: "patientId",
          title: "मरीज़ ID",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "name",
          title: "नाम",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "age",
          title: "उम्र",
          type: "number",
          validation: (Rule) => Rule.required().min(0).max(150),
        },
        {
          name: "gender",
          title: "लिंग",
          type: "string",
          options: {
            list: [
              { title: "पुरुष", value: "male" },
              { title: "महिला", value: "female" },
              { title: "अन्य", value: "other" },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "mobile",
          title: "मोबाइल",
          type: "string",
          validation: (Rule) => Rule.required().length(10),
        },
        {
          name: "address",
          title: "पता",
          type: "text",
        },
        {
          name: "registrationDate",
          title: "रजिस्ट्रेशन तिथि",
          type: "datetime",
          initialValue: () => new Date().toISOString(),
        },
      ],
    },

    // 2. OPD Record Schema
    {
      name: "opd",
      title: "OPD रिकॉर्ड",
      type: "document",
      fields: [
        {
          name: "patient",
          title: "मरीज़",
          type: "reference",
          to: [{ type: "patient" }],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "visitDate",
          title: "विज़िट तिथि",
          type: "datetime",
          initialValue: () => new Date().toISOString(),
          validation: (Rule) => Rule.required(),
        },
        {
          name: "complaints",
          title: "शिकायतें",
          type: "text",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "diagnosis",
          title: "निदान",
          type: "text",
        },
        {
          name: "treatment",
          title: "उपचार",
          type: "text",
        },
        {
          name: "notes",
          title: "नोट्स",
          type: "text",
        },
        {
          name: "nextVisit",
          title: "अगली विज़िट",
          type: "date",
        },
      ],
    },

    // 3. Panchakarma Tracking Schema
    {
      name: "panchakarma",
      title: "पंचकर्म",
      type: "document",
      fields: [
        {
          name: "patient",
          title: "मरीज़",
          type: "reference",
          to: [{ type: "patient" }],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "therapyType",
          title: "थेरेपी प्रकार",
          type: "string",
          options: {
            list: [
              { title: "अभ्यंग", value: "abhyang" },
              { title: "स्वेदन", value: "swedan" },
              { title: "वमन", value: "vaman" },
              { title: "विरेचन", value: "virechan" },
              { title: "बस्ति", value: "basti" },
              { title: "रक्तमोक्षण", value: "raktmokshan" },
              { title: "नस्य", value: "nasya" },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "startDate",
          title: "शुरुआत तिथि",
          type: "date",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "endDate",
          title: "समाप्ति तिथि",
          type: "date",
        },
        {
          name: "totalSessions",
          title: "कुल सत्र",
          type: "number",
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: "completedSessions",
          title: "पूर्ण सत्र",
          type: "number",
          initialValue: 0,
          validation: (Rule) => Rule.min(0),
        },
        {
          name: "status",
          title: "स्थिति",
          type: "string",
          options: {
            list: [
              { title: "चल रहा", value: "ongoing" },
              { title: "पूर्ण", value: "completed" },
              { title: "रोका गया", value: "paused" },
            ],
          },
          initialValue: "ongoing",
        },
        {
          name: "remarks",
          title: "टिप्पणी",
          type: "text",
        },
      ],
    },

    // 4. Medicine Stock Schema
    {
      name: "medicine",
      title: "दवा स्टॉक",
      type: "document",
      fields: [
        {
          name: "name",
          title: "दवा का नाम",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "category",
          title: "श्रेणी",
          type: "string",
          options: {
            list: [
              { title: "वटी/गोली", value: "tablet" },
              { title: "चूर्ण", value: "powder" },
              { title: "रस/सिरप", value: "syrup" },
              { title: "तेल", value: "oil" },
              { title: "काढ़ा", value: "kadha" },
              { title: "अन्य", value: "other" },
            ],
          },
        },
        {
          name: "quantity",
          title: "मात्रा",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: "unit",
          title: "इकाई",
          type: "string",
          options: {
            list: ["पीस", "ग्राम", "मिली", "बोतल", "पैकेट"],
          },
        },
        {
          name: "price",
          title: "मूल्य (₹)",
          type: "number",
          validation: (Rule) => Rule.min(0),
        },
        {
          name: "expiryDate",
          title: "एक्सपायरी",
          type: "date",
        },
        {
          name: "reorderLevel",
          title: "री-ऑर्डर स्तर",
          type: "number",
          description: "जब स्टॉक इससे कम हो तो अलर्ट",
        },
      ],
    },

    // 5. Billing Schema
    {
      name: "billing",
      title: "बिलिंग",
      type: "document",
      fields: [
        {
          name: "billNumber",
          title: "बिल नंबर",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "patient",
          title: "मरीज़",
          type: "reference",
          to: [{ type: "patient" }],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "billDate",
          title: "बिल तिथि",
          type: "datetime",
          initialValue: () => new Date().toISOString(),
          validation: (Rule) => Rule.required(),
        },
        {
          name: "items",
          title: "आइटम",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "description",
                  title: "विवरण",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "quantity",
                  title: "मात्रा",
                  type: "number",
                  validation: (Rule) => Rule.required().min(1),
                },
                {
                  name: "rate",
                  title: "दर (₹)",
                  type: "number",
                  validation: (Rule) => Rule.required().min(0),
                },
                {
                  name: "amount",
                  title: "राशि (₹)",
                  type: "number",
                  readOnly: true,
                },
              ],
            },
          ],
        },
        {
          name: "subtotal",
          title: "उप-योग",
          type: "number",
          readOnly: true,
        },
        {
          name: "discount",
          title: "छूट (%)",
          type: "number",
          initialValue: 0,
          validation: (Rule) => Rule.min(0).max(100),
        },
        {
          name: "total",
          title: "कुल राशि (₹)",
          type: "number",
          readOnly: true,
        },
        {
          name: "paymentStatus",
          title: "भुगतान स्थिति",
          type: "string",
          options: {
            list: [
              { title: "भुगतान हुआ", value: "paid" },
              { title: "बाकी", value: "pending" },
              { title: "आंशिक", value: "partial" },
            ],
          },
          initialValue: "paid",
        },
        {
          name: "paymentMode",
          title: "भुगतान विधि",
          type: "string",
          options: {
            list: ["नकद", "UPI", "कार्ड", "चेक"],
          },
        },
      ],
    },
  ],
};
