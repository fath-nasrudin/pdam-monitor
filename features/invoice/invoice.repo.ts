import { prisma } from "@/lib/prisma";
import { BillingPeriod } from "../shared/schema.shared";

export async function getReadingValue({
  userId,
  billingPeriod,
}: {
  userId: string;
  billingPeriod: BillingPeriod;
}) {
  const result = await prisma.reading.findFirst({
    where: {
      userId,
      billingPeriod,
    },
  });
  if (!result) return null;
  return result.readingValue;
}
