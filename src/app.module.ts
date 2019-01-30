import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@bellwoodstudios/canary/config';
import { DatabaseModule } from '@bellwoodstudios/canary/database';
import { AuthModule } from '@bellwoodstudios/canary/auth';
import { PhotoModule } from './photo/photo.module';
import { BaseUserService } from '@bellwoodstudios/canary/baseuser';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		// Canary core modules
		ConfigModule.forRootAsync(['src/**/*.configdefs.ts']),
		DatabaseModule,
		AuthModule,

		// Project-specific modules
		UserModule,
		PhotoModule,
	],
	controllers: [
		AppController,
	],
	providers: [
		AppService,
		{
			provide: BaseUserService,
			useClass: UserService,
		},
	],
})
export class AppModule {}
