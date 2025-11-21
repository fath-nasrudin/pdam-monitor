import { Invoice } from "@/features/invoice/invoice.type";

export const invoices: Invoice[] = [
  {
    id: "inv-001",
    userId: "user-01",
    billingPeriod: "2025-01",
    totalUsage: 120,
    totalAmount: 145000,
    totalPaid: 145000,
    paymentStatus: "paid",
    documentStatus: "sent",
    pricing: {
      fixed: 50000,
      tariff: 800,
      discountAmount: 10000,
    },
    reading: {
      prev: 1000,
      curr: 1120,
    },
    paymentAllocation: [{ id: "pay-001", allocated: 145000 }],
  },

  {
    id: "inv-002",
    userId: "user-01",
    billingPeriod: "2025-02",
    totalUsage: 95,
    totalAmount: 124000,
    totalPaid: 60000,
    paymentStatus: "partial",
    documentStatus: "sent",
    pricing: {
      fixed: 50000,
      tariff: 800,
    },
    reading: {
      prev: 1120,
      curr: 1215,
      discountPercentage: 5,
    },
    paymentAllocation: [{ id: "pay-002", allocated: 60000 }],
  },

  {
    id: "inv-003",
    userId: "user-02",
    billingPeriod: "2025-01",
    totalUsage: 180,
    totalAmount: 190000,
    totalPaid: 0,
    paymentStatus: "unpaid",
    documentStatus: "draft",
    pricing: {
      fixed: 60000,
      tariff: 750,
    },
    reading: {
      prev: 500,
      curr: 680,
    },
    paymentAllocation: [],
  },

  {
    id: "inv-004",
    userId: "user-02",
    billingPeriod: "2025-02",
    totalUsage: 0,
    totalAmount: 0,
    totalPaid: 0,
    paymentStatus: "waiped",
    documentStatus: "sent",
    pricing: {
      fixed: 60000,
      tariff: 750,
      discountPercentage: 100,
    },
    reading: {
      prev: 680,
      curr: 680,
      discountPercentage: 100,
    },
    paymentAllocation: [],
  },

  {
    id: "inv-005",
    userId: "user-03",
    billingPeriod: "2025-03",
    totalUsage: 210,
    totalAmount: 240000,
    totalPaid: 200000,
    paymentStatus: "partial",
    documentStatus: "draft",
    pricing: {
      fixed: 55000,
      tariff: 880,
    },
    reading: {
      prev: 300,
      curr: 510,
    },
    paymentAllocation: [
      { id: "pay-010", allocated: 150000 },
      { id: "pay-011", allocated: 50000 },
    ],
  },
];

export async function GET() {
  try {
    return Response.json({
      ok: true,
      message: "success",
      data: invoices,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      ok: false,
      message: "failed",
    });
  }
}
