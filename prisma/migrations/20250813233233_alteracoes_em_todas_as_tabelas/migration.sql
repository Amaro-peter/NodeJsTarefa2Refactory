/*
  Warnings:

  - You are about to drop the column `URLImagem` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `diretor` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `sinopse` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `CPFOcupante` on the `seats` table. All the data in the column will be lost.
  - You are about to drop the column `bairro` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `sessions` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "classificacao" TEXT NOT NULL
);
INSERT INTO "new_movies" ("classificacao", "genero", "id", "titulo") SELECT "classificacao", "genero", "id", "titulo" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
CREATE TABLE "new_seats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" INTEGER NOT NULL,
    "fileira" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "nomeOcupante" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    CONSTRAINT "seats_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_seats" ("fileira", "id", "nomeOcupante", "numero", "preco", "sessionId") SELECT "fileira", "id", "nomeOcupante", "numero", "preco", "sessionId" FROM "seats";
DROP TABLE "seats";
ALTER TABLE "new_seats" RENAME TO "seats";
CREATE TABLE "new_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "horario" TEXT NOT NULL,
    "filmeId" TEXT NOT NULL,
    CONSTRAINT "sessions_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "movies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sessions" ("filmeId", "horario", "id") SELECT "filmeId", "horario", "id" FROM "sessions";
DROP TABLE "sessions";
ALTER TABLE "new_sessions" RENAME TO "sessions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
