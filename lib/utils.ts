import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// use for testing suspense
export function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function formatRupiah(value: number | string) {
  const num = typeof value === "string" ? Number(value) : value;
  if (isNaN(num)) return "Rp 0";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
}

export function toBillingPeriodYYYYMM(date: Date | number | string) {
  const d =
    typeof date === "number"
      ? new Date(date)
      : typeof date === "string"
      ? new Date(date)
      : date;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

export function getPrevBillingPeriod(
  date: Date | number | string = new Date()
) {
  const d =
    typeof date === "number"
      ? new Date(date)
      : typeof date === "string"
      ? new Date(date)
      : date;

  let year = d.getFullYear();
  let month = d.getMonth() + 1; // 1–12

  month -= 1; // mundur satu bulan

  if (month === 0) {
    month = 12;
    year -= 1;
  }

  return `${year}-${String(month).padStart(2, "0")}`;
}
