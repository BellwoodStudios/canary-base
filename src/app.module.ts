import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@bellwoodstudios/canary/config/config.module';
import { DatabaseModule } from '@bellwoodstudios/canary/database/database.module';
import { AuthModule } from '@bellwoodstudios/canary/auth/auth.module';
import { BaseUserModule } from '@bellwoodstudios/canary/baseuser/baseuser.module';
import { PhotoModule } from './photo/photo.module';
import { BaseUserService } from '@bellwoodstudios/canary/baseuser/baseuser.service';
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
