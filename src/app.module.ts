import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@bellwoodstudios/canary/config/config.module';
import { DatabaseModule } from '@bellwoodstudios/canary/database/database.module';
import { AuthModule } from '@bellwoodstudios/canary/auth/auth.module';
import { PhotoModule } from './photo/photo.module';

@Module({
	imports: [
		// Canary core modules
		ConfigModule.forRootAsync(['src/**/*.configdefs.ts']),
		DatabaseModule,
		AuthModule,

		// Project-specific modules
		PhotoModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
