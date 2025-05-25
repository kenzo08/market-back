import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('get-all')
  async getAll() {
    return await this.categoryService.getCategories();
  }

  @Get('get-by-id/:id')
  async getById(@Param('id') id: string) {
    return await this.categoryService.getCategoryById(id);
  }
}
