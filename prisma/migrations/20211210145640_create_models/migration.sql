-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "decks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "qnt_cards" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "decks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Card" (
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
    CONSTRAINT "Card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "decks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "corret" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "deck_id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    CONSTRAINT "Attempt_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Attempt_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "decks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Attempt_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
