/*
  Warnings:

  - You are about to drop the column `private` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "private",
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT true;
