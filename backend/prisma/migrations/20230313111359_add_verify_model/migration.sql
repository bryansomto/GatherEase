-- CreateTable
CREATE TABLE "Verify" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" VARCHAR(32) NOT NULL,

    CONSTRAINT "Verify_pkey" PRIMARY KEY ("id")
);
