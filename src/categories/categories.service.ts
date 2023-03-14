import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./entity/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
  ) {
  }

  async getAllCategories() {
    return this.categoryRepository.find();
  }

  async createCategory(title) {
    const check = await this.categoryRepository.findOne({ where: { title } });
    if (check) {
      throw new HttpException("Такая категория уже есть", HttpStatus.BAD_REQUEST);
    }
    const createTitle = await this.categoryRepository.create({ title });
    return this.categoryRepository.manager.save(createTitle);
  }

  async getCategoryById(id) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async updateCategoryById(id, title) {
    const updateCategory = await this.categoryRepository.findOne({ where: { id } });
    if (!updateCategory) {
      throw new HttpException('Такой категории нету', HttpStatus.BAD_REQUEST)
    }
    updateCategory.title = title
    return this.categoryRepository.manager.save(updateCategory)
  }

  async deleteCategoryById(id) {
    const removeCategory = await this.categoryRepository.findOne({ where: { id } });
    return this.categoryRepository.manager.remove(removeCategory);
  }
}
