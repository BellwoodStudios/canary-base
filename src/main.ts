import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';

process.on('unhandledRejection', (err) => {
	console.log(`Error: ${err['details']}`);
});

async function bootstrap () {
	const app = await NestFactory.create(AppModule);
	await app.listen(3000);
}
bootstrap();
