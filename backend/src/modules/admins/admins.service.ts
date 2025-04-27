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
