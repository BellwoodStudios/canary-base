import { Module, ClassSerializerInterceptor } from '@nestjs/common';
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
import { SerializationModule } from '@bellwoodstudios/canary/serialization';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';

@Module({
	imports: [
		// Canary core modules
		ConfigModule.forRootAsync(['src/**/*.configdefs.ts']),
		DatabaseModule,
		AuthModule.withUserModule(UserModule),
		GraphQLModule,

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
	],
	exports: [
	],
})
export class AppModule {}
