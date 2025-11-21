import { BillingPeriod } from "./schema.shared";

export function translatePeriodToText(period: BillingPeriod): string {
  const [year, month] = period.split("-").map(Number);

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const name = monthNames[month - 1];
  return `${name} ${year}`;
}
