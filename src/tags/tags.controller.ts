import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TagsService } from './tags.service';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getAllTags() {
    return this.tagsService.getAllTags();
  }

  @Post()
  async createTags(@Body("title") title: string) {
    return this.tagsService.createTags(title);
  }

  @Get(":id")
  async getTagsById(@Param("id") id: number) {
    return this.tagsService.getTagsById(id);
  }

  @Put(":id")
  async updateTagsById(@Param("id") id: number, @Body("title") title: string) {
    return this.tagsService.updateTagsById(id, title);
  }

  @Delete(":id")
  async deleteTagsById(@Param("id") id: number) {
    return this.tagsService.deleteTagsById(id);
  }
}
