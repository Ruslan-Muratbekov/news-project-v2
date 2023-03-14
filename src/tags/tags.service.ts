import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TagsEntity } from "./entity/tags.entity";
import { Repository } from "typeorm";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsEntity) private readonly tagsRepository: Repository<TagsEntity>
  ) {
  }

  async getAllTags() {
    return this.tagsRepository.find();
  }

  async createTags(title) {
    const check = await this.tagsRepository.findOne({ where: { title } });
    if (check) {
      throw new HttpException("Такая категория уже есть", HttpStatus.BAD_REQUEST);
    }
    const createTitle = await this.tagsRepository.create({ title });
    return this.tagsRepository.manager.save(createTitle);
  }

  async getTagsById(id) {
    return this.tagsRepository.findOne({ where: { id } });
  }

  async updateTagsById(id, title) {
    const updateTags = await this.tagsRepository.findOne({ where: { id } });
    if (!updateTags) {
      throw new HttpException('Такой категории нету', HttpStatus.BAD_REQUEST)
    }
    updateTags.title = title
    return this.tagsRepository.manager.save(updateTags)
  }

  async deleteTagsById(id) {
    const removeTags = await this.tagsRepository.findOne({ where: { id } });
    return this.tagsRepository.manager.remove(removeTags);
  }
}
