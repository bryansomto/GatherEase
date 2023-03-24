-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageUrl" TEXT NOT NULL,
    "tag" VARCHAR(128) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
