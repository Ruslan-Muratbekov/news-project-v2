import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { NewsService } from "./news.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("news")
@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {
  }

  @Get()
  getAllNews() {
    return this.newsService.getAllNews();
  }

  @Post()
  @UseInterceptors(FileInterceptor("files", {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random());
        const ext = extname(file.originalname);
        const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    })
  }))
  async createNews(@UploadedFile() file: Express.Multer.File, @Body() data) {
    return this.newsService.createNews(file, data);
  }

  @Get(":id")
  async getNewsById(@Param("id") id: number) {
    return this.newsService.getNewsById(id);
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor("files", {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random());
        const ext = extname(file.originalname);
        const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    })
  }))
  async putNewsById(@UploadedFile() file: Express.Multer.File, @Param("id") id: number, @Body() data) {
    return this.newsService.putNewsById(file, id, data);
  }

  @Delete(":id")
  async deleteNewsById(@Param("id") id: number) {
    return this.newsService.deleteNewsById(id);
  }
}
