/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Organizer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Organizer_phone_key" ON "Organizer"("phone");
