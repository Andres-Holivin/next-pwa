-- CreateTable
CREATE TABLE "Patient" (
    "no_registration" BIGINT NOT NULL PRIMARY KEY,
    "no_rm" TEXT NOT NULL,
    "nama_pasien" TEXT NOT NULL,
    "tgl_lahir" DATETIME NOT NULL,
    "kelas" TEXT NOT NULL,
    "ruang" TEXT NOT NULL,
    "no_bed" INTEGER NOT NULL,
    "no_handphone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patinet_id" BIGINT NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Cart_patinet_id_fkey" FOREIGN KEY ("patinet_id") REFERENCES "Patient" ("no_registration") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Cart_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_no_registration_key" ON "Patient"("no_registration");
