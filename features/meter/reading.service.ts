import { prisma } from "@/lib/prisma";
import { AddReadingsInput } from "./reading.schema";

export type UserReading = {
  userId: string;
  name: string;
  readings: Record<string, number | null>; // key: YYYY-MM
};

function generateYearMonths(year: number): string[] {
  return Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, "0");
    return `${year}-${month}`;
  });
}

export async function getUserReadings(year: number): Promise<UserReading[]> {
  const months = generateYearMonths(year);

  // ambil user + readings di tahun tersebut
  const users = await prisma.user.findMany({
    include: {
      readings: {
        where: {
          billingPeriod: {
            gte: `${year}-01`,
            lte: `${year}-12`,
          },
        },
      },
    },
  });

  // mapping ke bentuk output
  return users.map((user) => {
    // buat object semua bulan default null
    const readings: Record<string, number | null> = {};
    months.forEach((m) => (readings[m] = null));

    // isi yang ada di DB
    user.readings.forEach((r) => {
      readings[r.billingPeriod] = r.readingValue;
    });

    return {
      userId: user.id,
      name: user.username,
      readings,
    };
  });
}

export async function addReadingsBulk(input: AddReadingsInput) {
  const dataToInsert = input.readings.map((r) => ({
    userId: r.userId,
    billingPeriod: input.billingPeriod,
    readingValue: r.readingValue,
  }));

  await prisma.reading.createMany({
    data: dataToInsert,
    skipDuplicates: true, // kalau sudah ada, tidak diinsert ulang
  });

  return { success: true, count: dataToInsert.length };
}
