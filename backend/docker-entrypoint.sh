#!/bin/bash

# Cek apakah migrasi sudah pernah dijalankan
if [ ! -f "/usr/src/app/database/migration_done.flag" ]; then
    echo "Menjalankan migration database..."
    npm run migration:run -- -d src/database/typeorm.config.ts

    echo "Menjalankan seeding ketika databse telah siap lets try"
    mysql -h db -u dbnava -p NaVa inventory < /docker-entrypoint-initdb.d/seed.sql
    # Buat file flag setelah migrasi selesai untuk menjadi helper saja
    touch /usr/src/app/database/migration_done.flag
else
    echo "Migration sudah pernah dijalankan, melewati langkah ini."
fi

# Jalankan server setelah pengecekan selesai
echo "Menjalankan server NestJS..."
npm run start:dev
