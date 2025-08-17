/*
  Warnings:

  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Movie";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Seat";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Session";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "URLImagem" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "classificacao" TEXT NOT NULL,
    "diretor" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT '0',
    "horario" TEXT NOT NULL,
    "filmeId" TEXT NOT NULL,
    CONSTRAINT "sessions_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "movies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "seats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" INTEGER NOT NULL,
    "fileira" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "CPFOcupante" TEXT NOT NULL,
    "nomeOcupante" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    CONSTRAINT "seats_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
