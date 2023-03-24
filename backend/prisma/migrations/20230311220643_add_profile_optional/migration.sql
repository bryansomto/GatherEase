/*
  Warnings:

  - A unique constraint covering the columns `[organizerId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizerId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Organizer" DROP CONSTRAINT "Organizer_profileId_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "organizerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_organizerId_key" ON "Profile"("organizerId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
