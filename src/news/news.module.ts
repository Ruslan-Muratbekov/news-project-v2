import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {NewsEntity} from "./entity/news.entity";
import {MulterModule} from "@nestjs/platform-express";

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
    MulterModule.register({dest: './uploads'}),
    TypeOrmModule.forFeature([NewsEntity])
  ]
})
export class NewsModule {}
