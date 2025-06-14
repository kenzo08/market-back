import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Категории')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('get-all')
  @ApiOperation({ summary: 'Получить все категории (с деревом)' })
  @ApiResponse({
    status: 200,
    description: 'Успешно получены все категории',
    type: CategoryEntity,
    isArray: true,
  })
  async getAll(): Promise<CategoryEntity[]> {
    return await this.categoryService.getCategories();
  }

  @Get('get-by-id/:id')
  @ApiOperation({ summary: 'Получить категорию по ID' })
  @ApiParam({
    name: 'id',
    description: 'ID категории',
    example: '8e7f20c1-3fbd-4c19-a3d9-d88c8c5a5e1e',
  })
  @ApiResponse({
    status: 200,
    description: 'Категория найдена',
    type: CategoryEntity,
  })
  @ApiResponse({ status: 404, description: 'Категория не найдена' })
  async getById(@Param('id') id: string): Promise<CategoryEntity> {
    return await this.categoryService.getCategoryById(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Создать новую категорию' })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'Поля для создания категории',
  })
  @ApiResponse({
    status: 201,
    description: 'Категория успешно создана',
    type: CategoryEntity,
  })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary:
      'Удалить категорию и всех её потомков с переназначением офферов на родителя',
  })
  @ApiParam({
    name: 'id',
    description: 'ID категории для удаления',
    example: 'b382ed4f-ff1b-470e-a324-9e6469e0eb33',
  })
  @ApiResponse({
    status: 204,
    description: 'Категория и её потомки удалены, офферы переназначены',
  })
  @ApiResponse({ status: 404, description: 'Категория не найдена' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.categoryService.deleteCategoryBranchAndReassignAllOffers(id);
  }
}
