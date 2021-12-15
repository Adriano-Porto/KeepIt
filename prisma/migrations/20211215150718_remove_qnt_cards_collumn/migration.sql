/*
  Warnings:

  - You are about to drop the column `qnt_cards` on the `decks` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_decks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "decks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_decks" ("id", "name", "user_id") SELECT "id", "name", "user_id" FROM "decks";
DROP TABLE "decks";
ALTER TABLE "new_decks" RENAME TO "decks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
