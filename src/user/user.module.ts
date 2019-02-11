import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { APP_USER_SERVICE } from '@bellwoodstudios/canary/baseuser';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [
		UserService,
		{
			provide: APP_USER_SERVICE,
			useClass: UserService,
		},
	],
	controllers: [UserController],
	exports: [UserService, APP_USER_SERVICE],
})
export class UserModule {}
