/*
  Warnings:

  - You are about to drop the `CanvasData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CanvasData" DROP CONSTRAINT "CanvasData_roomId_fkey";

-- DropTable
DROP TABLE "CanvasData";

-- CreateTable
CREATE TABLE "Canvas" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Canvas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Canvas_roomId_key" ON "Canvas"("roomId");

-- AddForeignKey
ALTER TABLE "Canvas" ADD CONSTRAINT "Canvas_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
