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
