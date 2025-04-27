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
