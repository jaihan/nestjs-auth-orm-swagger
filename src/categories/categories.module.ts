import { Module } from '@nestjs/common';
import CategoryController from './categories.controller';
import CategoriesService from './categories.service';
import Category from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
