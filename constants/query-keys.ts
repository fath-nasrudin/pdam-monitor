export const queryKeys = {
  users: {
    all: ["users"] as const,
    list: (filters?: unknown) => ["users", filters] as const,
    id: (id: string) => ["invoices", id] as const,
  },

  invoices: {
    all: ["invoices"] as const,
    list: (filters?: unknown) => ["invoices", filters] as const,
    detail: (id: string) => ["invoices", id] as const,
  },

  readings: {
    all: ["readings"] as const,
    list: (filters?: unknown) => ["readings", filters] as const,
    detail: (id: string) => ["readings", id] as const,
  },

  payments: {
    all: ["payments"] as const,
    list: (filters?: unknown) => ["payments", filters] as const,
    detail: (id: string) => ["payments", id] as const,
  },
};
