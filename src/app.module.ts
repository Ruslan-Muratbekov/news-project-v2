import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {NewsModule} from './news/news.module';
import {TagsModule} from './tags/tags.module';
import {CategoriesModule} from './categories/categories.module';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthEntity} from "./auth/entity/auth.entity";
import {EmailEntity} from "./auth/entity/email.entity";
import {PasswordEntity} from "./auth/entity/password.entity";
import {ProfileEntity} from "./auth/entity/profile.entity";
import {TagsEntity} from "./tags/entity/tags.entity";
import {NewsEntity} from "./news/entity/news.entity";
import {CategoryEntity} from "./categories/entity/category.entity";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'uploads'),
		}),
		ConfigModule.forRoot({isGlobal: true}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [AuthEntity, EmailEntity, PasswordEntity, ProfileEntity, TagsEntity, NewsEntity, CategoryEntity],
			synchronize: true,
		}),
		AuthModule,
		NewsModule,
		TagsModule,
		CategoriesModule
	],
})
export class AppModule {
}
