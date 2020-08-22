import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
} from "@nestjs/common";
import CategoriesService from "./categories.service";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { UpdateCategoryDto } from "./dto/updateCategory.dto";
import FindOneParams from "../utils/findOneParams";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiBearerAuth()
@ApiTags("Categories")
@Controller("categories")
@UseInterceptors(ClassSerializerInterceptor)
export default class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create all categories" })
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: "The found record",
  })
  getCategoryById(@Param() { id }: FindOneParams) {
    return this.categoriesService.getCategoryById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create category" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update category" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  async updateCategory(
    @Param() { id }: FindOneParams,
    @Body() category: UpdateCategoryDto
  ) {
    return this.categoriesService.updateCategory(Number(id), category);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete category" })
  async deleteCategory(@Param() { id }: FindOneParams) {
    return this.categoriesService.deleteCategory(Number(id));
  }
}
