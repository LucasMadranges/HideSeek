/*
  Warnings:

  - Changed the type of `status` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `Player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('HIDER', 'SEEKER');

-- CreateEnum
CREATE TYPE "StatusPlayer" AS ENUM ('HIDDEN', 'FOUND', 'SEEKING');

-- CreateEnum
CREATE TYPE "StatusGame" AS ENUM ('WAITING', 'IN_PROGRESS', 'FINISHED');

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "status",
ADD COLUMN     "status" "StatusGame" NOT NULL;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusPlayer" NOT NULL;

-- DropEnum
DROP TYPE "Status";
