import { Reading, User } from "@/lib/generated/prisma/client";
import { prisma } from "../lib/prisma"; // pastikan import path sesuai

const users = [
  "dadang",
  "diding",
  "dudung",
  "dedeng",
  "dodong",
  "yayan",
  "yiyin",
  "yuyun",
  "yeyen",
  "yoyon",
];

function generateBillingPeriods(start: string, end?: string): string[] {
  const periods: string[] = [];

  // Parse start
  const [startYear, startMonth] = start.split("-").map(Number);

  // Parse end, default ke bulan sekarang
  let endYear: number, endMonth: number;
  if (end) {
    [endYear, endMonth] = end.split("-").map(Number);
  } else {
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1; // getMonth() 0-based
  }

  for (let year = startYear; year <= endYear; year++) {
    const monthStart = year === startYear ? startMonth : 1;
    const monthEnd = year === endYear ? endMonth : 12;

    for (let month = monthStart; month <= monthEnd; month++) {
      const mm = month.toString().padStart(2, "0");
      periods.push(`${year}-${mm}`);
    }
  }

  return periods;
}
const billingPeriods = generateBillingPeriods("2024-06", "2025-5");

function generateNextReading(prev: number): number {
  return prev + Math.floor(Math.random() * 101); // 0–100 kenaikan
}

async function main() {
  // Upsert semua user
  const userPromises: Promise<User>[] = users.map((username) =>
    prisma.user.upsert({
      where: { username },
      update: {},
      create: { username },
    })
  );

  const userResults: User[] = await Promise.all(userPromises);

  const readingPromises: Promise<Reading>[] = [];

  for (const user of userResults) {
    let prevReading = Math.floor(Math.random() * 1000); // bulan pertama random 0–999

    for (const period of billingPeriods) {
      const readingValue = prevReading;

      readingPromises.push(
        prisma.reading.upsert({
          where: {
            userId_billingPeriod: {
              userId: user.id,
              billingPeriod: period,
            },
          },
          update: { readingValue },
          create: {
            userId: user.id,
            billingPeriod: period,
            readingValue,
          },
        })
      );

      prevReading = generateNextReading(prevReading);
    }
  }

  await Promise.all(readingPromises);
}

main()
  .then(async () => {
    console.log("Seed selesai dengan reading berkelanjutan!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
