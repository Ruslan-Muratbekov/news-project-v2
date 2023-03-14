import {Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {NewsService} from './news.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {extname} from 'path'
import {ApiTags} from "@nestjs/swagger";

@ApiTags('news')
@Controller('news')
export class NewsController {
	constructor(private readonly newsService: NewsService) {
	}

	@Get()
	getAllNews(){

	}

	@Post()
	@UseInterceptors(FileInterceptor('files', {
		storage: diskStorage({
			destination: './uploads',
			filename: (req, file, callback) => {
				const uniqueSuffix = Date.now() + '-' + Math.round(Math.random())
				const ext = extname(file.originalname)
				const filename = `${file.originalname}-${uniqueSuffix}${ext}`
				callback(null, filename)
			}
		})
	}))
	async handleUploadFiles(@UploadedFile() file: Express.Multer.File) {
		console.log(file)
	}
}
