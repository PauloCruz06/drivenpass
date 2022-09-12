-- CreateTable
CREATE TABLE "WiFis" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "wiFiName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "WiFis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WiFis" ADD CONSTRAINT "WiFis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
