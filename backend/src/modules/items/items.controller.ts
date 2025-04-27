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
