/*
  Warnings:

  - You are about to drop the column `corret` on the `attempts` table. All the data in the column will be lost.
  - Added the required column `correct` to the `attempts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_attempts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "correct" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "deck_id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    CONSTRAINT "attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "attempts_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "decks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "attempts_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_attempts" ("card_id", "created_at", "deck_id", "id", "user_id") SELECT "card_id", "created_at", "deck_id", "id", "user_id" FROM "attempts";
DROP TABLE "attempts";
ALTER TABLE "new_attempts" RENAME TO "attempts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
