# AplikasiInventory
 
Tentu, Muhammad! Berikut adalah ringkasan langkah-langkah pengerjaan proyekmu dari awal hingga akhir yang bisa kamu gunakan di bagian **README**:

---

## **Proyek Inventory Management System**

### **📌 Langkah-Langkah Pengerjaan**
#### **1️⃣ Persiapan Proyek**
- Membuat struktur dasar proyek **NestJS** menggunakan `npm init`.
- Menambahkan dependensi utama seperti:
  - `@nestjs/typeorm` untuk integrasi TypeORM.
  - `mysql` sebagai database.
- Membuat folder `src/database/` untuk menyimpan file konfigurasi database, migrasi, dan seed.

#### **2️⃣ Pembuatan Entity**
- Membuat entitas database yang sesuai dengan skema:
  - **Admins**: Menyimpan data pengguna administrator.
  - **Categories**: Kategori barang yang dibuat oleh admin.
  - **Suppliers**: Informasi supplier barang.
  - **Items**: Barang yang akan dijual, dengan relasi ke kategori, supplier, dan admin.

#### **3️⃣ Migrasi Database**
- Menulis file migrasi `InitDatabase` untuk membuat tabel:
  - **Admins**
  - **Categories**
  - **Suppliers**
  - **Items**  
- Contoh migrasi:
  ```typescript
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE Admins (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(100) UNIQUE NOT NULL,
        ...
      );
    `);
  }
  ```

#### **4️⃣ Seeding Data**
- Membuat file **`src/database/seed.sql`** untuk mengisi data awal:
  - 3 Admin dengan masing-masing memiliki 3 kategori.
  - Supplier yang terhubung ke admin.
  - Barang dengan relasi ke kategori dan supplier.
- Contoh seed:
  ```sql
  INSERT INTO Admins (username, password, email) VALUES
  ('admin1', 'hashed_pass1', 'admin1@example.com'), ...;
  ```

#### **5️⃣ Menjalankan Migration dan Seeding di Docker**
- Menambahkan `docker-entrypoint.sh` untuk mengatur eksekusi otomatis:
  - Menjalankan migrasi untuk membuat tabel.
  - Mengimpor seed data hanya jika tabel sudah ada.
- Contoh:
  ```bash
  if [ ! -f "/usr/src/app/database/migration_done.flag" ]; then
      npm run migration:run -- -d src/database/typeorm.config.ts
      mysql -h db -u dbnava -pNaVa inventory < /docker-entrypoint-initdb.d/seed.sql
      touch /usr/src/app/database/migration_done.flag
  fi
  ```

#### **6️⃣ Membuat API untuk CRUD**
- Membuat service dan controller di folder `src/items/` untuk menangani:
  - Mendapatkan barang berdasarkan kategori tertentu.
  - CRUD (Create, Read, Update, Delete) barang.
- Contoh API:  
  ```typescript
  @Get('/category/:id')
  async getItemsByCategory(@Param('id') categoryId: number) {
    return await this.itemsService.getItemsByCategory(categoryId);
  }
  ```

#### **7️⃣ Integrasi dengan Docker**
- Menambahkan `docker-compose.yml` untuk menjalankan database dan backend bersama:
  - **Service Database**:
    ```yaml
    services:
      db:
        image: mysql:latest
        ...
        volumes:
          - ./src/database/seed.sql:/docker-entrypoint-initdb.d/seed.sql
    ```
  - **Service Backend**:
    ```yaml
    backend:
      depends_on:
        - db
      ...
      command: >
        sh -c "npm run migration:run -- -d src/database/typeorm.config.ts && npm run start:dev"
    ```

#### **8️⃣ Pengujian**
- Menguji API dengan **Postman** atau **Swagger** untuk memastikan:
  - Migrasi berjalan dengan baik.
  - Seeding data berhasil masuk ke database.
  - Semua endpoint berfungsi sesuai kebutuhan.

---

### **🔥 Langkah Akhir**
- Dokumentasikan seluruh proses di file **README.md**.
- Push proyek ke Git repository dan siapkan presentasi untuk UTS! 🎉

Semoga langkah-langkah ini memudahkan pekerjaanmu! Kalau masih ada yang ingin disesuaikan, beri tahu aku ya 😊🔥. Sukses selalu untuk proyek UTS-mu! 🚀🎉
