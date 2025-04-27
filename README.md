# AplikasiInventory
 
Muhammad Naffa Afif - A11.2022.14249
---

### **Langkah-Langkah Pengerjaan**
#### **Persiapan Proyek**
- Membuat struktur dasar proyek **NestJS** mengikuti alur yang ada didokumentasinya
- Setelah siap lanjut menambahkan depedensi untuk mengelola orm pada Nest
- Menambahkan dependensi utama seperti:
  - `@nestjs/typeorm` untuk integrasi TypeORM.
  - `mysql` sebagai database.
- Membuat folder `src/database/` untuk menyimpan file konfigurasi database, migrasi

### **Pembuatan Struktur direktori dan filenya
- struktur direktorinya sebagai berikut:
- inventory-backend/
│── src/
│   ├── modules/              # 🔹 Modul utama aplikasi (Kategori, Supplier, dll.)
│   │   ├── admins/            # 🔹 Modul untuk Items
│   │   │   ├── admins.module.ts
│   │   │   ├── admins.service.ts
│   │   │   ├── admins.controller.ts
│   │   │   ├── admins.entity.ts
│   │   ├── items/            # 🔹 Modul untuk Items
│   │   │   ├── suppliers.module.ts
│   │   │   ├── suppliers.service.ts
│   │   │   ├── suppliers.controller.ts
│   │   │   ├── suppliers.entity.ts
│   │   ├── items/            # 🔹 Modul untuk Items
│   │   │   ├── items.module.ts
│   │   │   ├── items.service.ts
│   │   │   ├── items.controller.ts
│   │   │   ├── items.entity.ts
│   │   ├── categories/       # 🔹 Modul untuk Categories
│   │   │   ├── categories.module.ts
│   │   │   ├── categories.service.ts
│   │   │   ├── categories.controller.ts
│   │   │   ├── categories.entity.ts
│   ├── app.module.ts         # 🔹 Modul utama (root module)
│   ├── main.ts               # 🔹 Entry point aplikasi
│   ├── database/             # 🔹 Konfigurasi database dan migrasi
│   │   ├── typeorm.config.ts # Data Source
│   │   ├── migrations/ # nantinya ada hasil generasi dan nanti akan kita konfigurasi
│── package.json               # 🔹 File konfigurasi npm

#### **Pembuatan Entity**
- Membuat entitas database yang sesuai dengan skema:
  - **Admins**: Menyimpan data pengguna administrator.
    ```
    import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
    @Entity()
    export class Admins {
      @PrimaryGeneratedColumn()
      id: number;
    
      @Column({ type: 'varchar', length: 100, unique: true })
      username: string;
    
      @Column({ type: 'varchar', length: 255 })
      password: string;
    
      @Column({ type: 'varchar', length: 100, unique: true })
      email: string;
    
      @CreateDateColumn()
      created_at: Date;
    
      @UpdateDateColumn()
      updated_at: Date;
    }
    ```
  - **Categories**: Kategori barang yang dibuat oleh admin.
  - INFO + Warning : jika menggunakan relasi supaya kolom yang nanti terbentuk sama dengan yang ada dimigrasi , perlu decorator joincolumn dan dikasih nama , jika tidak nanti akan berubah karena library typeorm , misal created_by akan menjadi ceratedById , otomatis pascalcase+Id , kalo ngga dari awal begitu nanti repot ketika diakhir dan saya mengalaminya saat coba query wkwkwk
    ```
    import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
    import { Admins } from '../admins/admins.entity';
    
    @Entity()
    export class Categories {
      @PrimaryGeneratedColumn()
      id: number;
    
      @Column({ type: 'varchar', length: 100, unique: true })
      name: string;
    
      @Column({ type: 'text', nullable: true })
      description: string;
    
      @ManyToOne(()=> Admins , (admin) => admin.id , {nullable:false ,onDelete:'CASCADE'})
      @JoinColumn({name :'created_by'})
      created_by : Admins;
    
      @CreateDateColumn()
      created_at: Date;
    
      @UpdateDateColumn()
      updated_at: Date;
    
    }

    ```
  - **Suppliers**: Informasi supplier barang.
    ```
    import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
    import { Admins } from '../admins/admins.entity';
    
    
    @Entity()
    export class Suppliers {
      @PrimaryGeneratedColumn()
      id: number;
    
      @Column({ type: 'varchar', length: 100 ,nullable:false})
      name: string;
    
      @Column({ type: 'varchar', length: 100 })
      contact_info: string;
    
      @ManyToOne(()=>Admins , (admin)=>admin.id , {nullable:false,onDelete:'CASCADE'})
      @JoinColumn({name :'created_by'})
      created_by : Admins;
    
      @CreateDateColumn()
      created_at: Date;
    
      @UpdateDateColumn()
      updated_at: Date;
    }

    ```
  - **Items**: Barang yang akan dijual, dengan relasi ke kategori, supplier, dan admin.
    ```
    import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
    import { Categories } from '../categories/categories.entity';
    import { Suppliers } from '../suppliers/suppliers.entity';
    import { Admins } from '../admins/admins.entity';
    
    @Entity()
    export class Items {
      @PrimaryGeneratedColumn()
      id: number;
    
      @Column({ type: 'varchar', length: 100 })
      name: string;
    
      @Column({type:'text'})
      description:string;
      
      @Column({ type: 'decimal', precision: 10, scale: 2 })
      price: number;
    
      @Column({ type: 'int', default: 0 })
      quantity: number;
    
      @ManyToOne(() => Categories, category => category.id , {nullable:false , onDelete:'CASCADE'})
      @JoinColumn({name :'category_id'})
      category_id: Categories;
      
      @ManyToOne(() => Suppliers, supplier => supplier.id , {nullable :false , onDelete:'CASCADE'})
      @JoinColumn({name :'supplier_id'})
      supplier_id: Suppliers;
      
      @ManyToOne(()=>Admins , (admin)=>admin.id , {nullable:false , onDelete:'CASCADE'})
      @JoinColumn({name :'created_by'})
      created_by:Admins;
    
      @CreateDateColumn()
      created_at:Date;
    
      @CreateDateColumn()
      updated_at:Date;
    
    }

    ```

#### ** Membuat Service **
INFO : Service digunakan untuk logika perhitungan saja , dan pengolahan data.

NOTE : DISINI UNTUK TIAP ENTITY SAYA BUAT CRUD STANDAR , TERMASUK GET BY ID

- ** Admins **
  ```typescript
  import { Injectable } from '@nestjs/common';
  import { Repository } from 'typeorm';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Admins } from './admins.entity';
  
  @Injectable()
  export class AdminsService {
    constructor(
      @InjectRepository(Admins)
      private readonly adminsRepository: Repository<Admins>,
    ) {}
  
    async findAll(): Promise<Admins[]> {
        try{
            const admins = await this.adminsRepository.find();
            return admins;
        }catch(error){
            throw new Error(`Gagal Mendapatkan Data Admin : ${error.message}`)
        }
      }
    
    
      async findById(id:number): Promise<Admins> {
        try{
            const admin = await this.adminsRepository.findOne({where:{id}});
            if (!admin){
                throw new Error(`Gagal Mendapatkan data Admin dengan id : ${id} `)
            }
            return admin;
        }catch(error){
            throw new Error(`Gagal Mendapatkan Data Admin : ${error.message}`)
        }
      }
    
    
      async create(adminData: Partial<Admins>): Promise<Admins> {
        try{
            const newAdmin = await this.adminsRepository.create(adminData);
            return await this.adminsRepository.save(newAdmin);
        }catch(error){
            throw new Error(`Gagal Membuat Data Admin Baru`)
        }
      }
    
      async update(id: number, adminData: Partial<Admins>): Promise<Admins> {
        try{
            const admin = await this.adminsRepository.findOne({ where: { id } }); 
            if (!admin){
                throw new Error(`Gagal Mendapatkan Data Admin , Update Gagal `)
            }
            await this.adminsRepository.update(id, adminData);
            return admin
        }catch(error){
            throw new Error(`Gagal Update data admin pada Id : ${id}`)
        }
        
      }
    
      async delete(id: number): Promise<{message:string}> {
        try{
            await this.adminsRepository.delete(id);
            return {message :`Delete Data Successfuly`}
        }catch{
            throw new Error(`Gagal Menghapus Data Admin pada Id : ${id} `)
        }
      }
  }

  ```
- **categories**
  ```typescript

  import { Injectable } from '@nestjs/common';
  import { Repository } from 'typeorm';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Categories } from './categories.entity';
  
  @Injectable()
  export class CategoriesService {
    constructor(
      @InjectRepository(Categories)
      private readonly categoriesRepository: Repository<Categories>,
    ) {}
  
    async findAll(): Promise<Categories[]> {
        try{
            const categories = await this.categoriesRepository.find();
            return categories;
        }catch(error){
            throw new Error(`Gagal Mendapatkan Data Categori : ${error.message}`)
        }
      }
    
    
      async findById(id:number): Promise<Categories> {
        try{
            const categorie = await this.categoriesRepository.findOne({where:{id}});
            if (!categorie){
                throw new Error(`Gagal Mendapatkan data Categori dengan id : ${id} `)
            }
            return categorie;
        }catch(error){
            throw new Error(`Gagal Mendapatkan Data Categories : ${error.message}`)
        }
      }
    
    
      async create(categoryData: Partial<Categories>): Promise<Categories> {
        try{
            const newCategories = await this.categoriesRepository.create(categoryData);
            return await this.categoriesRepository.save(newCategories);
        }catch(error){
            throw new Error(`Gagal Membuat Data Categories Baru`)
        }
      }
    
      async update(id: number, categoryData: Partial<Categories>): Promise<Categories> {
        try{
            const categorie = await this.categoriesRepository.findOne({ where: { id } }); 
            if (!categorie){
                throw new Error(`Gagal Mendapatkan Data Categories , Update Gagal `)
            }
            await this.categoriesRepository.update(id, categoryData);
            return categorie
        }catch(error){
            throw new Error(`Gagal Update data categorie pada Id : ${id}`)
        }
        
      }
    
      async delete(id: number): Promise<{message:string}> {
        try{
            await this.categoriesRepository.delete(id);
            return {message : 'Delete data Successfuly'}
        }catch{
            throw new Error(`Gagal Menghapus Data Categories pada Id : ${id} `)
        }
      }
  }
  

  ```

- **Suppliers**
  ```typescript
  import { Injectable } from '@nestjs/common';
  import { Repository } from 'typeorm';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Suppliers } from './suppliers.entity';
  import { error } from 'console';
  
  @Injectable()
  export class SuppliersService {
    constructor(
      @InjectRepository(Suppliers)
      private readonly suppliersRepository: Repository<Suppliers>,
    ) {}
  
    async findAll(): Promise<Suppliers[]> {
      try{
          const suppliers = await this.suppliersRepository.find();
          return suppliers;
      }catch(error){
          throw new Error(`Gagal Mendapatkan Data Supplier : ${error.message}`)
      }
    }
  
  
    async findById(id:number): Promise<Suppliers> {
      try{
          const suppliers = await this.suppliersRepository.findOne({where:{id}});
          if (!suppliers){
              throw new Error(`Gagal Mendapatkan data Suplier dengan id : ${id} `)
          }
          return suppliers;
      }catch(error){
          throw new Error(`Gagal Mendapatkan Data Supplier : ${error.message}`)
      }
    }
  
  
    async create(supplierData: Partial<Suppliers>): Promise<Suppliers> {
      try{
          const newSupplier = await this.suppliersRepository.create(supplierData);
          return await this.suppliersRepository.save(newSupplier);
      }catch(error){
          throw new Error(`Gagal Membuat Data Supplier Baru`)
      }
    }
  
    async update(id: number, supplierData: Partial<Suppliers>): Promise<Suppliers> {
      try{
          const supplier = await this.suppliersRepository.findOne({ where: { id } }); 
          if (!supplier){
              throw new Error(`Gagal Mendapatkan Data Supplier , Update Gagal `)
          }
          await this.suppliersRepository.update(id, supplierData);
          return supplier
      }catch(error){
          throw new Error(`Gagal Update data supplier pada Id : ${id}`)
      }
      
    }
  
    async delete(id: number): Promise<{message :string}> {
      try{
          await this.suppliersRepository.delete(id);
          return {message:`Delete Data Successfuly`}
      }catch{
          throw new Error(`Gagal Menghapus Data Supplier pada Id : ${id} `)
      }
    }
  }
  
  ```
- **Items**
- NOTE : PADA ITEMS MENERAPKAN 2 FUNGSI TAMBAHAN , STOCK SUMMARY DAN GET ITEM BERDASARKAN KATEGORINYA
  ```typescript
  import { Injectable } from '@nestjs/common';
  import { Repository } from 'typeorm';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Items } from './items.entity';
  
  @Injectable()
  export class ItemsService {
    constructor(
      @InjectRepository(Items)
      private readonly itemsRepository: Repository<Items>,
    ) {}
  
    async findAll(): Promise<Items[]> {
        try{
            const items = await this.itemsRepository.find();
            return items;
        }catch(error){
            throw new Error(`Gagal Mendapatkan Data Item : ${error.message}`)
        }
      }
    
    
      async findById(id:number): Promise<Items> {
        try{
            const item = await this.itemsRepository.findOne({where:{id}});
            if (!item){
                throw new Error(`Gagal Mendapatkan data Suplier dengan id : ${id} `)
            }
            return item;
        }catch(error){
            throw new Error(`Gagal Mendapatkan Data Item : ${error.message}`)
        }
      }
    
    
      async create(itemData: Partial<Items>): Promise<Items> {
        try{
            const newItem = await this.itemsRepository.create(itemData);
            return await this.itemsRepository.save(newItem);
        }catch(error){
            throw new Error(`Gagal Membuat Data Item Baru`)
        }
      }
    
      async update(id: number, itemData: Partial<Items>): Promise<Items> {
        try{
            const item = await this.itemsRepository.findOne({ where: { id } }); 
            if (!item){
                throw new Error(`Gagal Mendapatkan Data Item , Update Gagal `)
            }
            await this.itemsRepository.update(id, itemData);
            return item
        }catch(error){
            throw new Error(`Gagal Update data item pada Id : ${id}`)
        }
        
      }
    
      async delete(id: number): Promise<{message:string}> {
        try{
            await this.itemsRepository.delete(id);
            return {message:`Delete Successfuly`}
        }catch{
            throw new Error(`Gagal Menghapus Data Item pada Id : ${id} `)
        }
      }
  
  
      //menampilkan ringkasan stok barang 
      async getStockSummary(): Promise<{ total_stok: number; total_nilai_stok: number; rata_rata_harga: number }> {
          try {
            const result = await this.itemsRepository
              .createQueryBuilder('items')
              .select('SUM(items.quantity)', 'total_stok')
              .addSelect('SUM(items.price * items.quantity)', 'total_nilai_stok')
              .addSelect('AVG(items.price)', 'rata_rata_harga')
              .getRawOne();
        
            return result;
          } catch (error) {
            throw new Error(`Gagal mendapatkan ringkasan stok: ${error.message}`);
          }
        }
  
  
      //menampilkan laporan barang berdasarkan kategori tertentu
  
      async getItemsByCategory(categoryId: number): Promise<Items[]> {
          try {
              return await this.itemsRepository.query(`
                  SELECT items.id, items.name, items.price, items.quantity, categories.name AS kategori 
                  FROM Items 
                  JOIN Categories ON items.category_id = categories.id
                  WHERE categories.id = ${categoryId}
                `);
          } catch (error) {
            throw new Error(`Gagal mendapatkan daftar barang: ${error.message}`);
          }
        }
        
  }

  ```

#### ** Membuat Controller **
INFO : JADI CONTROLLER BERFUNGSI SEBAGAI KOMUNIKATOR ANTARA SERVER DAN CLIENT MELALUI URL , ATAU GAMPANGNYA ROUTE

- **Admins**
  ```typescript
  import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
  import { AdminsService } from './admins.service';
  import { Admins } from './admins.entity';
  
  @Controller('admins')
  export class AdminsController {
    constructor(private readonly adminsService: AdminsService) {}
  
    @Get(':id')
    async getAdminById(@Param('id') id:number): Promise<Admins> {
      try {
        return await this.adminsService.findById(id);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    @Get()
    async getAllAdmins(): Promise<Admins[]> {
      try {
        return await this.adminsService.findAll();
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Post()
    async createAdmin(@Body() adminData: Partial<Admins>): Promise<Admins> {
      try {
        return await this.adminsService.create(adminData);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Put(':id')
    async updateAdmin(@Param('id') id: number, @Body() adminData: Partial<Admins>): Promise<Admins> {
      try {
        return await this.adminsService.update(id, adminData);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Delete(':id')
    async deleteAdmin(@Param('id') id): Promise<{ message: string }> {
      try {
        return await this.adminsService.delete(id);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  ```
- **Categories**
  ```typescript
  import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
  import { CategoriesService } from './categories.service';
  import { Categories } from './categories.entity';
  
  @Controller('categories')
  export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
  
    @Get(':id')
    async getCategoriesById(@Param('id') id:number): Promise<Categories> {
      try {
        return await this.categoriesService.findById(id);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    @Get()
    async getAllCategories(): Promise<Categories[]> {
      try {
        return await this.categoriesService.findAll();
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Post()
    async createCategory(@Body() categoryData: Partial<Categories>): Promise<Categories> {
      try {
        return await this.categoriesService.create(categoryData);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Put(':id')
    async updateCategory(@Param('id') id: number, @Body() categoryData: Partial<Categories>): Promise<Categories> {
      try {
        return await this.categoriesService.update(id, categoryData);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Delete(':id')
    async deleteCategory(@Param('id') id): Promise<{ message: string }> {
      try {
        return await this.categoriesService.delete(id);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  }
  ```
- **Suppliers**
  ```typescript
  import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
  import { SuppliersService } from './suppliers.service';
  import { Suppliers } from './suppliers.entity';
  
  @Controller('suppliers')
  export class SuppliersController {
    constructor(private readonly suppliersService: SuppliersService) {}
  
    @Get(':id')
    async getSuppliersById(@Param('id') id:number): Promise<Suppliers> {
      try {
        return await this.suppliersService.findById(id);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    @Get()
    async getAllSuppliers(): Promise<Suppliers[]> {
      try {
        return await this.suppliersService.findAll();
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Post()
    async createSupplier(@Body() supplierData: Partial<Suppliers>): Promise<Suppliers> {
      try {
        return await this.suppliersService.create(supplierData);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Put(':id')
    async updateSupplier(@Param('id') id: number, @Body() supplierData: Partial<Suppliers>): Promise<Suppliers> {
      try {
        return await this.suppliersService.update(id, supplierData);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Delete(':id')
    async deleteSupplier(@Param('id') id): Promise<{ message: string }> {
      try {
        return await this.suppliersService.delete(id);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  }
  

  ```

- ** Items **
- INFO : DISINI ADA ATURAN DALAM PENULISAN ROUTE , KARENA PROGRAMNYA MEMBACA SECARA URUT DARI ATAS KE BAWAH , JADI MISAL ADA GET(':ID') DAN MAU BUAT GET('CATEGORY/:ID') MAKA TIDAK AKAN MASUK KE CATEGORY , DAN CATEGGORY MALAH MENJADI ID , OLEH KARENA ITU ROUTE GENERAL HARUS DILETAKKAN DIPALING BAWAH
  ```typescript
  import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
  import { ItemsService } from './items.service';
  import { Items } from './items.entity';
  
  @Controller('items')
  export class ItemsController {
      constructor(private readonly itemsService: ItemsService) {}
      
      @Get('/category/:id')
      async getItemsByCategory(@Param('id') categoryId: number) {
      try {
        return await this.itemsService.getItemsByCategory(categoryId);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      }
      @Get('/stock-summary')
    async getStockSummary() {
      try {
          return await this.itemsService.getStockSummary();
      } catch (error) {
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Get(':id')
    async getItemsById(@Param('id') id:number ): Promise<Items> {
      try {
          return await this.itemsService.findById(id);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
  
    @Get()
    async getAllItems(): Promise<Items[]> {
      try {
          return await this.itemsService.findAll();
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Post()
    async createItem(@Body() itemData: Partial<Items>): Promise<Items> {
      try {
        return await this.itemsService.create(itemData);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Put(':id')
    async updateItem(@Param('id') id: number, @Body() itemData: Partial<Items>): Promise<Items> {
      try {
        return await this.itemsService.update(id, itemData);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    @Delete(':id')
    async deleteItem(@Param('id') id: number): Promise<{ message: string }> {
      try {
        return await this.itemsService.delete(id);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  
  }
  

  ```
#### ** Membuat Module untuk tiap tiap fitur entitas **

- **Admins**
  ```typescript
  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { AdminsController } from './admins.controller';
  import { AdminsService } from './admins.service';
  import { Admins } from './admins.entity';
  
  @Module({
    imports: [TypeOrmModule.forFeature([Admins])],
    controllers: [AdminsController],
    providers: [AdminsService],
    exports: [AdminsService],
  })
  export class AdminsModule {}

  ```
- **Categories**
  ```typescript
  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { CategoriesController } from './categories.controller';
  import { CategoriesService } from './categories.service';
  import { Categories } from './categories.entity';
  
  @Module({
      imports: [TypeOrmModule.forFeature([Categories])],
      controllers: [CategoriesController],
      providers: [CategoriesService],
      exports: [CategoriesService],
    })
    export class CategoriesModule {}
    
  ```
- **Suppliers**
  ```typescript
  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { SuppliersController } from './suppliers.controller';
  import { SuppliersService } from './suppliers.service';
  import { Suppliers } from './suppliers.entity';
  
  @Module({
    imports: [TypeOrmModule.forFeature([Suppliers])],
    controllers: [SuppliersController],
    providers: [SuppliersService],
    exports: [SuppliersService],
  })
  export class SuppliersModule {}

  ```

- **Items**
  ```typescript
  import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { ItemsController } from './items.controller';
  import { ItemsService } from './items.service';
  import { Items } from './items.entity';
  @Module({
      imports: [TypeOrmModule.forFeature([Items])],
      controllers: [ItemsController],
      providers: [ItemsService],
      exports: [ItemsService],
    })
    export class Itemmodule {}
  ```
Lalu Kita perlu menambahkan semua modulnya ke import dari app module agar dapat digunakan, oh iya disini juga kita sekalian memasukan modul dari typeorm dari @nestjs/typeorm 
fungsinya adalah sebagai koneksi , seperti umumnya , karena modulenya berada diparent maka dapat digunakan disemua modul lain untuk operasi yang membutuhkan database
```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsModule } from './modules/admins/admins.module';
import { Itemmodule } from './modules/items/items.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USER ||'dbnava',
      password: process.env.DATABASE_PASSWORD ||'NaVa',
      // username: process.env.DATABASE_USER ||'root',
      // password: process.env.DATABASE_PASSWORD ||'',
      database: process.env.DATABASE_NAME ||  'inventory',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/*.ts'],
      synchronize: true, // Set to false in production
      autoLoadEntities:true,
    }),
    AdminsModule,
    SuppliersModule,
    CategoriesModule,
    Itemmodule,
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


```

  
#### ** Migrasi Database **
Pertama tambahkan Script command di package.json untuk migration
sebagai berikut

```json
{
"typeorm" : "typeorm",
"migration:generate":"typeorm migration:generate -- -n",
"migration:run": "typeorm migration:run",
"migration:revert": "typeorm migration:revert"
}
```

disini sebenarnya menggunakan create tapi gapapa kalo mau ditulis migration create , tapi untuk langkah ini saya langung pakai cli 
```bash
typeorm migration:create ./src/database/migrations/initDatabase
```

command tersebut akan membuat sebuah file migrasi dan kita perlu mengisi querry yang akan dijalankan , berikut kode jadinya :

```typescript
import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1745721407621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE Admins (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          );
    
          CREATE TABLE Categories (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) UNIQUE NOT NULL,
            description TEXT,
            created_by INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (created_by) REFERENCES Admins(id) ON DELETE CASCADE
          );
    
          CREATE TABLE Suppliers (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            contact_info VARCHAR(100),
            created_by INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (created_by) REFERENCES Admins(id) ON DELETE CASCADE
          );
    
          CREATE TABLE Items (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            quantity INT NOT NULL DEFAULT 0,
            category_id INT NOT NULL,
            supplier_id INT NOT NULL,
            created_by INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE CASCADE,
            FOREIGN KEY (supplier_id) REFERENCES Suppliers(id) ON DELETE CASCADE,
            FOREIGN KEY (created_by) REFERENCES Admins(id) ON DELETE CASCADE
          );
        `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DROP TABLE Items;
          DROP TABLE Suppliers;
          DROP TABLE Categories;
          DROP TABLE Admins;
        `);
      }
}


```

#### **Seeding Data**
- Membuat file **`src/database/seed.sql`** untuk mengisi data awal:
  - 3 Admin dengan masing-masing memiliki 3 kategori.
  - Supplier yang terhubung ke admin.
  - Barang dengan relasi ke kategori dan supplier.
- Contoh seed:
  ```sql
  INSERT INTO Admins (username, password, email) VALUES
  ('admin1', 'hashed_pass1', 'admin1@example.com'), ...;
  ```

#### **Menjalankan Migration dan Seeding di Docker**
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

#### ** Integrasi dengan Docker **
- Menambahkan `docker-compose.yml` untuk menjalankan database dan backend bersama:
  - **docker-compose.yaml**:
  ```yaml
  services:
     backend:
       container_name: inventory-backend
       build:
         context: backend
         dockerfile: Dockerfile
       volumes:
         - /backend
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=development
         - DATABASE_HOST=database
         - DATABASE_PORT=3306
         - DATABASE_USER=dbnava
         - DATABASE_PASSWORD=NaVa
         - DATABASE_NAME=inventory
       depends_on:
         - database
   
     database:
       container_name: inventory-database
       image: mysql:latest
       restart: always
       ports:
         - "3307:3306"
       environment:
         MYSQL_ROOT_PASSWORD: root
         MYSQL_DATABASE: inventory
         MYSQL_USER: dbnava
         MYSQL_PASSWORD: NaVa
       volumes:
         - ./mysql_data:/var/lib/mysql
         - ./seed.sql:/docker-entrypoint-initdb.d/seed.sql
    ```
  NOTE : volume terakhir sebenarnya untuk menyimpan seeder dan akan dieksekusi di saat run backend tapi belum bisa - gagal :'v

Dockerfile disimpan di dalam folder backend
  ```
  FROM node:22.2.0
  
  WORKDIR /usr/src/app
  
  # Copy the rest of the application files
  COPY . .
  
  RUN npm install
  # Build the NestJS application
  RUN npm run build
  RUN chmod +x /usr/src/app/docker-entrypoint.sh
  # Expose the application port
  EXPOSE 3000
  
  # Command to run the application
  CMD ["/usr/src/app/docker-entrypoint.sh"]

  ```
docker-entrypoint.sh
INFO : INI bash untuk run agar dapat melakukan migration dan start aplikasi dicontainer
buat dipath yang sama dengan Dockerfile

```
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

```

Lalu lakukan ``` docker-compose up --build ```

 
#### **Pengujian**
- Menguji API dengan **Thunder Client** dan mysql Workbench untuk memastikan:
  - Migrasi berjalan dengan baik.
  - Semua endpoint berfungsi sesuai kebutuhan.
  - Seeding data berhasil masuk ke database. (tahap ini gagal sampai sekarang belum bisa :'/ )
---

getalldata tiap entity 

localhost:3000/admins/
localhost:3000/items/
localhost:3000/categories/
localhost:3000/supplier/

get data by id 

localhost:3000/admins/:id
localhost:3000/items/:id
localhost:3000/categories/:id
localhost:3000/supplier/:id

create data pakai thunder client contohnya

localhost:3000/admins/
method post
kirimkan data lewat body
misal
{
  "username":"adminapip",
  "email":"adminapip@gmail.com",
  "password":"hased_adminpip"
}

get stocksummary atau ringkasan stok

localhost:3000/items/stock-summary

get item by category

localhost:3000/items/category/:id

