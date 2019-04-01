import { Module, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@bellwoodstudios/canary/config';
import { DatabaseModule } from '@bellwoodstudios/canary/database';
import { AuthModule } from '@bellwoodstudios/canary/auth';
import { PhotoModule } from './photo/photo.module';
import { UserModule } from './user/user.module';
import { RoleGuard } from '@bellwoodstudios/canary/role';
import { LoginModule } from './login/login.module';
import { GraphQLModule } from '@bellwoodstudios/canary/graphql';
import { APP_INTERCEPTOR, APP_GUARD, APP_PIPE } from '@nestjs/core';

@Module({
	imports: [
		// Canary core modules
		ConfigModule.forRootAsync(['src/**/*.configdefs.ts']),
		DatabaseModule,
		AuthModule.withUserModule(UserModule),
		GraphQLModule.forRootAsync(),

		// Project-specific modules
		UserModule,
		LoginModule,
		PhotoModule,
	],
	controllers: [
		AppController,
	],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: RoleGuard,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor,
		},
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				whitelist: true,
				transform: true,
			}),
		},
	],
	exports: [
	],
})
export class AppModule {}
