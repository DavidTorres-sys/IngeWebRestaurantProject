/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `provider_account_id` on the `Account` table. All the data in the column will be lost.
  - Added the required column `providerAccountId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "provider_account_id",
ADD COLUMN     "providerAccountId" TEXT NOT NULL,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("provider", "providerAccountId");
