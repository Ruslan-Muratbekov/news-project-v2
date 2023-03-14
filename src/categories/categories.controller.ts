import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) {
  }

  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Post()
  async createCategory(@Body("title") title: string) {
    return this.categoriesService.createCategory(title);
  }

  @Get(":id")
  async getCategoryById(@Param("id") id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @Put(":id")
  async updateCategoryById(@Param("id") id: number, @Body("title") title: string) {
    return this.categoriesService.updateCategoryById(id, title);
  }

  @Delete(":id")
  async deleteCategoryById(@Param("id") id: number) {
    return this.categoriesService.deleteCategoryById(id);
  }
}
