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
