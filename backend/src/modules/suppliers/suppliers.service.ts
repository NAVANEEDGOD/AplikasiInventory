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
