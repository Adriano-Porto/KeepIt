/*
  Warnings:

  - You are about to drop the `Attempt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Attempt";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Card";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "current_state" INTEGER NOT NULL,
    "last_time" DATETIME NOT NULL,
    "next_time" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "deck_id" TEXT NOT NULL,
    CONSTRAINT "cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cards_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "decks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "attempts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "corret" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "deck_id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    CONSTRAINT "attempts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "attempts_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "decks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "attempts_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
