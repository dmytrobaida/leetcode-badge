-- CreateTable
CREATE TABLE "BadgeCache" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "BadgeCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BadgeCache_username_key" ON "BadgeCache"("username");
