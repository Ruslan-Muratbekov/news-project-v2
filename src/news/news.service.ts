import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NewsEntity } from "./entity/news.entity";
import { Repository } from "typeorm";
import { join } from "path";
import * as fs from "fs";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity) private readonly newsRepository: Repository<NewsEntity>
  ) {
  }

  async getAllNews() {
    return this.newsRepository.find();
  }

  async createNews(file, { title, author, description, content, tags, category, is_published, views }: NewsEntity) {
    if (!title || !description || !content || !category || !author || !tags) {
      throw new HttpException("Заполните все полня", HttpStatus.BAD_REQUEST);
    }
    const createNews = await this.newsRepository.create({
      title,
      author,
      description,
      content,
      tags,
      category,
      image: file.filename,
      is_published,
      views
    });
    return this.newsRepository.manager.save(createNews);
  }

  async getNewsById(id) {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) {
      throw new HttpException("Такой публикации нету", HttpStatus.BAD_REQUEST);
    }
    return news;
  }

  async putNewsById(file, id, {
    title,
    author,
    description,
    content,
    tags,
    category,
    is_published,
    views
  }: NewsEntity) {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) {
      throw new HttpException("Такой публикации нету", HttpStatus.BAD_REQUEST);
    }
    if (!title || !description || !content || !category || !author || !tags) {
      throw new HttpException("Заполните все полня", HttpStatus.BAD_REQUEST);
    }
    if (file) {
      const path = join(__dirname, "..", "..", "uploads", news.image)
      fs.unlink(path, err => {
        if(err) throw err;
        console.log('Файл успешно удалён');
      })
      news.image = file.filename
    }
    news.title = title;
    news.author = author;
    news.description = description;
    news.content = content;
    news.tags = tags;
    news.category = category;
    news.is_published = is_published;
    news.views = views;
    return this.newsRepository.manager.save(news);
  }

  async deleteNewsById(id) {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) {
      throw new HttpException("Такой публикации нету", HttpStatus.BAD_REQUEST);
    }
    return this.newsRepository.manager.remove(news);
  }
}
