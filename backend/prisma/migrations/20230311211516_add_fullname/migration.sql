/*
  Warnings:

  - Added the required column `fullName` to the `Organizer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organizer" ADD COLUMN     "fullName" VARCHAR(80) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fullName" VARCHAR(80) NOT NULL;
