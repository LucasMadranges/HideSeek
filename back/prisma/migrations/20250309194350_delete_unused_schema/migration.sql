/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlayerGames` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerGames" DROP CONSTRAINT "_PlayerGames_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerGames" DROP CONSTRAINT "_PlayerGames_B_fkey";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "Player";

-- DropTable
DROP TABLE "_PlayerGames";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "StatusGame";

-- DropEnum
DROP TYPE "StatusPlayer";
