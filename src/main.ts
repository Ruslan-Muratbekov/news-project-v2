import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
	const PORT = process.env.PORT

	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('News project')
		.setDescription('Новостной портал')
		.setVersion('1.0')
		.addTag('News')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				name: 'JWT',
				description: 'Enter JWT token',
				in: 'header',
			},
			'jwt_access'
		)
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				name: 'JWT',
				description: 'Enter JWT token',
				in: 'header',
			},
			'jwt_refresh'
		)
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				name: 'JWT',
				description: 'Enter JWT token',
				in: 'header',
			},
			'jwt_email'
		)
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				name: 'JWT',
				description: 'Enter JWT token',
				in: 'header',
			},
			'jwt_password'
		)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('', app, document);

	await app.listen(PORT, () => console.log(`Server started on URL http://localhost:${PORT}`));
}

bootstrap();
