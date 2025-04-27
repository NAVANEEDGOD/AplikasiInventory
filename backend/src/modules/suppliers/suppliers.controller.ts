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
