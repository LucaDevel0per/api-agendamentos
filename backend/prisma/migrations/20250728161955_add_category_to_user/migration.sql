-- CreateEnum
CREATE TYPE "Category" AS ENUM ('BARBEIRO', 'TATUADOR', 'MANICURE', 'CABELEIREIRO');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "category" "Category";
