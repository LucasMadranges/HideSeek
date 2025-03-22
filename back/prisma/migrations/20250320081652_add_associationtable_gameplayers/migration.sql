/*
  Warnings:

  - You are about to drop the column `gameId` on the `Players` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Players" DROP CONSTRAINT "Players_gameId_fkey";

-- AlterTable
ALTER TABLE "Players" DROP COLUMN "gameId";

-- CreateTable
CREATE TABLE "GamePlayers" (
    "gameId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,

    CONSTRAINT "GamePlayers_pkey" PRIMARY KEY ("gameId","playerId")
);

-- AddForeignKey
ALTER TABLE "GamePlayers" ADD CONSTRAINT "GamePlayers_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlayers" ADD CONSTRAINT "GamePlayers_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
