/*
  Warnings:

  - A unique constraint covering the columns `[userId,billingPeriod]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invoice_userId_billingPeriod_key" ON "Invoice"("userId", "billingPeriod");
