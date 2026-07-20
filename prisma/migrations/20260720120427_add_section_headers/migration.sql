-- CreateTable
CREATE TABLE "SectionHeader" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,

    CONSTRAINT "SectionHeader_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionHeader_key_key" ON "SectionHeader"("key");
