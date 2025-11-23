-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('sent', 'draft');

-- CreateTable
CREATE TABLE "Reading" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "billingPeriod" TEXT NOT NULL,
    "readingValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "billingPeriod" TEXT NOT NULL,
    "totalUsage" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "totalPaid" INTEGER NOT NULL,
    "documentStatus" "DocumentStatus" NOT NULL,
    "pricingFixed" INTEGER NOT NULL,
    "pricingTariff" INTEGER NOT NULL,
    "pricingDiscountAmount" INTEGER,
    "pricingDiscountPercent" INTEGER,
    "readingPrev" INTEGER NOT NULL,
    "readingCurr" INTEGER NOT NULL,
    "readingDiscountAmount" INTEGER,
    "readingDiscountPercent" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reading_userId_billingPeriod_key" ON "Reading"("userId", "billingPeriod");

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
