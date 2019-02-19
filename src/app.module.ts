import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@bellwoodstudios/canary/config';
import { DatabaseModule } from '@bellwoodstudios/canary/database';
import { AuthModule } from '@bellwoodstudios/canary/auth';
import { PhotoModule } from './photo/photo.module';
import { UserModule } from './user/user.module';
import { RoleModule } from '@bellwoodstudios/canary/role';
import { LoginModule } from './login/login.module';
import { GraphQLModule } from '@bellwoodstudios/canary/graphql';

@Module({
	imports: [
		// Canary core modules
		ConfigModule.forRootAsync(['src/**/*.configdefs.ts']),
		DatabaseModule,
		AuthModule.withUserModule(UserModule),
		RoleModule,
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
	],
	exports: [
	],
})
export class AppModule {}
