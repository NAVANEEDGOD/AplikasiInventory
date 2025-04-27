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
