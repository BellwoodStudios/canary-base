import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@bellwoodstudios/canary/config/config.module';
import { DatabaseModule } from '@bellwoodstudios/canary/database/database.module';
import { PhotoModule } from './photo/photo.module';

@Module({
	imports: [
		ConfigModule.forRoot(['src/**/*.configdefs.js']),
		DatabaseModule.forRoot(),
		PhotoModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
