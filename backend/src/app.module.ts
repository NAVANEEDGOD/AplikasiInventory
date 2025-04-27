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
